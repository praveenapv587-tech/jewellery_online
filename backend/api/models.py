from django.db import models
import uuid

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    image_url = models.URLField(blank=True, max_length=500)
    icon_name = models.CharField(max_length=50, default='Sparkles')

    class Meta:
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name


class Product(models.Model):
    METAL_CHOICES = [
        ('Yellow Gold', 'Yellow Gold'),
        ('Rose Gold', 'Rose Gold'),
        ('White Gold', 'White Gold'),
        ('Platinum', 'Platinum'),
        ('Silver', 'Silver'),
    ]

    KARAT_CHOICES = [
        ('18K', '18 Karat'),
        ('22K', '22 Karat'),
        ('24K', '24 Karat'),
        ('950 Platinum', '950 Platinum'),
        ('925 Silver', '925 Silver'),
    ]

    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    metal_type = models.CharField(max_length=50, choices=METAL_CHOICES, default='Yellow Gold')
    karat = models.CharField(max_length=20, choices=KARAT_CHOICES, default='22K')
    purity = models.CharField(max_length=100, default='BIS Hallmarked 916')
    weight_grams = models.DecimalField(max_digits=6, decimal_places=2, default=5.50)
    gemstone = models.CharField(max_length=100, default='Natural Diamond (VVS-EF)')
    description = models.TextField()
    image_url = models.URLField(max_length=500)
    additional_images = models.JSONField(default=list, blank=True)
    stock = models.IntegerField(default=10)
    is_featured = models.BooleanField(default=False)
    is_bestseller = models.BooleanField(default=False)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=4.9)
    review_count = models.IntegerField(default=24)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.karat} {self.metal_type})"


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    reviewer_name = models.CharField(max_length=100)
    rating = models.IntegerField(default=5)
    title = models.CharField(max_length=150)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.reviewer_name} - {self.product.name} ({self.rating}★)"


class CartItem(models.Model):
    session_id = models.CharField(max_length=100)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    metal_option = models.CharField(max_length=50, default='22K Yellow Gold')
    ring_size = models.CharField(max_length=20, blank=True, null=True, default='14 (US 7)')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.quantity}x {self.product.name} (Session: {self.session_id})"


class Order(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('CONFIRMED', 'Confirmed'),
        ('SHIPPED', 'Shipped'),
        ('DELIVERED', 'Delivered'),
        ('CANCELLED', 'Cancelled'),
    ]

    order_number = models.CharField(max_length=50, unique=True, default=uuid.uuid4)
    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pincode = models.CharField(max_length=20)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2)
    payment_method = models.CharField(max_length=50, default='UPI / NetBanking')
    payment_status = models.CharField(max_length=50, default='PAID')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='CONFIRMED')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.order_number} - {self.full_name}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    product_name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)
    metal_option = models.CharField(max_length=50, default='Standard')

    def __str__(self):
        return f"{self.quantity}x {self.product_name}"


class BespokeInquiry(models.Model):
    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    jewelry_type = models.CharField(max_length=100)
    metal_preference = models.CharField(max_length=100)
    budget_range = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Inquiry from {self.full_name} ({self.jewelry_type})"
