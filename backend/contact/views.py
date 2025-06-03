from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Enquiry
from .serializers import EnquirySerializer
import requests
from django.conf import settings
from django.core.mail import send_mail
import logging

logger = logging.getLogger(__name__)

SERVICE_TYPE_DISPLAY = {
    'localMove': 'Local Move',
    'internationalMove': 'International Move',
    'carExport': 'Car Import and Export',
    'storageServices': 'Storage Services',
    'logistics': 'Logistics',
}

def send_enquiry_emails(enquiry_data):
    """Send emails to the user and admin regarding the enquiry."""
    service_type_display = SERVICE_TYPE_DISPLAY.get(enquiry_data["serviceType"], enquiry_data["serviceType"])

    try:
        user_subject = 'Thank You for Your Enquiry'
        user_message = f"""
        Hi {enquiry_data['fullName']},

        Thank you for your enquiry. We have received your message and will get back to you soon.

        Best regards,
        Almas Movers International\n"
        www.almasintl.com"
        """
        send_mail(
            subject=user_subject,
            message=user_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[enquiry_data['email']],
            fail_silently=False,
        )
        logger.info("User enquiry email sent successfully to %s", enquiry_data['email'])

        bcc_recipients = getattr(settings, 'BCC_CONTACT_EMAILS', '').split(',') if hasattr(settings, 'BCC_CONTACT_EMAILS') else []
        admin_subject = f'New Enquiry from {enquiry_data["fullName"]}'
        admin_message = f"""
        New enquiry received:

        Name: {enquiry_data["fullName"]}
        Phone: {enquiry_data["phoneNumber"]}
        Email: {enquiry_data["email"]}
        Service Type: {service_type_display}
        Message: {enquiry_data["message"]}
        Referer URL: {enquiry_data["refererUrl"]}
        Submitted URL: {enquiry_data["submittedUrl"]}
        """
        send_mail(
            subject=admin_subject,
            message=admin_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.CONTACT_EMAIL],
            bcc=bcc_recipients,
            fail_silently=False,
        )
        logger.info("Admin enquiry email sent successfully to %s", settings.CONTACT_EMAIL)
    except Exception as e:
        logger.error("Failed to send enquiry emails: %s", str(e))

class EnquiryListCreate(generics.ListCreateAPIView):
    queryset = Enquiry.objects.all()
    serializer_class = EnquirySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = super().get_queryset()
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        search_query = self.request.query_params.get('search')

        if start_date and end_date:
            try:
                queryset = queryset.filter(created_at__date__range=[start_date, end_date])
            except ValueError:
                logger.error("Invalid date format for filtering enquiries.")
                return queryset.none()

        if search_query:
            queryset = queryset.filter(
                models.Q(fullName__icontains=search_query) |
                models.Q(email__icontains=search_query) |
                models.Q(serviceType__icontains=search_query)
            )

        return queryset

    def create(self, request, *args, **kwargs):
        recaptcha_token = request.data.get('recaptchaToken')
        if not recaptcha_token:
            logger.warning("Missing reCAPTCHA token in enquiry submission.")
            return Response(
                {'error': 'reCAPTCHA token is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            recaptcha_response = requests.post(
                'https://www.google.com/recaptcha/api/siteverify',
                data={
                    'secret': settings.RECAPTCHA_SECRET_KEY,
                    'response': recaptcha_token,
                },
                timeout=5
            )
            recaptcha_response.raise_for_status()
            recaptcha_data = recaptcha_response.json()

            if not recaptcha_data.get('success') or recaptcha_data.get('score', 0) < 0.5:
                logger.warning("reCAPTCHA verification failed: %s", recaptcha_data)
                return Response(
                    {'error': 'reCAPTCHA verification failed'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except requests.RequestException as e:
            logger.error("reCAPTCHA verification error: %s", str(e))
            return Response(
                {'error': 'Failed to verify reCAPTCHA. Please try again.'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        send_enquiry_emails(serializer.validated_data)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class EnquiryDelete(generics.DestroyAPIView):
    queryset = Enquiry.objects.all()
    serializer_class = EnquirySerializer
    permission_classes = [AllowAny]

class EnquiryDeleteAll(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def delete(self, request, *args, **kwargs):
        count, _ = Enquiry.objects.all().delete()
        logger.info("Deleted %d enquiries", count)
        return Response(status=status.HTTP_204_NO_CONTENT)
