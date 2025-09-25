import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DataContext } from '../DataContext';

export default function ResultPage() {
  const { id } = useParams();
  const { rows, loading } = useContext(DataContext);

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
        <div className="container" style={{ maxWidth: '600px', width: '100%' }}>
          <div className="glass-card" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
            {/* Not Found Alert - Text first, then SVG; use gap for spacing */}
            <div className="alert alert-warning" style={{ marginBottom: '2rem', gap: '0.75rem' }}>
              <div> {/* Text content first */}
                <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                  لم يتم العثور على نتيجة
                </div>
                <div style={{ fontSize: '0.9rem', opacity: '0.9' }}>
                  المعرف <strong style={{ color: 'var(--color-primary)' }}>{id}</strong> غير موجود في قاعدة البيانات
                </div>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>

            {/* Suggestions - No change needed here, as it's a simple list */}
            <div style={{ 
              background: 'rgba(30, 41, 59, 0.4)',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '2rem',
              border: '1px solid var(--card-border)'
            }}>
              <h3 style={{ 
                color: 'var(--text-primary)', 
                fontSize: '1.1rem', 
                fontWeight: '600', 
                marginBottom: '1rem' 
              }}>
                اقتراحات للمساعدة:
              </h3>
              <ul style={{ 
                textAlign: 'right', 
                color: 'var(--text-secondary)', 
                fontSize: '0.9rem',
                lineHeight: '1.6',
                paddingLeft: '1.5rem',
                paddingRight: '0'
              }}>
                <li style={{ marginBottom: '0.5rem' }}>تأكد من صحة المعرف المدخل</li>
                <li style={{ marginBottom: '0.5rem' }}>تحقق من عدم وجود مسافات إضافية</li>
                <li>جرب البحث مرة أخرى بمعرف مختلف</li>
              </ul>
            </div>

            {/* Back Button - No change */}
            <Link to="/" className="btn-modern btn-secondary">
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
  const isSuccess = !isNaN(score) ? score >= 95 : record.result === 'ناجح';

  return (
    <div className="App">
      <div className="background-effects">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
      </div>
      
      <div className="container" style={{ maxWidth: '700px', width: '100%' }}>
        <div className="glass-card" style={{ padding: '3rem 2rem' }}>
          {/* Header - Use flex-icon-container class for badge; text first, then SVG */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="flex-icon-container" style={{ 
              display: 'inline-flex', 
              background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1), rgba(99, 102, 241, 0.1))',
              padding: '0.75rem 1.5rem',
              borderRadius: '50px',
              border: '1px solid rgba(20, 184, 166, 0.2)',
              marginBottom: '1.5rem',
              gap: '0.75rem' /* Gap for spacing */
            }}>
              <span style={{ 
                color: 'var(--color-primary)', 
                fontWeight: '600',
                fontSize: '1rem'
              }}>
                تم العثور على النتيجة
              </span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12l2 2 4-4"></path>
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
            </div>
            
            <h1 className="title-primary" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
              نتيجة المعرف
            </h1>
            <div style={{ 
              color: 'var(--color-secondary)', 
              fontSize: '1.5rem', 
              fontWeight: '700',
              textShadow: '0 0 20px rgba(99, 102, 241, 0.3)'
            }}>
              {id}
            </div>
          </div>

          {/* Results Grid - Text first, then SVG in labels; CSS gap handles spacing */}
          <div className="result-grid" style={{ marginBottom: '2.5rem' }}>
            {/* ID Card */}
            <div className="result-item" style={{ 
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(99, 102, 241, 0.05))',
              borderColor: 'rgba(99, 102, 241, 0.3)'
            }}>
              <div className="result-label">
                المعرف {/* Text first */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10,9 9,9 8,9"></polyline>
                </svg>
              </div>
              <div className="result-value" style={{ color: 'var(--color-secondary)' }}>
                {record.id || '-'}
              </div>
            </div>

            {/* Name Card */}
            <div className="result-item" style={{ 
              background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1), rgba(20, 184, 166, 0.05))',
              borderColor: 'rgba(20, 184, 166, 0.3)'
            }}>
              <div className="result-label">
                الاسم {/* Text first */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="result-value" style={{ color: 'var(--color-primary)' }}>
                {record.name || 'غير محدد'}
              </div>
            </div>
          </div>

          {/* Result Status Card - Text first, then SVG; use flex-icon-container class */}
          <div className={`status-card ${isSuccess ? 'status-success' : 'status-error'}`} style={{ 
            textAlign: 'center',
            padding: '2rem',
            marginBottom: '2rem'
          }}>
            <div className="flex-icon-container" style={{ 
              justifyContent: 'center', /* Center the whole thing */
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div> {/* Text content first */}
                <div style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: '600', 
                  color: 'var(--text-secondary)',
                  marginBottom: '0.25rem'
                }}>
                  حالة النتيجة
                </div>
                <div style={{ 
                  fontSize: '1.75rem', 
                  fontWeight: '700',
                  color: isSuccess ? 'var(--color-success)' : 'var(--color-error)',
                  textShadow: `0 0 20px ${isSuccess ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
                }}>
                  {record.result || 'غير محدد'}
                </div>
              </div>
              {isSuccess ? (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22,4 12,14.01 9,11.01"></polyline>
                </svg>
              ) : (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-error)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
              )}
            </div>
            
            {/* Status Description - Completion from isSuccess conditional */}
            <div style={{ 
              fontSize: '0.9rem',
              color: 'var(--text-muted)',
              fontStyle: 'italic'
            }}>
              {isSuccess 
                ? 'تهانينا! لقد حققت النتيجة المطلوبة بنجاح' 
                : 'للأسف، لم تتمكن من تحقيق النتيجة المطلوبة هذه المرة'
              }
            </div>
          </div>

          {/* Action Buttons - No change needed; flex handles RTL naturally */}
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link to="/" className="btn-modern btn-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </Link>
            
            <button 
              onClick={() => window.print()} 
              className="btn-modern btn-outline"
              style={{ minWidth: 'auto' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6,9 6,2 18,2 18,9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 0 0 1 2-2h16a2 0 0 1 2 2v5a2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
