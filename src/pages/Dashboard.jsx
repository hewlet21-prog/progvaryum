import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAkvaryumStorage, getAktifAkvaryumId } from "../hooks/useAkvaryumStorage";
import AquariumVideoCanvas from "../components/AquariumVideoCanvas";
import "./Dashboard.css";

// NOT: Bu dosya src/pages/Dashboard.jsx konumunda olmalı

export default function Dashboard({ kullanici, onAuthModalAc, akvaryumKurulumu }) {
  const navigate = useNavigate();

  // Aktif akvaryum ID'si
  const [aktifAkvaryumId, setAktifAkvaryumId] = useState(getAktifAkvaryumId());

  // Yemleme - Akvaryuma özel
  const [sonYemleme] = useAkvaryumStorage("sonYemleme", null);
  const [feedInterval] = useAkvaryumStorage("feedInterval", 8);
  
  const [filterCounter] = useAkvaryumStorage("filterCounter", 0);
  const [waterCounter] = useAkvaryumStorage("waterCounter", 0);
  
  // Akvaryum bilgileri - aktif akvaryumdan al
  const [akvaryumBilgi, setAkvaryumBilgi] = useState({
    hacim: 100,
    boy: 80,
    en: 30,
    yukseklik: 40,
    bitkili: true
  });
  
  const [balikEnvanteri] = useAkvaryumStorage("balikEnvanteri", []);
  const [testler] = useAkvaryumStorage("testKiti", []);
  
  const [gozlemler] = useAkvaryumStorage("gozlemler", []);
  const [ilacTedavi] = useAkvaryumStorage("ilacTedavi", []);
  const [bitkiBudama] = useAkvaryumStorage("bitkiBudama", []);
  const [stokTakip] = useAkvaryumStorage("stokTakip", []);
  
  const [aktifKuluçka] = useAkvaryumStorage("aktifKuluçka", null);
  const [sumpCounter] = useAkvaryumStorage("sumpCounter", 0);
  const [gubreleme] = useAkvaryumStorage("gubreleme", []);

  // Pazar Yeri verileri (global)
  const [pazarIlanlar, setPazarIlanlar] = useState([]);

  const [yemRemaining, setYemRemaining] = useState({ text: "Başlatılmadı", status: "neutral" });
  const [currentTime, setCurrentTime] = useState(new Date());

  // Aktif akvaryum verilerini yükle
  useEffect(() => {
    const akvaryumlar = JSON.parse(localStorage.getItem('akvaryumlar') || '[]');
    const aktifId = getAktifAkvaryumId();
    const aktifAkvaryum = akvaryumlar.find(a => a.id === aktifId);
    
    if (aktifAkvaryum) {
      setAkvaryumBilgi({
        hacim: aktifAkvaryum.netLitre || 100,
        boy: aktifAkvaryum.uzunluk || 80,
        en: aktifAkvaryum.genislik || 30,
        yukseklik: aktifAkvaryum.yukseklik || 40,
        bitkili: aktifAkvaryum.bitkiVar || false
      });
    }
    
    // Pazar verilerini yükle (global)
    try {
      const ilanlar = JSON.parse(localStorage.getItem('pazarYeriIlanlar') || '[]');
      setPazarIlanlar(ilanlar);
    } catch (e) {
      console.error('Veri yükleme hatası:', e);
    }
  }, [aktifAkvaryumId]);

  // Akvaryum değişikliğini dinle
  useEffect(() => {
    const handleAkvaryumDegisti = (e) => {
      setAktifAkvaryumId(e.detail?.akvaryumId || getAktifAkvaryumId());
    };

    window.addEventListener('akvaryumDegisti', handleAkvaryumDegisti);
    return () => window.removeEventListener('akvaryumDegisti', handleAkvaryumDegisti);
  }, []);

  // Saat güncelleme
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Yemleme sayacı - TEK SAYAÇ
  useEffect(() => {
    const interval = setInterval(() => {
      if (!sonYemleme) {
        setYemRemaining({ text: "Başlatılmadı", status: "neutral" });
      } else {
        const next = new Date(sonYemleme);
        next.setHours(next.getHours() + feedInterval);
        const diff = next - new Date();

        if (diff <= 0) {
          setYemRemaining({ text: "🔔 Yemleme zamanı!", status: "alert" });
        } else {
          const hours = Math.floor(diff / 3600000);
          const mins = Math.floor((diff / 60000) % 60);
          setYemRemaining({ 
            text: `${hours}s ${mins}d`, 
            status: hours < 1 ? "warning" : "ok" 
          });
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [sonYemleme, feedInterval]);

  const toplamBalik = balikEnvanteri.reduce((toplam, b) => {
    return toplam + parseInt(b.erkek || 0) + parseInt(b.disi || 0) + parseInt(b.belirsiz || 0);
  }, 0);

  const toplamHasta = balikEnvanteri.reduce((toplam, b) => 
    toplam + parseInt(b.hasta || 0), 0
  );

  const litreBasinaBalik = toplamBalik > 0 
    ? (akvaryumBilgi.hacim / toplamBalik).toFixed(1) 
    : 0;

  const yemZamani = yemRemaining.status === "alert";
  const sonTest = testler.length > 0 ? testler[0] : null;
  const nitratYuksek = sonTest?.no3 && parseFloat(sonTest.no3) > 40;
  const amonyakVar = sonTest?.nh3 && parseFloat(sonTest.nh3) > 0.5;
  const nitritVar = sonTest?.no2 && parseFloat(sonTest.no2) > 0.5;
  const kapasite = litreBasinaBalik < 3 && toplamBalik > 0;

  const sonGozlem = gozlemler.length > 0 ? gozlemler[0] : null;
  const aktifTedavi = ilacTedavi.find(t => t.baslangic && t.bitis && 
    new Date(t.baslangic) <= new Date() && new Date(t.bitis) >= new Date()
  );
  const sonBudama = bitkiBudama.length > 0 ? bitkiBudama[0] : null;
  const sonStok = stokTakip.length > 0 ? stokTakip[0] : null;
  const sonGubreleme = gubreleme.length > 0 ? gubreleme[0] : null;

  function getTimeAgo(dateString) {
    if (!dateString) return "Hiç yapılmadı";
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(hours / 24);
    const mins = Math.floor(diff / 60000);
    
    if (days > 0) return `${days} gün önce`;
    if (hours > 0) return `${hours} saat önce`;
    if (mins > 0) return `${mins} dk önce`;
    return "Az önce";
  }

  // Kurulum verilerinden hesaplamalar
  const kurulumVerisi = akvaryumKurulumu || {};
  const kurulumBalikSayisi = kurulumVerisi.seciliBaliklar?.reduce((t, b) => t + b.adet, 0) || 0;
  const maksBalikKapasite = Math.floor((kurulumVerisi.netLitre || 0) / 5);
  const kapasiteYuzdesi = maksBalikKapasite > 0 ? Math.round((kurulumBalikSayisi / maksBalikKapasite) * 100) : 0;

  // Tarih formatla
  const formatKurulumTarihi = (tarihStr) => {
    if (!tarihStr) return 'Belirtilmedi';
    const tarih = new Date(tarihStr);
    return tarih.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  // Kaç gün önce kuruldu
  const kurulumGunu = () => {
    if (!kurulumVerisi.olusturmaTarihi) return null;
    const tarih = new Date(kurulumVerisi.olusturmaTarihi);
    const bugun = new Date();
    const fark = Math.floor((bugun - tarih) / (1000 * 60 * 60 * 24));
    return fark;
  };

  return (
    <div className="dashboard">
      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <h1>🐠 PROGVARYUM</h1>
          <p className="subtitle">HOBİCİ AKVARYUM ANASAYFASI</p>
        </div>
        <div className="header-time">
          <div className="time-display">
            {currentTime.toLocaleTimeString('tr-TR')}
          </div>
          <div className="date-display">
            {currentTime.toLocaleDateString('tr-TR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </div>

      {/* AKVARYUM - TAM GENİŞLİK */}
      <div className="akvaryum-wrapper">
        <AquariumVideoCanvas
          akvaryumBilgi={akvaryumBilgi}
          balikEnvanteri={[
            // Kurulum sihirbazından seçilen balıklar
            ...(kurulumVerisi.seciliBaliklar?.map(b => ({
              tur: b.ad,
              adet: b.adet,
              emoji: b.emoji
            })) || []),
            // Canlı envanterinden eklenen balıklar
            ...balikEnvanteri
          ]}
          toplamBalik={toplamBalik}
          litreBasinaBalik={litreBasinaBalik}
          yemZamani={yemZamani}
          kapasite={kapasite}
          nitratYuksek={nitratYuksek}
        />
      </div>

      {/* ========== YENİ: AKVARYUM ÖZET KARTI ========== */}
      {kurulumVerisi.id && (
        <div className="akvaryum-ozet-kart" onClick={() => navigate('/gunluk')}>
          <div className="ozet-header">
            <div className="ozet-baslik">
              <span className="ozet-emoji">🐠</span>
              <div>
                <h3>{kurulumVerisi.akvaryumAdi || 'Akvaryumum'}</h3>
                <span className="ozet-alt-baslik">
                  {kurulumVerisi.suTuru === 'tatli' ? '💧 Tatlı Su' : '🌊 Tuzlu Su'} • 
                  {kurulumVerisi.kurulumSeviyesi === 'low' ? ' 🟢 Low Tech' :
                   kurulumVerisi.kurulumSeviyesi === 'mid' ? ' 🟡 Mid Tech' : ' 🔴 High Tech'}
                </span>
              </div>
            </div>
            <div className="ozet-tarih">
              <span className="kurulum-gun">{kurulumGunu() !== null ? `${kurulumGunu()} gün` : '-'}</span>
              <span className="kurulum-etiket">Yaşında</span>
            </div>
          </div>

          <div className="ozet-stats-grid">
            {/* Litre */}
            <div className="ozet-stat">
              <span className="ozet-stat-icon">💧</span>
              <div className="ozet-stat-bilgi">
                <span className="ozet-stat-deger">{kurulumVerisi.netLitre || 0}L</span>
                <span className="ozet-stat-etiket">Hacim</span>
              </div>
            </div>

            {/* Boyutlar */}
            <div className="ozet-stat">
              <span className="ozet-stat-icon">📐</span>
              <div className="ozet-stat-bilgi">
                <span className="ozet-stat-deger">{kurulumVerisi.uzunluk || 0}×{kurulumVerisi.genislik || 0}×{kurulumVerisi.yukseklik || 0}</span>
                <span className="ozet-stat-etiket">cm</span>
              </div>
            </div>

            {/* Balık Sayısı */}
            <div className="ozet-stat">
              <span className="ozet-stat-icon">🐟</span>
              <div className="ozet-stat-bilgi">
                <span className={`ozet-stat-deger ${kurulumBalikSayisi > maksBalikKapasite ? 'uyari' : ''}`}>
                  {kurulumBalikSayisi} / {maksBalikKapasite}
                </span>
                <span className="ozet-stat-etiket">Balık</span>
              </div>
            </div>

            {/* pH */}
            <div className="ozet-stat">
              <span className="ozet-stat-icon">📊</span>
              <div className="ozet-stat-bilgi">
                <span className="ozet-stat-deger">{kurulumVerisi.ph || sonTest?.ph || '-'}</span>
                <span className="ozet-stat-etiket">pH</span>
              </div>
            </div>

            {/* Sıcaklık */}
            <div className="ozet-stat">
              <span className="ozet-stat-icon">🌡️</span>
              <div className="ozet-stat-bilgi">
                <span className="ozet-stat-deger">{kurulumVerisi.sicaklik || sonTest?.sicaklik || '-'}°C</span>
                <span className="ozet-stat-etiket">Sıcaklık</span>
              </div>
            </div>

            {/* Hasta Balık */}
            <div className="ozet-stat">
              <span className="ozet-stat-icon">🏥</span>
              <div className="ozet-stat-bilgi">
                <span className={`ozet-stat-deger ${kurulumVerisi.hastaBalikVar || toplamHasta > 0 ? 'hasta' : 'saglikli'}`}>
                  {kurulumVerisi.hastaBalikVar || toplamHasta > 0 ? `⚠️ ${toplamHasta || 'Var'}` : '✅ Sağlıklı'}
                </span>
                <span className="ozet-stat-etiket">Sağlık</span>
              </div>
            </div>
          </div>

          {/* Balık Listesi */}
          {kurulumVerisi.seciliBaliklar?.length > 0 && (
            <div className="ozet-baliklar">
              <span className="balik-listesi-baslik">İçindeki Balıklar:</span>
              <div className="balik-chip-container">
                {kurulumVerisi.seciliBaliklar.slice(0, 5).map((balik, idx) => (
                  <span key={idx} className="balik-mini-chip">
                    {balik.emoji} {balik.ad} ×{balik.adet}
                  </span>
                ))}
                {kurulumVerisi.seciliBaliklar.length > 5 && (
                  <span className="balik-mini-chip daha-fazla">
                    +{kurulumVerisi.seciliBaliklar.length - 5} tür daha
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Kapasite Bar */}
          <div className="kapasite-bar-container">
            <div className="kapasite-bar-header">
              <span>Kapasite Kullanımı</span>
              <span className={kapasiteYuzdesi > 100 ? 'asim' : ''}>{kapasiteYuzdesi}%</span>
            </div>
            <div className="kapasite-bar">
              <div 
                className={`kapasite-dolgu ${kapasiteYuzdesi > 100 ? 'asim' : kapasiteYuzdesi > 80 ? 'uyari' : 'normal'}`}
                style={{ width: `${Math.min(kapasiteYuzdesi, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="ozet-footer">
            <span>📅 Kurulum: {formatKurulumTarihi(kurulumVerisi.olusturmaTarihi)}</span>
            <span className="detay-link">Detaylar için tıkla →</span>
          </div>
        </div>
      )}

      {/* Kurulum yoksa yönlendirme */}
      {!kurulumVerisi.id && (
        <div className="kurulum-yok-banner" onClick={() => navigate('/kurulum')}>
          <span className="banner-emoji">🧙</span>
          <div className="banner-icerik">
            <h3>Akvaryumunu Tanımla</h3>
            <p>Kurulum sihirbazını kullanarak akvaryum profilini oluştur</p>
          </div>
          <span className="banner-ok">→</span>
        </div>
      )}

      {/* QUICK STATS */}
      <div className="quick-stats">
        <div 
          className={`stat-card ${yemZamani ? 'stat-alert' : ''}`}
          onClick={() => navigate('/gunluk')}
        >
          <div className="stat-icon">🍽️</div>
          <div className="stat-info">
            <h3>{yemRemaining.text}</h3>
            <p>Sonraki Yemleme</p>
            {sonYemleme && <span className="stat-detail">{getTimeAgo(sonYemleme)}</span>}
          </div>
        </div>

        <div 
          className={`stat-card ${waterCounter >= 7 ? 'stat-alert' : ''}`}
          onClick={() => navigate('/gunluk')}
        >
          <div className="stat-icon">💧</div>
          <div className="stat-info">
            <h3>{waterCounter} gün</h3>
            <p>Su Değişimi</p>
            <span className="stat-detail">{waterCounter >= 7 ? '⚠️ Su değişimi yapın!' : 'Son değişimden beri'}</span>
          </div>
        </div>

        <div 
          className={`stat-card ${filterCounter >= 14 ? 'stat-alert' : ''}`}
          onClick={() => navigate('/gunluk')}
        >
          <div className="stat-icon">🧽</div>
          <div className="stat-info">
            <h3>{filterCounter} gün</h3>
            <p>Filtre Temizliği</p>
            <span className="stat-detail">{filterCounter >= 14 ? '⚠️ Temizlik zamanı!' : 'Son temizlikten beri'}</span>
          </div>
        </div>
      </div>

      {/* GÜNLÜK ÖZET */}
      <div className="section">
        <h2>📊 Günlük Özet</h2>
        <div className="daily-summary-grid">
          {/* TEST KİTİ */}
          <div className={`summary-card ${(nitratYuksek || amonyakVar || nitritVar) ? 'summary-alert' : ''}`} onClick={() => navigate('/gunluk')}>
            <div className="summary-header">
              <span className="summary-icon" style={{ background: '#9b59b6' }}>🧪</span>
              <h3>Su Parametreleri</h3>
              {sonTest && <span className="test-tarihi">{getTimeAgo(sonTest.tarih)}</span>}
            </div>
            <div className="summary-content">
              {sonTest ? (
                <>
                  <div className="summary-item">
                    <span className="summary-label">pH:</span>
                    <span className="summary-value">{sonTest.ph || '-'}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">NH₃:</span>
                    <span className={`summary-value ${amonyakVar ? 'alert' : 'ok'}`}>
                      {sonTest.nh3 || '-'} {amonyakVar && '⚠️'}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">NO₂:</span>
                    <span className={`summary-value ${nitritVar ? 'alert' : 'ok'}`}>
                      {sonTest.no2 || '-'} {nitritVar && '⚠️'}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">NO₃:</span>
                    <span className={`summary-value ${nitratYuksek ? 'warning' : 'ok'}`}>
                      {sonTest.no3 || '-'} {nitratYuksek && '⚠️'}
                    </span>
                  </div>
                </>
              ) : (
                <div className="summary-empty">Henüz test kaydı yok</div>
              )}
            </div>
          </div>

          {/* GÖZLEM */}
          <div className={`summary-card ${sonGozlem?.hastaBalik || sonGozlem?.ekipmanSorun ? 'summary-alert' : ''}`} onClick={() => navigate('/gunluk')}>
            <div className="summary-header">
              <span className="summary-icon" style={{ background: '#3498db' }}>👁️</span>
              <h3>Son Gözlem</h3>
            </div>
            <div className="summary-content">
              {sonGozlem ? (
                <>
                  <div className="summary-item">
                    <span className="summary-label">Tarih:</span>
                    <span className="summary-value">{getTimeAgo(sonGozlem.tarih)}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Su:</span>
                    <span className={`summary-value ${sonGozlem.suDurumu === 'berrak' ? 'ok' : 'warning'}`}>
                      {sonGozlem.suDurumu}
                    </span>
                  </div>
                  {sonGozlem.hastaBalik && (
                    <div className="summary-item">
                      <span className="summary-label">⚠️</span>
                      <span className="summary-value alert">Hasta balık var!</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="summary-empty">Henüz gözlem kaydı yok</div>
              )}
            </div>
          </div>

          {/* İLAÇ/TEDAVİ */}
          <div className={`summary-card ${aktifTedavi ? 'summary-alert' : ''}`} onClick={() => navigate('/gunluk')}>
            <div className="summary-header">
              <span className="summary-icon" style={{ background: '#e74c3c' }}>💊</span>
              <h3>İlaç/Tedavi</h3>
            </div>
            <div className="summary-content">
              {aktifTedavi ? (
                <>
                  <div className="summary-item">
                    <span className="summary-label">Durum:</span>
                    <span className="summary-value warning">⏱️ Devam Ediyor</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">İlaç:</span>
                    <span className="summary-value">{aktifTedavi.ilacAdi}</span>
                  </div>
                </>
              ) : (
                <div className="summary-empty">Aktif tedavi yok ✅</div>
              )}
            </div>
          </div>

          {/* BİTKİ BUDAMA */}
          <div className="summary-card" onClick={() => navigate('/gunluk')}>
            <div className="summary-header">
              <span className="summary-icon" style={{ background: '#27ae60' }}>✂️</span>
              <h3>Bitki Budama</h3>
            </div>
            <div className="summary-content">
              {sonBudama ? (
                <>
                  <div className="summary-item">
                    <span className="summary-label">Son:</span>
                    <span className="summary-value">{getTimeAgo(sonBudama.tarih)}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Bitki:</span>
                    <span className="summary-value">{sonBudama.bitkiTuru}</span>
                  </div>
                </>
              ) : (
                <div className="summary-empty">Henüz budama kaydı yok</div>
              )}
            </div>
          </div>

          {/* STOK TAKİP */}
          <div className="summary-card" onClick={() => navigate('/gunluk')}>
            <div className="summary-header">
              <span className="summary-icon" style={{ background: '#f39c12' }}>📦</span>
              <h3>Stok Durumu</h3>
            </div>
            <div className="summary-content">
              {sonStok ? (
                <>
                  <div className="summary-item">
                    <span className="summary-label">Son Eklenen:</span>
                    <span className="summary-value">{sonStok.urunAdi?.substring(0, 12) || '-'}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Toplam:</span>
                    <span className="summary-value">{stokTakip.length} ürün</span>
                  </div>
                </>
              ) : (
                <div className="summary-empty">Stok kaydı yok</div>
              )}
            </div>
          </div>

          {/* ARTEMİA TAKİP */}
          <div className={`summary-card ${aktifKuluçka ? 'summary-alert' : ''}`} onClick={() => navigate('/gunluk')}>
            <div className="summary-header">
              <span className="summary-icon" style={{ background: '#e91e63' }}>🦐</span>
              <h3>Artemia</h3>
            </div>
            <div className="summary-content">
              {aktifKuluçka ? (
                <>
                  <div className="summary-item">
                    <span className="summary-label">Durum:</span>
                    <span className="summary-value warning">⏱️ Devam Ediyor</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Miktar:</span>
                    <span className="summary-value">{aktifKuluçka.miktar}g</span>
                  </div>
                </>
              ) : (
                <div className="summary-empty">Aktif kuluçka yok</div>
              )}
            </div>
          </div>

          {/* SUMP TEMİZLİĞİ */}
          <div className="summary-card" onClick={() => navigate('/gunluk')}>
            <div className="summary-header">
              <span className="summary-icon" style={{ background: '#607d8b' }}>🔧</span>
              <h3>Sump Temizlik</h3>
            </div>
            <div className="summary-content">
              <div className="summary-item">
                <span className="summary-label">Son Temizlik:</span>
                <span className="summary-value">{sumpCounter === 0 ? 'Bugün' : `${sumpCounter} gün önce`}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Durum:</span>
                <span className={`summary-value ${sumpCounter >= 30 ? 'alert' : sumpCounter >= 21 ? 'warning' : 'ok'}`}>
                  {sumpCounter >= 30 ? '🚨 Acil!' : sumpCounter >= 21 ? '⏰ Yakında' : '✅ Temiz'}
                </span>
              </div>
            </div>
          </div>

          {/* GÜBRELEME */}
          <div className="summary-card" onClick={() => navigate('/gunluk')}>
            <div className="summary-header">
              <span className="summary-icon" style={{ background: '#4caf50' }}>🌿</span>
              <h3>Gübreleme</h3>
            </div>
            <div className="summary-content">
              {sonGubreleme ? (
                <>
                  <div className="summary-item">
                    <span className="summary-label">Son Gübre:</span>
                    <span className="summary-value">{getTimeAgo(sonGubreleme.tarih)}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Ürün:</span>
                    <span className="summary-value">{sonGubreleme.urun?.substring(0, 15) || '-'}</span>
                  </div>
                </>
              ) : (
                <div className="summary-empty">Henüz gübreleme kaydı yok</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CANLI SATIŞLAR - SON İLANLAR - PROFESYONEL TASARIM */}
      <div className="section pazar-section">
        <div className="section-header-pro">
          <div className="section-baslik">
            <span className="section-icon">🐠</span>
            <div>
              <h2>Balık Satış Bilgileri</h2>
              <p>Son eklenen ilanlar (Nerede Bulurum)</p>
            </div>
          </div>
          <button className="tumu-goster-btn" onClick={() => navigate('/pazar-yeri')}>
            Tümünü Gör →
          </button>
        </div>
        
        <div className="pazar-son-ilanlar-pro">
          {pazarIlanlar.length > 0 ? (
            <div className="ilan-grid-pro">
              {[...pazarIlanlar]
                .sort((a, b) => new Date(b.tarih) - new Date(a.tarih))
                .slice(0, 2)
                .map((ilan, idx) => (
                  <div key={ilan.id || idx} className="ilan-kart-pro" onClick={() => navigate('/pazar-yeri')}>
                    {/* Resim Alanı */}
                    <div className="ilan-resim-pro">
                      {ilan.resimler?.[0] ? (
                        <img src={ilan.resimler[0]} alt={ilan.baslik} />
                      ) : (
                        <div className="ilan-resim-placeholder">
                          <span className="placeholder-emoji">
                            {ilan.kategori === 'baliklar' ? '🐠' : 
                             ilan.kategori === 'ekipmanlar' ? '⚙️' : '🏠'}
                          </span>
                          <span className="placeholder-text">Resim Yok</span>
                        </div>
                      )}
                      
                      {/* Üst Badges */}
                      <div className="ilan-badges">
                        <span className={`ilan-kategori-pro ${ilan.kategori}`}>
                          {ilan.kategori === 'baliklar' ? '🐠 Balık' : 
                           ilan.kategori === 'ekipmanlar' ? '⚙️ Ekipman' : '🏠 Akvaryum'}
                        </span>
                        {ilan.durum === '1' && <span className="ilan-durum-badge yeni">Sıfır</span>}
                        {ilan.durum === '2' && <span className="ilan-durum-badge ikinci">2. El</span>}
                      </div>
                      
                      {/* Favori Butonu */}
                      <button className="ilan-favori-btn" onClick={(e) => e.stopPropagation()}>
                        🤍
                      </button>
                    </div>
                    
                    {/* İlan Bilgileri */}
                    <div className="ilan-icerik-pro">
                      <div className="ilan-ust">
                        <h4 className="ilan-baslik-pro">{ilan.baslik || 'İlan Başlığı'}</h4>
                        <p className="ilan-aciklama-pro">
                          {ilan.aciklama?.substring(0, 60) || 'Açıklama yok'}...
                        </p>
                      </div>
                      
                      <div className="ilan-meta">
                        <div className="ilan-konum">
                          <span className="meta-icon">📍</span>
                          <span>{ilan.sehir || 'Belirtilmedi'}</span>
                        </div>
                        <div className="ilan-zaman">
                          <span className="meta-icon">🕐</span>
                          <span>{getTimeAgo(ilan.tarih)}</span>
                        </div>
                      </div>
                      
                      <div className="ilan-alt">
                        <div className="ilan-fiyat-pro">
                          <span className="fiyat-deger">{ilan.fiyat?.toLocaleString() || '?'}</span>
                          <span className="fiyat-birim">₺</span>
                        </div>
                        <div className="ilan-satici-pro">
                          <span className="satici-avatar">👤</span>
                          <span className="satici-ad">{ilan.saticiAdi || 'Satıcı'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="pazar-bos-pro">
              <div className="bos-icerik">
                <span className="bos-emoji">🐠</span>
                <h4>Henüz İlan Yok</h4>
                <p>Balık satış bilgilerinde henüz ilan bulunmuyor</p>
                <button className="pazar-git-btn" onClick={() => navigate('/pazar-yeri')}>
                  <span>🐠</span> Balık Satış Bilgilerine Git
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* HIZLI ERİŞİM - GENİŞLETİLMİŞ */}
      <div className="section">
        <h2>⚡ Hızlı Erişim</h2>
        <div className="quick-access-grid-expanded">
          <button className="quick-btn" onClick={() => navigate('/gunluk')} style={{ background: 'linear-gradient(135deg, #3498db, #2980b9)' }}>
            <span className="quick-icon">🍽️</span>
            <span className="quick-text">Yem Ver</span>
          </button>
          
          <button className="quick-btn" onClick={() => navigate('/canli-envanteri')} style={{ background: 'linear-gradient(135deg, #e74c3c, #c0392b)' }}>
            <span className="quick-icon">🐠</span>
            <span className="quick-text">Balık Ekle</span>
          </button>
          
          <button className="quick-btn" onClick={() => navigate('/gunluk')} style={{ background: 'linear-gradient(135deg, #27ae60, #1e8449)' }}>
            <span className="quick-icon">✂️</span>
            <span className="quick-text">Bitki Budama</span>
          </button>
          
          <button className="quick-btn" onClick={() => navigate('/gunluk')} style={{ background: 'linear-gradient(135deg, #9b59b6, #8e44ad)' }}>
            <span className="quick-icon">🦐</span>
            <span className="quick-text">Artemia Takip</span>
          </button>
          
          <button className="quick-btn" onClick={() => navigate('/hesaplamalar')} style={{ background: 'linear-gradient(135deg, #f39c12, #d68910)' }}>
            <span className="quick-icon">⚡</span>
            <span className="quick-text">Elektrik</span>
          </button>
          
          <button className="quick-btn" onClick={() => navigate('/hesaplamalar')} style={{ background: 'linear-gradient(135deg, #1abc9c, #16a085)' }}>
            <span className="quick-icon">🧪</span>
            <span className="quick-text">Gübre/Dozaj</span>
          </button>
          
          <button className="quick-btn" onClick={() => navigate('/hesaplamalar')} style={{ background: 'linear-gradient(135deg, #34495e, #2c3e50)' }}>
            <span className="quick-icon">🏠</span>
            <span className="quick-text">Hacim</span>
          </button>
          
          {/* Emeği Geçenler Butonu */}
          <button className="quick-btn" onClick={() => navigate('/emegi-gecenler')} style={{ background: 'linear-gradient(135deg, #e91e63, #c2185b)' }}>
            <span className="quick-icon">💙</span>
            <span className="quick-text">Emeği Geçenler</span>
          </button>
        </div>
      </div>
    </div>
  );
}