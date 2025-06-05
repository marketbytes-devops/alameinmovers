from django.db import models

class Enquiry(models.Model):
    """
    Model to store enquiry form submissions.
    """
    fullName = models.CharField(max_length=100)
    phoneNumber = models.CharField(max_length=20)
    email = models.EmailField()
    serviceType = models.CharField(max_length=50)
    message = models.TextField()
    recaptchaToken = models.TextField()
    refererUrl = models.URLField()
    submittedUrl = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=['created_at']),
        ]

    def __str__(self):
        return self.fullName