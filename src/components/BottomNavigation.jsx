import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BottomNavigation.css';

// NOT: Bu dosya src/components/BottomNavigation.jsx konumunda olmalı

export default function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: '🏠', label: 'Ana Sayfa' },
    { path: '/gunluk', icon: '📅', label: 'Günlük' },
    { path: '/balik-rehberi', icon: '📚', label: 'Rehber' },
    { path: '/hesaplamalar', icon: '🧮', label: 'Hesap' },
    { path: '/profil', icon: '👤', label: 'Profil' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bottom-navigation">
      {menuItems.map((item) => (
        <button
          key={item.path}
          className={`bottom-nav-item ${isActive(item.path) ? 'active' : ''}`}
          onClick={() => navigate(item.path)}
        >
          <span className="bottom-nav-icon">{item.icon}</span>
          <span className="bottom-nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}