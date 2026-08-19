import React, { useState } from 'react';
import { createInquiry } from '../services/api';
import { Sparkles, CheckCircle, Crown, Shield } from 'lucide-react';

const BespokeInquiry = ({ onShowToast }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    jewelry_type: 'Bridal Choker',
    metal_preference: '22K Gold',
    budget_range: '₹2,00,000 - ₹5,00,000',
    description: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await createInquiry(formData);
    setLoading(false);
    setSubmitted(true);
    if (onShowToast) onShowToast('Custom Design Request Submitted!');
  };

  return (
    <div className="container" style={{ paddingTop: '50px', paddingBottom: '100px', maxWidth: '800px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(212,175,55,0.15)', border: '1px solid var(--border-gold)', padding: '4px 14px', borderRadius: '20px', fontSize: '0.75rem', color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>
          <Crown size={14} /> PRAYOGA BESPOKE ATELIER
        </div>
        <h1 style={{ fontSize: '2.8rem', color: '#FAF8F5', marginBottom: '12px' }}>
          Craft Your Bespoke Masterpiece
        </h1>
        <p style={{ color: '#94A3B8', fontSize: '0.95rem' }}>
          Collaborate with your ideas and wishes.
        </p>
      </div>

      {submitted ? (
        <div className="glass-card" style={{ padding: '50px', textAlign: 'center' }}>
          <CheckCircle size={48} color="#D4AF37" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: '1.8rem', color: '#FAF8F5', marginBottom: '12px' }}>Inquiry Received</h2>
          <p style={{ color: '#94A3B8', fontSize: '0.95rem' }}>
            Our Senior Jewellery Concierge will reach out via WhatsApp/Phone within 2 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '36px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '6px' }}>Your Name</label>
              <input 
                type="text" 
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                placeholder="e.g. Radhika Merchant"
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-gold)', borderRadius: '6px', padding: '12px', color: '#FFF' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '6px' }}>Email Address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="radhika@example.com"
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-gold)', borderRadius: '6px', padding: '12px', color: '#FFF' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '6px' }}>Phone / WhatsApp</label>
              <input 
                type="text" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+91 98765 00000"
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-gold)', borderRadius: '6px', padding: '12px', color: '#FFF' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '6px' }}>Jewellery Type</label>
              <select
                name="jewelry_type"
                value={formData.jewelry_type}
                onChange={handleChange}
                style={{ width: '100%', background: '#0D1424', border: '1px solid var(--border-gold)', borderRadius: '6px', padding: '12px', color: '#FFF' }}
              >
                <option value="Bridal Choker">Bridal Kundan / Polki Choker</option>
                <option value="Solitaire Engagement Ring">Solitaire Engagement Ring</option>
                <option value="Diamond Tennis Bracelet">Diamond Tennis Bracelet</option>
                <option value="Chandbali Earrings">South Sea Pearl Chandbalis</option>
                <option value="Custom Family Heirloom">Custom Family Heirloom</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '6px' }}>Estimated Budget</label>
            <select
              name="budget_range"
              value={formData.budget_range}
              onChange={handleChange}
              style={{ width: '100%', background: '#0D1424', border: '1px solid var(--border-gold)', borderRadius: '6px', padding: '12px', color: '#FFF' }}
            >
              <option value="Under ₹200">Under ₹200 (Everyday Elegance)</option>
              <option value="₹200 - ₹500">₹200 - ₹500 (Special Moments)</option>
              <option value="₹500 - ₹1,000">₹500 - ₹1,000 (Luxury Sets)</option>
            </select>
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '6px' }}>Design Specifications & Story</label>
            <textarea 
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your dream piece (e.g., emerald cut center diamond, peacock motif carving, wedding date)..."
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-gold)', borderRadius: '6px', padding: '12px', color: '#FFF', resize: 'none' }}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="btn-gold"
            style={{ width: '100%', padding: '16px' }}
          >
            {loading ? 'Submitting Design Brief...' : 'Request Bespoke Consultation'} <Sparkles size={18} />
          </button>
        </form>
      )}
    </div>
  );
};

export default BespokeInquiry;
