import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';

const Wishlist = ({ setActivePage, onShowToast }) => {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="container" style={{ padding: '100px 24px', textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(225, 29, 72, 0.1)', border: '1px solid rgba(225, 29, 72, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <Heart size={36} color="#E11D48" />
        </div>
        <h2 style={{ fontSize: '2rem', color: '#FAF8F5', marginBottom: '12px' }}>Your Wishlist is Empty</h2>
        <p style={{ color: '#94A3B8', fontSize: '0.95rem', marginBottom: '32px' }}>
          Save your favorite solitaires and heritage Kundan designs here.
        </p>
        <button onClick={() => setActivePage('catalog')} className="btn-gold">
          Explore Catalog <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ fontSize: '0.8rem', color: '#E11D48', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '8px' }}>
          SAVED CREATIONS
        </div>
        <h1 style={{ fontSize: '2.5rem', color: '#FAF8F5' }}>
          Your Saved Jewellery Wishlist ({wishlist.length})
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '28px' }}>
        {wishlist.map(product => (
          <ProductCard 
            key={product.id}
            product={product}
            onShowToast={onShowToast}
          />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
