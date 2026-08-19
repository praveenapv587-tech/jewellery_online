import os
from PIL import Image

src_img = r'C:\Users\Dell\.gemini\antigravity\brain\773cddcc-10b6-4eef-a9a0-f4d0bfc9d7d0\.user_uploaded\media__1787075988572.jpg'

target_frontend = r'C:\Users\Dell\.gemini\antigravity\scratch\prayoga_jewellery\frontend\public\images\prayoga_brand_card.jpg'
target_backend_static = r'C:\Users\Dell\.gemini\antigravity\scratch\prayoga_jewellery\backend\static\images\prayoga_brand_card.jpg'
target_backend_media = r'C:\Users\Dell\.gemini\antigravity\scratch\prayoga_jewellery\backend\media\prayoga_brand_card.jpg'

os.makedirs(os.path.dirname(target_frontend), exist_ok=True)
os.makedirs(os.path.dirname(target_backend_static), exist_ok=True)
os.makedirs(os.path.dirname(target_backend_media), exist_ok=True)

img = Image.open(src_img)
print(f"Loaded brand card size: {img.size}")

img.save(target_frontend, quality=98)
img.save(target_backend_static, quality=98)
img.save(target_backend_media, quality=98)

print("Prayoga Brand Card successfully saved to all target directories!")
