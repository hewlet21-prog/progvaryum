import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BitkiKarti.css';

// Veritabanı importları
import { govdeliBitkilerPart1 } from './data/bitkiVeritabani1';
import { govdeliBitkilerPart2 } from './data/bitkiVeritabani2';
import { cicekliBitkilerPart1 } from './data/bitkiVeritabani3';
import { cicekliBitkilerPart2 } from './data/bitkiVeritabani4';
import { rizomluBitkiler } from './data/bitkiVeritabani5';
import { mosslarVeSuUstuBitkiler } from './data/bitkiVeritabani6';
import { soganlliBitkiler } from './data/bitkiVeritabani7';

// Tüm bitkileri birleştir
const tumBitkiler = [
  ...govdeliBitkilerPart1,
  ...govdeliBitkilerPart2,
  ...cicekliBitkilerPart1,
  ...cicekliBitkilerPart2,
  ...rizomluBitkiler,
  ...mosslarVeSuUstuBitkiler,
  ...soganlliBitkiler
];

const BitkiKarti = () => {
  const { bitkiId } = useParams();
  const navigate = useNavigate();
  const [bitki, setBitki] = useState(null);
  const [benzerBitkiler, setBenzerBitkiler] = useState([]);

  useEffect(() => {
    // Bitki bul
    const bulunanBitki = tumBitkiler.find(b => b.id === bitkiId);
    setBitki(bulunanBitki);

    // Benzer bitkiler (aynı kategori ve tech seviyesi)
    if (bulunanBitki) {
      const benzerler = tumBitkiler
        .filter(b => 
          b.id !== bitkiId && 
          (b.kategori === bulunanBitki.kategori || b.techSeviye === bulunanBitki.techSeviye)
        )
        .slice(0, 6);
      setBenzerBitkiler(benzerler);
    }
  }, [bitkiId]);

  // Tech rengi
  const techRenk = (tech) => {
    switch(tech) {
      case 'Low Tech': return '#27ae60';
      case 'Mid Tech': return '#f39c12';
      case 'High Tech': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  // Zorluk rengi
  const zorluRenk = (zorluk) => {
    if (!zorluk) return '#95a5a6';
    if (zorluk.toLowerCase().includes('kolay') || zorluk.toLowerCase().includes('çok kolay')) return '#27ae60';
    if (zorluk.toLowerCase().includes('orta')) return '#f39c12';
    if (zorluk.toLowerCase().includes('zor')) return '#e74c3c';
    return '#95a5a6';
  };

  // Büyüme hızı ikonu
  const buyumeIkon = (hiz) => {
    if (!hiz) return '➡️';
    if (hiz.toLowerCase().includes('çok yavaş')) return '🐌';
    if (hiz.toLowerCase().includes('yavaş')) return '🐢';
    if (hiz.toLowerCase().includes('hızlı') && !hiz.toLowerCase().includes('çok')) return '🚀';
    if (hiz.toLowerCase().includes('çok hızlı')) return '⚡';
    return '➡️';
  };

  // CO2 ikonu
  const co2Ikon = (co2) => {
    if (!co2) return '❓';
    if (co2.toLowerCase().includes('gerekli değil')) return '🟢';
    if (co2.toLowerCase().includes('opsiyonel') || co2.toLowerCase().includes('önerilen')) return '🟡';
    if (co2.toLowerCase().includes('gerekli')) return '🔴';
    return '❓';
  };

  // Işık ikonu
  const isikIkon = (isik) => {
    if (!isik) return '💡';
    if (isik.toLowerCase().includes('düşük')) return '🌑';
    if (isik.toLowerCase().includes('orta')) return '🌓';
    if (isik.toLowerCase().includes('yüksek') || isik.toLowerCase().includes('çok yüksek')) return '☀️';
    return '💡';
  };

  if (!bitki) {
    return (
      <div className="bitki-kart-container">
        <div className="bitki-bulunamadi">
          <span className="hata-emoji">🌿❌</span>
          <h2>Bitki Bulunamadı</h2>
          <p>Aradığınız bitki veritabanında mevcut değil.</p>
          <button onClick={() => navigate('/bitki-rehberi')} className="geri-btn-buyuk">
            ← Bitki Rehberine Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bitki-kart-container">
      {/* Üst Navigasyon */}
      <div className="bitki-kart-nav">
        <button onClick={() => navigate('/bitki-rehberi')} className="geri-btn">
          ← Geri Dön
        </button>
        <div className="breadcrumb">
          <span onClick={() => navigate('/bitki-rehberi')}>Bitki Rehberi</span>
          <span className="separator">/</span>
          <span className="aktif">{bitki.isim}</span>
        </div>
      </div>

      {/* Ana İçerik */}
      <div className="bitki-kart-main">
        {/* Sol Taraf - Resim ve Temel Bilgiler */}
        <div className="bitki-kart-sol">
          <div className="bitki-resim-buyuk">
            <img 
              src={bitki.resim} 
              alt={bitki.isim}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/bitkiler/placeholder.jpg';
              }}
            />
            <div className="tech-badge-buyuk" style={{ background: techRenk(bitki.techSeviye) }}>
              {bitki.techSeviye}
            </div>
          </div>

          {/* Hızlı Bilgiler */}
          <div className="hizli-bilgiler">
            <div className="hizli-bilgi-item">
              <span className="hb-ikon">{isikIkon(bitki.isikIhtiyaci)}</span>
              <span className="hb-label">Işık</span>
              <span className="hb-deger">{bitki.isikIhtiyaci}</span>
            </div>
            <div className="hizli-bilgi-item">
              <span className="hb-ikon">{co2Ikon(bitki.co2Ihtiyaci)}</span>
              <span className="hb-label">CO2</span>
              <span className="hb-deger">{bitki.co2Ihtiyaci}</span>
            </div>
            <div className="hizli-bilgi-item">
              <span className="hb-ikon">{buyumeIkon(bitki.buyumeHizi)}</span>
              <span className="hb-label">Büyüme</span>
              <span className="hb-deger">{bitki.buyumeHizi}</span>
            </div>
            <div className="hizli-bilgi-item">
              <span className="hb-ikon">🎯</span>
              <span className="hb-label">Zorluk</span>
              <span className="hb-deger" style={{ color: zorluRenk(bitki.bakimZorlugu) }}>
                {bitki.bakimZorlugu}
              </span>
            </div>
          </div>
        </div>

        {/* Sağ Taraf - Detaylı Bilgiler */}
        <div className="bitki-kart-sag">
          {/* Başlık */}
          <div className="bitki-baslik">
            <h1>{bitki.isim}</h1>
            <p className="latince-buyuk">{bitki.latince}</p>
            <div className="baslik-badges">
              <span className="kategori-badge">{bitki.kategori}</span>
              <span className="konum-badge-buyuk">📍 {bitki.konum}</span>
            </div>
          </div>

          {/* Açıklama */}
          <div className="bitki-aciklama-box">
            <p>{bitki.aciklama}</p>
          </div>

          {/* Bilgi Kartları */}
          <div className="bilgi-kartlari">
            {/* Genel Bilgiler */}
            <div className="bilgi-karti">
              <h3>📋 Genel Bilgiler</h3>
              <div className="bilgi-satirlari">
                <div className="bilgi-satir">
                  <span className="bs-label">🌍 Habitat</span>
                  <span className="bs-deger">{bitki.habitat}</span>
                </div>
                <div className="bilgi-satir">
                  <span className="bs-label">📂 Kategori</span>
                  <span className="bs-deger">{bitki.kategori}</span>
                </div>
                <div className="bilgi-satir">
                  <span className="bs-label">⚙️ Tech Seviye</span>
                  <span className="bs-deger" style={{ color: techRenk(bitki.techSeviye) }}>
                    {bitki.techSeviye}
                  </span>
                </div>
              </div>
            </div>

            {/* Boyut */}
            <div className="bilgi-karti">
              <h3>📏 Boyut</h3>
              <div className="bilgi-satirlari">
                <div className="bilgi-satir">
                  <span className="bs-label">↕️ Uzunluk</span>
                  <span className="bs-deger">{bitki.uzunluk}</span>
                </div>
                <div className="bilgi-satir">
                  <span className="bs-label">↔️ Genişlik</span>
                  <span className="bs-deger">{bitki.genislik}</span>
                </div>
                <div className="bilgi-satir">
                  <span className="bs-label">📍 Konum</span>
                  <span className="bs-deger">{bitki.konum}</span>
                </div>
              </div>
            </div>

            {/* Su Parametreleri */}
            <div className="bilgi-karti">
              <h3>💧 Su Parametreleri</h3>
              <div className="bilgi-satirlari">
                <div className="bilgi-satir">
                  <span className="bs-label">🌡️ Sıcaklık</span>
                  <span className="bs-deger">{bitki.sicaklik}</span>
                </div>
                <div className="bilgi-satir">
                  <span className="bs-label">⚗️ pH</span>
                  <span className="bs-deger">{bitki.ph}</span>
                </div>
                <div className="bilgi-satir">
                  <span className="bs-label">💎 Sertlik</span>
                  <span className="bs-deger">{bitki.sertlik}</span>
                </div>
              </div>
            </div>

            {/* Gereksinimler */}
            <div className="bilgi-karti">
              <h3>⚙️ Gereksinimler</h3>
              <div className="bilgi-satirlari">
                <div className="bilgi-satir">
                  <span className="bs-label">💡 Işık İhtiyacı</span>
                  <span className="bs-deger">{bitki.isikIhtiyaci}</span>
                </div>
                <div className="bilgi-satir">
                  <span className="bs-label">🫧 CO2 İhtiyacı</span>
                  <span className="bs-deger">{bitki.co2Ihtiyaci}</span>
                </div>
                <div className="bilgi-satir">
                  <span className="bs-label">📈 Büyüme Hızı</span>
                  <span className="bs-deger">{bitki.buyumeHizi}</span>
                </div>
                <div className="bilgi-satir">
                  <span className="bs-label">🎯 Bakım Zorluğu</span>
                  <span className="bs-deger" style={{ color: zorluRenk(bitki.bakimZorlugu) }}>
                    {bitki.bakimZorlugu}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Uyumluluk İpuçları */}
          <div className="uyumluluk-box">
            <h3>💡 Bakım İpuçları</h3>
            <ul>
              {bitki.techSeviye === 'Low Tech' && (
                <>
                  <li>✅ CO2 sistemi olmadan yetiştirilebilir</li>
                  <li>✅ Başlangıç seviyesi hobiciler için uygundur</li>
                </>
              )}
              {bitki.techSeviye === 'Mid Tech' && (
                <>
                  <li>⚠️ CO2 eklenmesi büyümeyi hızlandırır</li>
                  <li>⚠️ Orta seviye aydınlatma önerilir</li>
                </>
              )}
              {bitki.techSeviye === 'High Tech' && (
                <>
                  <li>🔴 CO2 sistemi gereklidir</li>
                  <li>🔴 Yüksek aydınlatma şarttır</li>
                  <li>🔴 Düzenli gübre takviyesi önerilir</li>
                </>
              )}
              {bitki.konum.toLowerCase().includes('ön') && (
                <li>📍 Ön planda küçük gruplar halinde dikin</li>
              )}
              {bitki.konum.toLowerCase().includes('arka') && (
                <li>📍 Arka planda arka fon olarak kullanın</li>
              )}
              {bitki.konum.toLowerCase().includes('yüzen') && (
                <li>📍 Su yüzeyinde bırakın, dikmeden kullanın</li>
              )}
              {bitki.kategori === 'Rizomlu Bitkiler' && (
                <li>⚠️ Rizomu toprağa gömmeyin, taş veya kütüğe bağlayın</li>
              )}
              {bitki.kategori === 'Mosslar' && (
                <li>⚠️ Taş, kütük veya ağa bağlayarak kullanın</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Benzer Bitkiler */}
      {benzerBitkiler.length > 0 && (
        <div className="benzer-bitkiler-section">
          <h2>🌿 Benzer Bitkiler</h2>
          <div className="benzer-bitkiler-grid">
            {benzerBitkiler.map(benzer => (
              <div 
                key={benzer.id} 
                className="benzer-bitki-kart"
                onClick={() => navigate(`/bitki-rehberi/${benzer.id}`)}
              >
                <div className="benzer-resim">
                  <img 
                    src={benzer.resim} 
                    alt={benzer.isim}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/bitkiler/placeholder.jpg';
                    }}
                  />
                  <span 
                    className="benzer-tech"
                    style={{ background: techRenk(benzer.techSeviye) }}
                  >
                    {benzer.techSeviye}
                  </span>
                </div>
                <div className="benzer-bilgi">
                  <h4>{benzer.isim}</h4>
                  <p>{benzer.latince}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BitkiKarti;
