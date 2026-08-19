import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/api';
import { ShieldCheck, CreditCard, Lock, CheckCircle } from 'lucide-react';

const Checkout = ({ setActivePage, setCompletedOrder, onShowToast }) => {
  const { cart, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    full_name: 'Princess Sunaina Rao',
    email: 'sunaina.rao@royalmail.in',
    phone: '+91 98765 43210',
    address: 'Suite 402, Royal Palms Palace, MG Road',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    payment_method: 'UPI / NetBanking'
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderPayload = {
      ...formData,
      total_amount: total,
      raw_items: cart.map(item => ({
        name: item.product.name,
        price: item.product.discount_price || item.product.price,
        quantity: item.quantity
      }))
    };

    const res = await createOrder(orderPayload);
    setLoading(false);
    clearCart();
    if (setCompletedOrder) setCompletedOrder(res);
    if (onShowToast) onShowToast('Order Placed Successfully!');
    setActivePage('ordersuccess');
  };

  const formattedTotal = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(total);

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#FAF8F5', marginBottom: '32px' }}>
        Checkout & Delivery Address
      </h1>

      <form onSubmit={handleSubmitOrder} style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '36px' }}>
        {/* Left Column - Shipping & Payment Info */}
        <div>
          {/* Customer & Delivery Address */}
          <div className="glass-card" style={{ padding: '28px', marginBottom: '28px' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#FAF8F5', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
              1. Delivery Information
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '6px' }}>Full Name</label>
                <input 
                  type="text" 
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-gold)', borderRadius: '6px', padding: '10px', color: '#FFF' }}
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
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-gold)', borderRadius: '6px', padding: '10px', color: '#FFF' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '6px' }}>Phone Number</label>
                <input 
                  type="text" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-gold)', borderRadius: '6px', padding: '10px', color: '#FFF' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '6px' }}>Pincode / Zip</label>
                <input 
                  type="text" 
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-gold)', borderRadius: '6px', padding: '10px', color: '#FFF' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '6px' }}>Shipping Address</label>
              <textarea 
                name="address"
                rows={3}
                value={formData.address}
                onChange={handleChange}
                required
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-gold)', borderRadius: '6px', padding: '10px', color: '#FFF', resize: 'none' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '6px' }}>City</label>
                <input 
                  type="text" 
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-gold)', borderRadius: '6px', padding: '10px', color: '#FFF' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '6px' }}>State</label>
                <input 
                  type="text" 
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-gold)', borderRadius: '6px', padding: '10px', color: '#FFF' }}
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="glass-card" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#FAF8F5', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
              2. Select Payment Option
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['UPI (GPay / PhonePe / Paytm)', 'Credit / Debit Card (Visa, Mastercard, Amex)', 'NetBanking (HDFC, ICICI, SBI)', 'Cash on Delivery (COD Verified)'].map((method) => (
                <label key={method} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', borderRadius: '8px', border: formData.payment_method === method ? '1px solid #D4AF37' : '1px solid var(--border-subtle)', background: formData.payment_method === method ? 'rgba(212,175,55,0.1)' : 'transparent', cursor: 'pointer' }}>
                  <input 
                    type="radio"
                    name="payment_method"
                    checked={formData.payment_method === method}
                    onChange={() => setFormData(prev => ({ ...prev, payment_method: method }))}
                    style={{ accentColor: '#D4AF37' }}
                  />
                  <span style={{ fontSize: '0.9rem', color: '#FAF8F5' }}>{method}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Summary */}
        <div>
          <div className="glass-card" style={{ padding: '28px', position: 'sticky', top: '100px' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#FAF8F5', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
              Items in Bag ({cart.length})
            </h3>

            <div style={{ maxHeight: '240px', overflowY: 'auto', marginBottom: '20px', paddingRight: '6px' }}>
              {cart.map((item) => (
                <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.85rem' }}>
                  <div>
                    <div style={{ color: '#FAF8F5', fontWeight: 500 }}>{item.product.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Qty: {item.quantity}</div>
                  </div>
                  <div style={{ color: '#D4AF37', fontWeight: 600 }}>
                    ₹{((item.product.discount_price || item.product.price) * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--border-gold)', paddingTop: '16px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.1rem', color: '#FAF8F5', fontWeight: 600 }}>Total Payable</span>
                <span style={{ fontSize: '1.6rem', color: '#F7E7A1', fontWeight: 700 }}>{formattedTotal}</span>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn-gold" 
              style={{ width: '100%', padding: '16px' }}
            >
              {loading ? 'Securing Order...' : 'Place Insured Order'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
