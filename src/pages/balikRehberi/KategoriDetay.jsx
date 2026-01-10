import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getKategori, getBaliklar } from './data';
import { getBalikResmi, DEFAULT_RESIM } from './data/resimler';
import './BalikRehberi.css';

const KategoriDetay = () => {
  const { kategoriId } = useParams();
  const navigate = useNavigate();
  const [arama, setArama] = useState('');

  const kategori = getKategori(kategoriId);
  const baliklar = getBaliklar(kategoriId);

  if (!kategori) {
    return (
      <div className="balik-rehberi">
        <div className="hata-mesaj">
          <h2>😕 Kategori bulunamadı</h2>
          <button onClick={() => navigate('/balik-rehberi')}>← Geri Dön</button>
        </div>
      </div>
    );
  }

  const filtrelenmisBaliklar = baliklar.filter(balik =>
    balik.isim.toLowerCase().includes(arama.toLowerCase()) ||
    balik.latince.toLowerCase().includes(arama.toLowerCase())
  );

  return (
    <div className="balik-rehberi">
      <div className="kategori-header" style={{ '--kategori-renk': kategori.renk }}>
        <button className="geri-btn" onClick={() => navigate('/balik-rehberi')}>
          ← Geri
        </button>
        <div className="kategori-baslik">
          <span className="kategori-emoji-buyuk">{kategori.emoji}</span>
          <div>
            <h1>{kategori.isim}</h1>
            <p>{kategori.aciklama}</p>
            <span className="balik-sayisi">{baliklar.length} tür</span>
          </div>
        </div>
      </div>

      <div className="arama-kutusu">
        <input
          type="text"
          placeholder="🔍 Bu kategoride ara..."
          value={arama}
          onChange={(e) => setArama(e.target.value)}
        />
      </div>

      <div className="balik-grid">
        {filtrelenmisBaliklar.map(balik => (
          <div
            key={balik.id}
            className="balik-kart"
            onClick={() => navigate(`/balik-rehberi/${kategoriId}/${balik.id}`)}
          >
            <div className="balik-resim-container">
              <img 
                src={getBalikResmi(balik.id)} 
                alt={balik.isim}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = DEFAULT_RESIM;
                }}
              />
              <span className={`zorluk-badge ${balik.zorluk.toLowerCase()}`}>
                {balik.zorluk}
              </span>
            </div>
            <div className="balik-bilgi">
              <h3>{balik.isim}</h3>
              <p className="latince">{balik.latince}</p>
              <div className="balik-detaylar">
                <span>📏 {balik.maxBoy} cm</span>
                <span>🌡️ {balik.sicaklik.min}-{balik.sicaklik.max}°C</span>
                <span>💧 {balik.minLitre}L+</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtrelenmisBaliklar.length === 0 && (
        <div className="sonuc-yok">
          <p>😕 Aramanızla eşleşen balık bulunamadı.</p>
        </div>
      )}
    </div>
  );
};

export default KategoriDetay;