import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import { fetchCategories, fetchProducts } from '../services/api';
import { Sparkles, ArrowRight } from 'lucide-react';

const Home = ({ setActivePage, setSelectedProductSlug, onShowToast }) => {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [selectedQuickView, setSelectedQuickView] = useState(null);

  useEffect(() => {
    const loadHomeData = async () => {
      const cats = await fetchCategories();
      setCategories(cats);
      const prods = await fetchProducts({ featured: 'true' });
      setFeaturedProducts(prods);
    };
    loadHomeData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <Hero setActivePage={setActivePage} />


      {/* Featured Categories Grid */}
      <section className="container" style={{ padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{ fontSize: '0.8rem', color: '#D4AF37', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '8px' }}>
            CURATED SELECTIONS
          </div>
          <h2 style={{ fontSize: '2.5rem', color: '#FAF8F5' }}>
            Explore Our Fine Collections
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          {categories.map((cat) => (
            <div 
              key={cat.id}
              onClick={() => setActivePage('catalog')}
              className="glass-card"
              style={{
                position: 'relative',
                height: '280px',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.4s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-6px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <img 
                src={cat.image_url} 
                alt={cat.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.65)' }}
              />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px', background: 'linear-gradient(to top, rgba(10,15,29,0.95), transparent)' }}>
                <h3 style={{ fontSize: '1.4rem', color: '#FAF8F5', marginBottom: '4px' }}>{cat.name}</h3>
                <p style={{ fontSize: '0.75rem', color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Explore Collection <ArrowRight size={12} color="#D4AF37" />
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ background: '#0C1322', padding: '80px 0', borderTop: '1px solid var(--border-gold)', borderBottom: '1px solid var(--border-gold)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#D4AF37', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '8px' }}>
                ROYAL SPOTLIGHT
              </div>
              <h2 style={{ fontSize: '2.5rem', color: '#FAF8F5' }}>
                Signature Masterpieces
              </h2>
            </div>
            <button onClick={() => setActivePage('catalog')} className="btn-outline-gold">
              View All Masterpieces <ArrowRight size={16} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
            {featuredProducts.map((prod) => (
              <ProductCard 
                key={prod.id} 
                product={prod} 
                onQuickView={(p) => setSelectedQuickView(p)}
                onShowToast={onShowToast}
              />
            ))}
          </div>
        </div>
      </section>

      {/* The Art of Everyday Elegance */}
      <section className="container" style={{ padding: '80px 24px' }}>
        <div className="glass-card" style={{ padding: '48px', borderRadius: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '48px', alignItems: 'center' }}>
            {/* Left Column: Brand Story Text */}
            <div>
              <div style={{ fontSize: '0.8rem', color: '#D4AF37', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '12px' }}>
                OUR BRAND PHILOSOPHY
              </div>
              
              <h2 style={{ fontSize: '2.6rem', color: '#FAF8F5', marginBottom: '24px', lineHeight: '1.2' }}>
                The Art of <span className="gold-gradient-text">Everyday Elegance</span>
              </h2>

              <p style={{ fontSize: '1rem', color: '#CBD5E1', lineHeight: '1.8', marginBottom: '18px' }}>
                Welcome to <strong style={{ color: '#F7E7A1' }}>Prayoga Jewels</strong>, where timeless elegance meets modern design. We curate beautiful jewellery pieces crafted to add a touch of sophistication, confidence, and sparkle to every occasion.
              </p>

              <p style={{ fontSize: '1rem', color: '#CBD5E1', lineHeight: '1.8', marginBottom: '18px' }}>
                From delicate everyday pieces to statement jewellery for special moments, every design is thoughtfully selected for women who love to express their individuality through jewellery. At Prayoga, we believe that every piece tells a story — yours.
              </p>

              <p style={{ fontSize: '1rem', color: '#CBD5E1', lineHeight: '1.8', marginBottom: '28px' }}>
                Discover jewellery that feels personal, looks timeless, and makes every moment shine.
              </p>

              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: '#D4AF37', letterSpacing: '1px' }}>
                Prayoga Jewels — Wear Your Story.
              </div>
            </div>

            {/* Right Column: Brand Card Image */}
            <div style={{ position: 'relative' }}>
              <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-gold)', boxShadow: '0 12px 30px rgba(0,0,0,0.5)' }}>
                <img 
                  src="/images/prayoga_brand_card.jpg" 
                  alt="Prayoga Jewels Brand Card"
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal Popup */}
      {selectedQuickView && (
        <QuickViewModal 
          product={selectedQuickView} 
          onClose={() => setSelectedQuickView(null)}
          onShowToast={onShowToast}
        />
      )}
    </div>
  );
};

export default Home;
