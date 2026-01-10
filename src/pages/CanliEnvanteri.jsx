import React, { useState, useEffect } from 'react';
import { tumBaliklar, kategoriler } from './balikRehberi/data';
import { getBalikResmi, DEFAULT_RESIM } from './balikRehberi/data/resimler';
import './CanliEnvanteri.css';

function CanliEnvanteri() {
  // Akvaryum bilgileri
  const [akvaryumBilgi, setAkvaryumBilgi] = useState({
    hacim: 100,
    boy: 80,
    en: 30,
    yukseklik: 40
  });

  // Balık listesi
  const [baliklar, setBaliklar] = useState([]);

  // Form state
  const [formAcik, setFormAcik] = useState(false);
  const [duzenlemeModu, setDuzenlemeModu] = useState(false);
  const [aktifBalikId, setAktifBalikId] = useState(null);

  // Rehber modal state
  const [rehberAcik, setRehberAcik] = useState(false);
  const [rehberArama, setRehberArama] = useState('');
  const [seciliKategori, setSeciliKategori] = useState('hepsi');

  const [yeniBalik, setYeniBalik] = useState({
    tur: '',
    latince: '',
    rehberId: null,
    resim: null,
    erkek: 0,
    disi: 0,
    belirsiz: 0,
    hasta: 0,
    kayip: 0,
    notlar: ''
  });

  // localStorage'dan veri yükleme
  useEffect(() => {
    try {
      const savedAkvaryum = localStorage.getItem('akvaryumBilgi');
      const savedBaliklar = localStorage.getItem('balikEnvanteri');

      if (savedAkvaryum && savedAkvaryum !== 'undefined') {
        setAkvaryumBilgi(JSON.parse(savedAkvaryum));
      }

      if (savedBaliklar && savedBaliklar !== 'undefined') {
        setBaliklar(JSON.parse(savedBaliklar));
      }
    } catch (error) {
      console.error('Veri yükleme hatası:', error);
    }
  }, []);

  // Akvaryum bilgisi kaydetme
  const akvaryumKaydet = () => {
    localStorage.setItem('akvaryumBilgi', JSON.stringify(akvaryumBilgi));
    alert('Akvaryum bilgileri kaydedildi!');
  };

  // Hacim otomatik hesaplama
  const hacimHesapla = () => {
    const { boy, en, yukseklik } = akvaryumBilgi;
    const hesaplananHacim = Math.round((boy * en * yukseklik) / 1000);
    setAkvaryumBilgi({ ...akvaryumBilgi, hacim: hesaplananHacim });
  };

  // Rehberden balık seç
  const rehberdenSec = (balik) => {
    setYeniBalik({
      ...yeniBalik,
      tur: balik.isim,
      latince: balik.latince,
      rehberId: balik.id,
      resim: balik.id
    });
    setRehberAcik(false);
    setRehberArama('');
    setSeciliKategori('hepsi');
  };

  // Rehberdeki balıkları filtrele
  const filtrelenmisRehber = tumBaliklar.filter(balik => {
    const aramaUygun = balik.isim.toLowerCase().includes(rehberArama.toLowerCase()) ||
                       balik.latince.toLowerCase().includes(rehberArama.toLowerCase());
    
    if (seciliKategori === 'hepsi') return aramaUygun;
    
    // Kategori kontrolü için balığın kategorisini bul
    const kategoriUygun = kategoriler.some(kat => {
      if (kat.id !== seciliKategori) return false;
      // Bu kategorideki balıkları kontrol et
      return true; // Basitleştirilmiş - tüm kategorilerde ara
    });
    
    return aramaUygun;
  });

  // Balık ekleme
  const balikEkle = () => {
    if (!yeniBalik.tur.trim()) {
      alert('Lütfen balık türü girin!');
      return;
    }

    const toplamAdet = parseInt(yeniBalik.erkek) + parseInt(yeniBalik.disi) + parseInt(yeniBalik.belirsiz);
    if (toplamAdet === 0) {
      alert('En az 1 balık sayısı girin!');
      return;
    }

    if (duzenlemeModu) {
      const guncelBaliklar = baliklar.map(b =>
        b.id === aktifBalikId
          ? { ...yeniBalik, id: aktifBalikId, tarih: b.tarih }
          : b
      );
      setBaliklar(guncelBaliklar);
      localStorage.setItem('balikEnvanteri', JSON.stringify(guncelBaliklar));
    } else {
      const balik = {
        ...yeniBalik,
        id: Date.now(),
        tarih: new Date().toLocaleDateString('tr-TR')
      };
      const yeniListe = [...baliklar, balik];
      setBaliklar(yeniListe);
      localStorage.setItem('balikEnvanteri', JSON.stringify(yeniListe));
    }

    formSifirla();
  };

  // Form sıfırlama
  const formSifirla = () => {
    setYeniBalik({
      tur: '',
      latince: '',
      rehberId: null,
      resim: null,
      erkek: 0,
      disi: 0,
      belirsiz: 0,
      hasta: 0,
      kayip: 0,
      notlar: ''
    });
    setFormAcik(false);
    setDuzenlemeModu(false);
    setAktifBalikId(null);
  };

  // Balık düzenleme
  const balikDuzenle = (balik) => {
    setYeniBalik({ ...balik });
    setAktifBalikId(balik.id);
    setDuzenlemeModu(true);
    setFormAcik(true);
  };

  // Balık silme
  const balikSil = (id) => {
    if (!window.confirm('Bu balığı silmek istediğinize emin misiniz?')) return;
    const yeniListe = baliklar.filter(b => b.id !== id);
    setBaliklar(yeniListe);
    localStorage.setItem('balikEnvanteri', JSON.stringify(yeniListe));
  };

  // Özet hesaplamaları
  const toplamBalik = baliklar.reduce((toplam, b) => {
    return toplam + parseInt(b.erkek || 0) + parseInt(b.disi || 0) + parseInt(b.belirsiz || 0);
  }, 0);

  const toplamHasta = baliklar.reduce((toplam, b) => toplam + parseInt(b.hasta || 0), 0);
  const toplamKayip = baliklar.reduce((toplam, b) => toplam + parseInt(b.kayip || 0), 0);
  const turSayisi = baliklar.length;
  const litreBasinaBalik = toplamBalik > 0 ? (akvaryumBilgi.hacim / toplamBalik).toFixed(1) : 0;

  return (
    <div className="canli-envanteri">
      <div className="page-header">
        <h1>🐠 Canlı / Balık Envanteri</h1>
        <p>Akvaryumunuzdaki balıkları takip edin</p>
      </div>

      {/* Özet Kartlar */}
      <div className="ozet-kartlar">
        <div className="ozet-kart">
          <div className="ozet-ikon">🐟</div>
          <div className="ozet-bilgi">
            <h3>{toplamBalik}</h3>
            <p>Toplam Balık</p>
          </div>
        </div>

        <div className="ozet-kart">
          <div className="ozet-ikon">🎯</div>
          <div className="ozet-bilgi">
            <h3>{turSayisi}</h3>
            <p>Tür Çeşidi</p>
          </div>
        </div>

        <div className={`ozet-kart ${toplamHasta > 0 ? 'uyari' : ''}`}>
          <div className="ozet-ikon">🩺</div>
          <div className="ozet-bilgi">
            <h3>{toplamHasta}</h3>
            <p>Hasta Balık</p>
          </div>
        </div>

        <div className="ozet-kart">
          <div className="ozet-ikon">💧</div>
          <div className="ozet-bilgi">
            <h3>{litreBasinaBalik} L</h3>
            <p>Balık Başına</p>
          </div>
        </div>
      </div>

      {/* Akvaryum Bilgileri */}
      <div className="akvaryum-bilgi-kart">
        <h2>🏠 Akvaryum Bilgileri</h2>
        <div className="akvaryum-form">
          <div className="form-grup">
            <label>Hacim (Litre)</label>
            <input
              type="number"
              value={akvaryumBilgi.hacim}
              onChange={(e) => setAkvaryumBilgi({ ...akvaryumBilgi, hacim: e.target.value })}
            />
          </div>
          <div className="form-grup">
            <label>Boy (cm)</label>
            <input
              type="number"
              value={akvaryumBilgi.boy}
              onChange={(e) => setAkvaryumBilgi({ ...akvaryumBilgi, boy: e.target.value })}
            />
          </div>
          <div className="form-grup">
            <label>En (cm)</label>
            <input
              type="number"
              value={akvaryumBilgi.en}
              onChange={(e) => setAkvaryumBilgi({ ...akvaryumBilgi, en: e.target.value })}
            />
          </div>
          <div className="form-grup">
            <label>Yükseklik (cm)</label>
            <input
              type="number"
              value={akvaryumBilgi.yukseklik}
              onChange={(e) => setAkvaryumBilgi({ ...akvaryumBilgi, yukseklik: e.target.value })}
            />
          </div>
        </div>
        <div className="form-butonlar">
          <button onClick={hacimHesapla} className="btn-hesapla">
            📐 Hacim Hesapla
          </button>
          <button onClick={akvaryumKaydet} className="btn-kaydet">
            💾 Kaydet
          </button>
        </div>
      </div>

      {/* Balık Ekleme Butonu */}
      <div className="ekleme-alani">
        <button
          onClick={() => setFormAcik(!formAcik)}
          className="btn-balik-ekle"
        >
          {formAcik ? '❌ İptal' : '➕ Yeni Balık Ekle'}
        </button>
      </div>

      {/* Balık Ekleme Formu */}
      {formAcik && (
        <div className="balik-form-kart">
          <h3>{duzenlemeModu ? '✏️ Balık Düzenle' : '➕ Yeni Balık Ekle'}</h3>

          {/* Rehberden Seç Butonu */}
          <div className="rehber-sec-alan">
            <button 
              onClick={() => setRehberAcik(true)} 
              className="btn-rehber-sec"
            >
              📚 Balık Rehberinden Seç
            </button>
            {yeniBalik.rehberId && (
              <div className="secili-balik-onizleme">
                <img 
                  src={getBalikResmi(yeniBalik.resim)} 
                  alt={yeniBalik.tur}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = DEFAULT_RESIM;
                  }}
                />
                <div>
                  <strong>{yeniBalik.tur}</strong>
                  <span>{yeniBalik.latince}</span>
                </div>
              </div>
            )}
          </div>

          <div className="form-grup">
            <label>Balık Türü *</label>
            <input
              type="text"
              value={yeniBalik.tur}
              onChange={(e) => setYeniBalik({ ...yeniBalik, tur: e.target.value })}
              placeholder="Tür seçin veya yazın..."
            />
          </div>

          <div className="cinsiyet-grup">
            <div className="form-grup">
              <label>♂️ Erkek</label>
              <input
                type="number"
                min="0"
                value={yeniBalik.erkek}
                onChange={(e) => setYeniBalik({ ...yeniBalik, erkek: e.target.value })}
              />
            </div>
            <div className="form-grup">
              <label>♀️ Dişi</label>
              <input
                type="number"
                min="0"
                value={yeniBalik.disi}
                onChange={(e) => setYeniBalik({ ...yeniBalik, disi: e.target.value })}
              />
            </div>
            <div className="form-grup">
              <label>❓ Belirsiz</label>
              <input
                type="number"
                min="0"
                value={yeniBalik.belirsiz}
                onChange={(e) => setYeniBalik({ ...yeniBalik, belirsiz: e.target.value })}
              />
            </div>
          </div>

          <div className="durum-grup">
            <div className="form-grup">
              <label>🩺 Hasta</label>
              <input
                type="number"
                min="0"
                value={yeniBalik.hasta}
                onChange={(e) => setYeniBalik({ ...yeniBalik, hasta: e.target.value })}
              />
            </div>
            <div className="form-grup">
              <label>💀 Kayıp</label>
              <input
                type="number"
                min="0"
                value={yeniBalik.kayip}
                onChange={(e) => setYeniBalik({ ...yeniBalik, kayip: e.target.value })}
              />
            </div>
          </div>

          <div className="form-grup">
            <label>📝 Notlar</label>
            <textarea
              value={yeniBalik.notlar}
              onChange={(e) => setYeniBalik({ ...yeniBalik, notlar: e.target.value })}
              placeholder="Renk, davranış, özel notlar..."
              rows="3"
            />
          </div>

          <div className="form-butonlar">
            <button onClick={balikEkle} className="btn-kaydet">
              {duzenlemeModu ? '💾 Güncelle' : '✅ Ekle'}
            </button>
            <button onClick={formSifirla} className="btn-iptal">
              ❌ İptal
            </button>
          </div>
        </div>
      )}

      {/* Rehber Modal */}
      {rehberAcik && (
        <div className="rehber-modal-overlay" onClick={() => setRehberAcik(false)}>
          <div className="rehber-modal" onClick={(e) => e.stopPropagation()}>
            <div className="rehber-modal-header">
              <h2>📚 Balık Rehberinden Seç</h2>
              <button onClick={() => setRehberAcik(false)} className="modal-kapat">✕</button>
            </div>
            
            <div className="rehber-modal-arama">
              <input
                type="text"
                placeholder="🔍 Balık ara..."
                value={rehberArama}
                onChange={(e) => setRehberArama(e.target.value)}
                autoFocus
              />
            </div>

            <div className="rehber-modal-liste">
              {filtrelenmisRehber.slice(0, 50).map(balik => (
                <div 
                  key={balik.id} 
                  className="rehber-modal-item"
                  onClick={() => rehberdenSec(balik)}
                >
                  <img 
                    src={getBalikResmi(balik.id)} 
                    alt={balik.isim}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = DEFAULT_RESIM;
                    }}
                  />
                  <div className="rehber-item-bilgi">
                    <strong>{balik.isim}</strong>
                    <span>{balik.latince}</span>
                  </div>
                  <div className="rehber-item-detay">
                    <span>📏 {balik.maxBoy}cm</span>
                    <span>💧 {balik.minLitre}L</span>
                  </div>
                </div>
              ))}
              {filtrelenmisRehber.length === 0 && (
                <div className="rehber-bos">
                  <p>😕 Balık bulunamadı</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Balık Listesi */}
      <div className="balik-liste-kart">
        <h2>📋 Balık Listesi</h2>
        {baliklar.length === 0 ? (
          <div className="bos-mesaj">
            <p>🐠 Henüz balık eklenmemiş.</p>
            <p>Yukarıdaki "Yeni Balık Ekle" butonuna tıklayarak başlayın!</p>
          </div>
        ) : (
          <div className="balik-liste-grid">
            {baliklar.map(balik => {
              const toplam = parseInt(balik.erkek || 0) + parseInt(balik.disi || 0) + parseInt(balik.belirsiz || 0);
              return (
                <div key={balik.id} className="envanter-balik-kart">
                  <div className="envanter-balik-resim">
                    <img 
                      src={balik.resim ? getBalikResmi(balik.resim) : DEFAULT_RESIM} 
                      alt={balik.tur}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = DEFAULT_RESIM;
                      }}
                    />
                  </div>
                  <div className="envanter-balik-bilgi">
                    <h4>{balik.tur}</h4>
                    {balik.latince && <span className="latince">{balik.latince}</span>}
                    <div className="envanter-sayilar">
                      <span>♂️ {balik.erkek || 0}</span>
                      <span>♀️ {balik.disi || 0}</span>
                      <span>❓ {balik.belirsiz || 0}</span>
                      <span className="toplam">= {toplam}</span>
                    </div>
                    {balik.hasta > 0 && <span className="hasta-badge">🩺 {balik.hasta} hasta</span>}
                    {balik.notlar && <p className="envanter-not">{balik.notlar}</p>}
                  </div>
                  <div className="envanter-balik-aksiyonlar">
                    <button onClick={() => balikDuzenle(balik)} title="Düzenle">✏️</button>
                    <button onClick={() => balikSil(balik.id)} title="Sil">🗑️</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Yoğunluk Uyarısı */}
      {toplamBalik > 0 && litreBasinaBalik < 3 && (
        <div className="yogunluk-uyari">
          ⚠️ Dikkat: Akvaryumunuz yoğun! İdeal balık yoğunluğu için balık başına en az 3-5 litre su önerilir.
        </div>
      )}
    </div>
  );
}

export default CanliEnvanteri;