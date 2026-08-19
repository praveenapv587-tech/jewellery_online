import React from 'react';
import { CheckCircle, ShieldCheck, Printer, ArrowRight, Package } from 'lucide-react';

const OrderSuccess = ({ order, setActivePage }) => {
  if (!order) {
    return (
      <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ color: '#FAF8F5' }}>No Order Selected</h2>
        <button onClick={() => setActivePage('home')} className="btn-gold" style={{ marginTop: '20px' }}>
          Back to Home
        </button>
      </div>
    );
  }

  const formattedTotal = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(order.total_amount || 0);

  return (
    <div className="container" style={{ paddingTop: '60px', paddingBottom: '100px', maxWidth: '750px' }}>
      <div className="glass-card" style={{ padding: '40px', textAlign: 'center', position: 'relative' }}>
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(212,175,55,0.15)', border: '2px solid #D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <CheckCircle size={40} color="#D4AF37" />
        </div>

        <div style={{ fontSize: '0.8rem', color: '#D4AF37', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
          ORDER CONFIRMED & INSURED
        </div>

        <h1 style={{ fontSize: '2.4rem', color: '#FAF8F5', marginBottom: '12px' }}>
          Thank You, {order.full_name}
        </h1>

        <p style={{ color: '#94A3B8', fontSize: '0.95rem', marginBottom: '32px' }}>
          Your royal jewellery order has been logged into our vault. A tamper-proof security box will be dispatched shortly.
        </p>

        {/* Invoice Summary Card */}
        <div style={{ background: 'rgba(10, 15, 29, 0.7)', border: '1px solid var(--border-gold)', borderRadius: '8px', padding: '24px', textAlign: 'left', marginBottom: '32px', fontSize: '0.9rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
            <div>
              <span style={{ color: '#94A3B8' }}>Order Number:</span>
              <div style={{ color: '#D4AF37', fontWeight: 700, fontFamily: 'monospace', fontSize: '1rem' }}>
                {order.order_number}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ color: '#94A3B8' }}>Status:</span>
              <div style={{ color: '#10B981', fontWeight: 600 }}>CONFIRMED</div>
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <span style={{ color: '#94A3B8' }}>Delivery Address:</span>
            <div style={{ color: '#FAF8F5', marginTop: '4px' }}>
              {order.address}, {order.city}, {order.state} - {order.pincode}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
            <span style={{ color: '#FAF8F5', fontWeight: 600 }}>Total Paid:</span>
            <span style={{ color: '#F7E7A1', fontWeight: 700, fontSize: '1.2rem' }}>{formattedTotal}</span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <button onClick={() => window.print()} className="btn-outline-gold">
            <Printer size={16} /> Print Receipt
          </button>
          <button onClick={() => setActivePage('catalog')} className="btn-gold">
            Continue Shopping <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
