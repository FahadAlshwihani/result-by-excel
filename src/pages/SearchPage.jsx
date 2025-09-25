import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../DataContext';

export default function SearchPage() {
  const { rows, loading } = useContext(DataContext);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    const id = query.trim();
    if (!id) return;
    navigate(`/result/${encodeURIComponent(id)}`);
  }

  return (
    <div className="App">
      {/* Animated Background Effects */}
      <div className="background-effects">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
      </div>

      <div className="container" style={{ maxWidth: '600px', width: '100%' }}>
        <div className="glass-card" style={{ padding: '3rem 2rem' }}>
          {/* Header Section */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h1 className="title-primary">البحث بالمعرف</h1>
            <p className="subtitle">
              ادخل المعرف الخاص بك للحصول على النتيجة بسرعة وسهولة
            </p>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p className="loading-text">جاري تحميل البيانات...</p>
            </div>
          ) : (
            <>
              {/* Search Form */}
              <form onSubmit={handleSearch} style={{ marginBottom: '2rem' }}>
                <div className="form-group">
                  <div className="input-group">
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="ادخل المعرف هنا..."
                      className="form-input"
                      style={{ fontSize: '1.1rem' }}
                    />
                    <button type="submit" className="btn-modern btn-primary">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </form>

              {/* Statistics Card */}
              <div className="status-card" style={{ 
                textAlign: 'center',
                background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1), rgba(20, 184, 166, 0.05))',
                borderColor: 'rgba(20, 184, 166, 0.3)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexDirection: 'row-reverse' /* Reverse order for RTL */ }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem', marginLeft: '0' }}> {/* Changed marginLeft to marginRight */}
                    <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4"></path>
                    <rect x="9" y="7" width="6" height="6" rx="1"></rect>
                  </svg>
                  <span style={{ 
                    color: 'var(--text-secondary)', 
                    fontSize: '1rem', 
                    fontWeight: '500' 
                  }}>
                    إجمالي السجلات المتاحة
                  </span>
                </div>
                <div style={{ 
                  color: 'var(--color-primary)', 
                  fontSize: '2rem', 
                  fontWeight: '700',
                  textShadow: '0 0 20px rgba(20, 184, 166, 0.3)'
                }}>
                  {rows.length.toLocaleString('en-SA')}
                </div>
              </div>

              {/* Instructions */}
              <div style={{ 
                textAlign: 'center', 
                marginTop: '2rem',
                padding: '1.5rem',
                background: 'rgba(30, 41, 59, 0.4)',
                borderRadius: '12px',
                border: '1px solid var(--card-border)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.75rem', flexDirection: 'row-reverse' /* Reverse order for RTL */ }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem', marginLeft: '0' }}> {/* Changed marginLeft to marginRight */}
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 16v-4"></path>
                    <path d="M12 8h.01"></path>
                  </svg>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>
                    كيفية الاستخدام
                  </span>
                </div>
                <p style={{ 
  color: 'var(--text-muted)', 
  fontSize: '0.9rem', 
  lineHeight: '1.8',
  margin: 0,
  textAlign: 'center'
}}>
  أدخل المعرف في الحقل أعلاه <br />
  واضغط على زر البحث <br />
</p>

              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
