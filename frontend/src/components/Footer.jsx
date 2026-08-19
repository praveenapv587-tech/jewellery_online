import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';

const Footer = ({ setActivePage }) => {
  return (
    <footer style={{ background: '#070B16', borderTop: '1px solid var(--border-gold)', marginTop: '80px', color: '#94A3B8', paddingTop: '60px', paddingBottom: '30px' }}>

      {/* Main Footer Content */}
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', marginBottom: '50px' }}>
        {/* Brand info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <img 
              src="/images/prayoga_logo.jpg" 
              alt="Prayoga Jewels"
              style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-gold)' }}
            />
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 700, color: '#D4AF37', letterSpacing: '2px' }}>PRAYOGA JEWELS</span>
          </div>
          <p style={{ fontSize: '0.85rem', lineHeight: '1.7', marginBottom: '20px' }}>
            Prayoga jewels is a colletion of antiques and simple wearings founded in 2025.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <span style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '50%', border: '1px solid var(--border-gold)', color: '#D4AF37', cursor: 'pointer' }}><Instagram size={18} /></span>
            <span style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '50%', border: '1px solid var(--border-gold)', color: '#D4AF37', cursor: 'pointer' }}><Facebook size={18} /></span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 style={{ color: '#FAF8F5', fontSize: '1.1rem', marginBottom: '20px' }}>Fine Collections</h3>
          <ul style={{ listStyle: 'none', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li onClick={() => setActivePage('catalog')} style={{ cursor: 'pointer', transition: 'color 0.2s' }}>Rings</li>
            <li onClick={() => setActivePage('catalog')} style={{ cursor: 'pointer', transition: 'color 0.2s' }}>Chokers</li>
            <li onClick={() => setActivePage('catalog')} style={{ cursor: 'pointer', transition: 'color 0.2s' }}>Antique collections</li>
            <li onClick={() => setActivePage('catalog')} style={{ cursor: 'pointer', transition: 'color 0.2s' }}>Long chains</li>
          </ul>
        </div>

        {/* Atelier Services */}
        <div>
          <h3 style={{ color: '#FAF8F5', fontSize: '1.1rem', marginBottom: '20px' }}>Concierge Atelier</h3>
          <ul style={{ listStyle: 'none', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li onClick={() => setActivePage('bespoke')} style={{ cursor: 'pointer', color: '#D4AF37' }}>Customer </li>
            <li onClick={() => setActivePage('bespoke')} style={{ cursor: 'pointer' }}>Virtual video</li>
           
            <li>Ring Size Guide</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 style={{ color: '#FAF8F5', fontSize: '1.1rem', marginBottom: '20px' }}>Contact Us</h3>
          <ul style={{ listStyle: 'none', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><MapPin size={16} color="#D4AF37" /> Broadway, Kochi</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Phone size={16} color="#D4AF37" /> 8848***88</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Mail size={16} color="#D4AF37" /> prayogajewels@gmai.com</li>
          </ul>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px', textAlign: 'center', fontSize: '0.75rem', color: '#64748B' }}>
        © {new Date().getFullYear()} PRAYOGA FINE JEWELLERY PRIVATE LIMITED. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
};

export default Footer;
