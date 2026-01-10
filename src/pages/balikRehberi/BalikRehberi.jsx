import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { kategoriler, istatistikler, tumBaliklar } from './data';
import { getBalikResmi, DEFAULT_RESIM } from './data/resimler';
import './BalikRehberi.css';

const BalikRehberi = () => {
  const navigate = useNavigate();
  const [arama, setArama] = useState('');
  const [aktifSekme, setAktifSekme] = useState('kategoriler'); // kategoriler, uyumluluk, litre
  
  // Uyumluluk aracı state
  const [seciliBalik, setSeciliBalik] = useState(null);
  const [balikArama, setBalikArama] = useState('');
  const [secilenLitre, setSecilenLitre] = useState(100);
  
  // Kategori resmi getir
  const getKategoriResmi = (kategoriId) => {
    return `/images/kategoriler/${kategoriId}.jpg`;
  };

  // Kategorileri filtrele
  const filtrelenmisKategoriler = kategoriler.filter(kategori =>
    kategori.isim.toLowerCase().includes(arama.toLowerCase()) ||
    kategori.aciklama.toLowerCase().includes(arama.toLowerCase())
  );

  // Balık arama (uyumluluk için)
  const filtrelenmisBaliklar = tumBaliklar.filter(balik =>
    balik.isim.toLowerCase().includes(balikArama.toLowerCase()) ||
    balik.latince.toLowerCase().includes(balikArama.toLowerCase())
  );

  // Uyumlu balıkları bul
  const uyumluBaliklar = seciliBalik ? tumBaliklar.filter(balik => {
    if (balik.id === seciliBalik.id) return false;
    
    // Seçili balığın uyumlu listesinde var mı?
    const uyumluMu = seciliBalik.uyumlu.some(uyumluTur => 
      balik.isim.toLowerCase().includes(uyumluTur.toLowerCase()) ||
      uyumluTur.toLowerCase().includes(balik.isim.toLowerCase())
    );
    
    // Seçili balığın uyumsuz listesinde var mı?
    const uyumsuzMu = seciliBalik.uyumsuz.some(uyumsuzTur =>
      balik.isim.toLowerCase().includes(uyumsuzTur.toLowerCase()) ||
      uyumsuzTur.toLowerCase().includes(balik.isim.toLowerCase())
    );
    
    return uyumluMu && !uyumsuzMu;
  }) : [];

  // Litreye göre balıkları filtrele
  const litreUygunBaliklar = tumBaliklar.filter(balik => 
    balik.minLitre <= secilenLitre
  ).sort((a, b) => b.minLitre - a.minLitre);

  // Litreye VE seçili balığa göre uyumlu olanlar
  const filtrelenmisUyumluBaliklar = seciliBalik 
    ? uyumluBaliklar.filter(balik => balik.minLitre <= secilenLitre)
    : litreUygunBaliklar;

  return (
    <div className="balik-rehberi">
      <div className="rehber-header">
        <h1>📚 Balık Rehberi</h1>
        <p>Akvaryum balıkları hakkında kapsamlı bilgi kaynağı</p>
        <div className="istatistik-banner">
          <span>🐠 {istatistikler.toplamBalik} Balık Türü</span>
          <span>📁 {istatistikler.toplamKategori} Kategori</span>
        </div>
      </div>

      {/* Sekme Menüsü */}
      <div className="rehber-sekmeler">
        <button 
          className={`sekme-btn ${aktifSekme === 'kategoriler' ? 'aktif' : ''}`}
          onClick={() => setAktifSekme('kategoriler')}
        >
          📁 Kategoriler
        </button>
        <button 
          className={`sekme-btn ${aktifSekme === 'uyumluluk' ? 'aktif' : ''}`}
          onClick={() => setAktifSekme('uyumluluk')}
        >
          🤝 Uyumluluk Aracı
        </button>
        <button 
          className={`sekme-btn ${aktifSekme === 'litre' ? 'aktif' : ''}`}
          onClick={() => setAktifSekme('litre')}
        >
          💧 Litre Hesaplama
        </button>
      </div>

      {/* KATEGORİLER SEKMESİ */}
      {aktifSekme === 'kategoriler' && (
        <>
          <div className="arama-kutusu">
            <input
              type="text"
              placeholder="🔍 Kategori ara..."
              value={arama}
              onChange={(e) => setArama(e.target.value)}
            />
          </div>

          <div className="kategori-grid">
            {filtrelenmisKategoriler.map(kategori => (
              <div
                key={kategori.id}
                className="kategori-kart-resimli"
                onClick={() => navigate(`/balik-rehberi/${kategori.id}`)}
              >
                <div className="kategori-resim">
                  <img 
                    src={getKategoriResmi(kategori.id)} 
                    alt={kategori.isim}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      e.target.parentElement.classList.add('no-image');
                    }}
                  />
                  <div className="kategori-overlay">
                    <span className="kategori-emoji-large">{kategori.emoji}</span>
                  </div>
                </div>
                <div className="kategori-icerik">
                  <h3>{kategori.isim}</h3>
                  <p>{kategori.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* UYUMLULUK ARACI SEKMESİ */}
      {aktifSekme === 'uyumluluk' && (
        <div className="uyumluluk-araci">
          <div className="uyumluluk-panel">
            <div className="uyumluluk-sol">
              <h3>🐟 Balık Seç</h3>
              <input
                type="text"
                placeholder="🔍 Balık ara..."
                value={balikArama}
                onChange={(e) => setBalikArama(e.target.value)}
                className="uyumluluk-arama"
              />
              
              <div className="balik-secim-liste">
                {filtrelenmisBaliklar.slice(0, 20).map(balik => (
                  <div 
                    key={balik.id}
                    className={`balik-secim-item ${seciliBalik?.id === balik.id ? 'secili' : ''}`}
                    onClick={() => setSeciliBalik(balik)}
                  >
                    <img 
                      src={getBalikResmi(balik.id)} 
                      alt={balik.isim}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = DEFAULT_RESIM;
                      }}
                    />
                    <div>
                      <strong>{balik.isim}</strong>
                      <span>{balik.latince}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="uyumluluk-sag">
              {seciliBalik ? (
                <>
                  <div className="secili-balik-banner">
                    <img 
                      src={getBalikResmi(seciliBalik.id)} 
                      alt={seciliBalik.isim}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = DEFAULT_RESIM;
                      }}
                    />
                    <div>
                      <h3>{seciliBalik.isim}</h3>
                      <p>{seciliBalik.latince}</p>
                      <div className="secili-balik-detay">
                        <span>📏 {seciliBalik.maxBoy}cm</span>
                        <span>💧 {seciliBalik.minLitre}L+</span>
                        <span>🌡️ {seciliBalik.sicaklik.min}-{seciliBalik.sicaklik.max}°C</span>
                      </div>
                    </div>
                    <button className="temizle-btn" onClick={() => setSeciliBalik(null)}>✕</button>
                  </div>

                  <h4>✅ Uyumlu Balıklar ({uyumluBaliklar.length})</h4>
                  
                  {uyumluBaliklar.length > 0 ? (
                    <div className="uyumlu-balik-grid">
                      {uyumluBaliklar.map(balik => (
                        <div 
                          key={balik.id} 
                          className="uyumlu-balik-kart"
                          onClick={() => navigate(`/balik-rehberi/${balik.kategoriId}/${balik.id}`)}
                        >
                          <img 
                            src={getBalikResmi(balik.id)} 
                            alt={balik.isim}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = DEFAULT_RESIM;
                            }}
                          />
                          <div>
                            <strong>{balik.isim}</strong>
                            <span>💧 {balik.minLitre}L</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="uyumlu-yok">
                      <p>😕 Veritabanında eşleşen uyumlu balık bulunamadı.</p>
                      <p>Manuel uyumluluk listesi:</p>
                      <ul>
                        {seciliBalik.uyumlu.map((tur, i) => (
                          <li key={i}>{tur}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <h4 className="uyumsuz-baslik">❌ Uyumsuz Türler</h4>
                  <div className="uyumsuz-liste">
                    {seciliBalik.uyumsuz.map((tur, i) => (
                      <span key={i} className="uyumsuz-tag">{tur}</span>
                    ))}
                  </div>
                </>
              ) : (
                <div className="balik-sec-mesaj">
                  <span>👈</span>
                  <p>Uyumlu balıkları görmek için soldaki listeden bir balık seçin</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* LİTRE HESAPLAMA SEKMESİ */}
      {aktifSekme === 'litre' && (
        <div className="litre-araci">
          <div className="litre-kontrol">
            <h3>💧 Akvaryum Hacmi</h3>
            <div className="litre-input-grup">
              <input
                type="range"
                min="20"
                max="1000"
                value={secilenLitre}
                onChange={(e) => setSecilenLitre(parseInt(e.target.value))}
                className="litre-slider"
              />
              <div className="litre-deger">
                <input
                  type="number"
                  value={secilenLitre}
                  onChange={(e) => setSecilenLitre(parseInt(e.target.value) || 20)}
                  min="20"
                  max="2000"
                />
                <span>Litre</span>
              </div>
            </div>
            <p className="litre-aciklama">
              {secilenLitre}L akvaryumda yaşayabilecek <strong>{litreUygunBaliklar.length}</strong> tür bulundu
            </p>
          </div>

          {/* Opsiyonel: Balık seçerek filtrele */}
          <div className="litre-ek-filtre">
            <label>
              <input 
                type="checkbox" 
                checked={seciliBalik !== null}
                onChange={() => seciliBalik ? setSeciliBalik(null) : null}
              />
              {seciliBalik ? `${seciliBalik.isim} ile uyumlu olanları göster` : 'Belirli bir balıkla uyumlu olanları göster'}
            </label>
            {!seciliBalik && (
              <select onChange={(e) => {
                const balik = tumBaliklar.find(b => b.id === e.target.value);
                setSeciliBalik(balik || null);
              }}>
                <option value="">Balık seç...</option>
                {tumBaliklar.slice(0, 50).map(b => (
                  <option key={b.id} value={b.id}>{b.isim}</option>
                ))}
              </select>
            )}
          </div>

          <div className="litre-sonuclar">
            <h4>
              {seciliBalik 
                ? `${seciliBalik.isim} ile uyumlu ve ${secilenLitre}L'de yaşayabilecek balıklar (${filtrelenmisUyumluBaliklar.length})`
                : `${secilenLitre}L'de yaşayabilecek balıklar (${litreUygunBaliklar.length})`
              }
            </h4>
            
            <div className="litre-balik-grid">
              {(seciliBalik ? filtrelenmisUyumluBaliklar : litreUygunBaliklar).slice(0, 50).map(balik => (
                <div 
                  key={balik.id} 
                  className="litre-balik-kart"
                  onClick={() => navigate(`/balik-rehberi/${balik.kategoriId || 'diger-turler'}/${balik.id}`)}
                >
                  <img 
                    src={getBalikResmi(balik.id)} 
                    alt={balik.isim}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = DEFAULT_RESIM;
                    }}
                  />
                  <div className="litre-balik-bilgi">
                    <strong>{balik.isim}</strong>
                    <span className="latince">{balik.latince}</span>
                    <div className="litre-balik-detay">
                      <span>💧 {balik.minLitre}L</span>
                      <span>📏 {balik.maxBoy}cm</span>
                    </div>
                  </div>
                  <div className={`zorluk-mini ${balik.zorluk.toLowerCase()}`}>
                    {balik.zorluk}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {filtrelenmisKategoriler.length === 0 && aktifSekme === 'kategoriler' && (
        <div className="sonuc-yok">
          <p>😕 Aramanızla eşleşen kategori bulunamadı.</p>
        </div>
      )}
    </div>
  );
};

export default BalikRehberi;