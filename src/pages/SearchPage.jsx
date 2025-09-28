import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../DataContext';

export default function SearchPage() {
  const { rows, loading } = useContext(DataContext);
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    const id = query.trim();
    if (!id) return;
    
    setIsSearching(true);
    
    // Add a small delay for better UX
    setTimeout(() => {
      navigate(`/result/${encodeURIComponent(id)}`);
      setIsSearching(false);
    }, 500);
  }

  return (
    <div className="App">
      {/* Animated Background Effects */}
      <div className="background-effects">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
      </div>

      <div className="container" style={{ maxWidth: '700px', width: '100%' }}>
        <div className="glass-card" style={{ padding: '3rem 2rem' }}>
          {/* Header Section */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1), rgba(99, 102, 241, 0.1))',
              padding: '0.75rem 1.5rem',
              borderRadius: '50px',
              border: '1px solid rgba(20, 184, 166, 0.2)',
              marginBottom: '2rem',
              gap: '0.75rem'
            }}>
              <span style={{ 
                color: 'var(--color-primary)', 
                fontWeight: '600',
                fontSize: '1rem'
              }}>
                نظام البحث الذكي
              </span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
            
            <h1 className="title-primary">درجات التميز السلوكي بثانوية الكسائي</h1>
            <p className="subtitle">
              ادخل رقم السجل المدني الخاص بالطالب لمعرفة درجات التميز السلوكي بطريقة سريعة وآمنة
            </p>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p className="loading-text">جاري تحميل البيانات...</p>
              <p style={{ 
                color: 'var(--text-muted)', 
                fontSize: '0.9rem', 
                marginTop: '0.5rem' 
              }}>
                يرجى الانتظار قليلاً
              </p>
            </div>
          ) : (
            <>
              {/* Search Form */}
              <form onSubmit={handleSearch} style={{ marginBottom: '2.5rem' }}>
                <div className="form-group">
                  <div className="input-group">
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="ادخل السجل المدني هنا..."
                      className="form-input"
                      style={{ fontSize: '1.1rem' }}
                      disabled={isSearching}
                    />
                    <button 
                      type="submit" 
                      className="btn-modern btn-primary"
                      disabled={isSearching || !query.trim()}
                      style={{
                        opacity: isSearching || !query.trim() ? 0.6 : 1,
                        cursor: isSearching || !query.trim() ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {isSearching ? (
                        <div style={{ 
                          width: '20px', 
                          height: '20px', 
                          border: '2px solid transparent',
                          borderTop: '2px solid white',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite'
                        }}></div>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8"></circle>
                          <path d="m21 21-4.35-4.35"></path>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </form>

              {/* Statistics Card */}
              <div className="status-card" style={{ 
                textAlign: 'center',
                background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1), rgba(20, 184, 166, 0.05))',
                borderColor: 'rgba(20, 184, 166, 0.3)',
                marginBottom: '2.5rem'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '0.75rem', 
                  marginBottom: '1rem', 
                  flexDirection: 'row-reverse'
                }}>
                  <div>
                    <div style={{ 
                      color: 'var(--text-secondary)', 
                      fontSize: '1rem', 
                      fontWeight: '500',
                      marginBottom: '0.25rem'
                    }}>
                      إجمالي السجلات المتاحة
                    </div>
                    <div style={{ 
                      color: 'var(--color-primary)', 
                      fontSize: '2.5rem', 
                      fontWeight: '700',
                      textShadow: '0 0 20px rgba(20, 184, 166, 0.3)'
                    }}>
                      {rows.length.toLocaleString('ar-SA')}
                    </div>
                  </div>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4"></path>
                    <rect x="9" y="7" width="6" height="6" rx="1"></rect>
                  </svg>
                </div>
                <div style={{
                  background: 'rgba(20, 184, 166, 0.1)',
                  borderRadius: '12px',
                  padding: '1rem',
                  border: '1px solid rgba(20, 184, 166, 0.2)'
                }}>
                  <p style={{ 
                    color: 'var(--text-secondary)', 
                    fontSize: '0.9rem',
                    margin: 0
                  }}>
                    جميع البيانات محدثة ومتاحة للبحث الفوري
                  </p>
                </div>
              </div>

              {/* Features Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2.5rem'
              }}>
                <div style={{
                  background: 'rgba(99, 102, 241, 0.05)',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <h3 style={{
                    color: 'var(--color-secondary)',
                    fontSize: '1rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem'
                  }}>
                    آمن ومحمي
                  </h3>
                  <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.85rem',
                    margin: 0
                  }}>
                    جميع البيانات محمية وآمنة
                  </p>
                </div>

                <div style={{
                  background: 'rgba(20, 184, 166, 0.05)',
                  border: '1px solid rgba(20, 184, 166, 0.2)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12,6 12,12 16,14"></polyline>
                    </svg>
                  </div>
                  <h3 style={{
                    color: 'var(--color-primary)',
                    fontSize: '1rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem'
                  }}>
                    سريع ودقيق
                  </h3>
                  <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.85rem',
                    margin: 0
                  }}>
                    نتائج فورية ودقيقة
                  </p>
                </div>
              </div>

              {/* Instructions */}
              <div style={{ 
                textAlign: 'center', 
                padding: '2rem',
                background: 'rgba(30, 41, 59, 0.4)',
                borderRadius: '16px',
                border: '1px solid var(--card-border)'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '0.75rem', 
                  marginBottom: '1rem', 
                  flexDirection: 'row-reverse'
                }}>
                  <div>
                    <h3 style={{ 
                      color: 'var(--text-secondary)', 
                      fontWeight: '600',
                      fontSize: '1.1rem',
                      marginBottom: '0.5rem'
                    }}>
                      كيفية الاستخدام
                    </h3>
                    <p style={{ 
                      color: 'var(--text-muted)', 
                      fontSize: '0.95rem', 
                      lineHeight: '1.8',
                      margin: 0,
                      textAlign: 'center'
                    }}>
                      أدخل السجل المدني في الحقل أعلاه واضغط على زر البحث للحصول على النتائج فوراً
                    </p>
                  </div>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 16v-4"></path>
                    <path d="M12 8h.01"></path>
                  </svg>
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '2rem',
                  marginTop: '1.5rem',
                  flexWrap: 'wrap'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--text-muted)',
                    fontSize: '0.85rem'
                  }}>
                    <span>1</span>
                    <div style={{
                      width: '24px',
                      height: '2px',
                      background: 'var(--color-primary)',
                      borderRadius: '1px'
                    }}></div>
                    <span>أدخل السجل المدني</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--text-muted)',
                    fontSize: '0.85rem'
                  }}>
                    <span>2</span>
                    <div style={{
                      width: '24px',
                      height: '2px',
                      background: 'var(--color-secondary)',
                      borderRadius: '1px'
                    }}></div>
                    <span>اضغط البحث</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--text-muted)',
                    fontSize: '0.85rem'
                  }}>
                    <span>3</span>
                    <div style={{
                      width: '24px',
                      height: '2px',
                      background: 'var(--color-success)',
                      borderRadius: '1px'
                    }}></div>
                    <span>احصل على النتيجة</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
