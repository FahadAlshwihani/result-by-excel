import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DataContext } from '../DataContext';

export default function ResultPage() {
  const { id } = useParams();
  const { rows, loading } = useContext(DataContext);
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  if (loading) {
    return (
      <div className="App">
        <div className="background-effects">
          <div className="floating-orb orb-1"></div>
          <div className="floating-orb orb-2"></div>
          <div className="floating-orb orb-3"></div>
        </div>
        <div className="container" style={{ maxWidth: '500px', width: '100%' }}>
          <div className="glass-card">
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
          </div>
        </div>
      </div>
    );
  }

  const record = rows.find(r => String(r.id).trim() === String(id).trim());

  if (!record) {
    return (
      <div className="App">
        <div className="background-effects">
          <div className="floating-orb orb-1"></div>
          <div className="floating-orb orb-2"></div>
          <div className="floating-orb orb-3"></div>
        </div>
        <div className="container" style={{ maxWidth: '700px', width: '100%' }}>
          <div className="glass-card" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
            {/* Not Found Alert */}
            <div className="alert alert-warning" style={{ marginBottom: '2.5rem', gap: '1rem' }}>
              <div>
                <div style={{ fontWeight: '600', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                  لم يتم العثور على نتيجة
                </div>
                <div style={{ fontSize: '0.95rem', opacity: '0.9' }}>
                  السجل المدني <strong style={{ color: 'var(--color-warning)' }}>{id}</strong> غير موجود في قاعدة البيانات
                </div>
              </div>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>

            {/* Suggestions */}
            <div style={{ 
              background: 'rgba(30, 41, 59, 0.4)',
              borderRadius: '16px',
              padding: '2rem',
              marginBottom: '2.5rem',
              border: '1px solid var(--card-border)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem',
                flexDirection: 'row-reverse'
              }}>
                <h3 style={{ 
                  color: 'var(--text-primary)', 
                  fontSize: '1.2rem', 
                  fontWeight: '600',
                  margin: 0
                }}>
                  اقتراحات للمساعدة
                </h3>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 17h.01"></path>
                </svg>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
              }}>
                <div style={{
                  background: 'rgba(99, 102, 241, 0.05)',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  borderRadius: '12px',
                  padding: '1rem',
                  textAlign: 'center'
                }}>
                  <div style={{
                    color: 'var(--color-secondary)',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}>
                    تأكد من صحة السجل المدني المدخل
                  </div>
                </div>
                <div style={{
                  background: 'rgba(20, 184, 166, 0.05)',
                  border: '1px solid rgba(20, 184, 166, 0.2)',
                  borderRadius: '12px',
                  padding: '1rem',
                  textAlign: 'center'
                }}>
                  <div style={{
                    color: 'var(--color-primary)',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}>
                    تحقق من عدم وجود مسافات إضافية
                  </div>
                </div>
                <div style={{
                  background: 'rgba(245, 158, 11, 0.05)',
                  border: '1px solid rgba(245, 158, 11, 0.2)',
                  borderRadius: '12px',
                  padding: '1rem',
                  textAlign: 'center'
                }}>
                  <div style={{
                    color: 'var(--color-warning)',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}>
                    جرب البحث مرة أخرى
                  </div>
                </div>
              </div>
            </div>

            {/* Back Button */}
            <Link to="/" className="btn-modern btn-secondary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5"></path>
                <path d="M12 19l-7-7 7-7"></path>
              </svg>
              العودة للبحث
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const score = Number(record.result);
  const isSuccess = !isNaN(score) ? score >= 0 : record.result === 'ناجح';

  return (
    <div className="App">
      <div className="background-effects">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
      </div>
      
      <div className="container" style={{ maxWidth: '800px', width: '100%' }}>
        <div className="glass-card" style={{ padding: '3rem 2rem' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ 
              display: 'inline-flex', 
              background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1), rgba(99, 102, 241, 0.1))',
              padding: '0.75rem 1.5rem',
              borderRadius: '50px',
              border: '1px solid rgba(20, 184, 166, 0.2)',
              marginBottom: '2rem',
              gap: '0.75rem',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ 
                color: 'var(--color-primary)', 
                fontWeight: '600',
                fontSize: '1rem'
              }}>
                تم العثور على النتيجة بنجاح
              </span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12l2 2 4-4"></path>
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
            </div>
            
            <h1 className="title-primary" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
              ثانوية الكسائي
            </h1>
            <div style={{ 
              color: 'var(--color-secondary)', 
              fontSize: '1.5rem', 
              fontWeight: '700',
              textShadow: '0 0 20px rgba(99, 102, 241, 0.3)',
              background: 'rgba(99, 102, 241, 0.1)',
              padding: '0.5rem 1rem',
              borderRadius: '12px',
              display: 'inline-block',
              border: '1px solid rgba(99, 102, 241, 0.2)'
            }}>
              السجل المدني: {id}
            </div>
          </div>

          {/* Results Grid */}
          <div className="result-grid" style={{ marginBottom: '3rem' }}>
            {/* ID Card */}
            <div className="result-item" style={{ 
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(99, 102, 241, 0.05))',
              borderColor: 'rgba(99, 102, 241, 0.3)'
            }}>
              <div className="result-label">
                السجل المدني
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10,9 9,9 8,9"></polyline>
                </svg>
              </div>
              <div className="result-value" style={{ color: 'var(--color-secondary)', fontSize: '1.4rem' }}>
                {record.id || '-'}
              </div>
            </div>

            {/* Name Card */}
            <div className="result-item" style={{ 
              background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1), rgba(20, 184, 166, 0.05))',
              borderColor: 'rgba(20, 184, 166, 0.3)'
            }}>
              <div className="result-label">
                اسم الطالب
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="result-value" style={{ color: 'var(--color-primary)', fontSize: '1.4rem' }}>
                {record.name || 'غير محدد'}
              </div>
            </div>
          </div>

          {/* Result Status Card */}
          <div className={`status-card ${isSuccess ? 'status-success' : 'status-error'}`} style={{ 
            textAlign: 'center',
            padding: '2.5rem',
            marginBottom: '3rem'
          }}>
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
              marginBottom: '1.5rem',
              flexDirection: 'row-reverse'
            }}>
              <div>
                <div style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: '600', 
                  color: 'var(--text-secondary)',
                  marginBottom: '0.5rem'
                }}>
                  درجات التميز السلوكي
                </div>
                <div style={{ 
                  fontSize: '3rem', 
                  fontWeight: '700',
                  color: isSuccess ? 'var(--color-success)' : 'var(--color-error)',
                  textShadow: `0 0 20px ${isSuccess ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                  lineHeight: '1'
                }}>
                  {record.result || '0'}
                </div>
              </div>
              {isSuccess ? (
                <div style={{
                  background: 'rgba(34, 197, 94, 0.1)',
                  borderRadius: '50%',
                  padding: '1rem',
                  border: '2px solid rgba(34, 197, 94, 0.3)'
                }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22,4 12,14.01 9,11.01"></polyline>
                  </svg>
                </div>
              ) : (
                <div style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  borderRadius: '50%',
                  padding: '1rem',
                  border: '2px solid rgba(239, 68, 68, 0.3)'
                }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-error)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                  </svg>
                </div>
              )}
            </div>
            
            {/* Status Description */}
            <div style={{
              background: isSuccess ? 'rgba(34, 197, 94, 0.05)' : 'rgba(239, 68, 68, 0.05)',
              border: `1px solid ${isSuccess ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
              borderRadius: '12px',
              padding: '1.5rem',
              marginTop: '1rem'
            }}>
              <div style={{ 
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                fontWeight: '500',
                lineHeight: '1.6'
              }}>
                {isSuccess 
                  ? 'تتمنى لك ثانوية الكسائي بحائل مستقبلاً مشرقاً وتفوقاً مستمراً.' 
                  : 'نأسف لعدم تحقيق الدرجة المطلوبة هذه المرة. لا تيأس واستمر في العمل الجاد، فالنجاح يأتي مع المثابرة والاجتهاد.'
                }
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link to="/" className="btn-modern btn-primary" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              بحث جديد
            </Link>
            
            <button 
              onClick={handlePrint}
              className="btn-modern btn-outline"
              style={{ fontSize: '1rem', padding: '1rem 2rem' }}
              disabled={isPrinting}
            >
              {isPrinting ? (
                <div style={{ 
                  width: '20px', 
                  height: '20px', 
                  border: '2px solid transparent',
                  borderTop: '2px solid currentColor',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6,9 6,2 18,2 18,9"></polyline>
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 0 0 1-2 2h-2"></path>
                  <rect x="6" y="14" width="12" height="8"></rect>
                </svg>
              )}
              طباعة النتيجة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
