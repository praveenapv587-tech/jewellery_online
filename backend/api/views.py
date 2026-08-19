from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q

from .models import Category, Product, CartItem, Order, BespokeInquiry, Review
from .serializers import (
    CategorySerializer, ProductSerializer, CartItemSerializer,
    OrderSerializer, BespokeInquirySerializer, ReviewSerializer
)

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        queryset = Product.objects.all()
        
        # Category filter
        category_slug = self.request.query_params.get('category', None)
        if category_slug and category_slug != 'all':
            queryset = queryset.filter(category__slug=category_slug)
            
        # Metal filter
        metal = self.request.query_params.get('metal', None)
        if metal and metal != 'all':
            queryset = queryset.filter(metal_type__iexact=metal)
            
        # Featured filter
        featured = self.request.query_params.get('featured', None)
        if featured == 'true':
            queryset = queryset.filter(is_featured=True)
            
        # Bestseller filter
        bestseller = self.request.query_params.get('bestseller', None)
        if bestseller == 'true':
            queryset = queryset.filter(is_bestseller=True)

        # Min / Max Price
        min_price = self.request.query_params.get('min_price', None)
        max_price = self.request.query_params.get('max_price', None)
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)

        # Search Query
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | 
                Q(description__icontains=search) |
                Q(gemstone__icontains=search)
            )

        # Ordering
        ordering = self.request.query_params.get('ordering', None)
        if ordering == 'price_low_high':
            queryset = queryset.order_by('price')
        elif ordering == 'price_high_low':
            queryset = queryset.order_by('-price')
        elif ordering == 'rating':
            queryset = queryset.order_by('-rating')
        elif ordering == 'newest':
            queryset = queryset.order_by('-created_at')

        return queryset

    @action(detail=True, methods=['post'])
    def add_review(self, request, slug=None):
        product = self.get_object()
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(product=product)
            # Recalculate average rating
            reviews = product.reviews.all()
            avg_rating = sum([r.rating for r in reviews]) / len(reviews)
            product.rating = round(avg_rating, 2)
            product.review_count = len(reviews)
            product.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer

    def get_queryset(self):
        session_id = self.request.query_params.get('session_id', 'default_session')
        return CartItem.objects.filter(session_id=session_id)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('-created_at')
    serializer_class = OrderSerializer

    @action(detail=False, methods=['get'])
    def track(self, request):
        order_number = request.query_params.get('order_number')
        if not order_number:
            return Response({'error': 'order_number is required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            order = Order.objects.get(order_number=order_number)
            serializer = self.get_serializer(order)
            return Response(serializer.data)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)


class BespokeInquiryViewSet(viewsets.ModelViewSet):
    queryset = BespokeInquiry.objects.all().order_by('-created_at')
    serializer_class = BespokeInquirySerializer
