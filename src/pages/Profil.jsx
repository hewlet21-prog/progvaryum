import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profil.css';

// NOT: Bu dosya src/pages/Profil.jsx konumunda olmalı

export default function Profil({ kullanici, onLogout, onAuthModalAc }) {
  const navigate = useNavigate();
  const [akvaryumlar, setAkvaryumlar] = useState([]);
  const [aktifAkvaryumId, setAktifAkvaryumId] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('akvaryumlar') || '[]');
    setAkvaryumlar(stored);
    setAktifAkvaryumId(localStorage.getItem('aktifAkvaryumId'));
  }, []);

  const menuItems = [
    { icon: '🏠', label: 'Ana Sayfa', path: '/', color: '#4ecdc4' },
    { icon: '🧙', label: 'Kurulum Sihirbazı', path: '/kurulum', color: '#f39c12' },
    { icon: '📅', label: 'Günlük İşlemler', path: '/gunluk', color: '#e74c3c' },
    { icon: '🐠', label: 'Canlı Envanteri', path: '/canli-envanteri', color: '#9b59b6' },
    { icon: '📚', label: 'Balık Rehberi', path: '/balik-rehberi', color: '#3498db' },
    { icon: '🌿', label: 'Bitki Rehberi', path: '/bitki-rehberi', color: '#27ae60' },
    { icon: '🧮', label: 'Hesaplamalar', path: '/hesaplamalar', color: '#e67e22' },
    { icon: '🤝', label: 'Balığım Uyumlu Mu?', path: '/uyumluluk', color: '#1abc9c' },
    { icon: '🏥', label: 'Balık Doktoru', path: '/balik-doktoru', color: '#c0392b' },
    { icon: '⚖️', label: 'Balık Tartısı', path: '/balik-tartisi', color: '#8e44ad' },
    { icon: '🐠', label: 'Balık Satış Bilgileri', path: '/pazar-yeri', color: '#16a085' },
    { icon: '💙', label: 'Emeği Geçenler', path: '/emegi-gecenler', color: '#e91e63' },
  ];

  return (
    <div className="profil-container">
      {/* Profil Header */}
      <div className="profil-header">
        <div className="profil-avatar">
          {kullanici?.avatar || '👤'}
        </div>
        <h2 className="profil-isim">
          {kullanici?.isMisafir ? 'Misafir Kullanıcı' : `${kullanici?.isim} ${kullanici?.soyisim}`}
        </h2>
        <p className="profil-kullanici-adi">@{kullanici?.kullaniciAdi || 'misafir'}</p>
        
        <div className="profil-seviye">
          <span className="seviye-badge">
            {kullanici?.hobiciSeviye === 'caylik' ? '🌱 Çaylak' :
             kullanici?.hobiciSeviye === 'tecrubeli' ? '🌿 Tecrübeli' :
             kullanici?.hobiciSeviye === 'uzman' ? '🌳 Uzman' : '🌱 Çaylak'}
          </span>
        </div>
      </div>

      {/* Misafir için Üye Ol/Giriş */}
      {kullanici?.isMisafir && (
        <div className="profil-auth-buttons">
          <button 
            className="auth-btn register"
            onClick={() => onAuthModalAc && onAuthModalAc('register')}
          >
            🚀 Üye Ol - Tüm Özelliklere Eriş
          </button>
          <button 
            className="auth-btn login"
            onClick={() => onAuthModalAc && onAuthModalAc('login')}
          >
            🔑 Giriş Yap
          </button>
        </div>
      )}

      {/* Akvaryumlarım */}
      {akvaryumlar.length > 0 && (
        <div className="profil-section">
          <h3 className="section-title">🐠 Akvaryumlarım</h3>
          <div className="akvaryum-list">
            {akvaryumlar.map(akv => (
              <div 
                key={akv.id} 
                className={`akvaryum-item ${akv.id === aktifAkvaryumId ? 'active' : ''}`}
                onClick={() => navigate('/kurulum')}
              >
                <span className="akv-icon">🐟</span>
                <div className="akv-info">
                  <span className="akv-isim">{akv.akvaryumAdi || 'Akvaryum'}</span>
                  <span className="akv-detay">{akv.netLitre}L • {akv.suTuru === 'tatli' ? 'Tatlı Su' : 'Tuzlu Su'}</span>
                </div>
                {akv.id === aktifAkvaryumId && <span className="akv-aktif">✓</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tüm Menüler */}
      <div className="profil-section">
        <h3 className="section-title">📱 Tüm Özellikler</h3>
        <div className="menu-grid">
          {menuItems.map((item, idx) => (
            <button 
              key={idx}
              className="menu-item"
              onClick={() => navigate(item.path)}
              style={{ '--item-color': item.color }}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Çıkış Yap */}
      {!kullanici?.isMisafir && (
        <div className="profil-section">
          <button className="logout-btn" onClick={onLogout}>
            🚪 Çıkış Yap
          </button>
        </div>
      )}

      {/* Uygulama Bilgisi */}
      <div className="profil-footer">
        <p>PROGVARYUM v1.0.0</p>
        <p>Hobici Akvaryum Asistanı</p>
      </div>
    </div>
  );
}