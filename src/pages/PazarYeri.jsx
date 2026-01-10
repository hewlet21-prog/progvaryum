import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PazarYeri.css';

// ============ SABİTLER ============

const SEHIRLER = [
  "Tümü", "Adana", "Adıyaman", "Afyon", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin",
  "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa",
  "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ",
  "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari",
  "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri",
  "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa",
  "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Rize",
  "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat", "Trabzon",
  "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt",
  "Karaman", "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova",
  "Karabük", "Kilis", "Osmaniye", "Düzce"
];

const KATEGORILER = {
  baliklar: {
    label: '🐠 Balıklar',
    icon: '🐠',
    altKategoriler: [
      'Tatlı Su Balıkları', 'Tuzlu Su Balıkları', 'Cichlid', 'Discus', 'Angel', 
      'Tetra', 'Guppy', 'Betta', 'Pleco', 'Corydoras', 'Goldfish', 'Koi', 
      'Oscar', 'Flowerhorn', 'Arowana', 'Molly', 'Platy', 'Swordtail',
      'Karides', 'Salyangoz', 'Yavru Balık', 'Diğer'
    ]
  },
  ekipmanlar: {
    label: '⚙️ Ekipmanlar',
    icon: '⚙️',
    altKategoriler: [
      'Filtre (İç)', 'Filtre (Dış)', 'Filtre (Sünger)', 'Filtre Malzemesi',
      'Isıtıcı', 'Soğutucu', 'Aydınlatma (LED)', 'Aydınlatma (T5/T8)', 
      'Hava Motoru', 'Hava Taşı', 'CO2 Sistemi', 'CO2 Tüpü',
      'Termometre', 'Test Kiti', 'pH Metre', 'TDS Metre',
      'Su Düzenleyici', 'Klor Giderici', 'Bakteri', 
      'Dekorasyon', 'Yapay Bitki', 'Kaya/Taş', 'Sürükün Ağacı',
      'Zemin Malzemesi', 'Kum', 'Çakıl', 'Akvaryum Toprağı',
      'Yem (Pul)', 'Yem (Granül)', 'Yem (Canlı)', 'Yem (Dondurulmuş)', 'Artemia',
      'İlaç', 'Vitamin', 'Gübre (Sıvı)', 'Gübre (Tablet)',
      'Sifon', 'Kepçe', 'Cımbız', 'Makas', 'Cam Sileceği',
      'Kova', 'Hortum', 'Vantuz', 'Zamanlayıcı', 'Priz',
      'Diğer'
    ]
  },
  akvaryumlar: {
    label: '🏠 Akvaryumlar',
    icon: '🏠',
    altKategoriler: [
      'Nano (0-30L)', 'Küçük (30-60L)', 'Orta (60-120L)', 'Büyük (120-250L)',
      'Çok Büyük (250L+)', 'Komple Set', 'Sehpalı', 'Kapaklı', 'Açık Üst',
      'Optiwhite', 'Normal Cam', 'Akrilik', 'Köşeli', 'Bombeli',
      'Deniz Akvaryumu', 'Paludarium', 'Terrarium', 'Karantina Tankı',
      'Üretim Tankı', 'Sump', 'Refugium', 'Diğer'
    ]
  }
};

const BALIK_TURLERI = [
  'Discus', 'Angel', 'Tetra', 'Guppy', 'Betta', 'Cichlid', 'Pleco', 'Corydoras',
  'Rasbora', 'Barb', 'Molly', 'Platy', 'Swordtail', 'Goldfish', 'Koi', 'Oscar',
  'Arowana', 'Flowerhorn', 'Rainbowfish', 'Killifish', 'Apistogramma', 'Ram',
  'Karides (Red Cherry)', 'Karides (Amano)', 'Karides (Crystal)', 'Salyangoz (Nerite)',
  'Salyangoz (Mystery)', 'Salyangoz (Ramshorn)', 'Diğer'
];

const MARKALAR = [
  'Eheim', 'Fluval', 'Tetra', 'Sera', 'JBL', 'Aquael', 'Oase', 'API',
  'Seachem', 'Tropica', 'ADA', 'Dennerle', 'Hikari', 'Ocean Free', 'Sunsun',
  'Atman', 'Sobo', 'Xilong', 'Dophin', 'Resun', 'Boyu', 'Jebo', 'Chihiros',
  'Twinstar', 'UP Aqua', 'ISTA', 'Azoo', 'Gex', 'Kotobuki', 'Nisso',
  'Juwel', 'Aqua One', 'Interpet', 'Marina', 'Hagen', 'Diğer', 'Marka Yok'
];

// ============ HELPER FUNCTIONS ============

function useSafeStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage error:', e);
    }
  }, [key, value]);

  return [value, setValue];
}

function formatTarih(tarih) {
  if (!tarih) return '';
  const d = new Date(tarih);
  const now = new Date();
  const diff = now - d;
  const gun = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (gun === 0) return 'Bugün';
  if (gun === 1) return 'Dün';
  if (gun < 7) return `${gun} gün önce`;
  if (gun < 30) return `${Math.floor(gun / 7)} hafta önce`;
  return d.toLocaleDateString('tr-TR');
}

function formatFiyat(fiyat) {
  return new Intl.NumberFormat('tr-TR').format(fiyat) + ' ₺';
}

// ============ ANA COMPONENT ============

export default function PazarYeri({ kullanici, onAuthModalAc }) {
  const navigate = useNavigate();
  
  // State
  const [seciliSayfa, setSeciliSayfa] = useState(null);
  const [seciliKategori, setSeciliKategori] = useState('tumu');
  const [seciliAltKategori, setSeciliAltKategori] = useState('tumu');
  const [seciliSehir, setSeciliSehir] = useState('Tümü');
  const [aramaMetni, setAramaMetni] = useState('');
  const [siralama, setSiralama] = useState('tarih');
  const [fiyatMin, setFiyatMin] = useState('');
  const [fiyatMax, setFiyatMax] = useState('');
  const [durumFiltre, setDurumFiltre] = useState('tumu');
  
  // Storage
  const [ilanlar, setIlanlar] = useSafeStorage('pazarYeriIlanlar2', []);
  const [saticilar, setSaticilar] = useSafeStorage('pazarYeriSaticilar2', []);
  const [puanlamalar, setPuanlamalar] = useSafeStorage('pazarYeriPuanlar', []);
  
  // Modals
  const [saticiKayitModal, setSaticiKayitModal] = useState(null);
  const [ilanEkleModal, setIlanEkleModal] = useState(false);
  const [ilanDetayModal, setIlanDetayModal] = useState(null);
  const [saticiProfilModal, setSaticiProfilModal] = useState(null);
  const [puanlamaModal, setPuanlamaModal] = useState(null);

  // Mevcut satıcı
  const mevcutSatici = saticilar.find(s => s.odaKullaniciId === kullanici?.id);

  // Filtreleme
  const filtrelenmisIlanlar = ilanlar.filter(ilan => {
    if (seciliSayfa === 'hobici' && ilan.saticiTip !== 'hobici') return false;
    if (seciliSayfa === 'akvaryumcu' && ilan.saticiTip !== 'akvaryumcu') return false;
    if (seciliKategori !== 'tumu' && ilan.kategori !== seciliKategori) return false;
    if (seciliAltKategori !== 'tumu' && ilan.altKategori !== seciliAltKategori) return false;
    if (seciliSehir !== 'Tümü' && ilan.sehir !== seciliSehir) return false;
    if (aramaMetni && !ilan.baslik.toLowerCase().includes(aramaMetni.toLowerCase())) return false;
    if (fiyatMin && ilan.fiyat < parseInt(fiyatMin)) return false;
    if (fiyatMax && ilan.fiyat > parseInt(fiyatMax)) return false;
    if (durumFiltre !== 'tumu' && ilan.durum !== durumFiltre) return false;
    return true;
  }).sort((a, b) => {
    if (siralama === 'tarih') return new Date(b.tarih) - new Date(a.tarih);
    if (siralama === 'fiyat-artan') return a.fiyat - b.fiyat;
    if (siralama === 'fiyat-azalan') return b.fiyat - a.fiyat;
    return 0;
  });

  // Satıcı puan hesapla
  const getSaticiPuan = (saticiId) => {
    const saticiPuanlari = puanlamalar.filter(p => p.saticiId === saticiId);
    if (saticiPuanlari.length === 0) return { puan: 0, sayi: 0 };
    const toplam = saticiPuanlari.reduce((acc, p) => acc + p.puan, 0);
    return { puan: (toplam / saticiPuanlari.length).toFixed(1), sayi: saticiPuanlari.length };
  };

  // ============ ANA SAYFA ============
  if (!seciliSayfa) {
    return (
      <div className="pazar-yeri-container">
        <div className="pazar-header">
          <h1>🛒 Pazar Yeri</h1>
          <p>Hobicilerden veya akvaryumculardan alışveriş yapın</p>
        </div>

        {/* Seçim Kartları */}
        <div className="pazar-secim-grid">
          <div className="pazar-secim-kart hobici" onClick={() => setSeciliSayfa('hobici')}>
            <div className="secim-icon">👤</div>
            <h2>Hobiciden Al</h2>
            <p>Diğer hobicilerin satışa çıkardığı balık, ekipman ve akvaryumları keşfedin</p>
            <div className="secim-stats">
              <span>🐠 {ilanlar.filter(i => i.saticiTip === 'hobici').length} İlan</span>
              <span>👥 {saticilar.filter(s => s.tip === 'hobici').length} Satıcı</span>
            </div>
            <button className="secim-btn">Göz At →</button>
          </div>

          <div className="pazar-secim-kart akvaryumcu" onClick={() => setSeciliSayfa('akvaryumcu')}>
            <div className="secim-icon">🏪</div>
            <h2>Akvaryumcudan Al</h2>
            <p>Profesyonel akvaryum mağazalarının ürünlerini inceleyin</p>
            <div className="secim-stats">
              <span>📦 {ilanlar.filter(i => i.saticiTip === 'akvaryumcu').length} İlan</span>
              <span>🏪 {saticilar.filter(s => s.tip === 'akvaryumcu').length} Mağaza</span>
            </div>
            <button className="secim-btn">Göz At →</button>
          </div>
        </div>

        {/* Aksiyon Butonları */}
        <div className="pazar-alt-aksiyonlar">
          {kullanici?.isMisafir ? (
            <button className="ilan-ekle-btn disabled" onClick={() => onAuthModalAc && onAuthModalAc('register')}>
              🔒 İlan Vermek İçin Üye Olun
            </button>
          ) : mevcutSatici ? (
            <>
              <button className="ilan-ekle-btn" onClick={() => setIlanEkleModal(true)}>
                ➕ Yeni İlan Ekle
              </button>
              <button className="profilim-btn" onClick={() => setSaticiProfilModal(mevcutSatici)}>
                👤 Satıcı Profilim
              </button>
            </>
          ) : (
            <div className="satici-kayit-secim">
              <p>Satıcı olmak için kayıt türü seçin:</p>
              <div className="kayit-butonlari">
                <button className="kayit-btn hobici" onClick={() => setSaticiKayitModal('hobici')}>
                  👤 Hobici Satıcı Kaydı
                </button>
                <button className="kayit-btn akvaryumcu" onClick={() => setSaticiKayitModal('akvaryumcu')}>
                  🏪 Akvaryumcu Satıcı Kaydı
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Son İlanlar */}
        {ilanlar.length > 0 && (
          <div className="son-ilanlar-section">
            <h2>🆕 Son Eklenen İlanlar</h2>
            <div className="ilanlar-grid">
              {ilanlar.slice(0, 6).map(ilan => (
                <IlanKart 
                  key={ilan.id} 
                  ilan={ilan}
                  saticiPuan={getSaticiPuan(ilan.saticiId)}
                  onClick={() => setIlanDetayModal(ilan)}
                />
              ))}
            </div>
          </div>
        )}

        {/* UYARI BANDI */}
        <div className="pazar-uyari-bandi">
          <div className="uyari-icon">⚠️</div>
          <div className="uyari-icerik">
            <h4>PROGVARYUM PAZAR YERİ UYARI</h4>
            <p>Progvaryum satış/alış işlemlerine taraf değildir. Ödeme, kargo veya ticari süreçleri takip etmez. Dolandırıcılığa karşı dikkatli olun!</p>
          </div>
        </div>

        {/* Modaller */}
        {saticiKayitModal && (
          <SaticiKayitModal 
            tip={saticiKayitModal}
            kullanici={kullanici}
            onKapat={() => setSaticiKayitModal(null)}
            onKaydet={(yeniSatici) => {
              setSaticilar([...saticilar, yeniSatici]);
              setSaticiKayitModal(null);
            }}
          />
        )}

        {ilanEkleModal && mevcutSatici && (
          <IlanEkleModal
            satici={mevcutSatici}
            onKapat={() => setIlanEkleModal(false)}
            onKaydet={(yeniIlan) => {
              setIlanlar([yeniIlan, ...ilanlar]);
              setIlanEkleModal(false);
            }}
          />
        )}

        {ilanDetayModal && (
          <IlanDetayModal
            ilan={ilanDetayModal}
            satici={saticilar.find(s => s.id === ilanDetayModal.saticiId)}
            saticiPuan={getSaticiPuan(ilanDetayModal.saticiId)}
            onKapat={() => setIlanDetayModal(null)}
            onSaticiTikla={() => {
              const satici = saticilar.find(s => s.id === ilanDetayModal.saticiId);
              if (satici) {
                setIlanDetayModal(null);
                setSaticiProfilModal(satici);
              }
            }}
            onPuanla={() => {
              setPuanlamaModal({ saticiId: ilanDetayModal.saticiId, tip: 'satici' });
            }}
          />
        )}

        {saticiProfilModal && (
          <SaticiProfilModal
            satici={saticiProfilModal}
            ilanlar={ilanlar.filter(i => i.saticiId === saticiProfilModal.id)}
            puanBilgi={getSaticiPuan(saticiProfilModal.id)}
            onKapat={() => setSaticiProfilModal(null)}
            onIlanTikla={(ilan) => {
              setSaticiProfilModal(null);
              setIlanDetayModal(ilan);
            }}
            onPuanla={() => {
              setPuanlamaModal({ saticiId: saticiProfilModal.id, tip: 'satici' });
            }}
          />
        )}

        {puanlamaModal && (
          <PuanlamaModal
            saticiId={puanlamaModal.saticiId}
            tip={puanlamaModal.tip}
            kullaniciId={kullanici?.id}
            onKapat={() => setPuanlamaModal(null)}
            onPuanla={(puanlama) => {
              setPuanlamalar([...puanlamalar, puanlama]);
              setPuanlamaModal(null);
            }}
          />
        )}
      </div>
    );
  }

  // ============ LİSTE SAYFASI ============
  return (
    <div className="pazar-yeri-container">
      <div className="pazar-liste-header">
        <button className="geri-btn" onClick={() => setSeciliSayfa(null)}>← Geri</button>
        <h1>{seciliSayfa === 'hobici' ? '👤 Hobiciden Al' : '🏪 Akvaryumcudan Al'}</h1>
        {mevcutSatici && mevcutSatici.tip === seciliSayfa && (
          <button className="ilan-ekle-btn-sm" onClick={() => setIlanEkleModal(true)}>➕ İlan Ekle</button>
        )}
      </div>

      {/* Filtreler */}
      <div className="filtreler-panel">
        <div className="filtre-grup arama">
          <input
            type="text"
            placeholder="🔍 İlan ara..."
            value={aramaMetni}
            onChange={(e) => setAramaMetni(e.target.value)}
          />
        </div>

        <div className="filtre-grup">
          <label>Kategori</label>
          <select value={seciliKategori} onChange={(e) => { setSeciliKategori(e.target.value); setSeciliAltKategori('tumu'); }}>
            <option value="tumu">Tüm Kategoriler</option>
            {Object.entries(KATEGORILER).map(([key, val]) => (
              <option key={key} value={key}>{val.label}</option>
            ))}
          </select>
        </div>

        {seciliKategori !== 'tumu' && (
          <div className="filtre-grup">
            <label>Alt Kategori</label>
            <select value={seciliAltKategori} onChange={(e) => setSeciliAltKategori(e.target.value)}>
              <option value="tumu">Tümü</option>
              {KATEGORILER[seciliKategori]?.altKategoriler.map(alt => (
                <option key={alt} value={alt}>{alt}</option>
              ))}
            </select>
          </div>
        )}

        <div className="filtre-grup">
          <label>Şehir</label>
          <select value={seciliSehir} onChange={(e) => setSeciliSehir(e.target.value)}>
            {SEHIRLER.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="filtre-grup fiyat-aralik">
          <label>Fiyat (₺)</label>
          <div className="fiyat-inputs">
            <input type="number" placeholder="Min" value={fiyatMin} onChange={(e) => setFiyatMin(e.target.value)} />
            <span>-</span>
            <input type="number" placeholder="Max" value={fiyatMax} onChange={(e) => setFiyatMax(e.target.value)} />
          </div>
        </div>

        <div className="filtre-grup">
          <label>Durum</label>
          <select value={durumFiltre} onChange={(e) => setDurumFiltre(e.target.value)}>
            <option value="tumu">Tümü</option>
            <option value="1. El">1. El (Sıfır)</option>
            <option value="2. El">2. El</option>
          </select>
        </div>

        <div className="filtre-grup">
          <label>Sırala</label>
          <select value={siralama} onChange={(e) => setSiralama(e.target.value)}>
            <option value="tarih">En Yeni</option>
            <option value="fiyat-artan">Fiyat ↑</option>
            <option value="fiyat-azalan">Fiyat ↓</option>
          </select>
        </div>
      </div>

      {/* Kategori Tabs */}
      <div className="kategori-tabs">
        <button className={`kategori-tab ${seciliKategori === 'tumu' ? 'aktif' : ''}`} onClick={() => { setSeciliKategori('tumu'); setSeciliAltKategori('tumu'); }}>
          📦 Tümü ({filtrelenmisIlanlar.length})
        </button>
        {Object.entries(KATEGORILER).map(([key, val]) => (
          <button 
            key={key}
            className={`kategori-tab ${seciliKategori === key ? 'aktif' : ''}`}
            onClick={() => { setSeciliKategori(key); setSeciliAltKategori('tumu'); }}
          >
            {val.icon} {val.label.split(' ')[1]}
          </button>
        ))}
      </div>

      {/* Sonuç Bilgisi */}
      <div className="sonuc-bilgi">
        <span>{filtrelenmisIlanlar.length} ilan bulundu</span>
        {(aramaMetni || seciliKategori !== 'tumu' || seciliSehir !== 'Tümü') && (
          <button className="filtreleri-temizle" onClick={() => {
            setAramaMetni(''); setSeciliKategori('tumu'); setSeciliAltKategori('tumu');
            setSeciliSehir('Tümü'); setFiyatMin(''); setFiyatMax(''); setDurumFiltre('tumu');
          }}>✕ Filtreleri Temizle</button>
        )}
      </div>

      {/* İlan Grid */}
      <div className="ilanlar-grid">
        {filtrelenmisIlanlar.length > 0 ? (
          filtrelenmisIlanlar.map(ilan => (
            <IlanKart 
              key={ilan.id} 
              ilan={ilan}
              saticiPuan={getSaticiPuan(ilan.saticiId)}
              onClick={() => setIlanDetayModal(ilan)}
            />
          ))
        ) : (
          <div className="bos-sonuc">
            <span>🔍</span>
            <p>Aramanıza uygun ilan bulunamadı</p>
          </div>
        )}
      </div>

      {/* Modaller */}
      {ilanEkleModal && mevcutSatici && (
        <IlanEkleModal
          satici={mevcutSatici}
          onKapat={() => setIlanEkleModal(false)}
          onKaydet={(yeniIlan) => {
            setIlanlar([yeniIlan, ...ilanlar]);
            setIlanEkleModal(false);
          }}
        />
      )}

      {ilanDetayModal && (
        <IlanDetayModal
          ilan={ilanDetayModal}
          satici={saticilar.find(s => s.id === ilanDetayModal.saticiId)}
          saticiPuan={getSaticiPuan(ilanDetayModal.saticiId)}
          onKapat={() => setIlanDetayModal(null)}
          onSaticiTikla={() => {
            const satici = saticilar.find(s => s.id === ilanDetayModal.saticiId);
            if (satici) {
              setIlanDetayModal(null);
              setSaticiProfilModal(satici);
            }
          }}
          onPuanla={() => setPuanlamaModal({ saticiId: ilanDetayModal.saticiId, tip: 'satici' })}
        />
      )}

      {saticiProfilModal && (
        <SaticiProfilModal
          satici={saticiProfilModal}
          ilanlar={ilanlar.filter(i => i.saticiId === saticiProfilModal.id)}
          puanBilgi={getSaticiPuan(saticiProfilModal.id)}
          onKapat={() => setSaticiProfilModal(null)}
          onIlanTikla={(ilan) => { setSaticiProfilModal(null); setIlanDetayModal(ilan); }}
          onPuanla={() => setPuanlamaModal({ saticiId: saticiProfilModal.id, tip: 'satici' })}
        />
      )}

      {puanlamaModal && (
        <PuanlamaModal
          saticiId={puanlamaModal.saticiId}
          tip={puanlamaModal.tip}
          kullaniciId={kullanici?.id}
          onKapat={() => setPuanlamaModal(null)}
          onPuanla={(puanlama) => { setPuanlamalar([...puanlamalar, puanlama]); setPuanlamaModal(null); }}
        />
      )}
    </div>
  );
}

// ============ İLAN KART ============
function IlanKart({ ilan, saticiPuan, onClick }) {
  return (
    <div className="ilan-kart" onClick={onClick}>
      <div className="ilan-resim">
        {ilan.resimler?.[0] ? (
          <img src={ilan.resimler[0]} alt={ilan.baslik} />
        ) : (
          <span className="ilan-emoji">{KATEGORILER[ilan.kategori]?.icon || '📦'}</span>
        )}
        <span className={`ilan-durum ${ilan.durum === '1. El' ? 'yeni' : 'ikinci'}`}>{ilan.durum}</span>
        <span className={`satici-badge ${ilan.saticiTip}`}>{ilan.saticiTip === 'hobici' ? '👤' : '🏪'}</span>
      </div>
      <div className="ilan-bilgi">
        <h3>{ilan.baslik}</h3>
        <div className="ilan-meta">
          <span className="ilan-fiyat">{formatFiyat(ilan.fiyat)}</span>
          {ilan.adet > 1 && <span className="ilan-adet">{ilan.adet} adet</span>}
        </div>
        <div className="ilan-alt">
          <span className="ilan-sehir">📍 {ilan.sehir}</span>
          <span className="ilan-tarih">{formatTarih(ilan.tarih)}</span>
        </div>
        <div className="ilan-satici">
          <span>{ilan.saticiAd}</span>
          {saticiPuan.sayi > 0 && <span className="satici-puan">⭐ {saticiPuan.puan}</span>}
        </div>
      </div>
    </div>
  );
}

// ============ SATICI KAYIT MODAL ============
function SaticiKayitModal({ tip, kullanici, onKapat, onKaydet }) {
  const [adim, setAdim] = useState(1);
  const [onayVerildi, setOnayVerildi] = useState(false);
  const [form, setForm] = useState({
    isim: kullanici?.isim || '',
    soyisim: kullanici?.soyisim || '',
    telefon: '',
    email: kullanici?.email || '',
    sehir: '',
    ilce: '',
    adres: '',
    adresDetay: '',
    googleMapsLink: '',
    magazaAdi: '',
    vergiNo: '',
    calismaSaatleri: '',
    teslimatYapilirMi: false,
    kargoGonderilirMi: false,
    aciklama: ''
  });
  const [hata, setHata] = useState('');

  const handleKaydet = () => {
    setHata('');
    if (!form.isim || !form.soyisim || !form.telefon || !form.sehir) {
      setHata('Zorunlu alanları doldurun');
      return;
    }
    if (tip === 'akvaryumcu' && !form.magazaAdi) {
      setHata('Mağaza adı zorunludur');
      return;
    }

    const yeniSatici = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
      odaKullaniciId: kullanici.id,
      tip: tip,
      ...form,
      kayitTarihi: new Date().toISOString(),
      aktif: true,
      onaylandi: false,
      ilanSayisi: 0,
      toplamSatis: 0,
      puanOrtalama: 0,
      puanSayisi: 0
    };

    onKaydet(yeniSatici);
  };

  if (adim === 1) {
    return (
      <div className="modal-overlay" onClick={onKapat}>
        <div className="modal-content satici-kayit-modal" onClick={e => e.stopPropagation()}>
          <button className="modal-kapat" onClick={onKapat}>✕</button>
          
          <div className="modal-header">
            <span className="modal-icon">⚠️</span>
            <h2>Pazar Yeri Kullanım Koşulları</h2>
          </div>

          <div className="uyari-kutusu">
            <div className="uyari-baslik">🔹 PROGVARYUM PAZAR YERİ UYARI !</div>
            <div className="uyari-metin">
              <p>Progvaryum, bir akvaryum hobisi ve rehber platformudur. Uygulama üzerinden yapılan alış ve satış paylaşımları, hobicilerin en uygun canlıya veya ürüne hızlı ve kolay şekilde ulaşabilmesi amacıyla sunulmaktadır.</p>
              
              <h4>📌 Önemli Bilgilendirme:</h4>
              <ul>
                <li>Progvaryum, satış veya alış işlemlerine taraf değildir</li>
                <li>Ödeme, kargo veya ticari süreçleri takip etmez ve aracılık yapmaz</li>
                <li>Pazar yeri bölümünde yalnızca listeleme yapılır</li>
              </ul>
              
              <p>Bu sayede alıcı ve satıcı doğrudan iletişime geçebilir ve tercihen yüz yüze alışveriş gerçekleştirebilir.</p>
              
              <div className="dolandiricilik-uyari">
                <strong>⚠️ Dolandırıcılığa Karşı Uyarı:</strong> Kullanıcıların, alışveriş sırasında dikkatli olmaları, şüpheli taleplere karşı temkinli davranmaları önemle tavsiye edilir.
              </div>
            </div>
          </div>

          <label className="onay-checkbox">
            <input type="checkbox" checked={onayVerildi} onChange={(e) => setOnayVerildi(e.target.checked)} />
            <span>Yukarıdaki koşulları okudum ve kabul ediyorum</span>
          </label>

          <button className="btn-devam" disabled={!onayVerildi} onClick={() => setAdim(2)}>
            Devam Et →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onKapat}>
      <div className="modal-content satici-kayit-modal genis" onClick={e => e.stopPropagation()}>
        <button className="modal-kapat" onClick={onKapat}>✕</button>
        
        <div className="modal-header">
          <span className="modal-icon">{tip === 'hobici' ? '👤' : '🏪'}</span>
          <h2>{tip === 'hobici' ? 'Hobici Satıcı Kaydı' : 'Akvaryumcu Satıcı Kaydı'}</h2>
        </div>

        {hata && <div className="hata-mesaj">{hata}</div>}

        <div className="form-grid">
          <div className="form-section">
            <h3>👤 Kişisel Bilgiler</h3>
            <div className="form-row">
              <div className="form-grup">
                <label>İsim <span className="zorunlu">*</span></label>
                <input type="text" value={form.isim} onChange={e => setForm({...form, isim: e.target.value})} placeholder="Adınız" />
              </div>
              <div className="form-grup">
                <label>Soyisim <span className="zorunlu">*</span></label>
                <input type="text" value={form.soyisim} onChange={e => setForm({...form, soyisim: e.target.value})} placeholder="Soyadınız" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-grup">
                <label>Telefon <span className="zorunlu">*</span></label>
                <input type="tel" value={form.telefon} onChange={e => setForm({...form, telefon: e.target.value})} placeholder="05XX XXX XX XX" />
              </div>
              <div className="form-grup">
                <label>E-posta</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="ornek@mail.com" />
              </div>
            </div>
          </div>

          {tip === 'akvaryumcu' && (
            <div className="form-section">
              <h3>🏪 Mağaza Bilgileri</h3>
              <div className="form-grup">
                <label>Mağaza / Akvaryum Adı <span className="zorunlu">*</span></label>
                <input type="text" value={form.magazaAdi} onChange={e => setForm({...form, magazaAdi: e.target.value})} placeholder="Örn: Mavi Akvaryum" />
              </div>
              <div className="form-row">
                <div className="form-grup">
                  <label>Vergi No (Opsiyonel)</label>
                  <input type="text" value={form.vergiNo} onChange={e => setForm({...form, vergiNo: e.target.value})} placeholder="Vergi numarası" />
                </div>
                <div className="form-grup">
                  <label>Çalışma Saatleri</label>
                  <input type="text" value={form.calismaSaatleri} onChange={e => setForm({...form, calismaSaatleri: e.target.value})} placeholder="Örn: 09:00 - 19:00" />
                </div>
              </div>
              <div className="form-row checkboxlar">
                <label className="checkbox-label">
                  <input type="checkbox" checked={form.teslimatYapilirMi} onChange={e => setForm({...form, teslimatYapilirMi: e.target.checked})} />
                  <span>🚗 Teslimat Yapılır</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" checked={form.kargoGonderilirMi} onChange={e => setForm({...form, kargoGonderilirMi: e.target.checked})} />
                  <span>📦 Kargo Gönderilir</span>
                </label>
              </div>
            </div>
          )}

          <div className="form-section">
            <h3>📍 Adres Bilgileri</h3>
            <div className="form-row">
              <div className="form-grup">
                <label>Şehir <span className="zorunlu">*</span></label>
                <select value={form.sehir} onChange={e => setForm({...form, sehir: e.target.value})}>
                  <option value="">Seçin...</option>
                  {SEHIRLER.filter(s => s !== 'Tümü').map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-grup">
                <label>İlçe</label>
                <input type="text" value={form.ilce} onChange={e => setForm({...form, ilce: e.target.value})} placeholder="İlçe" />
              </div>
            </div>
            <div className="form-grup">
              <label>Adres</label>
              <textarea value={form.adres} onChange={e => setForm({...form, adres: e.target.value})} placeholder="Açık adres (opsiyonel)" rows={2} />
            </div>
            <div className="form-grup">
              <label>📍 Google Maps Linki</label>
              <input type="url" value={form.googleMapsLink} onChange={e => setForm({...form, googleMapsLink: e.target.value})} placeholder="Google Maps'ten kopyaladığınız link" />
              <span className="input-yardim">
                <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">Google Maps'i aç →</a> Konumunuzu bulun, "Paylaş" &gt; "Bağlantıyı kopyala" yapın
              </span>
            </div>
          </div>

          <div className="form-section">
            <h3>📝 Ek Bilgiler</h3>
            <div className="form-grup">
              <label>Açıklama / Hakkında</label>
              <textarea value={form.aciklama} onChange={e => setForm({...form, aciklama: e.target.value})} placeholder={tip === 'hobici' ? 'Kendiniz hakkında kısa bilgi...' : 'Mağazanız hakkında bilgi, uzmanlık alanları...'} rows={3} />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-geri" onClick={() => setAdim(1)}>← Geri</button>
          <button className="btn-kaydet" onClick={handleKaydet}>✅ Kaydı Tamamla</button>
        </div>
      </div>
    </div>
  );
}

// ============ İLAN EKLE MODAL ============
function IlanEkleModal({ satici, onKapat, onKaydet }) {
  const [adim, setAdim] = useState(1);
  const [form, setForm] = useState({
    baslik: '', aciklama: '', kategori: '', altKategori: '', fiyat: '', adet: 1, durum: '2. El', resimler: [],
    balikTuru: '', yas: '', boyut: '', cinsiyet: '',
    marka: '', model: '', kapasite: '', watt: '', kullanimSuresi: '', garantiVar: false, garantiBitis: '', skt: '', gramaj: '',
    hacim: '', olculer: '', camTipi: '', dolap: false, kapak: false,
    etiketler: [], teslimatYapilirMi: false, kargoVar: false, pazarlikPayi: false
  });
  const [hata, setHata] = useState('');

  const handleResimEkle = (e) => {
    const files = Array.from(e.target.files);
    if (form.resimler.length + files.length > 10) {
      setHata('En fazla 10 resim ekleyebilirsiniz');
      return;
    }
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, resimler: [...prev.resimler, reader.result] }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleResimSil = (index) => {
    setForm(prev => ({ ...prev, resimler: prev.resimler.filter((_, i) => i !== index) }));
  };

  const handleKaydet = () => {
    setHata('');
    if (!form.baslik || !form.kategori || !form.fiyat) {
      setHata('Başlık, kategori ve fiyat zorunludur');
      return;
    }
    if (form.resimler.length < 1) {
      setHata('En az 1 resim eklemelisiniz');
      return;
    }

    const yeniIlan = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
      saticiId: satici.id,
      saticiTip: satici.tip,
      saticiAd: satici.tip === 'hobici' ? `${satici.isim} ${satici.soyisim.charAt(0)}.` : satici.magazaAdi,
      sehir: satici.sehir,
      ...form,
      fiyat: parseInt(form.fiyat),
      tarih: new Date().toISOString(),
      aktif: true,
      goruntulenme: 0,
      favoriSayisi: 0
    };

    onKaydet(yeniIlan);
  };

  return (
    <div className="modal-overlay" onClick={onKapat}>
      <div className="modal-content ilan-ekle-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-kapat" onClick={onKapat}>✕</button>
        
        <div className="modal-header">
          <span className="modal-icon">📝</span>
          <h2>Yeni İlan Ekle</h2>
          <div className="adim-gosterge">Adım {adim}/3</div>
        </div>

        {hata && <div className="hata-mesaj">{hata}</div>}

        {adim === 1 && (
          <div className="form-adim">
            <h3>📋 Temel Bilgiler</h3>
            
            <div className="form-grup">
              <label>Kategori <span className="zorunlu">*</span></label>
              <div className="kategori-secim">
                {Object.entries(KATEGORILER).map(([key, val]) => (
                  <button key={key} type="button" className={`kategori-btn ${form.kategori === key ? 'secili' : ''}`} onClick={() => setForm({...form, kategori: key, altKategori: ''})}>
                    {val.icon} {val.label.split(' ')[1]}
                  </button>
                ))}
              </div>
            </div>

            {form.kategori && (
              <div className="form-grup">
                <label>Alt Kategori <span className="zorunlu">*</span></label>
                <select value={form.altKategori} onChange={e => setForm({...form, altKategori: e.target.value})}>
                  <option value="">Seçin...</option>
                  {KATEGORILER[form.kategori]?.altKategoriler.map(alt => (
                    <option key={alt} value={alt}>{alt}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="form-grup">
              <label>İlan Başlığı <span className="zorunlu">*</span></label>
              <input type="text" value={form.baslik} onChange={e => setForm({...form, baslik: e.target.value})} placeholder="Örn: Kırmızı Discus - Çift (10cm)" maxLength={100} />
              <span className="karakter-sayac">{form.baslik.length}/100</span>
            </div>

            <div className="form-row">
              <div className="form-grup">
                <label>Fiyat (₺) <span className="zorunlu">*</span></label>
                <input type="number" value={form.fiyat} onChange={e => setForm({...form, fiyat: e.target.value})} placeholder="0" min="0" />
              </div>
              <div className="form-grup">
                <label>Adet</label>
                <input type="number" value={form.adet} onChange={e => setForm({...form, adet: parseInt(e.target.value) || 1})} min="1" />
              </div>
              <div className="form-grup">
                <label>Durum <span className="zorunlu">*</span></label>
                <select value={form.durum} onChange={e => setForm({...form, durum: e.target.value})}>
                  <option value="1. El">1. El (Sıfır)</option>
                  <option value="2. El">2. El</option>
                </select>
              </div>
            </div>

            <div className="form-grup">
              <label>Açıklama</label>
              <textarea value={form.aciklama} onChange={e => setForm({...form, aciklama: e.target.value})} placeholder="Ürün hakkında detaylı bilgi..." rows={4} />
            </div>

            <button className="btn-devam" onClick={() => {
              if (!form.kategori || !form.baslik || !form.fiyat) { setHata('Zorunlu alanları doldurun'); return; }
              setHata(''); setAdim(2);
            }}>Devam →</button>
          </div>
        )}

        {adim === 2 && (
          <div className="form-adim">
            <h3>{KATEGORILER[form.kategori]?.icon} {KATEGORILER[form.kategori]?.label} Detayları</h3>

            {form.kategori === 'baliklar' && (
              <>
                <div className="form-row">
                  <div className="form-grup">
                    <label>Balık Türü</label>
                    <select value={form.balikTuru} onChange={e => setForm({...form, balikTuru: e.target.value})}>
                      <option value="">Seçin...</option>
                      {BALIK_TURLERI.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="form-grup">
                    <label>Cinsiyet</label>
                    <select value={form.cinsiyet} onChange={e => setForm({...form, cinsiyet: e.target.value})}>
                      <option value="">Belirtilmemiş</option>
                      <option value="erkek">Erkek</option>
                      <option value="disi">Dişi</option>
                      <option value="cift">Çift</option>
                      <option value="karisik">Karışık</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-grup">
                    <label>Boyut (cm)</label>
                    <input type="text" value={form.boyut} onChange={e => setForm({...form, boyut: e.target.value})} placeholder="Örn: 8-10" />
                  </div>
                  <div className="form-grup">
                    <label>Yaş</label>
                    <input type="text" value={form.yas} onChange={e => setForm({...form, yas: e.target.value})} placeholder="Örn: 6 aylık" />
                  </div>
                </div>
              </>
            )}

            {form.kategori === 'ekipmanlar' && (
              <>
                <div className="form-row">
                  <div className="form-grup">
                    <label>Marka</label>
                    <select value={form.marka} onChange={e => setForm({...form, marka: e.target.value})}>
                      <option value="">Seçin...</option>
                      {MARKALAR.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div className="form-grup">
                    <label>Model</label>
                    <input type="text" value={form.model} onChange={e => setForm({...form, model: e.target.value})} placeholder="Model adı" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-grup">
                    <label>Kapasite/Güç</label>
                    <input type="text" value={form.kapasite} onChange={e => setForm({...form, kapasite: e.target.value})} placeholder="Örn: 250L/h, 50W" />
                  </div>
                  <div className="form-grup">
                    <label>Kullanım Süresi</label>
                    <input type="text" value={form.kullanimSuresi} onChange={e => setForm({...form, kullanimSuresi: e.target.value})} placeholder="Örn: 6 ay" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-grup">
                    <label>SKT (Yem/İlaç için)</label>
                    <input type="date" value={form.skt} onChange={e => setForm({...form, skt: e.target.value})} />
                  </div>
                  <div className="form-grup">
                    <label>Gramaj/Ağırlık</label>
                    <input type="text" value={form.gramaj} onChange={e => setForm({...form, gramaj: e.target.value})} placeholder="Örn: 250g, 1kg" />
                  </div>
                </div>
                <div className="form-row checkboxlar">
                  <label className="checkbox-label">
                    <input type="checkbox" checked={form.garantiVar} onChange={e => setForm({...form, garantiVar: e.target.checked})} />
                    <span>Garanti Var</span>
                  </label>
                  {form.garantiVar && (
                    <div className="form-grup inline">
                      <label>Garanti Bitiş</label>
                      <input type="date" value={form.garantiBitis} onChange={e => setForm({...form, garantiBitis: e.target.value})} />
                    </div>
                  )}
                </div>
              </>
            )}

            {form.kategori === 'akvaryumlar' && (
              <>
                <div className="form-row">
                  <div className="form-grup">
                    <label>Hacim (Litre)</label>
                    <input type="number" value={form.hacim} onChange={e => setForm({...form, hacim: e.target.value})} placeholder="Örn: 120" />
                  </div>
                  <div className="form-grup">
                    <label>Ölçüler (cm)</label>
                    <input type="text" value={form.olculer} onChange={e => setForm({...form, olculer: e.target.value})} placeholder="Örn: 80x40x50" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-grup">
                    <label>Cam Tipi</label>
                    <select value={form.camTipi} onChange={e => setForm({...form, camTipi: e.target.value})}>
                      <option value="">Seçin...</option>
                      <option value="normal">Normal Cam</option>
                      <option value="optiwhite">Optiwhite</option>
                      <option value="akrilik">Akrilik</option>
                    </select>
                  </div>
                  <div className="form-grup">
                    <label>Yaş</label>
                    <input type="text" value={form.yas} onChange={e => setForm({...form, yas: e.target.value})} placeholder="Örn: 2 yıllık" />
                  </div>
                </div>
                <div className="form-row checkboxlar">
                  <label className="checkbox-label">
                    <input type="checkbox" checked={form.dolap} onChange={e => setForm({...form, dolap: e.target.checked})} />
                    <span>Dolap/Sehpa Dahil</span>
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" checked={form.kapak} onChange={e => setForm({...form, kapak: e.target.checked})} />
                    <span>Kapak Dahil</span>
                  </label>
                </div>
              </>
            )}

            <div className="form-section genel-secenekler">
              <h4>Ek Seçenekler</h4>
              <div className="form-row checkboxlar">
                <label className="checkbox-label">
                  <input type="checkbox" checked={form.teslimatYapilirMi} onChange={e => setForm({...form, teslimatYapilirMi: e.target.checked})} />
                  <span>🚗 Teslimat Yapılabilir</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" checked={form.kargoVar} onChange={e => setForm({...form, kargoVar: e.target.checked})} />
                  <span>📦 Kargo Gönderilebilir</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" checked={form.pazarlikPayi} onChange={e => setForm({...form, pazarlikPayi: e.target.checked})} />
                  <span>💬 Pazarlık Payı Var</span>
                </label>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-geri" onClick={() => setAdim(1)}>← Geri</button>
              <button className="btn-devam" onClick={() => setAdim(3)}>Devam →</button>
            </div>
          </div>
        )}

        {adim === 3 && (
          <div className="form-adim">
            <h3>📸 Resimler</h3>
            <p className="form-aciklama">En az 1, en fazla 10 resim ekleyin. İlk resim kapak resmi olacaktır.</p>

            <div className="resim-yukleme-alani">
              <div className="resimler-grid">
                {form.resimler.map((resim, index) => (
                  <div key={index} className="resim-onizleme">
                    <img src={resim} alt={`Resim ${index + 1}`} />
                    <button className="resim-sil" onClick={() => handleResimSil(index)}>✕</button>
                    {index === 0 && <span className="kapak-badge">Kapak</span>}
                  </div>
                ))}
                
                {form.resimler.length < 10 && (
                  <label className="resim-ekle-btn">
                    <input type="file" accept="image/*" multiple onChange={handleResimEkle} style={{ display: 'none' }} />
                    <span>➕</span>
                    <span>Resim Ekle</span>
                  </label>
                )}
              </div>
              <p className="resim-bilgi">{form.resimler.length}/10 resim eklendi</p>
            </div>

            <div className="modal-footer">
              <button className="btn-geri" onClick={() => setAdim(2)}>← Geri</button>
              <button className="btn-kaydet" onClick={handleKaydet}>✅ İlanı Yayınla</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============ İLAN DETAY MODAL ============
function IlanDetayModal({ ilan, satici, saticiPuan, onKapat, onSaticiTikla, onPuanla }) {
  const [aktifResim, setAktifResim] = useState(0);

  return (
    <div className="modal-overlay" onClick={onKapat}>
      <div className="modal-content ilan-detay-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-kapat" onClick={onKapat}>✕</button>

        <div className="ilan-detay-grid">
          <div className="ilan-resimler">
            <div className="ana-resim">
              {ilan.resimler?.[aktifResim] ? (
                <img src={ilan.resimler[aktifResim]} alt={ilan.baslik} />
              ) : (
                <span className="placeholder-emoji">{KATEGORILER[ilan.kategori]?.icon || '📦'}</span>
              )}
            </div>
            {ilan.resimler?.length > 1 && (
              <div className="resim-thumbnails">
                {ilan.resimler.map((r, i) => (
                  <img key={i} src={r} alt="" className={i === aktifResim ? 'aktif' : ''} onClick={() => setAktifResim(i)} />
                ))}
              </div>
            )}
          </div>

          <div className="ilan-bilgiler">
            <div className="ilan-badges">
              <span className="badge kategori">{KATEGORILER[ilan.kategori]?.label}</span>
              <span className={`badge durum ${ilan.durum === '1. El' ? 'yeni' : 'ikinci'}`}>{ilan.durum}</span>
              {ilan.pazarlikPayi && <span className="badge pazarlik">💬 Pazarlık Payı</span>}
            </div>

            <h1>{ilan.baslik}</h1>
            
            <div className="ilan-fiyat-box">
              <span className="fiyat">{formatFiyat(ilan.fiyat)}</span>
              {ilan.adet > 1 && <span className="adet">({ilan.adet} adet)</span>}
            </div>

            <div className="ilan-konum-tarih">
              <span>📍 {ilan.sehir}</span>
              <span>📅 {formatTarih(ilan.tarih)}</span>
            </div>

            <div className="ilan-detaylar">
              {ilan.kategori === 'baliklar' && (
                <>
                  {ilan.balikTuru && <div className="detay"><span>Tür:</span> {ilan.balikTuru}</div>}
                  {ilan.boyut && <div className="detay"><span>Boyut:</span> {ilan.boyut} cm</div>}
                  {ilan.yas && <div className="detay"><span>Yaş:</span> {ilan.yas}</div>}
                  {ilan.cinsiyet && <div className="detay"><span>Cinsiyet:</span> {ilan.cinsiyet}</div>}
                </>
              )}
              {ilan.kategori === 'ekipmanlar' && (
                <>
                  {ilan.marka && <div className="detay"><span>Marka:</span> {ilan.marka}</div>}
                  {ilan.model && <div className="detay"><span>Model:</span> {ilan.model}</div>}
                  {ilan.kapasite && <div className="detay"><span>Kapasite:</span> {ilan.kapasite}</div>}
                  {ilan.kullanimSuresi && <div className="detay"><span>Kullanım:</span> {ilan.kullanimSuresi}</div>}
                  {ilan.gramaj && <div className="detay"><span>Gramaj:</span> {ilan.gramaj}</div>}
                  {ilan.garantiVar && <div className="detay"><span>Garanti:</span> {ilan.garantiBitis ? `${ilan.garantiBitis}'e kadar` : 'Var'}</div>}
                </>
              )}
              {ilan.kategori === 'akvaryumlar' && (
                <>
                  {ilan.hacim && <div className="detay"><span>Hacim:</span> {ilan.hacim}L</div>}
                  {ilan.olculer && <div className="detay"><span>Ölçüler:</span> {ilan.olculer}</div>}
                  {ilan.camTipi && <div className="detay"><span>Cam:</span> {ilan.camTipi}</div>}
                  {ilan.dolap && <div className="detay">✅ Dolap/Sehpa dahil</div>}
                  {ilan.kapak && <div className="detay">✅ Kapak dahil</div>}
                </>
              )}
            </div>

            <div className="teslimat-secenekleri">
              {ilan.teslimatYapilirMi && <span className="teslimat-badge">🚗 Teslimat Yapılır</span>}
              {ilan.kargoVar && <span className="teslimat-badge">📦 Kargo Gönderilir</span>}
            </div>

            {ilan.aciklama && (
              <div className="ilan-aciklama">
                <h4>Açıklama</h4>
                <p>{ilan.aciklama}</p>
              </div>
            )}

            <div className="satici-bilgi-box" onClick={onSaticiTikla}>
              <div className="satici-avatar">{ilan.saticiTip === 'hobici' ? '👤' : '🏪'}</div>
              <div className="satici-info">
                <span className="satici-ad">{ilan.saticiAd}</span>
                <span className="satici-tip">{ilan.saticiTip === 'hobici' ? 'Hobici Satıcı' : 'Akvaryumcu'}</span>
              </div>
              <div className="satici-puan-box">
                {saticiPuan.sayi > 0 ? (
                  <>
                    <span className="puan">⭐ {saticiPuan.puan}</span>
                    <span className="sayi">({saticiPuan.sayi} değerlendirme)</span>
                  </>
                ) : (
                  <span className="yeni-satici">Yeni Satıcı</span>
                )}
              </div>
              <span className="profil-git">Profili Gör →</span>
            </div>

            {satici && (
              <div className="iletisim-butonlari">
                {satici.telefon && (
                  <a href={`tel:${satici.telefon}`} className="iletisim-btn telefon">📞 Ara: {satici.telefon}</a>
                )}
                {satici.telefon && (
                  <a href={`https://wa.me/90${satici.telefon.replace(/\D/g, '').slice(-10)}`} target="_blank" rel="noopener noreferrer" className="iletisim-btn whatsapp">💬 WhatsApp</a>
                )}
              </div>
            )}

            <button className="puanla-btn" onClick={onPuanla}>⭐ Satıcıyı Puanla</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ SATICI PROFİL MODAL ============
function SaticiProfilModal({ satici, ilanlar, puanBilgi, onKapat, onIlanTikla, onPuanla }) {
  return (
    <div className="modal-overlay" onClick={onKapat}>
      <div className="modal-content satici-profil-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-kapat" onClick={onKapat}>✕</button>

        <div className="profil-header">
          <div className="profil-avatar">{satici.tip === 'hobici' ? '👤' : '🏪'}</div>
          <div className="profil-info">
            <h2>{satici.tip === 'hobici' ? `${satici.isim} ${satici.soyisim}` : satici.magazaAdi}</h2>
            <span className={`tip-badge ${satici.tip}`}>{satici.tip === 'hobici' ? '👤 Hobici Satıcı' : '🏪 Akvaryumcu'}</span>
            <div className="puan-bilgi">
              {puanBilgi.sayi > 0 ? (
                <>
                  <span className="puan">⭐ {puanBilgi.puan}</span>
                  <span className="sayi">({puanBilgi.sayi} değerlendirme)</span>
                </>
              ) : (
                <span>Henüz değerlendirme yok</span>
              )}
            </div>
          </div>
          <button className="puanla-btn-sm" onClick={onPuanla}>⭐ Puanla</button>
        </div>

        <div className="profil-stats">
          <div className="stat">
            <span className="stat-sayi">{ilanlar.length}</span>
            <span className="stat-label">Aktif İlan</span>
          </div>
          <div className="stat">
            <span className="stat-sayi">{satici.toplamSatis || 0}</span>
            <span className="stat-label">Satış</span>
          </div>
          <div className="stat">
            <span className="stat-sayi">{formatTarih(satici.kayitTarihi)}</span>
            <span className="stat-label">Üyelik</span>
          </div>
        </div>

        <div className="profil-bilgiler">
          <div className="bilgi-grup">
            <h4>📍 Konum</h4>
            <p>{satici.ilce ? `${satici.ilce}, ` : ''}{satici.sehir}</p>
            {satici.googleMapsLink && (
              <a href={satici.googleMapsLink} target="_blank" rel="noopener noreferrer" className="maps-link">🗺️ Haritada Gör</a>
            )}
          </div>

          {satici.tip === 'akvaryumcu' && satici.calismaSaatleri && (
            <div className="bilgi-grup">
              <h4>🕐 Çalışma Saatleri</h4>
              <p>{satici.calismaSaatleri}</p>
            </div>
          )}

          {satici.aciklama && (
            <div className="bilgi-grup">
              <h4>📝 Hakkında</h4>
              <p>{satici.aciklama}</p>
            </div>
          )}

          <div className="bilgi-grup teslimat">
            {satici.teslimatYapilirMi && <span className="badge">🚗 Teslimat Yapılır</span>}
            {satici.kargoGonderilirMi && <span className="badge">📦 Kargo Gönderilir</span>}
          </div>
        </div>

        <div className="profil-iletisim">
          {satici.telefon && (
            <>
              <a href={`tel:${satici.telefon}`} className="iletisim-btn telefon">📞 {satici.telefon}</a>
              <a href={`https://wa.me/90${satici.telefon.replace(/\D/g, '').slice(-10)}`} target="_blank" rel="noopener noreferrer" className="iletisim-btn whatsapp">💬 WhatsApp</a>
            </>
          )}
        </div>

        <div className="profil-ilanlar">
          <h3>📦 Satıcının İlanları ({ilanlar.length})</h3>
          {ilanlar.length > 0 ? (
            <div className="mini-ilanlar-grid">
              {ilanlar.map(ilan => (
                <div key={ilan.id} className="mini-ilan" onClick={() => onIlanTikla(ilan)}>
                  <div className="mini-resim">
                    {ilan.resimler?.[0] ? <img src={ilan.resimler[0]} alt="" /> : <span>{KATEGORILER[ilan.kategori]?.icon}</span>}
                  </div>
                  <div className="mini-bilgi">
                    <span className="mini-baslik">{ilan.baslik}</span>
                    <span className="mini-fiyat">{formatFiyat(ilan.fiyat)}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="bos-mesaj">Aktif ilan bulunmuyor</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ============ PUANLAMA MODAL ============
function PuanlamaModal({ saticiId, tip, kullaniciId, onKapat, onPuanla }) {
  const [puan, setPuan] = useState(0);
  const [yorum, setYorum] = useState('');
  const [hoverPuan, setHoverPuan] = useState(0);

  const handlePuanla = () => {
    if (puan === 0) return;
    onPuanla({
      id: Date.now().toString(36),
      saticiId,
      puanlayanId: kullaniciId,
      tip,
      puan,
      yorum,
      tarih: new Date().toISOString()
    });
  };

  return (
    <div className="modal-overlay" onClick={onKapat}>
      <div className="modal-content puanlama-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-kapat" onClick={onKapat}>✕</button>
        
        <div className="modal-header">
          <span className="modal-icon">⭐</span>
          <h2>{tip === 'satici' ? 'Satıcıyı Puanla' : 'Alıcıyı Puanla'}</h2>
        </div>

        <div className="yildiz-puanlama">
          {[1, 2, 3, 4, 5].map(y => (
            <span key={y} className={`yildiz ${y <= (hoverPuan || puan) ? 'dolu' : ''}`} onClick={() => setPuan(y)} onMouseEnter={() => setHoverPuan(y)} onMouseLeave={() => setHoverPuan(0)}>★</span>
          ))}
          <span className="puan-metin">
            {puan === 0 ? 'Puan seçin' : puan === 1 ? 'Çok Kötü' : puan === 2 ? 'Kötü' : puan === 3 ? 'Orta' : puan === 4 ? 'İyi' : 'Mükemmel'}
          </span>
        </div>

        <div className="form-grup">
          <label>Yorum (Opsiyonel)</label>
          <textarea value={yorum} onChange={e => setYorum(e.target.value)} placeholder="Deneyiminizi paylaşın..." rows={3} />
        </div>

        <button className="btn-puanla" disabled={puan === 0} onClick={handlePuanla}>⭐ Puanı Gönder</button>
      </div>
    </div>
  );
}