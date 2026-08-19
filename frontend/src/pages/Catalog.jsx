import React, { useState, useEffect } from 'react';
import FilterSidebar from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import { fetchCategories, fetchProducts } from '../services/api';
import { Search, Sparkles } from 'lucide-react';

const Catalog = ({ searchQuery, onShowToast }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuickView, setSelectedQuickView] = useState(null);

  const [filters, setFilters] = useState({
    category: 'all',
    ordering: 'newest',
    search: searchQuery || ''
  });

  useEffect(() => {
    if (searchQuery !== undefined) {
      setFilters(prev => ({ ...prev, search: searchQuery }));
    }
  }, [searchQuery]);

  useEffect(() => {
    const loadCategories = async () => {
      const cats = await fetchCategories();
      setCategories(cats);
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const loadFilteredProducts = async () => {
      setLoading(true);
      const data = await fetchProducts(filters);
      setProducts(data);
      setLoading(false);
    };
    loadFilteredProducts();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      category: 'all',
      ordering: 'newest',
      search: ''
    });
  };

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ fontSize: '0.8rem', color: '#D4AF37', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '8px' }}>
          FINE JEWELLERY CATALOG
        </div>
        <h1 style={{ fontSize: '2.8rem', color: '#FAF8F5' }}>
          The Prayoga Treasury
        </h1>
        <p style={{ color: '#94A3B8', fontSize: '0.95rem', maxWidth: '600px', margin: '8px auto 0' }}>
          Browse our certified 22K pure gold, natural VVS diamond, and rare Zambian emerald creations.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '36px' }}>
        {/* Sidebar Filters */}
        <FilterSidebar 
          categories={categories} 
          filters={filters} 
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        {/* Product Grid Area */}
        <div>
          {/* Active Filter Indicators */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', background: 'rgba(255,255,255,0.03)', padding: '14px 20px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.9rem', color: '#CBD5E1' }}>
              Showing <strong style={{ color: '#D4AF37' }}>{products.length}</strong> master creations
            </div>
            {filters.search && (
              <span className="badge-gold">
                Search: "{filters.search}"
              </span>
            )}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#D4AF37' }}>
              <Sparkles size={32} className="pulse-gold" />
              <p style={{ marginTop: '12px', fontSize: '0.9rem', color: '#94A3B8' }}>Loading luxury catalog...</p>
            </div>
          ) : products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px dashed var(--border-gold)' }}>
              <Search size={40} color="#94A3B8" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.2rem', color: '#FAF8F5', marginBottom: '8px' }}>No creations match your search</h3>
              <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '20px' }}>Try resetting your category or metal filters.</p>
              <button onClick={handleResetFilters} className="btn-outline-gold">
                Reset All Filters
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
              {products.map(prod => (
                <ProductCard 
                  key={prod.id} 
                  product={prod} 
                  onQuickView={(p) => setSelectedQuickView(p)}
                  onShowToast={onShowToast}
                />
              ))}
            </div>
          )}
        </div>
      </div>

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

export default Catalog;
