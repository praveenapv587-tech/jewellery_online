import React, { useState } from 'react';
import { X, Star, ShieldCheck, Heart, ShoppingBag, Truck, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const QuickViewModal = ({ product, onClose, onShowToast, onNavigateDetail }) => {
  if (!product) return null;

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedImage, setSelectedImage] = useState(product.image_url);
  const [quantity, setQuantity] = useState(1);

  const isWishlisted = isInWishlist(product.id);
  const images = [product.image_url, ...(product.additional_images || [])];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    if (onShowToast) onShowToast(`Added ${quantity}x "${product.name}" to cart!`);
    onClose();
  };

  const formattedPrice = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(
    product.discount_price || product.price
  );

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      background: 'rgba(5, 8, 16, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }} onClick={onClose}>
      <div 
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '900px',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          padding: '32px',
          background: '#0D1424',
          border: '1px solid var(--border-gold)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.8)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '20px', right: '20px', color: '#94A3B8', padding: '8px' }}
        >
          <X size={24} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          {/* Gallery */}
          <div>
            <div style={{ width: '100%', paddingTop: '100%', position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-subtle)', marginBottom: '16px' }}>
              <img 
                src={selectedImage} 
                alt={product.name} 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            {images.length > 1 && (
              <div style={{ display: 'flex', gap: '12px' }}>
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="Thumbnail"
                    onClick={() => setSelectedImage(img)}
                    style={{
                      width: '64px',
                      height: '64px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                      border: selectedImage === img ? '2px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                      cursor: 'pointer'
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <div style={{ fontSize: '0.8rem', color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 600, marginBottom: '8px' }}>
              PRAYOGA JEWELS COLLECTION • {product.purity}
            </div>

            <h2 style={{ fontSize: '1.8rem', color: '#FAF8F5', marginBottom: '12px', lineHeight: '1.2' }}>
              {product.name}
            </h2>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', color: '#D4AF37' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(product.rating) ? '#D4AF37' : 'none'} color="#D4AF37" />
                ))}
              </div>
              <span style={{ color: '#FAF8F5', fontWeight: 600 }}>{product.rating}</span>
              <span style={{ color: '#64748B' }}>({product.review_count} Customer Reviews)</span>
            </div>

            {/* Price */}
            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#F7E7A1', marginBottom: '20px' }}>
              {formattedPrice}
            </div>

            {/* Description */}
            <p style={{ fontSize: '0.9rem', color: '#CBD5E1', lineHeight: '1.6', marginBottom: '24px' }}>
              {product.description}
            </p>



            {/* Actions */}
            <div style={{ display: 'flex', gap: '14px' }}>
              <button 
                onClick={handleAddToCart}
                className="btn-gold" 
                style={{ flexGrow: 1, padding: '14px' }}
              >
                <ShoppingBag size={18} /> Add to Shopping Bag
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className="btn-outline-gold"
                style={{ padding: '14px' }}
              >
                <Heart size={18} color={isWishlisted ? '#E11D48' : '#D4AF37'} fill={isWishlisted ? '#E11D48' : 'none'} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
