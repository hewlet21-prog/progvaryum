import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './design-system.css';
import './styles/mobile.css';
import Sidebar from "./components/Sidebar";
import BottomNavigation from "./components/BottomNavigation";
import Auth from "./pages/Auth";

// Sayfalar
import Hesaplamalar from './pages/hesaplamalar/Hesaplamalar';
import Dashboard from "./pages/Dashboard";
import Gunluk from "./pages/Gunluk";
import CanliEnvanteri from "./pages/CanliEnvanteri";
import BalikRehberi from "./pages/balikRehberi/BalikRehberi";
import KategoriDetay from "./pages/balikRehberi/KategoriDetay";
import BalikDetay from "./pages/balikRehberi/BalikDetay";
import BitkiKarti from "./pages/bitkiRehberi/BitkiKarti";
import BalikUyumluluk from './pages/BalikUyumluluk/BalikUyumluluk';
import BitkiRehberi from "./pages/bitkiRehberi/BitkiRehberi";
import BalikDoktoru from './pages/BalikDoktoru/BalikDoktoru';
import BalikTartisi from './pages/BalikTartisi';
import EmegiGecenler from './pages/EmegiGecenler';
import PazarYeri from './pages/PazarYeri';
import KurulumSihirbazi from './pages/KurulumSihirbazi/KurulumSihirbazi';
import AkvaryumProfili from './pages/gunluk/AkvaryumProfili';
import Profil from './pages/Profil';

import "./App.css";

// Misafir kullanıcı objesi
const MISAFIR_KULLANICI = {
  id: "misafir",
  isim: "Misafir",
  soyisim: "Kullanıcı",
  kullaniciAdi: "misafir",
  nickname: "Misafir",
  email: "",
  hobiciSinif: "misafir",
  hobiciSeviye: "caylik",
  isMisafir: true,
  avatar: "👤"
};

export default function App() {
  const [aktifKullanici, setAktifKullanici] = useState(MISAFIR_KULLANICI);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [authModalAcik, setAuthModalAcik] = useState(false);
  const [authModalMod, setAuthModalMod] = useState("register");
  const [akvaryumKurulumu, setAkvaryumKurulumu] = useState(null);

  // Sayfa yüklendiğinde oturum ve kurulum kontrolü
  useEffect(() => {
    try {
      // Kullanıcı kontrolü
      const kaydedilmisKullanici = localStorage.getItem("aktifKullanici");
      if (kaydedilmisKullanici && kaydedilmisKullanici !== "undefined") {
        const kullanici = JSON.parse(kaydedilmisKullanici);
        if (!kullanici.isMisafir) {
          setAktifKullanici(kullanici);
        }
      }
      
      // Akvaryum kurulum verisi kontrolü
      const kurulumVerisi = localStorage.getItem("akvaryumKurulum");
      if (kurulumVerisi && kurulumVerisi !== "undefined") {
        setAkvaryumKurulumu(JSON.parse(kurulumVerisi));
      }
    } catch (error) {
      console.error("Yükleme hatası:", error);
    }
    setYukleniyor(false);
  }, []);

  // Giriş yapıldığında
  const handleLogin = (kullanici) => {
    setAktifKullanici(kullanici);
    if (!kullanici.isMisafir) {
      localStorage.setItem("aktifKullanici", JSON.stringify(kullanici));
    }
    setAuthModalAcik(false);
  };

  // Çıkış yapıldığında
  const handleLogout = () => {
    setAktifKullanici(MISAFIR_KULLANICI);
    localStorage.removeItem("aktifKullanici");
  };

  // Auth modalı aç
  const openAuthModal = (mod = "register") => {
    setAuthModalMod(mod);
    setAuthModalAcik(true);
  };

  // Kurulum tamamlandığında
  const handleKurulumTamamla = (tankVerisi) => {
    setAkvaryumKurulumu(tankVerisi);
    localStorage.setItem("akvaryumKurulum", JSON.stringify(tankVerisi));
  };

  // Yüklenirken
  if (yukleniyor) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #0a1628 0%, #1a2a4a 100%)",
        color: "white",
        fontSize: "24px",
        fontWeight: "600"
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "4rem", marginBottom: "20px" }}>🐠</div>
          <div>Yükleniyor...</div>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Kurulum Sihirbazı - Sidebar'sız tam ekran */}
        <Route 
          path="/kurulum" 
          element={
            <KurulumSihirbazi 
              kullanici={aktifKullanici} 
              onKurulumTamamla={handleKurulumTamamla}
            />
          } 
        />
        
        {/* Ana uygulama - Sidebar'lı */}
        <Route path="/*" element={
          <div className="app-container">
            {/* SOL SIDEBAR - Mobilde Gizli */}
            <Sidebar 
              kullanici={aktifKullanici} 
              onLogout={handleLogout} 
              onAuthModalAc={openAuthModal}
              akvaryumKurulumu={akvaryumKurulumu}
            />

            {/* ALT NAVİGASYON - Sadece Mobilde Görünür */}
            <BottomNavigation />

            {/* SAĞ İÇERİK ALANI */}
            <div className="main-content">
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <Dashboard 
                      kullanici={aktifKullanici} 
                      onAuthModalAc={openAuthModal}
                      akvaryumKurulumu={akvaryumKurulumu}
                    />
                  } 
                />
                <Route path="/balik-rehberi" element={<BalikRehberi />} />
                <Route path="/balik-rehberi/:kategoriId" element={<KategoriDetay />} />
                <Route path="/balik-rehberi/:kategoriId/:balikId" element={<BalikDetay />} />
                <Route path="/bitki-rehberi" element={<BitkiRehberi />} />
                <Route path="/bitki-rehberi/:bitkiId" element={<BitkiKarti />} />
                
                {/* Herkese açık sayfalar */}
                <Route path="/emegi-gecenler" element={<EmegiGecenler />} />
                <Route 
                  path="/pazar-yeri" 
                  element={
                    <PazarYeri 
                      kullanici={aktifKullanici} 
                      onAuthModalAc={openAuthModal} 
                    />
                  } 
                />
                
                {/* Üyelere özel sayfalar */}
                {!aktifKullanici.isMisafir ? (
                  <>
                    <Route 
                      path="/hesaplamalar" 
                      element={
                        <Hesaplamalar 
                          akvaryumKurulumu={akvaryumKurulumu}
                        />
                      } 
                    />
                    <Route path="/gunluk" element={<Gunluk />} />
                    <Route 
                      path="/akvaryum-profili" 
                      element={
                        <AkvaryumProfili />
                      } 
                    />
                    <Route 
                      path="/canli-envanteri" 
                      element={
                        <CanliEnvanteri 
                          akvaryumKurulumu={akvaryumKurulumu}
                        />
                      } 
                    />
                    <Route 
                      path="/balik-uyumluluk" 
                      element={
                        <BalikUyumluluk 
                          akvaryumKurulumu={akvaryumKurulumu}
                        />
                      } 
                    />
                    <Route 
                      path="/balik-doktoru" 
                      element={
                        <BalikDoktoru 
                          akvaryumKurulumu={akvaryumKurulumu}
                        />
                      } 
                    />
                    <Route path="/balik-tartisi" element={<BalikTartisi />} />
                  </>
                ) : (
                  <>
                    <Route path="/hesaplamalar" element={<Navigate to="/" />} />
                    <Route path="/gunluk" element={<Navigate to="/" />} />
                    <Route path="/akvaryum-profili" element={<Navigate to="/" />} />
                    <Route path="/canli-envanteri" element={<Navigate to="/" />} />
                    <Route path="/balik-uyumluluk" element={<Navigate to="/" />} />
                    <Route path="/balik-doktoru" element={<Navigate to="/" />} />
                    <Route path="/balik-tartisi" element={<Navigate to="/" />} />
                  </>
                )}
                
                {/* Profil - Herkes için */}
                <Route 
                  path="/profil" 
                  element={
                    <Profil 
                      kullanici={aktifKullanici}
                      onLogout={handleLogout}
                      onAuthModalAc={openAuthModal}
                    />
                  } 
                />
                
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>

            {/* Auth Modal */}
            {authModalAcik && (
              <div 
                className="auth-modal-overlay"
                onClick={() => setAuthModalAcik(false)}
              >
                <div 
                  className="auth-modal-container"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="auth-modal-close"
                    onClick={() => setAuthModalAcik(false)}
                  >
                    ✕
                  </button>
                  <Auth onLogin={handleLogin} initialMode={authModalMod} />
                </div>
              </div>
            )}
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}