from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Job, StatusUpdate
from .serializers import JobSerializer, StatusUpdateSerializer
from django.core.mail import send_mail
from django.conf import settings

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = super().get_queryset()
        tracking_id = self.request.query_params.get('tracking_id', None)
        if tracking_id:
            queryset = queryset.filter(tracking_id=tracking_id)
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        job = Job.objects.get(id=serializer.data['id'])
        customer = job.customer
        tracking_id = job.tracking_id
        tracking_link = job.get_tracking_link()

        subject = 'Track Your Order'
        message = (
            f"Dear {customer.name},\n\n"
            f"A new job has been created for you.\n"
            f"Tracking ID: {tracking_id}\n"
            f"Track your order here: {tracking_link}\n\n"
            f"Thank you for choosing Almaz Movers International!"
        )
        recipient_email = customer.email

        try:
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [recipient_email],
                fail_silently=False,
            )
        except Exception as e:
            print(f"Failed to send email: {e}")

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class StatusUpdateViewSet(viewsets.ModelViewSet):
    queryset = StatusUpdate.objects.all()
    serializer_class = StatusUpdateSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = super().get_queryset()
        job_id = self.request.query_params.get('job_id', None)
        if job_id is not None:
            queryset = queryset.filter(job_id=job_id)
        return queryset