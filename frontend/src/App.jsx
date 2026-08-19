import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';

import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Wishlist from './pages/Wishlist';
import BespokeInquiry from './pages/BespokeInquiry';

function AppContent() {
  const [activePage, setActivePage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [completedOrder, setCompletedOrder] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setActivePage('catalog');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        onSearch={handleSearch}
      />

      <main style={{ flexGrow: 1 }}>
        {activePage === 'home' && (
          <Home 
            setActivePage={setActivePage} 
            onShowToast={showToast}
          />
        )}

        {activePage === 'catalog' && (
          <Catalog 
            searchQuery={searchQuery}
            onShowToast={showToast}
          />
        )}

        {activePage === 'cart' && (
          <Cart 
            setActivePage={setActivePage} 
            onShowToast={showToast}
          />
        )}

        {activePage === 'checkout' && (
          <Checkout 
            setActivePage={setActivePage} 
            setCompletedOrder={setCompletedOrder}
            onShowToast={showToast}
          />
        )}

        {activePage === 'ordersuccess' && (
          <OrderSuccess 
            order={completedOrder}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'wishlist' && (
          <Wishlist 
            setActivePage={setActivePage}
            onShowToast={showToast}
          />
        )}

        {activePage === 'bespoke' && (
          <BespokeInquiry 
            onShowToast={showToast}
          />
        )}
      </main>

      <Footer setActivePage={setActivePage} />

      <Toast 
        message={toastMessage} 
        onClose={() => setToastMessage(null)} 
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <AppContent />
      </WishlistProvider>
    </CartProvider>
  );
}
