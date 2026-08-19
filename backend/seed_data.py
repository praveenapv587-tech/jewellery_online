import os
import sys
import django

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'prayoga_backend.settings')
django.setup()

from django.core.management import call_command
from api.models import Category, Product, Review

def seed():
    print("Executing Django migrations...")
    call_command('makemigrations', 'api')
    call_command('migrate')

    print("Updating Prayoga Jewels database with clean product names...")

    # Clear existing data
    Review.objects.all().delete()
    Product.objects.all().delete()
    Category.objects.all().delete()

    # Create Categories
    cat_chokers = Category.objects.create(
        name="Choker Sets",
        slug="choker-sets",
        description="Royal antique gold finish chokers with pearls & ruby stones.",
        image_url="/images/prayoga_ruby_choker.jpg",
        icon_name="Crown"
    )

    cat_pendants = Category.objects.create(
        name="Pendant Necklaces",
        slug="pendant-necklaces",
        description="Temple gold pendants with pearl chains & matching studs.",
        image_url="/images/prayoga_temple_pendant.jpg",
        icon_name="Gem"
    )

    cat_mala = Category.objects.create(
        name="Long Pearl Malas",
        slug="long-pearl-malas",
        description="Elegant multi-layer pearl strand mala necklaces.",
        image_url="/images/prayoga_pearl_mala.jpg",
        icon_name="Sparkles"
    )

    cat_meenakari = Category.objects.create(
        name="Meenakari Collections",
        slug="meenakari-collections",
        description="Handcrafted floral & lotus enamel meenakari jewellery.",
        image_url="/images/prayoga_pink_lotus.jpg",
        icon_name="Flower"
    )

    # Real Products from Prayoga Jewels with prices between Rs. 100 - Rs. 200
    products_data = [
        {
            "name": "Prayoga Choker Set",
            "slug": "prayoga-choker-set",
            "category": cat_chokers,
            "price": 199.00,
            "discount_price": 169.00,
            
        
            
            "image_url": "/images/prayoga_ruby_choker.jpg",
            "additional_images": ["/images/prayoga_ruby_choker.jpg"],
            "stock": 25,
            "is_featured": True,
            "is_bestseller": True,
            "rating": 4.95,
            "review_count": 86
        },
        {
            "name": "Prayoga Temple Pendant Set",
            "slug": "prayoga-temple-pendant-set",
            "category": cat_pendants,
            "price": 179.00,
            "discount_price": 149.00,
            
            "image_url": "/images/prayoga_temple_pendant.jpg",
            "additional_images": ["/images/prayoga_temple_pendant.jpg"],
            "stock": 30,
            "is_featured": True,
            "is_bestseller": True,
            "rating": 4.90,
            "review_count": 64
        },
        {
            "name": "Prayoga Long Pearl Mala",
            "slug": "prayoga-long-pearl-mala",
            "category": cat_mala,
            "price": 189.00,
            "discount_price": 159.00,
            
            "image_url": "/images/prayoga_pearl_mala.jpg",
            "additional_images": ["/images/prayoga_pearl_mala.jpg"],
            "stock": 20,
            "is_featured": True,
            "is_bestseller": False,
            "rating": 4.88,
            "review_count": 42
        },
        {
            "name": "Prayoga Ruby Floral Choker",
            "slug": "prayoga-ruby-floral-choker",
            "category": cat_chokers,
            "price": 159.00,
            "discount_price": 129.00,
            
            "image_url": "/images/prayoga_ruby_floral.jpg",
            "additional_images": ["/images/prayoga_ruby_floral.jpg"],
            "stock": 18,
            "is_featured": False,
            "is_bestseller": True,
            "rating": 4.92,
            "review_count": 53
        },
        {
            "name": "Prayoga Pink Lotus Pendant Set",
            "slug": "prayoga-pink-lotus-pendant-set",
            "category": cat_meenakari,
            "price": 169.00,
            "discount_price": 139.00,
        
            "image_url": "/images/prayoga_pink_lotus.jpg",
            "additional_images": ["/images/prayoga_pink_lotus.jpg"],
            "stock": 35,
            "is_featured": True,
            "is_bestseller": True,
            "rating": 5.0,
            "review_count": 91
        }
    ]

    for item in products_data:
        p = Product.objects.create(**item)
        Review.objects.create(
            product=p,
            reviewer_name="Ananya Sharma",
            rating=5,
            title="Stunning quality at an affordable price!",
            comment="The finish is so elegant and looks exactly like real 22K gold. Got so many compliments at the function!"
        )
        Review.objects.create(
            product=p,
            reviewer_name="Priya Varma",
            rating=5,
            title="Beautiful Prayoga Jewels creation",
            comment="Loved the packaging and fast delivery. Very lightweight and comfortable to wear."
        )

    print(f"Successfully seeded Prayoga database with {Category.objects.count()} Categories and {Product.objects.count()} Products!")

if __name__ == '__main__':
    seed()
