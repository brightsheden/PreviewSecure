from django.contrib import admin
from .models import ImageLink, User

@admin.register(ImageLink)
class ImageLinkAdmin(admin.ModelAdmin):
    list_display = ('user', 'imagefile', 'minutes',  'created_at')

    search_fields = ('user__username', 'imagefile')


admin.site.register(User)