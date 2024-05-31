from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from datetime import timedelta
import os
from .utils.addwatermark import add_watermark
# Create your models here.


class User(AbstractUser):
    username = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    number = models.CharField(max_length=20, blank=True, null=True)
    image = models.ImageField(upload_to='profile_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email
    


class ImageLink(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    imagefile = models.ImageField()
    minutes = models.PositiveIntegerField()
    is_expired = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    is_watermark = models.BooleanField(default=False)
    watermark_image = models.ImageField(upload_to='watermarks/', blank=True, null=True)


    """    
        def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.is_watermark and self.watermark_image:
            image_path = self.imagefile.path
            watermark_image_path = self.watermark_image.path
            watermarked_image_path = add_watermark(image_path, watermark_image_path)
            self.imagefile.save(os.path.basename(watermarked_image_path), open(watermarked_image_path, 'rb'))

    """

    def __str__(self):
        return f"ImageLink for {self.user.username} - {self.imagefile.name}"
    
    def has_expired(self):
        expiration_time = self.created_at + timedelta(minutes=self.minutes)
        return timezone.now() >= expiration_time

    def check_and_expire(self):
        if self.has_expired():
            self.is_expired = True
            self.save()


"""
class ImageLink(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    imagefile = models.ImageField(upload_to='images/')
    minutes = models.PositiveIntegerField()
    is_expired = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    is_watermark = models.BooleanField(default=False)
    watermark_image = models.ImageField(upload_to='watermarks/', blank=True, null=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.is_watermark and self.watermark_image:
            image_path = self.imagefile.path
            watermark_image_path = self.watermark_image.path
            watermarked_image_path = add_watermark(image_path, watermark_image_path)
            self.imagefile.save(os.path.basename(watermarked_image_path), open(watermarked_image_path, 'rb'))

    def __str__(self):
        return f"ImageLink for {self.user.username} - {self.imagefile.name}"
"""