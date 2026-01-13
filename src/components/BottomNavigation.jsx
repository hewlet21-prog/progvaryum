import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BottomNavigation.css';

// NOT: Bu dosya src/components/BottomNavigation.jsx konumunda olmalı

export default function BottomNavigation({ kullanici }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isMisafir = kullanici?.isMisafir !== false;

  const menuItems = [
    { path: '/', icon: '🏠', label: 'Ana Sayfa', kilitli: false },
    { path: '/gunluk', icon: '📅', label: 'Günlük', kilitli: isMisafir },
    { path: '/balik-rehberi', icon: '🐠', label: 'Balık', kilitli: false },
    { path: '/bitki-rehberi', icon: '🌿', label: 'Bitki', kilitli: false },
    { path: '/hesaplamalar', icon: '🧮', label: 'Hesap', kilitli: isMisafir },
    { path: '/profil', icon: '👤', label: 'Profil', kilitli: false },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleClick = (item) => {
    if (item.kilitli) {
      // Kilitli ise profil sayfasına yönlendir (üye ol göster)
      navigate('/profil');
    } else {
      navigate(item.path);
    }
  };

  return (
    <nav className="bottom-navigation">
      {menuItems.map((item) => (
        <button
          key={item.path}
          className={`bottom-nav-item ${isActive(item.path) ? 'active' : ''} ${item.kilitli ? 'locked' : ''}`}
          onClick={() => handleClick(item)}
        >
          <span className="bottom-nav-icon">{item.icon}</span>
          <span className="bottom-nav-label">{item.label}</span>
          {item.kilitli && <span className="lock-badge">🔒</span>}
        </button>
      ))}
    </nav>
  );
}