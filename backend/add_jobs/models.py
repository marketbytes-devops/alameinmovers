from django.db import models
import random
import string

class Job(models.Model):
    CARGO_TYPE_CHOICES = [
        ('air', 'Air Cargo'),
        ('door_to_door', 'Door To Door Cargo'),
        ('land', 'Land Cargo'),
        ('sea', 'Sea Cargo'),
    ]

    cargo_type = models.CharField(max_length=20, choices=CARGO_TYPE_CHOICES)
    customer = models.ForeignKey('add_customers.AddCustomer', on_delete=models.CASCADE)
    receiver_name = models.CharField(max_length=255)
    contact_number = models.CharField(max_length=20)
    email = models.EmailField()
    recipient_address = models.TextField()
    recipient_country = models.CharField(max_length=100)
    commodity = models.CharField(max_length=255)
    number_of_packages = models.PositiveIntegerField()
    weight = models.FloatField()
    volume = models.FloatField()
    origin = models.CharField(max_length=255)
    destination = models.CharField(max_length=255)
    cargo_ref_number = models.CharField(max_length=100, unique=True)
    tracking_id = models.CharField(max_length=50, unique=True, blank=True)
    collection_date = models.DateField()
    time_of_departure = models.TimeField()
    time_of_arrival = models.TimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.tracking_id:
            while True:
                tracking_id = 'allm' + ''.join(random.choices(string.digits, k=6))
                if not Job.objects.filter(tracking_id=tracking_id).exists():
                    self.tracking_id = tracking_id
                    break
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.cargo_ref_number} - {self.tracking_id}"

class StatusUpdate(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='status_updates')
    status_content = models.TextField()
    status_date = models.DateField()
    status_time = models.TimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Status for {self.job.cargo_ref_number} at {self.status_date} {self.status_time}"