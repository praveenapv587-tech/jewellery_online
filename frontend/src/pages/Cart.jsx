import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';

const Cart = ({ setActivePage, onShowToast }) => {
  const { cart, removeFromCart, updateQuantity, subtotal, discountAmount, total, applyPromo, promoCode } = useCart();
  const [inputCode, setInputCode] = useState('');
  const [promoMessage, setPromoMessage] = useState(null);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyPromo(inputCode);
    setPromoMessage(res);
    if (onShowToast) onShowToast(res.message);
  };

  const formattedSubtotal = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(subtotal);
  const formattedDiscount = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(discountAmount);
  const formattedTotal = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(total);

  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: '100px 24px', textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <ShoppingBag size={36} color="#D4AF37" />
        </div>
        <h2 style={{ fontSize: '2rem', color: '#FAF8F5', marginBottom: '12px' }}>Your Shopping Bag is Empty</h2>
        <p style={{ color: '#94A3B8', fontSize: '0.95rem', marginBottom: '32px' }}>
          Discover our certified solitaire diamond rings and 22K gold chokers.
        </p>
        <button onClick={() => setActivePage('catalog')} className="btn-gold">
          Explore Collections <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#FAF8F5', marginBottom: '32px' }}>
        Your Luxury Shopping Bag
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '36px' }}>
        {/* Cart Item List */}
        <div>
          {cart.map((item) => {
            const itemPrice = item.product.discount_price || item.product.price;
            const itemTotal = itemPrice * item.quantity;
            const formattedItemPrice = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(itemTotal);

            return (
              <div 
                key={item.product.id}
                className="glass-card"
                style={{ padding: '20px', marginBottom: '16px', display: 'flex', gap: '20px', alignItems: 'center' }}
              >
                <img 
                  src={item.product.image_url} 
                  alt={item.product.name}
                  style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}
                />

                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontSize: '0.75rem', color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Prayoga Jewels
                  </div>
                  <h3 style={{ fontSize: '1.1rem', color: '#FAF8F5', marginBottom: '6px' }}>{item.product.name}</h3>
                  <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '12px' }}>
                    Authentic Prayoga Jewels Collection
                  </div>

                  {/* Quantity Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-gold)', borderRadius: '4px', background: 'rgba(10,15,29,0.5)' }}>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        style={{ padding: '4px 10px', color: '#FAF8F5', fontSize: '1rem' }}
                      >
                        -
                      </button>
                      <span style={{ padding: '0 12px', fontSize: '0.85rem', fontWeight: 600, color: '#FAF8F5' }}>
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        style={{ padding: '4px 10px', color: '#FAF8F5', fontSize: '1rem' }}
                      >
                        +
                      </button>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      style={{ color: '#E11D48', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>

                <div style={{ textAlign: 'right', fontSize: '1.2rem', fontWeight: 700, color: '#F7E7A1' }}>
                  {formattedItemPrice}
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary Box */}
        <div>
          <div className="glass-card" style={{ padding: '28px', position: 'sticky', top: '100px' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#FAF8F5', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
              Order Breakdown
            </h3>

            {/* Promo Form */}
            <form onSubmit={handleApplyPromo} style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                Royal Coupon Code
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="text" 
                  placeholder="Try PRAYOGA10"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  style={{ flexGrow: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-gold)', padding: '8px 12px', borderRadius: '6px', color: '#FFF', fontSize: '0.85rem' }}
                />
                <button type="submit" className="btn-outline-gold" style={{ padding: '8px 14px', fontSize: '0.75rem' }}>
                  Apply
                </button>
              </div>
              {promoCode && (
                <div style={{ fontSize: '0.75rem', color: '#10B981', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Tag size={12} /> Code <strong>PRAYOGA10</strong> Active (10% OFF)
                </div>
              )}
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8' }}>
                <span>Subtotal</span>
                <span style={{ color: '#FAF8F5' }}>{formattedSubtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10B981' }}>
                  <span>Royal Discount (10%)</span>
                  <span>- {formattedDiscount}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8' }}>
                <span>Insured Security Shipping</span>
                <span style={{ color: '#10B981', fontWeight: 600 }}>FREE</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8' }}>
                <span>Estimated GST Tax (3%)</span>
                <span style={{ color: '#FAF8F5' }}>Included</span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-gold)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#FAF8F5' }}>Total Amount</span>
              <span style={{ fontSize: '1.6rem', fontWeight: 700, color: '#F7E7A1' }}>{formattedTotal}</span>
            </div>

            <button 
              onClick={() => setActivePage('checkout')}
              className="btn-gold" 
              style={{ width: '100%', padding: '16px' }}
            >
              Proceed to Secure Checkout <ArrowRight size={18} />
            </button>

            <div style={{ marginTop: '20px', fontSize: '0.75rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
              <ShieldCheck size={14} color="#D4AF37" /> 256-Bit Encrypted Security Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
