import os
import shutil
from PIL import Image

src_logo = r'C:\Users\Dell\.gemini\antigravity\brain\773cddcc-10b6-4eef-a9a0-f4d0bfc9d7d0\.user_uploaded\media__1787075509804.jpg'

target_frontend = r'C:\Users\Dell\.gemini\antigravity\scratch\prayoga_jewellery\frontend\public\images\prayoga_logo.jpg'
target_frontend_png = r'C:\Users\Dell\.gemini\antigravity\scratch\prayoga_jewellery\frontend\public\images\prayoga_logo.png'
target_backend_static = r'C:\Users\Dell\.gemini\antigravity\scratch\prayoga_jewellery\backend\static\images\prayoga_logo.jpg'
target_backend_media = r'C:\Users\Dell\.gemini\antigravity\scratch\prayoga_jewellery\backend\media\prayoga_logo.jpg'

os.makedirs(os.path.dirname(target_frontend), exist_ok=True)
os.makedirs(os.path.dirname(target_backend_static), exist_ok=True)
os.makedirs(os.path.dirname(target_backend_media), exist_ok=True)

img = Image.open(src_logo)
print(f"Loaded Logo size: {img.size}")

# Save crisp copy
img.save(target_frontend, quality=98)
img.save(target_frontend_png)
img.save(target_backend_static, quality=98)
img.save(target_backend_media, quality=98)

print("Prayoga Official Logo successfully copied to all directories!")
