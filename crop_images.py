import os
from PIL import Image

src_path = r'C:\Users\Dell\.gemini\antigravity\brain\773cddcc-10b6-4eef-a9a0-f4d0bfc9d7d0\.user_uploaded\media__1787064077690.jpg'

out_dir_frontend = r'C:\Users\Dell\.gemini\antigravity\scratch\prayoga_jewellery\frontend\public\images'
out_dir_backend_static = r'C:\Users\Dell\.gemini\antigravity\scratch\prayoga_jewellery\backend\static\images'
out_dir_backend_media = r'C:\Users\Dell\.gemini\antigravity\scratch\prayoga_jewellery\backend\media'

os.makedirs(out_dir_frontend, exist_ok=True)
os.makedirs(out_dir_backend_static, exist_ok=True)
os.makedirs(out_dir_backend_media, exist_ok=True)

img = Image.open(src_path)

# Precise grid boundaries measured from analysis:
# Top y = 49
# Bottom y = 456
# Row 1: 49 to 252 (height 203)
# Row 2: 253 to 456 (height 203)
# Width 462 -> 3 columns of 154 width each (0..154, 154..308, 308..462)

tiles_coords = [
    (0, 49, 154, 252),     # Row 1, Col 1: Prayoga Gold Choker with Ruby center
    (154, 49, 308, 252),   # Row 1, Col 2: Temple Pearl Pendant Set
    (308, 49, 462, 252),   # Row 1, Col 3: Long Pearl Mala with Emerald/Ruby Pendant
    (0, 253, 154, 456),    # Row 2, Col 1: Ruby Floral Pearl Choker Set
    (154, 253, 308, 456),  # Row 2, Col 2: Pink Meenakari Lotus Pendant Set
    (308, 253, 462, 456)   # Row 2, Col 3: Prayoga Jewels Logo Card
]

filenames = [
    "prayoga_ruby_choker.jpg",
    "prayoga_temple_pendant.jpg",
    "prayoga_pearl_mala.jpg",
    "prayoga_ruby_floral.jpg",
    "prayoga_pink_lotus.jpg",
    "prayoga_logo_card.jpg"
]

for i, (l, t, r, b) in enumerate(tiles_coords):
    cropped = img.crop((l, t, r, b))
    # Resize up to 600x600 using LANCZOS for sharp display
    resized = cropped.resize((600, 600), Image.Resampling.LANCZOS)
    
    fname = filenames[i]
    resized.save(os.path.join(out_dir_frontend, fname), quality=95)
    resized.save(os.path.join(out_dir_backend_static, fname), quality=95)
    resized.save(os.path.join(out_dir_backend_media, fname), quality=95)
    print(f"Cropped and saved {fname} (600x600)")

print("All Prayoga product images successfully cropped and saved in high quality!")
