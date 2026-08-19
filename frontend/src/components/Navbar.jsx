import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, Gem } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Navbar = ({ activePage, setActivePage, onSearch }) => {
  const { totalCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchInput);
    setActivePage('catalog');
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, background: 'rgba(10, 15, 29, 0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border-gold)' }}>

      {/* Main Navbar */}
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
        {/* Brand Logo */}
        <div 
          onClick={() => setActivePage('home')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <img 
            src="/images/prayoga_logo.jpg" 
            alt="Prayoga Jewels"
            style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-gold)', boxShadow: '0 0 12px rgba(212,175,55,0.4)' }}
          />
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 700, letterSpacing: '3px', background: 'linear-gradient(135deg, #FFF0B8 0%, #D4AF37 50%, #A38020 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              PRAYOGA
            </div>
            <div style={{ fontSize: '0.6rem', letterSpacing: '4px', color: '#94A3B8', marginTop: '-4px', textTransform: 'uppercase' }}>
              JEWELS
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-gold)', borderRadius: '24px', padding: '6px 16px', width: '320px' }}>
          <Search size={16} color="#D4AF37" style={{ marginRight: '8px' }} />
          <input 
            type="text" 
            placeholder="Search solitaires, emeralds, rings..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: '#FFF', outline: 'none', width: '100%', fontSize: '0.85rem' }}
          />
        </form>

        {/* Navigation Links */}
        <nav className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '28px', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase' }}>
          <span 
            onClick={() => setActivePage('home')}
            style={{ cursor: 'pointer', color: activePage === 'home' ? 'var(--gold-primary)' : '#FAF8F5', transition: 'color 0.2s' }}
          >
            Home
          </span>
          <span 
            onClick={() => setActivePage('catalog')}
            style={{ cursor: 'pointer', color: activePage === 'catalog' ? 'var(--gold-primary)' : '#FAF8F5', transition: 'color 0.2s' }}
          >
            Collections
          </span>
          <span 
            onClick={() => setActivePage('bespoke')}
            style={{ cursor: 'pointer', color: activePage === 'bespoke' ? 'var(--gold-primary)' : '#FAF8F5', transition: 'color 0.2s' }}
          >
            Bespoke Atelier
          </span>
        </nav>

        {/* Actions (Wishlist & Cart) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <button 
            onClick={() => setActivePage('wishlist')}
            style={{ position: 'relative', color: '#FAF8F5', display: 'flex', alignItems: 'center' }}
            title="Wishlist"
          >
            <Heart size={22} color={wishlistCount > 0 ? '#E11D48' : '#FAF8F5'} fill={wishlistCount > 0 ? '#E11D48' : 'none'} />
            {wishlistCount > 0 && (
              <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#E11D48', color: '#FFF', fontSize: '0.65rem', fontWeight: 700, borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {wishlistCount}
              </span>
            )}
          </button>

          <button 
            onClick={() => setActivePage('cart')}
            style={{ position: 'relative', color: '#FAF8F5', display: 'flex', alignItems: 'center' }}
            title="Shopping Cart"
          >
            <ShoppingBag size={22} color="#D4AF37" />
            {totalCount > 0 && (
              <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#D4AF37', color: '#0A0F1D', fontSize: '0.65rem', fontWeight: 800, borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {totalCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
