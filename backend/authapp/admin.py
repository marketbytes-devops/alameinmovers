from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('email', 'role', 'first_name', 'last_name', 'is_active', 'is_staff', 'date_joined')
    list_filter = ('role', 'is_active', 'is_staff')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)
    readonly_fields = ('date_joined', 'otp', 'otp_created_at')
    filter_horizontal = ('groups', 'user_permissions')
    
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'role', 'groups', 'user_permissions')}),
        ('Important Dates', {'fields': ('date_joined',)}),
        ('OTP', {'fields': ('otp', 'otp_created_at')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'role', 'first_name', 'last_name', 'is_active', 'is_staff'),
        }),
    )

    def get_readonly_fields(self, request, obj=None):
        """Make OTP fields readonly to prevent manual changes."""
        readonly = ['date_joined', 'otp', 'otp_created_at']
        if obj and not request.user.is_superuser:
            readonly.append('role') 
        return readonly

admin.site.register(CustomUser, CustomUserAdmin)