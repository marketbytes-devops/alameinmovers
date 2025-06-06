from rest_framework import serializers
from .models import Enquiry

class EnquirySerializer(serializers.ModelSerializer):
    """
    Serializer for the Enquiry model.
    Validates and serializes enquiry form data.
    """
    service_type_display = serializers.SerializerMethodField()

    class Meta:
        model = Enquiry
        fields = '__all__'
        fields += ('service_type_display',)

    def get_service_type_display(self, obj):
        """
        Return the human-readable service type display name.
        """
        SERVICE_TYPE_DISPLAY = {
            'localMove': 'Local Move',
            'internationalMove': 'International Move',
            'carExport': 'Car Import and Export',
            'storageServices': 'Storage Services',
            'logistics': 'Logistics',
        }
        return SERVICE_TYPE_DISPLAY.get(obj.serviceType, obj.serviceType)

    def validate_serviceType(self, value):
        """
        Validate that serviceType is one of the allowed values.
        """
        allowed_services = ['localMove', 'internationalMove', 'carExport', 'storageServices', 'logistics']
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