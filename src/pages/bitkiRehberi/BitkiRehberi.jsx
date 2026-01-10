import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './BitkiRehberi.css';

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

// Kategoriler - Gerçek resimlerle
const kategoriler = [
  { 
    id: 'govdeli', 
    isim: 'Gövdeli Bitkiler', 
    emoji: '🌿', 
    renk: '#27ae60', 
    aciklama: 'Rotala, Ludwigia, Hygrophila...',
    resim: '/images/bitkiler/rotala-rotundifolia.jpg',
    filter: (b) => b.kategori === 'Gövdeli Bitkiler'
  },
  { 
    id: 'cicekli', 
    isim: 'Çiçekli Bitkiler', 
    emoji: '🌸', 
    renk: '#e91e63', 
    aciklama: 'Cryptocoryne, Echinodorus, Vallisneria...',
    resim: '/images/bitkiler/echinodorus-bleheri.jpg',
    filter: (b) => b.kategori === 'Çiçekli Bitkiler'
  },
  { 
    id: 'rizomlu', 
    isim: 'Rizomlu Bitkiler', 
    emoji: '🌳', 
    renk: '#8e44ad', 
    aciklama: 'Anubias, Java Fern, Bucephalandra...',
    resim: '/images/bitkiler/anubias-barteri-nana.jpg',
    filter: (b) => b.kategori === 'Rizomlu Bitkiler'
  },
  { 
    id: 'mosslar', 
    isim: 'Mosslar', 
    emoji: '🌱', 
    renk: '#16a085', 
    aciklama: 'Java Moss, Christmas Moss, Riccia...',
    resim: '/images/bitkiler/taxiphyllum-barbieri.jpg',
    filter: (b) => b.kategori === 'Mosslar'
  },
  { 
    id: 'su-ustu', 
    isim: 'Su Üstü / Yüzen', 
    emoji: '🍀', 
    renk: '#3498db', 
    aciklama: 'Salvinia, Frogbit, Su Marulu...',
    resim: '/images/bitkiler/salvinia-natans.jpg',
    filter: (b) => b.kategori === 'Su Üstü Bitkileri'
  },
  { 
    id: 'soganli', 
    isim: 'Soğanlı Bitkiler', 
    emoji: '🪷', 
    renk: '#e67e22', 
    aciklama: 'Nymphaea, Aponogeton, Crinum...',
    resim: '/images/bitkiler/nymphaea-lotus-red.jpg',
    filter: (b) => b.kategori === 'Soğanlı Bitkiler'
  }
];

// Tech Seviye Filtreleri
const techSeviyeleri = [
  { id: 'all', isim: 'Tümü', emoji: '🌍', renk: '#95a5a6' },
  { id: 'Low Tech', isim: 'Low Tech', emoji: '🟢', renk: '#27ae60' },
  { id: 'Mid Tech', isim: 'Mid Tech', emoji: '🟡', renk: '#f39c12' },
  { id: 'High Tech', isim: 'High Tech', emoji: '🔴', renk: '#e74c3c' }
];

// Konum Filtreleri
const konumlar = [
  { id: 'all', isim: 'Tüm Konumlar', emoji: '📍' },
  { id: 'on', isim: 'Ön Plan', emoji: '⬇️' },
  { id: 'orta', isim: 'Orta Plan', emoji: '➡️' },
  { id: 'arka', isim: 'Arka Plan', emoji: '⬆️' },
  { id: 'yuzen', isim: 'Yüzen', emoji: '🌊' }
];

const BitkiRehberi = () => {
  const navigate = useNavigate();
  
  // State'ler
  const [aramaMetni, setAramaMetni] = useState('');
  const [seciliKategori, setSeciliKategori] = useState('all');
  const [seciliTech, setSeciliTech] = useState('all');
  const [seciliKonum, setSeciliKonum] = useState('all');
  const [gorunumModu, setGorunumModu] = useState('kategoriler');
  const [seciliBitki, setSeciliBitki] = useState(null);

  // Filtrelenmiş bitkiler
  const filtrelenenBitkiler = useMemo(() => {
    return tumBitkiler.filter(bitki => {
      const aramaUyumu = aramaMetni === '' || 
        bitki.isim.toLowerCase().includes(aramaMetni.toLowerCase()) ||
        bitki.latince.toLowerCase().includes(aramaMetni.toLowerCase());

      const kategoriUyumu = seciliKategori === 'all' || 
        kategoriler.find(k => k.id === seciliKategori)?.filter(bitki);

      const techUyumu = seciliTech === 'all' || bitki.techSeviye === seciliTech;

      const konumUyumu = seciliKonum === 'all' || 
        (seciliKonum === 'on' && bitki.konum.toLowerCase().includes('ön')) ||
        (seciliKonum === 'orta' && bitki.konum.toLowerCase().includes('orta')) ||
        (seciliKonum === 'arka' && bitki.konum.toLowerCase().includes('arka')) ||
        (seciliKonum === 'yuzen' && (bitki.konum.toLowerCase().includes('yüzen') || bitki.konum.toLowerCase().includes('yüzer')));

      return aramaUyumu && kategoriUyumu && techUyumu && konumUyumu;
    });
  }, [aramaMetni, seciliKategori, seciliTech, seciliKonum]);

  // Kategori bazlı bitki sayıları
  const kategoriSayilari = useMemo(() => {
    const sayilar = {};
    kategoriler.forEach(kat => {
      sayilar[kat.id] = tumBitkiler.filter(kat.filter).length;
    });
    return sayilar;
  }, []);

  // Tech seviye bazlı sayılar
  const techSayilari = useMemo(() => {
    return {
      'Low Tech': tumBitkiler.filter(b => b.techSeviye === 'Low Tech').length,
      'Mid Tech': tumBitkiler.filter(b => b.techSeviye === 'Mid Tech').length,
      'High Tech': tumBitkiler.filter(b => b.techSeviye === 'High Tech').length
    };
  }, []);

  // Zorluk rengi
  const zorluRenk = (zorluk) => {
    if (!zorluk) return '#95a5a6';
    if (zorluk.toLowerCase().includes('kolay') || zorluk.toLowerCase().includes('çok kolay')) return '#27ae60';
    if (zorluk.toLowerCase().includes('orta')) return '#f39c12';
    if (zorluk.toLowerCase().includes('zor')) return '#e74c3c';
    return '#95a5a6';
  };

  // Tech rengi
  const techRenk = (tech) => {
    switch(tech) {
      case 'Low Tech': return '#27ae60';
      case 'Mid Tech': return '#f39c12';
      case 'High Tech': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  // Bitki kartına tıklama
  const bitkiDetayAc = (bitki) => {
    setSeciliBitki(bitki);
  };

  // Modal kapatma
  const modalKapat = () => {
    setSeciliBitki(null);
  };

  return (
    <div className="bitki-rehberi-container">
      {/* Header */}
      <div className="rehber-header">
        <h1>🌿 Bitki Rehberi</h1>
        <p>222 bitki türü • Bakım bilgileri ve uyumluluk rehberi</p>
      </div>

      {/* İstatistikler */}
      <div className="bitki-istatistikler">
        <div className="istatistik-kart">
          <span className="istatistik-emoji">🌿</span>
          <span className="istatistik-sayi">{tumBitkiler.length}</span>
          <span className="istatistik-label">Toplam Bitki</span>
        </div>
        <div className="istatistik-kart low-tech">
          <span className="istatistik-emoji">🟢</span>
          <span className="istatistik-sayi">{techSayilari['Low Tech']}</span>
          <span className="istatistik-label">Low Tech</span>
        </div>
        <div className="istatistik-kart mid-tech">
          <span className="istatistik-emoji">🟡</span>
          <span className="istatistik-sayi">{techSayilari['Mid Tech']}</span>
          <span className="istatistik-label">Mid Tech</span>
        </div>
        <div className="istatistik-kart high-tech">
          <span className="istatistik-emoji">🔴</span>
          <span className="istatistik-sayi">{techSayilari['High Tech']}</span>
          <span className="istatistik-label">High Tech</span>
        </div>
      </div>

      {/* Arama ve Filtreler */}
      <div className="arama-filtre-wrapper">
        <div className="arama-kutusu">
          <span className="arama-icon">🔍</span>
          <input
            type="text"
            placeholder="Bitki adı veya latince ara..."
            value={aramaMetni}
            onChange={(e) => setAramaMetni(e.target.value)}
          />
          {aramaMetni && (
            <button className="temizle-btn" onClick={() => setAramaMetni('')}>✕</button>
          )}
        </div>

        <div className="gorunum-toggle">
          <button 
            className={gorunumModu === 'kategoriler' ? 'active' : ''} 
            onClick={() => setGorunumModu('kategoriler')}
          >
            📂 Kategoriler
          </button>
          <button 
            className={gorunumModu === 'liste' ? 'active' : ''} 
            onClick={() => setGorunumModu('liste')}
          >
            📋 Liste
          </button>
        </div>
      </div>

      {/* Filtreler (Liste modunda) */}
      {gorunumModu === 'liste' && (
        <div className="filtreler-container">
          <div className="filtre-grup">
            <label>Tech Seviye:</label>
            <div className="filtre-butonlar">
              {techSeviyeleri.map(tech => (
                <button
                  key={tech.id}
                  className={`filtre-btn ${seciliTech === tech.id ? 'active' : ''}`}
                  onClick={() => setSeciliTech(tech.id)}
                  style={seciliTech === tech.id ? { background: tech.renk } : {}}
                >
                  {tech.emoji} {tech.isim}
                </button>
              ))}
            </div>
          </div>

          <div className="filtre-grup">
            <label>Kategori:</label>
            <div className="filtre-butonlar">
              <button
                className={`filtre-btn ${seciliKategori === 'all' ? 'active' : ''}`}
                onClick={() => setSeciliKategori('all')}
              >
                🌍 Tümü
              </button>
              {kategoriler.map(kat => (
                <button
                  key={kat.id}
                  className={`filtre-btn ${seciliKategori === kat.id ? 'active' : ''}`}
                  onClick={() => setSeciliKategori(kat.id)}
                  style={seciliKategori === kat.id ? { background: kat.renk } : {}}
                >
                  {kat.emoji} {kat.isim}
                </button>
              ))}
            </div>
          </div>

          <div className="filtre-grup">
            <label>Konum:</label>
            <div className="filtre-butonlar">
              {konumlar.map(kon => (
                <button
                  key={kon.id}
                  className={`filtre-btn ${seciliKonum === kon.id ? 'active' : ''}`}
                  onClick={() => setSeciliKonum(kon.id)}
                >
                  {kon.emoji} {kon.isim}
                </button>
              ))}
            </div>
          </div>

          <div className="sonuc-sayisi">
            <span>🌿 {filtrelenenBitkiler.length} bitki bulundu</span>
          </div>
        </div>
      )}

      {/* Kategoriler Grid (Kategori modunda) */}
      {gorunumModu === 'kategoriler' && (
        <div className="kategoriler-grid">
          {kategoriler.map((kategori) => (
            <div
              key={kategori.id}
              className="kategori-kart"
              style={{ '--kart-renk': kategori.renk }}
              onClick={() => {
                setSeciliKategori(kategori.id);
                setGorunumModu('liste');
              }}
            >
              <div className="kategori-resim-wrapper">
                <img 
                  src={kategori.resim} 
                  alt={kategori.isim}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/bitkiler/placeholder.jpg';
                  }}
                />
                <div className="kategori-overlay"></div>
              </div>
              <div className="kategori-icerik">
                <span className="kategori-emoji">{kategori.emoji}</span>
                <h3>{kategori.isim}</h3>
                <p>{kategori.aciklama}</p>
                <div className="kategori-footer">
                  <span className="kategori-sayi">{kategoriSayilari[kategori.id]} bitki</span>
                  <button className="incele-btn">İncele →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bitki Listesi (Liste modunda) - YENİ YAPI */}
      {gorunumModu === 'liste' && (
        <div className="bitki-listesi-grid">
          {filtrelenenBitkiler.length === 0 ? (
            <div className="bos-sonuc">
              <span>😔</span>
              <p>Arama kriterlerine uygun bitki bulunamadı.</p>
              <button onClick={() => {
                setAramaMetni('');
                setSeciliKategori('all');
                setSeciliTech('all');
                setSeciliKonum('all');
              }}>
                Filtreleri Temizle
              </button>
            </div>
          ) : (
            filtrelenenBitkiler.map((bitki) => (
              <div
                key={bitki.id}
                className="bitki-kart"
                onClick={() => bitkiDetayAc(bitki)}
              >
                {/* Resim Bölümü */}
                <div className="bitki-resim-wrapper">
                  <img 
                    src={bitki.resim} 
                    alt={bitki.isim}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/bitkiler/placeholder.jpg';
                    }}
                  />
                  <span 
                    className="tech-badge"
                    style={{ background: techRenk(bitki.techSeviye) }}
                  >
                    {bitki.techSeviye}
                  </span>
                </div>
                
                {/* Bilgi Bölümü - Üst Kısım */}
                <div className="bitki-bilgi-ust">
                  <h3>{bitki.isim}</h3>
                  <p className="latince">{bitki.latince}</p>
                </div>
                
                {/* Badge Bölümü - Alt Kısım (Sabit) */}
                <div className="bitki-bilgi-alt">
                  <span className="konum-badge">📍 {bitki.konum}</span>
                  <span 
                    className="zorluk-badge"
                    style={{ background: zorluRenk(bitki.bakimZorlugu) }}
                  >
                    {bitki.bakimZorlugu}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Bitki Detay Modal */}
      {seciliBitki && (
        <div className="bitki-modal-overlay" onClick={modalKapat}>
          <div className="bitki-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-kapat" onClick={modalKapat}>✕</button>
            
            <div className="modal-header">
              <img 
                src={seciliBitki.resim} 
                alt={seciliBitki.isim}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/bitkiler/placeholder.jpg';
                }}
              />
              <div className="modal-baslik">
                <h2>{seciliBitki.isim}</h2>
                <p className="latince">{seciliBitki.latince}</p>
                <div className="modal-badges">
                  <span style={{ background: techRenk(seciliBitki.techSeviye) }}>
                    {seciliBitki.techSeviye}
                  </span>
                  <span style={{ background: zorluRenk(seciliBitki.bakimZorlugu) }}>
                    {seciliBitki.bakimZorlugu}
                  </span>
                </div>
              </div>
            </div>

            <div className="modal-icerik">
              <div className="bilgi-grup">
                <h4>📋 Genel Bilgiler</h4>
                <div className="bilgi-grid">
                  <div className="bilgi-item">
                    <span className="bilgi-label">Kategori</span>
                    <span className="bilgi-deger">{seciliBitki.kategori}</span>
                  </div>
                  <div className="bilgi-item">
                    <span className="bilgi-label">Habitat</span>
                    <span className="bilgi-deger">{seciliBitki.habitat}</span>
                  </div>
                  <div className="bilgi-item">
                    <span className="bilgi-label">Konum</span>
                    <span className="bilgi-deger">{seciliBitki.konum}</span>
                  </div>
                  <div className="bilgi-item">
                    <span className="bilgi-label">Büyüme Hızı</span>
                    <span className="bilgi-deger">{seciliBitki.buyumeHizi}</span>
                  </div>
                </div>
              </div>

              <div className="bilgi-grup">
                <h4>📏 Boyut</h4>
                <div className="bilgi-grid">
                  <div className="bilgi-item">
                    <span className="bilgi-label">Uzunluk</span>
                    <span className="bilgi-deger">{seciliBitki.uzunluk}</span>
                  </div>
                  <div className="bilgi-item">
                    <span className="bilgi-label">Genişlik</span>
                    <span className="bilgi-deger">{seciliBitki.genislik}</span>
                  </div>
                </div>
              </div>

              <div className="bilgi-grup">
                <h4>💧 Su Parametreleri</h4>
                <div className="bilgi-grid">
                  <div className="bilgi-item">
                    <span className="bilgi-label">Sıcaklık</span>
                    <span className="bilgi-deger">{seciliBitki.sicaklik}</span>
                  </div>
                  <div className="bilgi-item">
                    <span className="bilgi-label">pH</span>
                    <span className="bilgi-deger">{seciliBitki.ph}</span>
                  </div>
                  <div className="bilgi-item">
                    <span className="bilgi-label">Sertlik</span>
                    <span className="bilgi-deger">{seciliBitki.sertlik}</span>
                  </div>
                </div>
              </div>

              <div className="bilgi-grup">
                <h4>⚙️ Gereksinimler</h4>
                <div className="bilgi-grid">
                  <div className="bilgi-item">
                    <span className="bilgi-label">Işık İhtiyacı</span>
                    <span className="bilgi-deger">{seciliBitki.isikIhtiyaci}</span>
                  </div>
                  <div className="bilgi-item">
                    <span className="bilgi-label">CO2 İhtiyacı</span>
                    <span className="bilgi-deger">{seciliBitki.co2Ihtiyaci}</span>
                  </div>
                </div>
              </div>

              <div className="bilgi-grup aciklama">
                <h4>📝 Açıklama</h4>
                <p>{seciliBitki.aciklama}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BitkiRehberi;