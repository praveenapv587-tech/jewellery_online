from rest_framework import serializers
from .models import Category, Product, Review, CartItem, Order, OrderItem, BespokeInquiry

class CategorySerializer(serializers.ModelSerializer):
    product_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'image_url', 'icon_name', 'product_count']

    def get_product_count(self, obj):
        return obj.products.count()


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'reviewer_name', 'rating', 'title', 'comment', 'created_at']


class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'category', 'category_name', 'category_slug',
            'price', 'discount_price', 'metal_type', 'karat', 'purity',
            'weight_grams', 'gemstone', 'description', 'image_url',
            'additional_images', 'stock', 'is_featured', 'is_bestseller',
            'rating', 'review_count', 'reviews', 'created_at'
        ]


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), source='product', write_only=True
    )

    class Meta:
        model = CartItem
        fields = ['id', 'session_id', 'product', 'product_id', 'quantity', 'metal_option', 'ring_size', 'created_at']


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'product_name', 'price', 'quantity', 'metal_option']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    raw_items = serializers.JSONField(write_only=True, required=False)

    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'full_name', 'email', 'phone',
            'address', 'city', 'state', 'pincode', 'total_amount',
            'payment_method', 'payment_status', 'status', 'created_at',
            'items', 'raw_items'
        ]
        read_only_fields = ['order_number', 'status', 'created_at']

    def create(self, validated_data):
        raw_items = validated_data.pop('raw_items', [])
        order = Order.objects.create(**validated_data)
        
        for item in raw_items:
            OrderItem.objects.create(
                order=order,
                product_name=item.get('name', 'Jewellery Item'),
                price=item.get('price', 0),
                quantity=item.get('quantity', 1),
                metal_option=item.get('metal_option', '22K Gold')
            )
        return order


class BespokeInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = BespokeInquiry
        fields = ['id', 'full_name', 'email', 'phone', 'jewelry_type', 'metal_preference', 'budget_range', 'description', 'created_at']
