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
  
  // Bilgilendirme onayı - EN ÜSTTE OLMALI
  const [bilgilendirmeOnaylandi, setBilgilendirmeOnaylandi] = useSafeStorage('canliSatislarOnay', false);
  
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

  // ============ BİLGİLENDİRME MODAL - TÜM HOOK'LARDAN SONRA ============
  if (!bilgilendirmeOnaylandi) {
    return (
      <div className="modal-overlay" style={{ background: 'rgba(0,0,0,0.95)', zIndex: 10000, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ background: 'linear-gradient(135deg, #1a2a3a 0%, #0d1b2a 100%)', borderRadius: '20px', padding: '40px', maxWidth: '550px', width: '100%', border: '2px solid #f39c12', maxHeight: '90vh', overflowY: 'auto' }}>
          <div style={{ fontSize: '60px', textAlign: 'center', marginBottom: '15px' }}>⚠️</div>
          <h2 style={{ color: '#f39c12', textAlign: 'center', margin: '0 0 25px 0', fontSize: '24px' }}>ÖNEMLİ BİLGİLENDİRME</h2>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '25px', marginBottom: '25px' }}>
            <p style={{ color: '#ff6b6b', background: 'rgba(255,107,107,0.1)', padding: '12px', borderRadius: '8px', textAlign: 'center', marginBottom: '15px', fontWeight: 'bold' }}>Bu bölüm bir satış veya doğrudan mağaza değildir.</p>
            <p style={{ color: '#e0e0e0', lineHeight: '1.7', marginBottom: '15px', fontSize: '15px' }}>Kullanıcılar yalnızca Türkiye genelinde canlı balık satan akvaryum mağazalarının ve hobicilerin bulunduğu yerleri ve satışı yapılan canlı türlerini görür.</p>
            <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '15px 20px', margin: '15px 0' }}>
              <p style={{ color: '#fff', marginBottom: '10px', fontWeight: 'bold' }}>PROGVARYUM;</p>
              <div style={{ color: '#e0e0e0', fontSize: '14px' }}>
                <div style={{ padding: '6px 0' }}>❌ Satış yapmaz</div>
                <div style={{ padding: '6px 0' }}>❌ Satışa aracılık etmez</div>
                <div style={{ padding: '6px 0' }}>❌ Komisyon almaz</div>
                <div style={{ padding: '6px 0' }}>❌ Sipariş veya ödeme işlemlerine dahil olmaz</div>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: '#9CA3AF', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px', marginBottom: 0 }}>Tüm satış ve alış işlemleri kullanıcılar ile ilgili işletmeler arasında harici platformlar veya fiziksel mağazalarda gerçekleşir.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button onClick={() => setBilgilendirmeOnaylandi(true)} style={{ background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)', color: 'white', border: 'none', padding: '16px 24px', borderRadius: '12px', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}>✅ Okudum, Anladım ve Kabul Ediyorum</button>
            <button onClick={() => navigate('/')} style={{ background: 'transparent', color: '#9CA3AF', border: '2px solid rgba(255,255,255,0.2)', padding: '14px 24px', borderRadius: '12px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>← Geri Dön</button>
          </div>
        </div>
      </div>
    );
  }

  // ============ ANA SAYFA ============
  if (!seciliSayfa) {
    return (
      <div className="pazar-yeri-container">
        <div className="pazar-header">
          <h1>🐠 Balık Satış Bilgileri</h1>
          <p style={{ fontSize: '13px', color: '#f39c12', marginBottom: '5px' }}>(Nerede Bulurum)</p>
          <p>Hobicilerin ve mağazaların canlı türlerini görüntüleyin</p>
        </div>

        {/* Seçim Kartları */}
        <div className="pazar-secim-grid">
          <div className="pazar-secim-kart hobici" onClick={() => setSeciliSayfa('hobici')}>
            <div className="secim-icon">👤</div>
            <h2>Hobici Balıkları/Ekipman</h2>
            <p>Diğer hobicilerin paylaştığı balık, ekipman ve akvaryum bilgilerini görüntüleyin</p>
            <div className="secim-stats">
              <span>🐠 {ilanlar.filter(i => i.saticiTip === 'hobici').length} İlan</span>
              <span>👥 {saticilar.filter(s => s.tip === 'hobici').length} Hobici</span>
            </div>
            <button className="secim-btn">Görüntüle →</button>
          </div>

          <div className="pazar-secim-kart akvaryumcu" onClick={() => setSeciliSayfa('akvaryumcu')}>
            <div className="secim-icon">🏪</div>
            <h2>Akvaryumcu Balıkları/Ekipman</h2>
            <p>Akvaryum mağazalarının konumları ve sundukları canlı türlerini keşfedin</p>
            <div className="secim-stats">
              <span>📦 {ilanlar.filter(i => i.saticiTip === 'akvaryumcu').length} İlan</span>
              <span>🏪 {saticilar.filter(s => s.tip === 'akvaryumcu').length} Mağaza</span>
            </div>
            <button className="secim-btn">Görüntüle →</button>
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
                👤 Profilim
              </button>
            </>
          ) : (
            <div className="satici-kayit-secim">
              <p>İlan paylaşmak için kayıt türü seçin:</p>
              <div className="kayit-butonlari">
                <button className="kayit-btn hobici" onClick={() => setSaticiKayitModal('hobici')}>
                  👤 Hobici Kaydı
                </button>
                <button className="kayit-btn akvaryumcu" onClick={() => setSaticiKayitModal('akvaryumcu')}>
                  🏪 Mağaza Kaydı
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
            <h4>PROGVARYUM BİLGİLENDİRME</h4>
            <p>Progvaryum satış/alış işlemlerine taraf değildir. Ödeme, kargo veya ticari süreçleri takip etmez.</p>
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
        <h1>{seciliSayfa === 'hobici' ? '👤 Hobici Balıkları/Ekipman' : '🏪 Akvaryumcu Balıkları/Ekipman'}</h1>
        {mevcutSatici && mevcutSatici.tip === seciliSayfa && (
          <button className="ilan-ekle-btn-sm" onClick={() => setIlanEkleModal(true)}>➕ İlan Ekle</button>
        )}
      </div>

      {/* Bilgilendirme Banner */}
      <div style={{ background: 'rgba(243, 156, 18, 0.1)', border: '1px solid rgba(243, 156, 18, 0.3)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', fontSize: '12px', color: '#f39c12' }}>
        ℹ️ Bu ilanlar yalnızca bilgilendirme amaçlıdır. Progvaryum satış işlemlerine dahil değildir.
      </div>

      {/* Filtreler */}
      <div className="filtreler-panel">
        <div className="filtre-grup arama">
          <input type="text" placeholder="🔍 İlan ara..." value={aramaMetni} onChange={(e) => setAramaMetni(e.target.value)} />
        </div>
        <div className="filtre-grup">
          <label>Kategori</label>
          <select value={seciliKategori} onChange={(e) => { setSeciliKategori(e.target.value); setSeciliAltKategori('tumu'); }}>
            <option value="tumu">Tüm Kategoriler</option>
            {Object.entries(KATEGORILER).map(([key, val]) => (<option key={key} value={key}>{val.label}</option>))}
          </select>
        </div>
        {seciliKategori !== 'tumu' && (
          <div className="filtre-grup">
            <label>Alt Kategori</label>
            <select value={seciliAltKategori} onChange={(e) => setSeciliAltKategori(e.target.value)}>
              <option value="tumu">Tümü</option>
              {KATEGORILER[seciliKategori]?.altKategoriler.map(alt => (<option key={alt} value={alt}>{alt}</option>))}
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
          <button key={key} className={`kategori-tab ${seciliKategori === key ? 'aktif' : ''}`} onClick={() => { setSeciliKategori(key); setSeciliAltKategori('tumu'); }}>
            {val.icon} {val.label.split(' ')[1]}
          </button>
        ))}
      </div>

      {/* Sonuç Bilgisi */}
      <div className="sonuc-bilgi">
        <span>{filtrelenmisIlanlar.length} ilan bulundu</span>
        {(aramaMetni || seciliKategori !== 'tumu' || seciliSehir !== 'Tümü') && (
          <button className="filtreleri-temizle" onClick={() => { setAramaMetni(''); setSeciliKategori('tumu'); setSeciliAltKategori('tumu'); setSeciliSehir('Tümü'); setFiyatMin(''); setFiyatMax(''); setDurumFiltre('tumu'); }}>✕ Filtreleri Temizle</button>
        )}
      </div>

      {/* İlan Grid */}
      <div className="ilanlar-grid">
        {filtrelenmisIlanlar.length > 0 ? (
          filtrelenmisIlanlar.map(ilan => (<IlanKart key={ilan.id} ilan={ilan} saticiPuan={getSaticiPuan(ilan.saticiId)} onClick={() => setIlanDetayModal(ilan)} />))
        ) : (
          <div className="bos-sonuc"><span>🔍</span><p>Aramanıza uygun ilan bulunamadı</p></div>
        )}
      </div>

      {/* Modaller */}
      {ilanEkleModal && mevcutSatici && (<IlanEkleModal satici={mevcutSatici} onKapat={() => setIlanEkleModal(false)} onKaydet={(yeniIlan) => { setIlanlar([yeniIlan, ...ilanlar]); setIlanEkleModal(false); }} />)}
      {ilanDetayModal && (<IlanDetayModal ilan={ilanDetayModal} satici={saticilar.find(s => s.id === ilanDetayModal.saticiId)} saticiPuan={getSaticiPuan(ilanDetayModal.saticiId)} onKapat={() => setIlanDetayModal(null)} onSaticiTikla={() => { const satici = saticilar.find(s => s.id === ilanDetayModal.saticiId); if (satici) { setIlanDetayModal(null); setSaticiProfilModal(satici); } }} onPuanla={() => setPuanlamaModal({ saticiId: ilanDetayModal.saticiId, tip: 'satici' })} />)}
      {saticiProfilModal && (<SaticiProfilModal satici={saticiProfilModal} ilanlar={ilanlar.filter(i => i.saticiId === saticiProfilModal.id)} puanBilgi={getSaticiPuan(saticiProfilModal.id)} onKapat={() => setSaticiProfilModal(null)} onIlanTikla={(ilan) => { setSaticiProfilModal(null); setIlanDetayModal(ilan); }} onPuanla={() => setPuanlamaModal({ saticiId: saticiProfilModal.id, tip: 'satici' })} />)}
      {puanlamaModal && (<PuanlamaModal saticiId={puanlamaModal.saticiId} tip={puanlamaModal.tip} kullaniciId={kullanici?.id} onKapat={() => setPuanlamaModal(null)} onPuanla={(puanlama) => { setPuanlamalar([...puanlamalar, puanlama]); setPuanlamaModal(null); }} />)}
    </div>
  );
}

// ============ İLAN KART ============
function IlanKart({ ilan, saticiPuan, onClick }) {
  return (
    <div className="ilan-kart" onClick={onClick}>
      <div className="ilan-resim">
        {ilan.resimler?.[0] ? (<img src={ilan.resimler[0]} alt={ilan.baslik} />) : (<span className="ilan-emoji">{KATEGORILER[ilan.kategori]?.icon || '📦'}</span>)}
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
  const [form, setForm] = useState({ isim: kullanici?.isim || '', soyisim: kullanici?.soyisim || '', telefon: '', email: kullanici?.email || '', sehir: '', ilce: '', adres: '', adresDetay: '', googleMapsLink: '', magazaAdi: '', vergiNo: '', calismaSaatleri: '', teslimatYapilirMi: false, kargoGonderilirMi: false, aciklama: '' });
  const [hata, setHata] = useState('');

  const handleKaydet = () => {
    setHata('');
    if (!form.isim || !form.soyisim || !form.telefon || !form.sehir) { setHata('Zorunlu alanları doldurun'); return; }
    if (tip === 'akvaryumcu' && !form.magazaAdi) { setHata('Mağaza adı zorunludur'); return; }
    const yeniSatici = { id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5), odaKullaniciId: kullanici.id, tip: tip, ...form, kayitTarihi: new Date().toISOString(), aktif: true, onaylandi: false, ilanSayisi: 0, toplamSatis: 0, puanOrtalama: 0, puanSayisi: 0 };
    onKaydet(yeniSatici);
  };

  if (adim === 1) {
    return (
      <div className="modal-overlay" onClick={onKapat}>
        <div className="modal-content satici-kayit-modal" onClick={e => e.stopPropagation()}>
          <button className="modal-kapat" onClick={onKapat}>✕</button>
          <div className="modal-header"><span className="modal-icon">⚠️</span><h2>Kullanım Koşulları</h2></div>
          <div className="uyari-kutusu">
            <div className="uyari-baslik">🔹 PROGVARYUM BİLGİLENDİRME</div>
            <div className="uyari-metin">
              <p>Progvaryum, bir akvaryum hobisi ve rehber platformudur. Uygulama üzerinden yapılan paylaşımlar, hobicilerin en uygun canlıya veya ürüne hızlı ve kolay şekilde ulaşabilmesi amacıyla sunulmaktadır.</p>
              <h4>📌 Önemli Bilgilendirme:</h4>
              <ul><li>Progvaryum, satış veya alış işlemlerine taraf değildir</li><li>Ödeme, kargo veya ticari süreçleri takip etmez ve aracılık yapmaz</li><li>Bu bölümde yalnızca bilgilendirme amaçlı listeleme yapılır</li></ul>
              <div className="dolandiricilik-uyari"><strong>⚠️ Dolandırıcılığa Karşı Uyarı:</strong> Kullanıcıların dikkatli olmaları önemle tavsiye edilir.</div>
            </div>
          </div>
          <label className="onay-checkbox"><input type="checkbox" checked={onayVerildi} onChange={(e) => setOnayVerildi(e.target.checked)} /><span>Yukarıdaki koşulları okudum ve kabul ediyorum</span></label>
          <button className="btn-devam" disabled={!onayVerildi} onClick={() => setAdim(2)}>Devam Et →</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onKapat}>
      <div className="modal-content satici-kayit-modal genis" onClick={e => e.stopPropagation()}>
        <button className="modal-kapat" onClick={onKapat}>✕</button>
        <div className="modal-header"><span className="modal-icon">{tip === 'hobici' ? '👤' : '🏪'}</span><h2>{tip === 'hobici' ? 'Hobici Kaydı' : 'Mağaza Kaydı'}</h2></div>
        {hata && <div className="hata-mesaj">{hata}</div>}
        <div className="form-grid">
          <div className="form-section">
            <h3>👤 Kişisel Bilgiler</h3>
            <div className="form-row">
              <div className="form-grup"><label>İsim <span className="zorunlu">*</span></label><input type="text" value={form.isim} onChange={e => setForm({...form, isim: e.target.value})} placeholder="Adınız" /></div>
              <div className="form-grup"><label>Soyisim <span className="zorunlu">*</span></label><input type="text" value={form.soyisim} onChange={e => setForm({...form, soyisim: e.target.value})} placeholder="Soyadınız" /></div>
            </div>
            <div className="form-row">
              <div className="form-grup"><label>Telefon <span className="zorunlu">*</span></label><input type="tel" value={form.telefon} onChange={e => setForm({...form, telefon: e.target.value})} placeholder="05XX XXX XX XX" /></div>
              <div className="form-grup"><label>E-posta</label><input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="ornek@mail.com" /></div>
            </div>
          </div>
          {tip === 'akvaryumcu' && (
            <div className="form-section">
              <h3>🏪 Mağaza Bilgileri</h3>
              <div className="form-grup"><label>Mağaza Adı <span className="zorunlu">*</span></label><input type="text" value={form.magazaAdi} onChange={e => setForm({...form, magazaAdi: e.target.value})} placeholder="Örn: Mavi Akvaryum" /></div>
              <div className="form-row">
                <div className="form-grup"><label>Vergi No (Opsiyonel)</label><input type="text" value={form.vergiNo} onChange={e => setForm({...form, vergiNo: e.target.value})} /></div>
                <div className="form-grup"><label>Çalışma Saatleri</label><input type="text" value={form.calismaSaatleri} onChange={e => setForm({...form, calismaSaatleri: e.target.value})} placeholder="09:00 - 19:00" /></div>
              </div>
            </div>
          )}
          <div className="form-section">
            <h3>📍 Adres Bilgileri</h3>
            <div className="form-row">
              <div className="form-grup"><label>Şehir <span className="zorunlu">*</span></label><select value={form.sehir} onChange={e => setForm({...form, sehir: e.target.value})}><option value="">Seçin...</option>{SEHIRLER.filter(s => s !== 'Tümü').map(s => <option key={s} value={s}>{s}</option>)}</select></div>
              <div className="form-grup"><label>İlçe</label><input type="text" value={form.ilce} onChange={e => setForm({...form, ilce: e.target.value})} /></div>
            </div>
            <div className="form-grup"><label>Google Maps Linki</label><input type="url" value={form.googleMapsLink} onChange={e => setForm({...form, googleMapsLink: e.target.value})} /></div>
          </div>
          <div className="form-section">
            <h3>📝 Ek Bilgiler</h3>
            <div className="form-grup"><label>Açıklama</label><textarea value={form.aciklama} onChange={e => setForm({...form, aciklama: e.target.value})} rows={3} /></div>
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
  const [form, setForm] = useState({ baslik: '', aciklama: '', kategori: '', altKategori: '', fiyat: '', adet: 1, durum: '2. El', resimler: [], balikTuru: '', yas: '', boyut: '', cinsiyet: '', marka: '', model: '', kapasite: '', kullanimSuresi: '', garantiVar: false, garantiBitis: '', skt: '', gramaj: '', hacim: '', olculer: '', camTipi: '', dolap: false, kapak: false, teslimatYapilirMi: false, kargoVar: false, pazarlikPayi: false });
  const [hata, setHata] = useState('');

  const handleResimEkle = (e) => {
    const files = Array.from(e.target.files);
    if (form.resimler.length + files.length > 10) { setHata('En fazla 10 resim'); return; }
    files.forEach(file => { const reader = new FileReader(); reader.onloadend = () => { setForm(prev => ({ ...prev, resimler: [...prev.resimler, reader.result] })); }; reader.readAsDataURL(file); });
  };

  const handleKaydet = () => {
    setHata('');
    if (!form.baslik || !form.kategori || !form.fiyat) { setHata('Başlık, kategori ve fiyat zorunludur'); return; }
    if (form.resimler.length < 1) { setHata('En az 1 resim eklemelisiniz'); return; }
    const yeniIlan = { id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5), saticiId: satici.id, saticiTip: satici.tip, saticiAd: satici.tip === 'hobici' ? `${satici.isim} ${satici.soyisim.charAt(0)}.` : satici.magazaAdi, sehir: satici.sehir, ...form, fiyat: parseInt(form.fiyat), tarih: new Date().toISOString(), aktif: true, goruntulenme: 0, favoriSayisi: 0 };
    onKaydet(yeniIlan);
  };

  return (
    <div className="modal-overlay" onClick={onKapat}>
      <div className="modal-content ilan-ekle-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-kapat" onClick={onKapat}>✕</button>
        <div className="modal-header"><span className="modal-icon">📝</span><h2>Yeni İlan Ekle</h2><div className="adim-gosterge">Adım {adim}/3</div></div>
        {hata && <div className="hata-mesaj">{hata}</div>}

        {adim === 1 && (
          <div className="form-adim">
            <h3>📋 Temel Bilgiler</h3>
            <div className="form-grup"><label>Kategori <span className="zorunlu">*</span></label><div className="kategori-secim">{Object.entries(KATEGORILER).map(([key, val]) => (<button key={key} type="button" className={`kategori-btn ${form.kategori === key ? 'secili' : ''}`} onClick={() => setForm({...form, kategori: key, altKategori: ''})}>{val.icon} {val.label.split(' ')[1]}</button>))}</div></div>
            {form.kategori && (<div className="form-grup"><label>Alt Kategori</label><select value={form.altKategori} onChange={e => setForm({...form, altKategori: e.target.value})}><option value="">Seçin...</option>{KATEGORILER[form.kategori]?.altKategoriler.map(alt => (<option key={alt} value={alt}>{alt}</option>))}</select></div>)}
            <div className="form-grup"><label>İlan Başlığı <span className="zorunlu">*</span></label><input type="text" value={form.baslik} onChange={e => setForm({...form, baslik: e.target.value})} placeholder="Örn: Kırmızı Discus - Çift (10cm)" maxLength={100} /></div>
            <div className="form-row">
              <div className="form-grup"><label>Fiyat (₺) <span className="zorunlu">*</span></label><input type="number" value={form.fiyat} onChange={e => setForm({...form, fiyat: e.target.value})} placeholder="0" /></div>
              <div className="form-grup"><label>Adet</label><input type="number" value={form.adet} onChange={e => setForm({...form, adet: parseInt(e.target.value) || 1})} min="1" /></div>
              <div className="form-grup"><label>Durum</label><select value={form.durum} onChange={e => setForm({...form, durum: e.target.value})}><option value="1. El">1. El</option><option value="2. El">2. El</option></select></div>
            </div>
            <div className="form-grup"><label>Açıklama</label><textarea value={form.aciklama} onChange={e => setForm({...form, aciklama: e.target.value})} rows={4} /></div>
            <button className="btn-devam" onClick={() => { if (!form.kategori || !form.baslik || !form.fiyat) { setHata('Zorunlu alanları doldurun'); return; } setHata(''); setAdim(2); }}>Devam →</button>
          </div>
        )}

        {adim === 2 && (
          <div className="form-adim">
            <h3>{KATEGORILER[form.kategori]?.icon} Detaylar</h3>
            {form.kategori === 'baliklar' && (<><div className="form-row"><div className="form-grup"><label>Balık Türü</label><select value={form.balikTuru} onChange={e => setForm({...form, balikTuru: e.target.value})}><option value="">Seçin...</option>{BALIK_TURLERI.map(t => <option key={t} value={t}>{t}</option>)}</select></div><div className="form-grup"><label>Cinsiyet</label><select value={form.cinsiyet} onChange={e => setForm({...form, cinsiyet: e.target.value})}><option value="">Belirtilmemiş</option><option value="erkek">Erkek</option><option value="disi">Dişi</option><option value="cift">Çift</option></select></div></div><div className="form-row"><div className="form-grup"><label>Boyut (cm)</label><input type="text" value={form.boyut} onChange={e => setForm({...form, boyut: e.target.value})} /></div><div className="form-grup"><label>Yaş</label><input type="text" value={form.yas} onChange={e => setForm({...form, yas: e.target.value})} /></div></div></>)}
            {form.kategori === 'ekipmanlar' && (<><div className="form-row"><div className="form-grup"><label>Marka</label><select value={form.marka} onChange={e => setForm({...form, marka: e.target.value})}><option value="">Seçin...</option>{MARKALAR.map(m => <option key={m} value={m}>{m}</option>)}</select></div><div className="form-grup"><label>Model</label><input type="text" value={form.model} onChange={e => setForm({...form, model: e.target.value})} /></div></div></>)}
            {form.kategori === 'akvaryumlar' && (<><div className="form-row"><div className="form-grup"><label>Hacim (L)</label><input type="number" value={form.hacim} onChange={e => setForm({...form, hacim: e.target.value})} /></div><div className="form-grup"><label>Ölçüler</label><input type="text" value={form.olculer} onChange={e => setForm({...form, olculer: e.target.value})} placeholder="80x40x50" /></div></div></>)}
            <div className="modal-footer"><button className="btn-geri" onClick={() => setAdim(1)}>← Geri</button><button className="btn-devam" onClick={() => setAdim(3)}>Devam →</button></div>
          </div>
        )}

        {adim === 3 && (
          <div className="form-adim">
            <h3>📸 Resimler</h3>
            <p className="form-aciklama">En az 1, en fazla 10 resim ekleyin.</p>
            <div className="resim-yukleme-alani">
              <div className="resimler-grid">
                {form.resimler.map((resim, index) => (<div key={index} className="resim-onizleme"><img src={resim} alt={`Resim ${index + 1}`} /><button className="resim-sil" onClick={() => setForm(prev => ({ ...prev, resimler: prev.resimler.filter((_, i) => i !== index) }))}>✕</button>{index === 0 && <span className="kapak-badge">Kapak</span>}</div>))}
                {form.resimler.length < 10 && (<label className="resim-ekle-btn"><input type="file" accept="image/*" multiple onChange={handleResimEkle} style={{ display: 'none' }} /><span>➕</span><span>Resim Ekle</span></label>)}
              </div>
              <p className="resim-bilgi">{form.resimler.length}/10 resim</p>
            </div>
            <div className="modal-footer"><button className="btn-geri" onClick={() => setAdim(2)}>← Geri</button><button className="btn-kaydet" onClick={handleKaydet}>✅ İlanı Yayınla</button></div>
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
            <div className="ana-resim">{ilan.resimler?.[aktifResim] ? (<img src={ilan.resimler[aktifResim]} alt={ilan.baslik} />) : (<span className="placeholder-emoji">{KATEGORILER[ilan.kategori]?.icon || '📦'}</span>)}</div>
            {ilan.resimler?.length > 1 && (<div className="resim-thumbnails">{ilan.resimler.map((r, i) => (<img key={i} src={r} alt="" className={i === aktifResim ? 'aktif' : ''} onClick={() => setAktifResim(i)} />))}</div>)}
          </div>
          <div className="ilan-bilgiler">
            <div className="ilan-badges"><span className="badge kategori">{KATEGORILER[ilan.kategori]?.label}</span><span className={`badge durum ${ilan.durum === '1. El' ? 'yeni' : 'ikinci'}`}>{ilan.durum}</span></div>
            <h1>{ilan.baslik}</h1>
            <div className="ilan-fiyat-box"><span className="fiyat">{formatFiyat(ilan.fiyat)}</span>{ilan.adet > 1 && <span className="adet">({ilan.adet} adet)</span>}</div>
            <div className="ilan-konum-tarih"><span>📍 {ilan.sehir}</span><span>📅 {formatTarih(ilan.tarih)}</span></div>
            {ilan.aciklama && (<div className="ilan-aciklama"><h4>Açıklama</h4><p>{ilan.aciklama}</p></div>)}
            <div className="satici-bilgi-box" onClick={onSaticiTikla}>
              <div className="satici-avatar">{ilan.saticiTip === 'hobici' ? '👤' : '🏪'}</div>
              <div className="satici-info"><span className="satici-ad">{ilan.saticiAd}</span><span className="satici-tip">{ilan.saticiTip === 'hobici' ? 'Hobici' : 'Mağaza'}</span></div>
              {saticiPuan.sayi > 0 && <span className="satici-puan">⭐ {saticiPuan.puan}</span>}
              <span className="profil-git">Profili Gör →</span>
            </div>
            {satici && (<div className="iletisim-butonlari">{satici.telefon && (<><a href={`tel:${satici.telefon}`} className="iletisim-btn telefon">📞 Ara</a><a href={`https://wa.me/90${satici.telefon.replace(/\D/g, '').slice(-10)}`} target="_blank" rel="noopener noreferrer" className="iletisim-btn whatsapp">💬 WhatsApp</a></>)}</div>)}
            <button className="puanla-btn" onClick={onPuanla}>⭐ Puanla</button>
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
          <div className="profil-info"><h2>{satici.tip === 'hobici' ? `${satici.isim} ${satici.soyisim}` : satici.magazaAdi}</h2><span className={`tip-badge ${satici.tip}`}>{satici.tip === 'hobici' ? '👤 Hobici' : '🏪 Mağaza'}</span>{puanBilgi.sayi > 0 && <span className="puan">⭐ {puanBilgi.puan} ({puanBilgi.sayi})</span>}</div>
          <button className="puanla-btn-sm" onClick={onPuanla}>⭐</button>
        </div>
        <div className="profil-stats"><div className="stat"><span className="stat-sayi">{ilanlar.length}</span><span className="stat-label">İlan</span></div><div className="stat"><span className="stat-sayi">{formatTarih(satici.kayitTarihi)}</span><span className="stat-label">Üyelik</span></div></div>
        <div className="profil-bilgiler"><div className="bilgi-grup"><h4>📍 Konum</h4><p>{satici.ilce ? `${satici.ilce}, ` : ''}{satici.sehir}</p>{satici.googleMapsLink && (<a href={satici.googleMapsLink} target="_blank" rel="noopener noreferrer" className="maps-link">🗺️ Haritada Gör</a>)}</div>{satici.aciklama && (<div className="bilgi-grup"><h4>📝 Hakkında</h4><p>{satici.aciklama}</p></div>)}</div>
        <div className="profil-iletisim">{satici.telefon && (<><a href={`tel:${satici.telefon}`} className="iletisim-btn telefon">📞 {satici.telefon}</a><a href={`https://wa.me/90${satici.telefon.replace(/\D/g, '').slice(-10)}`} target="_blank" rel="noopener noreferrer" className="iletisim-btn whatsapp">💬 WhatsApp</a></>)}</div>
        <div className="profil-ilanlar"><h3>📦 İlanları ({ilanlar.length})</h3>{ilanlar.length > 0 ? (<div className="mini-ilanlar-grid">{ilanlar.map(ilan => (<div key={ilan.id} className="mini-ilan" onClick={() => onIlanTikla(ilan)}><div className="mini-resim">{ilan.resimler?.[0] ? <img src={ilan.resimler[0]} alt="" /> : <span>{KATEGORILER[ilan.kategori]?.icon}</span>}</div><div className="mini-bilgi"><span className="mini-baslik">{ilan.baslik}</span><span className="mini-fiyat">{formatFiyat(ilan.fiyat)}</span></div></div>))}</div>) : (<p className="bos-mesaj">İlan yok</p>)}</div>
      </div>
    </div>
  );
}

// ============ PUANLAMA MODAL ============
function PuanlamaModal({ saticiId, tip, kullaniciId, onKapat, onPuanla }) {
  const [puan, setPuan] = useState(0);
  const [yorum, setYorum] = useState('');
  const [hoverPuan, setHoverPuan] = useState(0);
  const handlePuanla = () => { if (puan === 0) return; onPuanla({ id: Date.now().toString(36), saticiId, puanlayanId: kullaniciId, tip, puan, yorum, tarih: new Date().toISOString() }); };
  return (
    <div className="modal-overlay" onClick={onKapat}>
      <div className="modal-content puanlama-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-kapat" onClick={onKapat}>✕</button>
        <div className="modal-header"><span className="modal-icon">⭐</span><h2>Puanla</h2></div>
        <div className="yildiz-puanlama">{[1, 2, 3, 4, 5].map(y => (<span key={y} className={`yildiz ${y <= (hoverPuan || puan) ? 'dolu' : ''}`} onClick={() => setPuan(y)} onMouseEnter={() => setHoverPuan(y)} onMouseLeave={() => setHoverPuan(0)}>★</span>))}<span className="puan-metin">{puan === 0 ? 'Seçin' : puan === 1 ? 'Çok Kötü' : puan === 2 ? 'Kötü' : puan === 3 ? 'Orta' : puan === 4 ? 'İyi' : 'Mükemmel'}</span></div>
        <div className="form-grup"><label>Yorum (Opsiyonel)</label><textarea value={yorum} onChange={e => setYorum(e.target.value)} rows={3} /></div>
        <button className="btn-puanla" disabled={puan === 0} onClick={handlePuanla}>⭐ Puanı Gönder</button>
      </div>
    </div>
  );
}