import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '14px 20px',
      background: 'rgba(19, 27, 46, 0.95)',
      backdropFilter: 'blur(12px)',
      border: type === 'success' ? '1px solid #D4AF37' : '1px solid #E11D48',
      borderRadius: '8px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      color: '#FAF8F5',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      {type === 'success' ? (
        <CheckCircle size={20} color="#D4AF37" />
      ) : (
        <AlertCircle size={20} color="#E11D48" />
      )}
      <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{message}</span>
      <button onClick={onClose} style={{ marginLeft: '8px', color: '#94A3B8' }}>
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
