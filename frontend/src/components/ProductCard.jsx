import React from 'react';
import { Heart, Eye, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product, onQuickView, onShowToast }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    if (onShowToast) onShowToast(`Added "${product.name}" to cart!`);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
    if (onShowToast) {
      onShowToast(isWishlisted ? `Removed from wishlist` : `Added "${product.name}" to wishlist!`);
    }
  };

  const formattedPrice = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(product.price);
  const formattedDiscountPrice = product.discount_price 
    ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(product.discount_price)
    : null;

  return (
    <div 
      className="glass-card"
      onClick={() => onQuickView && onQuickView(product)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = '0 12px 30px rgba(212,175,55,0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Product Badges */}
      <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {product.is_bestseller && (
          <span className="badge-gold">Bestseller</span>
        )}
        {product.discount_price && (
          <span style={{ background: '#E11D48', color: '#FFF', padding: '2px 8px', borderRadius: '12px', fontSize: '0.65rem', fontWeight: 700 }}>
            Special Price
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          zIndex: 10,
          background: 'rgba(10, 15, 29, 0.7)',
          backdropFilter: 'blur(8px)',
          border: '1px solid var(--border-gold)',
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s'
        }}
      >
        <Heart size={18} color={isWishlisted ? '#E11D48' : '#FAF8F5'} fill={isWishlisted ? '#E11D48' : 'none'} />
      </button>

      {/* Image Container with Zoom effect */}
      <div style={{ position: 'relative', width: '100%', paddingTop: '100%', overflow: 'hidden', background: '#0F172A' }}>
        <img 
          src={product.image_url} 
          alt={product.name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
        />
        
        {/* Quick View overlay */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 5,
          opacity: 0.9
        }}>
          <span style={{
            background: 'rgba(10, 15, 29, 0.85)',
            border: '1px solid var(--border-gold)',
            color: '#FAF8F5',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backdropFilter: 'blur(4px)'
          }}>
            <Eye size={14} color="#D4AF37" /> Quick View
          </span>
        </div>
      </div>

      {/* Info Container */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ fontSize: '0.75rem', color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: '6px' }}>
          Prayoga Jewels
        </div>

        <h3 style={{ fontSize: '1.1rem', color: '#FAF8F5', lineHeight: '1.4', marginBottom: '8px', flexGrow: 1 }}>
          {product.name}
        </h3>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px', fontSize: '0.8rem', color: '#94A3B8' }}>
          <Star size={14} color="#D4AF37" fill="#D4AF37" />
          <span style={{ fontWeight: 600, color: '#FAF8F5' }}>{product.rating}</span>
          <span>({product.review_count})</span>
        </div>

        {/* Pricing & Add to Cart */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
          <div>
            {formattedDiscountPrice ? (
              <div>
                <span style={{ fontSize: '1.15rem', fontWeight: 700, color: '#F7E7A1' }}>{formattedDiscountPrice}</span>
                <span style={{ fontSize: '0.8rem', color: '#64748B', textDecoration: 'line-through', marginLeft: '6px' }}>{formattedPrice}</span>
              </div>
            ) : (
              <span style={{ fontSize: '1.15rem', fontWeight: 700, color: '#F7E7A1' }}>{formattedPrice}</span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="btn-gold"
            style={{ padding: '8px 14px', fontSize: '0.75rem' }}
          >
            <ShoppingBag size={14} /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
