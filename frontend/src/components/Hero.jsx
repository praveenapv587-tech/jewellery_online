import React from 'react';
import { ArrowRight, Sparkles, Crown } from 'lucide-react';

const Hero = ({ setActivePage }) => {
  return (
    <section style={{
      position: 'relative',
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      background: `linear-gradient(rgba(10, 15, 29, 0.75), rgba(10, 15, 29, 0.95)), url('/images/prayoga_ruby_choker.jpg') center/cover no-repeat`,
      borderBottom: '1px solid var(--border-gold)',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(212,175,55,0.18) 0%, rgba(0,0,0,0) 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 10, padding: '60px 24px' }}>
        <div style={{ maxWidth: '680px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(212,175,55,0.15)', border: '1px solid var(--border-gold)', padding: '6px 16px', borderRadius: '30px', marginBottom: '24px' }}>
            <Crown size={14} color="#D4AF37" />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '2px', color: '#F7E7A1', textTransform: 'uppercase' }}>
              OFFICIAL PRAYOGA JEWELS COLLECTION • ALL ITEMS UNDER ₹100 - ₹200
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1.15', marginBottom: '24px', fontWeight: 700 }}>
            Royal Heritage <span className="gold-gradient-text">Jewellery</span> at <span className="gold-gradient-text">Unbeatable Prices</span>.
          </h1>

          <p style={{ fontSize: '1.05rem', color: '#CBD5E1', marginBottom: '40px', lineHeight: '1.8', fontWeight: 300 }}>
            Explore Prayoga Jewels' authentic  gold chokers, temple pearl pendants, long malas & pink lotus enamel sets — priced between <strong>₹100 to ₹200</strong>!
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px' }}>
            <button 
              onClick={() => setActivePage('catalog')}
              className="btn-gold"
              style={{ padding: '14px 32px', fontSize: '0.9rem' }}
            >
              Shop Collection under ₹200 <ArrowRight size={18} />
            </button>

            <button 
              onClick={() => setActivePage('bespoke')}
              className="btn-outline-gold"
              style={{ padding: '14px 32px', fontSize: '0.9rem' }}
            >
              Custom Order Request
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
