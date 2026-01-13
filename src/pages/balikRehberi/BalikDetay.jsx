import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getKategori, getBaliklar } from './data';
import { getBalikResmi, DEFAULT_RESIM } from './data/resimler';
import './BalikRehberi.css';

const BalikDetay = () => {
  const { kategoriId, balikId } = useParams();
  const navigate = useNavigate();
  const [aktifTab, setAktifTab] = useState('genel');

  const kategori = getKategori(kategoriId);
  const baliklar = getBaliklar(kategoriId);
  const balik = baliklar.find(b => b.id === balikId);

  if (!balik || !kategori) {
    return (
      <div className="balik-rehberi">
        <div className="hata-mesaj">
          <h2>😕 Balık bulunamadı</h2>
          <button onClick={() => navigate('/balik-rehberi')}>← Ana Sayfaya Dön</button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'genel', isim: '📋 Genel' },
    { id: 'parametreler', isim: '💧 Su Parametreleri' },
    { id: 'uyumluluk', isim: '🤝 Uyumluluk' },
    { id: 'ureme', isim: '💕 Üreme' },
    { id: 'gorunus', isim: '🎨 Görünüş' }
  ];

  return (
    <div className="balik-rehberi balik-detay-sayfa">
      <div className="detay-header" style={{ '--balik-renk': kategori.renk }}>
        <button className="geri-btn" onClick={() => navigate(`/balik-rehberi/${kategoriId}`)}>
          ← {kategori.isim}
        </button>
      </div>

      <div className="balik-hero">
        <div className="hero-resim">
          <img 
            src={getBalikResmi(balik.id)} 
            alt={balik.isim}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = DEFAULT_RESIM;
            }}
          />
          <span className={`zorluk-badge buyuk ${balik.zorluk.toLowerCase()}`}>
            {balik.zorluk}
          </span>
        </div>
        <div className="hero-bilgi">
          <h1>{balik.isim}</h1>
          <p className="latince-buyuk">{balik.latince}</p>
          <div className="hizli-bilgiler">
            <div className="hizli-bilgi">
              <span className="bilgi-icon">📏</span>
              <span className="bilgi-deger">{balik.maxBoy} cm</span>
              <span className="bilgi-etiket">Maks. Boy</span>
            </div>
            <div className="hizli-bilgi">
              <span className="bilgi-icon">💧</span>
              <span className="bilgi-deger">{balik.minLitre}L+</span>
              <span className="bilgi-etiket">Min. Tank</span>
            </div>
            <div className="hizli-bilgi">
              <span className="bilgi-icon">🌡️</span>
              <span className="bilgi-deger">{balik.sicaklik.min}-{balik.sicaklik.max}°C</span>
              <span className="bilgi-etiket">Sıcaklık</span>
            </div>
            <div className="hizli-bilgi">
              <span className="bilgi-icon">⏱️</span>
              <span className="bilgi-deger">{balik.yasam}</span>
              <span className="bilgi-etiket">Ömür</span>
            </div>
          </div>
        </div>
      </div>

      <div className="tab-menu">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${aktifTab === tab.id ? 'aktif' : ''}`}
            onClick={() => setAktifTab(tab.id)}
          >
            {tab.isim}
          </button>
        ))}
      </div>

      <div className="tab-icerik">
        {aktifTab === 'genel' && (
          <div className="tab-panel">
            <div className="bilgi-kart">
              <h3>📝 Genel Bilgi</h3>
              <p>{balik.genel}</p>
            </div>
            <div className="bilgi-grid">
              <div className="bilgi-kart mini">
                <h4>🏊 Yüzme Bölgesi</h4>
                <p>{balik.bolge}</p>
              </div>
              <div className="bilgi-kart mini">
                <h4>🍽️ Beslenme</h4>
                <p>{balik.beslenme}</p>
              </div>
              <div className="bilgi-kart mini">
                <h4>👥 Grup Sayısı</h4>
                <p>{balik.grupSayisi}</p>
              </div>
              <div className="bilgi-kart mini">
                <h4>⚤ Dişi/Erkek</h4>
                <p>{balik.disiErkek}</p>
              </div>
            </div>
          </div>
        )}

        {aktifTab === 'parametreler' && (
          <div className="tab-panel">
            <div className="parametre-grid">
              <div className="parametre-kart">
                <h4>🌡️ Sıcaklık</h4>
                <div className="parametre-bar">
                  <div 
                    className="parametre-deger" 
                    style={{ 
                      left: `${(balik.sicaklik.min - 10) / 30 * 100}%`,
                      width: `${(balik.sicaklik.max - balik.sicaklik.min) / 30 * 100}%`
                    }}
                  ></div>
                </div>
                <div className="parametre-etiketler">
                  <span>10°C</span>
                  <span className="deger">{balik.sicaklik.min}°C - {balik.sicaklik.max}°C</span>
                  <span>40°C</span>
                </div>
              </div>

              <div className="parametre-kart">
                <h4>📊 pH</h4>
                <div className="parametre-bar ph-bar">
                  <div 
                    className="parametre-deger" 
                    style={{ 
                      left: `${(balik.ph.min - 4) / 6 * 100}%`,
                      width: `${(balik.ph.max - balik.ph.min) / 6 * 100}%`
                    }}
                  ></div>
                </div>
                <div className="parametre-etiketler">
                  <span>4.0</span>
                  <span className="deger">{balik.ph.min} - {balik.ph.max}</span>
                  <span>10.0</span>
                </div>
              </div>

              <div className="parametre-kart">
                <h4>💎 Sertlik (dGH)</h4>
                <div className="parametre-bar sertlik-bar">
                  <div 
                    className="parametre-deger" 
                    style={{ 
                      left: `${balik.sertlik.min / 30 * 100}%`,
                      width: `${(balik.sertlik.max - balik.sertlik.min) / 30 * 100}%`
                    }}
                  ></div>
                </div>
                <div className="parametre-etiketler">
                  <span>0</span>
                  <span className="deger">{balik.sertlik.min} - {balik.sertlik.max} dGH</span>
                  <span>30</span>
                </div>
              </div>

              <div className="parametre-kart">
                <h4>🫧 Minimum Tank</h4>
                <div className="tank-gosterge">
                  <span className="tank-deger">{balik.minLitre}</span>
                  <span className="tank-birim">Litre</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {aktifTab === 'uyumluluk' && (
          <div className="tab-panel">
            <div className="uyumluluk-grid">
              <div className="uyumluluk-kart uyumlu">
                <h4>✅ Uyumlu Türler</h4>
                <ul>
                  {balik.uyumlu.map((tur, index) => (
                    <li key={index}>{tur}</li>
                  ))}
                </ul>
              </div>
              <div className="uyumluluk-kart uyumsuz">
                <h4>❌ Uyumsuz Türler</h4>
                <ul>
                  {balik.uyumsuz.map((tur, index) => (
                    <li key={index}>{tur}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {aktifTab === 'ureme' && (
          <div className="tab-panel">
            <div className="bilgi-kart">
              <h3>🥚 Üreme Yöntemi</h3>
              <p>{balik.ureme}</p>
            </div>
            <div className="bilgi-kart">
              <h3>💑 Eşleşme Davranışı</h3>
              <p>{balik.eslesme}</p>
            </div>
          </div>
        )}

        {aktifTab === 'gorunus' && (
          <div className="tab-panel">
            <div className="bilgi-kart gorunus-kart">
              <h3>🎨 Görünüş Özellikleri</h3>
              <p>{balik.gorunus}</p>
            </div>
            <div className="kaynak-bilgi">
              <h4>📚 Kaynaklar</h4>
              <p>{balik.kaynaklar?.join(', ') || 'fishbase.org, seriouslyfish.com'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BalikDetay;
