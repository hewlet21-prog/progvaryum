import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar({ kullanici, onLogout, onAuthModalAc }) {
  const isMisafir = kullanici?.isMisafir;

  const seviyeRozetleri = {
    caylik: { emoji: "🌱", label: "Çaylak", renk: "#95a5a6" },
    acemi: { emoji: "🐟", label: "Acemi", renk: "#3498db" },
    usta: { emoji: "🏆", label: "Usta", renk: "#f39c12" },
    profesyonel: { emoji: "👑", label: "Profesyonel", renk: "#9b59b6" },
    misafir: { emoji: "👤", label: "Misafir", renk: "#7f8c8d" }
  };

  const seviye = seviyeRozetleri[kullanici?.hobiciSeviye || kullanici?.hobiciSinif || "caylik"];

  const menuItems = [
    { path: "/", icon: "🏠", label: "Ana Sayfa", kilitli: false },
    { path: "/kurulum", icon: "🧙", label: "Kurulum Sihirbazı", kilitli: false, ayrik: true },
    { path: "/gunluk", icon: "📅", label: "Günlük", kilitli: true },
    { path: "/canli-envanteri", icon: "🐠", label: "Canlı Envanteri", kilitli: true },
    { path: "/balik-rehberi", icon: "📚", label: "Balık Rehberi", kilitli: false },
    { path: "/bitki-rehberi", icon: "🌿", label: "Bitki Rehberi", kilitli: false },
    { path: "/hesaplamalar", icon: "🧮", label: "Hesaplamalar", kilitli: true },
    { path: "/balik-uyumluluk", icon: "🤖", label: "Balığım Uyumlu Mu?", kilitli: true },
    { path: "/balik-doktoru", icon: "🏥", label: "Balık Doktoru", kilitli: true },
    { path: "/balik-tartisi", icon: "⚖️", label: "Balık Tartısı", kilitli: true },
    { path: "/forum", icon: "💬", label: "Forum", kilitli: true },
    { path: "/pazar-yeri", icon: "🛒", label: "Pazar Yeri", kilitli: false }, // Herkese açık
  ];

  const handleLockedClick = () => {
    if (onAuthModalAc) {
      onAuthModalAc("register");
    }
  };

  return (
    <div className="sidebar">
      {/* KULLANICI PROFİLİ */}
      <div className="sidebar-profile">
        <div className={`profile-avatar ${isMisafir ? 'misafir' : ''}`}>
          {kullanici?.avatar || (kullanici?.isim?.charAt(0) || "M") + (kullanici?.soyisim?.charAt(0) || "")}
        </div>
        <div className="profile-info">
          <h3 className="profile-name">{kullanici?.isim} {kullanici?.soyisim}</h3>
          <p className="profile-username">@{kullanici?.kullaniciAdi}</p>
          <div 
            className="profile-badge"
            style={{ background: seviye?.renk || "#95a5a6" }}
          >
            <span>{seviye?.emoji || "🐟"}</span>
            <span>{seviye?.label || "Hobici"}</span>
          </div>
        </div>
      </div>

      {/* MİSAFİR İÇİN ÜYE OL BUTONLARI */}
      {isMisafir && (
        <div className="sidebar-auth-buttons">
          <button 
            className="btn-uye-ol"
            onClick={() => onAuthModalAc && onAuthModalAc("register")}
          >
            🚀 Üye Ol - Tüm Özelliklere Eriş
          </button>
          <button 
            className="btn-giris-yap"
            onClick={() => onAuthModalAc && onAuthModalAc("login")}
          >
            🔐 Giriş Yap
          </button>
        </div>
      )}

      {/* MENÜ */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const isLocked = isMisafir && item.kilitli;
          
          if (isLocked) {
            return (
              <div
                key={item.path}
                className="nav-item locked"
                onClick={handleLockedClick}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.label}</span>
                <span className="lock-icon">🔒</span>
              </div>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.label}</span>
            </NavLink>
          );
        })}

        <div className="nav-divider"></div>

        <div className="nav-item logout" onClick={onLogout}>
          <span className="nav-icon">🚪</span>
          <span className="nav-text">{isMisafir ? "Çıkış" : "Çıkış Yap"}</span>
        </div>

        {/* Emeği Geçenler */}
        <NavLink
          to="/emegi-gecenler"
          className={({ isActive }) => `nav-item emegi-gecenler ${isActive ? 'active' : ''}`}
        >
          <span className="nav-icon">💙</span>
          <span className="nav-text">Emeği Geçenler</span>
        </NavLink>
      </nav>

      {/* FOOTER */}
      <div className="sidebar-footer">
        <p>Akvaryum Hobi Yönetimi</p>
        <p>v1.0.0</p>
      </div>
    </div>
  );
}