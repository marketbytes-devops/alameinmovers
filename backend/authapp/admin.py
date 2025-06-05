from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'first_name', 'last_name', 'role', 'is_active', 'is_staff', 'date_joined')
    
    list_filter = ('role', 'is_active', 'is_staff')
    
    search_fields = ('email', 'first_name', 'last_name')
    
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
    
    ordering = ('email',)
    
    readonly_fields = ('date_joined', 'otp', 'otp_created_at')
    
    filter_horizontal = ('groups', 'user_permissions',)

admin.site.register(CustomUser, CustomUserAdmin)