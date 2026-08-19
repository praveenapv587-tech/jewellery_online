import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';

const FilterSidebar = ({ categories, filters, onFilterChange, onReset }) => {
  return (
    <aside className="glass-card" style={{ padding: '24px', height: 'fit-content' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>
        <h3 style={{ fontSize: '1.1rem', color: '#FAF8F5', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={18} color="#D4AF37" /> Filter By
        </h3>
        <button 
          onClick={onReset}
          style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <RotateCcw size={12} /> Reset
        </button>
      </div>

      {/* Category Filter */}
      <div style={{ marginBottom: '28px' }}>
        <h4 style={{ fontSize: '0.85rem', color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
          Category
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: filters.category === 'all' ? '#D4AF37' : '#CBD5E1' }}>
            <input 
              type="radio" 
              name="category" 
              checked={filters.category === 'all'} 
              onChange={() => onFilterChange('category', 'all')}
              style={{ accentColor: '#D4AF37' }}
            />
            All Fine Collections
          </label>
          {categories.map(cat => (
            <label key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: filters.category === cat.slug ? '#D4AF37' : '#CBD5E1' }}>
              <input 
                type="radio" 
                name="category" 
                checked={filters.category === cat.slug} 
                onChange={() => onFilterChange('category', cat.slug)}
                style={{ accentColor: '#D4AF37' }}
              />
              {cat.name} ({cat.product_count || 0})
            </label>
          ))}
        </div>
      </div>


      {/* Sorting */}
      <div>
        <h4 style={{ fontSize: '0.85rem', color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
          Sort By
        </h4>
        <select 
          value={filters.ordering || 'newest'}
          onChange={(e) => onFilterChange('ordering', e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            background: 'rgba(10, 15, 29, 0.8)',
            border: '1px solid var(--border-gold)',
            color: '#FAF8F5',
            borderRadius: '6px',
            outline: 'none',
            fontSize: '0.85rem'
          }}
        >
          <option value="newest">Newest Arrivals</option>
          <option value="price_low_high">Price: Low to High</option>
          <option value="price_high_low">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>
    </aside>
  );
};

export default FilterSidebar;
