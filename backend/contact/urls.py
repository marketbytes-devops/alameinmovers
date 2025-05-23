from django.urls import path
from .views import EnquiryListCreate, EnquiryDelete, EnquiryDeleteAll

urlpatterns = [
    path('enquiries/', EnquiryListCreate.as_view(), name='enquiry-list-create'),
    path('enquiries/<int:pk>/', EnquiryDelete.as_view(), name='enquiry-delete'),
    path('enquiries/delete-all/', EnquiryDeleteAll.as_view(), name='enquiry-delete-all'),
]