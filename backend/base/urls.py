from django.urls import path
from  base.views import *

urlpatterns = [
    path('auth/login/',MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('auth/register/', register, name='register'),
    path('image-links/create/', create_image_link, name='create_image_link'),
    path('image-links/<int:pk>/', edit_image_link, name='edit_image_link'),
    path('image-links/details/<int:pk>/', get_image_link_by_id, name='get_image_link_by_id'),
    path('user/image-links/', get_user_image_links, name='get_user_image_links'),
    path('delete/imagelink/<int:pk>/', delete_imagelink, name='delete image link')
]
