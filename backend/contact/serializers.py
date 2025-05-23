from rest_framework import serializers
from .models import Enquiry


class EnquirySerializer(serializers.ModelSerializer):
    """
    Serializer for the Enquiry model.
    Validates and serializes enquiry form data.
    """
    class Meta:
        model = Enquiry
        fields = '__all__'

    def validate_serviceType(self, value):
        """
        Validate that serviceType is one of the allowed values.
        """
        allowed_services = ['moving', 'logistics', 'relocation', 'other']
        if value not in allowed_services:
            raise serializers.ValidationError("Invalid service type.")
        return value

    def validate_email(self, value):
        """
        Ensure email is in a valid format.
        """
        if '@' not in value or '.' not in value:
            raise serializers.ValidationError("Invalid email format.")
        return value