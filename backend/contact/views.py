import logging
from django.core.mail import send_mail, EmailMultiAlternatives
from django.conf import settings
from django.db import models
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
import requests
from .models import Enquiry
from .serializers import EnquirySerializer
from authapp.permissions import IsAdmin  

logger = logging.getLogger(__name__)

SERVICE_TYPE_DISPLAY = {
    'localMove': 'Local Move',
    'internationalMove': 'International Move',
    'carExport': 'Car Import and Export',
    'storageServices': 'Storage Services',
    'logistics': 'Logistics',
}

def send_enquiry_emails(enquiry_data):
    """Send emails to the user and admin regarding the enquiry with working BCC."""
    service_type_display = SERVICE_TYPE_DISPLAY.get(enquiry_data["serviceType"], enquiry_data["serviceType"])
    
    from_email = settings.DEFAULT_FROM_EMAIL
    
    try:
        # 1. Send email to user
        user_subject = 'Thank You for Your Enquiry'
        user_message = f"""
        Hi {enquiry_data['fullName']},

        Thank you for your enquiry regarding our {service_type_display} services. 
        We have received your message and will get back to you soon.

        Here's a summary of your enquiry:
        - Service: {service_type_display}
        - Message: {enquiry_data.get('message', 'N/A')}

        Best regards,
        Almas Movers International
        Website: www.almasintl.com
        """
        
        # Admin email
        admin_subject = f'New Enquiry: {service_type_display} from {enquiry_data["fullName"]}'
        admin_message = f"""
        New enquiry received:

        Name: {enquiry_data["fullName"]}
        Phone: {enquiry_data["phoneNumber"]}
        Email: {enquiry_data["email"]}
        Service Type: {service_type_display}
        Message: {enquiry_data.get("message", "N/A")}
        Referer URL: {enquiry_data.get("refererUrl", "N/A")}
        Submitted URL: {enquiry_data.get("submittedUrl", "N/A")}
        """  
        
        send_mail(
            subject=user_subject,
            message=user_message,
            from_email=from_email,
            recipient_list=[enquiry_data['email']],
            fail_silently=False,
        )
        logger.info(f"User enquiry email sent to {enquiry_data['email']}")
        
        bcc_recipients = []
        if hasattr(settings, 'BCC_CONTACT_EMAILS'):
            if isinstance(settings.BCC_CONTACT_EMAILS, str):
                bcc_recipients = [email.strip() for email in settings.BCC_CONTACT_EMAILS.split(',') if email.strip()]
            elif isinstance(settings.BCC_CONTACT_EMAILS, (list, tuple)):
                bcc_recipients = list(settings.BCC_CONTACT_EMAILS)
        
        email = EmailMultiAlternatives(
            subject=admin_subject,
            body=admin_message,
            from_email=from_email,
            to=[settings.CONTACT_EMAIL],  
            bcc=bcc_recipients,  
            reply_to=[enquiry_data['email']],
        )
        
        html_content = f"""
        <html>
            <body>
                <h2>New enquiry received:</h2>
                <p><strong>Name:</strong> {enquiry_data["fullName"]}</p>
                <p><strong>Phone:</strong> {enquiry_data["phoneNumber"]}</p>
                <p><strong>Email:</strong> {enquiry_data["email"]}</p>
                <p><strong>Service Type:</strong> {service_type_display}</p>
                <p><strong>Message:</strong> {enquiry_data.get("message", "N/A")}</p>
                <p><strong>Referer URL:</strong> {enquiry_data.get("refererUrl", "N/A")}</p>
                <p><strong>Submitted URL:</strong> {enquiry_data.get("submittedUrl", "N/A")}</p>
            </body>
        </html>
        """  
        email.attach_alternative(html_content, "text/html")
        
        email.send(fail_silently=False)
        logger.info(f"Admin email sent to {settings.CONTACT_EMAIL} with BCC to {bcc_recipients}")
        
    except Exception as e:
        logger.error(f"Failed to send enquiry emails: {str(e)}", exc_info=True)
        raise

class EnquiryListCreate(generics.ListCreateAPIView):
    queryset = Enquiry.objects.all()
    serializer_class = EnquirySerializer

    def get_permissions(self):
        """
        Apply IsAdmin permission for GET (listing) requests,
        AllowAny for POST (creation) requests.
        """
        if self.request.method == 'GET':
            return [IsAdmin()]
        return [AllowAny()]

    def get_queryset(self):
        queryset = super().get_queryset()
        params = self.request.query_params
        
        # Date filtering
        start_date = params.get('start_date')
        end_date = params.get('end_date')
        if start_date and end_date:
            try:
                queryset = queryset.filter(created_at__date__range=[start_date, end_date])
            except ValueError as e:
                logger.error(f"Invalid date format for filtering enquiries: {str(e)}")
                return queryset.none()
        
        # Search functionality
        search_query = params.get('search')
        if search_query:
            queryset = queryset.filter(
                models.Q(fullName__icontains=search_query) |
                models.Q(email__icontains=search_query) |
                models.Q(phoneNumber__icontains=search_query) |
                models.Q(serviceType__icontains=search_query) |
                models.Q(message__icontains=search_query)
            )
        
        return queryset.order_by('-created_at')

    def create(self, request, *args, **kwargs):
        # Validate reCAPTCHA
        recaptcha_token = request.data.get('recaptchaToken')
        if not recaptcha_token:
            logger.warning("Missing reCAPTCHA token in enquiry submission")
            return Response(
                {'error': 'reCAPTCHA token is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            # Verify reCAPTCHA with timeout
            recaptcha_response = requests.post(
                'https://www.google.com/recaptcha/api/siteverify',
                data={
                    'secret': settings.RECAPTCHA_SECRET_KEY,
                    'response': recaptcha_token,
                },
                timeout=10
            )
            recaptcha_response.raise_for_status()
            recaptcha_data = recaptcha_response.json()
            
            if not recaptcha_data.get('success') or recaptcha_data.get('score', 0) < 0.5:
                logger.warning(f"reCAPTCHA verification failed: {recaptcha_data}")
                return Response(
                    {'error': 'reCAPTCHA verification failed. Please refresh the page.'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except requests.RequestException as e:
            logger.error(f"reCAPTCHA verification error: {str(e)}")
            return Response(
                {'error': 'Failed to verify reCAPTCHA. Please refresh the page.'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )
        
        # Validate and save enquiry
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        try:
            self.perform_create(serializer)
            enquiry_data = serializer.validated_data
            
            # Send emails
            send_enquiry_emails(enquiry_data)
            
            headers = self.get_success_headers(serializer.data)
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
                headers=headers
            )
            
        except Exception as e:
            logger.error(f"Failed to process enquiry: {str(e)}", exc_info=True)
            return Response(
                {'error': 'An error occurred while processing your enquiry. Please try again later.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class EnquiryDelete(generics.DestroyAPIView):
    queryset = Enquiry.objects.all()
    serializer_class = EnquirySerializer
    permission_classes = [IsAdmin]  

    def perform_destroy(self, instance):
        try:
            instance.delete()
            logger.info(f"Deleted enquiry ID: {instance.id}")
        except Exception as e:
            logger.error(f"Failed to delete enquiry ID: {instance.id}: {str(e)}")
            raise

class EnquiryDeleteAll(generics.GenericAPIView):
    permission_classes = [IsAdmin]  

    def delete(self, request, *args, **kwargs):
        try:
            count, _ = Enquiry.objects.all().delete()
            logger.info(f"Deleted all enquiries: {count} records removed")
            return Response(
                {'message': f'Successfully deleted {count} enquiries'},
                status=status.HTTP_204_NO_CONTENT
            )
        except Exception as e:
            logger.error(f"Failed to delete all enquiries: {str(e)}")
            return Response(
                {'error': 'Failed to delete enquiries'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in ['admin', 'superadmin']