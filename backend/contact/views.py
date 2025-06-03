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

class EnquiryListCreate(generics.ListCreateAPIView):
    """
    API view to list all enquiries or create a new enquiry.
    Supports filtering by date range and searching by name, email, or service type.
    """
    queryset = Enquiry.objects.all()
    serializer_class = EnquirySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        """
        Filter enquiries by date range and search query if provided.
        """
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
        
        service_type_display = SERVICE_TYPE_DISPLAY.get(
            serializer.validated_data["serviceType"],
            serializer.validated_data["serviceType"]
        )

        try:
            bcc_recipients = getattr(settings, 'BCC_CONTACT_EMAILS', []).split(',') if hasattr(settings, 'BCC_CONTACT_EMAILS') else []
            send_mail(
                subject=f'New Enquiry from {serializer.validated_data["fullName"]}',
                message=f"""
                New enquiry received:
                Name: {serializer.validated_data["fullName"]}
                Phone: {serializer.validated_data["phoneNumber"]}
                Email: {serializer.validated_data["email"]}
                Service Type: {service_type_display}
                Message: {serializer.validated_data["message"]}
                Referer URL: {serializer.validated_data["refererUrl"]}
                Submitted URL: {serializer.validated_data["submittedUrl"]}
                """,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.CONTACT_EMAIL],
                bcc=bcc_recipients, 
                fail_silently=True,
            )
            logger.info("Enquiry email sent successfully for %s", serializer.validated_data["fullName"])
        except Exception as e:
            logger.error("Failed to send enquiry email: %s", str(e))

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class EnquiryDelete(generics.DestroyAPIView):
    """
    API view to delete a single enquiry by ID.
    """
    queryset = Enquiry.objects.all()
    serializer_class = EnquirySerializer
    permission_classes = [AllowAny]


class EnquiryDeleteAll(generics.GenericAPIView):
    """
    API view to delete all enquiries.
    """
    permission_classes = [AllowAny]

    def delete(self, request, *args, **kwargs):
        """
        Delete all enquiries in the database.
        """
        count, _ = Enquiry.objects.all().delete()
        logger.info("Deleted %d enquiries", count)
        return Response(status=status.HTTP_204_NO_CONTENT)
    