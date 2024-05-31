from PIL import Image
import os
from django.conf import settings

def add_watermark(image_path, watermark_path, position='center'):
    original = Image.open(image_path).convert("RGBA")
    watermark = Image.open(watermark_path).convert("RGBA")

    width, height = original.size
    watermark_width, watermark_height = watermark.size

    # Calculate the position
    if position == 'center':
        x = (width - watermark_width) // 2
        y = (height - watermark_height) // 2
    else:
        x, y = position

    # Create a transparent layer the size of the original image
    transparent = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    transparent.paste(original, (0, 0))
    transparent.paste(watermark, (x, y), mask=watermark)

    watermarked_path = os.path.join(settings.MEDIA_ROOT,'', os.path.basename(image_path))
    transparent = transparent.convert("RGB")  # Convert back to RGB
    transparent.save(watermarked_path)

    return watermarked_path
