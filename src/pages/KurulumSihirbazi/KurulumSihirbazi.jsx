import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './KurulumSihirbazi.css';

// ==================== SABİTLER ====================

// Genişletilmiş balık listesi - Balık Rehberi ile uyumlu
const ORNEK_BALIKLAR = [
  // Canlı Doğuranlar
  { id: 1, ad: "Guppy", emoji: "🐠", minLitre: 20, kategori: "Canlı Doğuranlar" },
  { id: 2, ad: "Molly", emoji: "🐟", minLitre: 40, kategori: "Canlı Doğuranlar" },
  { id: 3, ad: "Platy", emoji: "🐠", minLitre: 30, kategori: "Canlı Doğuranlar" },
  { id: 4, ad: "Kılıçkuyruk", emoji: "🐟", minLitre: 50, kategori: "Canlı Doğuranlar" },
  { id: 5, ad: "Endler", emoji: "🐠", minLitre: 20, kategori: "Canlı Doğuranlar" },
  { id: 6, ad: "Balloon Molly", emoji: "🐟", minLitre: 40, kategori: "Canlı Doğuranlar" },
  
  // Tetralar
  { id: 10, ad: "Neon Tetra", emoji: "🐟", minLitre: 40, kategori: "Tetralar" },
  { id: 11, ad: "Cardinal Tetra", emoji: "🐠", minLitre: 50, kategori: "Tetralar" },
  { id: 12, ad: "Rummy Nose Tetra", emoji: "🐟", minLitre: 60, kategori: "Tetralar" },
  { id: 13, ad: "Ember Tetra", emoji: "🐠", minLitre: 30, kategori: "Tetralar" },
  { id: 14, ad: "Black Neon Tetra", emoji: "🐟", minLitre: 40, kategori: "Tetralar" },
  { id: 15, ad: "Congo Tetra", emoji: "🐠", minLitre: 80, kategori: "Tetralar" },
  { id: 16, ad: "Serpae Tetra", emoji: "🐟", minLitre: 50, kategori: "Tetralar" },
  
  // Labirentliler
  { id: 20, ad: "Betta", emoji: "🐟", minLitre: 10, kategori: "Labirentliler" },
  { id: 21, ad: "Cüce Gurami", emoji: "🐠", minLitre: 40, kategori: "Labirentliler" },
  { id: 22, ad: "Bal Gurami", emoji: "🐟", minLitre: 40, kategori: "Labirentliler" },
  { id: 23, ad: "İnci Gurami", emoji: "🐠", minLitre: 80, kategori: "Labirentliler" },
  { id: 24, ad: "Mavi Gurami", emoji: "🐟", minLitre: 80, kategori: "Labirentliler" },
  
  // Sazansıgiller
  { id: 30, ad: "Kaplan Barb", emoji: "🐠", minLitre: 60, kategori: "Sazansıgiller" },
  { id: 31, ad: "Cherry Barb", emoji: "🐟", minLitre: 40, kategori: "Sazansıgiller" },
  { id: 32, ad: "Zebra Danio", emoji: "🐠", minLitre: 40, kategori: "Sazansıgiller" },
  { id: 33, ad: "Harlequin Rasbora", emoji: "🐟", minLitre: 40, kategori: "Sazansıgiller" },
  { id: 34, ad: "Galaxy Rasbora", emoji: "🐠", minLitre: 30, kategori: "Sazansıgiller" },
  
  // Cikletler
  { id: 40, ad: "Melek Balığı", emoji: "🐠", minLitre: 100, kategori: "Amerika Cikletleri" },
  { id: 41, ad: "Discus", emoji: "🐟", minLitre: 200, kategori: "Amerika Cikletleri" },
  { id: 42, ad: "Oscar", emoji: "🐠", minLitre: 300, kategori: "Amerika Cikletleri" },
  { id: 43, ad: "Severum", emoji: "🐟", minLitre: 200, kategori: "Amerika Cikletleri" },
  { id: 44, ad: "German Blue Ram", emoji: "🐠", minLitre: 60, kategori: "Cüce Cikletler" },
  { id: 45, ad: "Bolivian Ram", emoji: "🐟", minLitre: 60, kategori: "Cüce Cikletler" },
  { id: 46, ad: "Apistogramma", emoji: "🐠", minLitre: 50, kategori: "Cüce Cikletler" },
  { id: 47, ad: "Kribensis", emoji: "🐟", minLitre: 60, kategori: "Cüce Cikletler" },
  
  // Malawi Cikletleri
  { id: 50, ad: "Yellow Lab", emoji: "🐠", minLitre: 150, kategori: "Malawi Cikletleri" },
  { id: 51, ad: "Demasoni", emoji: "🐟", minLitre: 150, kategori: "Malawi Cikletleri" },
  { id: 52, ad: "Red Zebra", emoji: "🐠", minLitre: 150, kategori: "Malawi Cikletleri" },
  { id: 53, ad: "Electric Blue Hap", emoji: "🐟", minLitre: 200, kategori: "Malawi Cikletleri" },
  
  // Kedi Balıkları
  { id: 60, ad: "Corydoras", emoji: "🐟", minLitre: 40, kategori: "Kedi Balıkları" },
  { id: 61, ad: "Panda Corydoras", emoji: "🐠", minLitre: 40, kategori: "Kedi Balıkları" },
  { id: 62, ad: "Sterbai Corydoras", emoji: "🐟", minLitre: 50, kategori: "Kedi Balıkları" },
  { id: 63, ad: "Bristlenose Pleco", emoji: "🐠", minLitre: 80, kategori: "Kedi Balıkları" },
  { id: 64, ad: "Otocinclus", emoji: "🐟", minLitre: 40, kategori: "Kedi Balıkları" },
  { id: 65, ad: "Clown Pleco", emoji: "🐠", minLitre: 60, kategori: "Kedi Balıkları" },
  
  // Gökkuşağı Balıkları
  { id: 70, ad: "Boesemani Gökkuşağı", emoji: "🐠", minLitre: 100, kategori: "Gökkuşağı" },
  { id: 71, ad: "Turquoise Gökkuşağı", emoji: "🐟", minLitre: 100, kategori: "Gökkuşağı" },
  
  // Diğer
  { id: 80, ad: "Japon Balığı", emoji: "🐠", minLitre: 50, kategori: "Diğer" },
  { id: 81, ad: "Bala Köpekbalığı", emoji: "🐟", minLitre: 200, kategori: "Diğer" },
  { id: 82, ad: "Rainbow Shark", emoji: "🐠", minLitre: 100, kategori: "Diğer" },
  { id: 83, ad: "Kuhli Yılanbalığı", emoji: "🐟", minLitre: 50, kategori: "Diğer" },
  
  // Omurgasızlar
  { id: 90, ad: "Red Cherry Karides", emoji: "🦐", minLitre: 20, kategori: "Omurgasızlar" },
  { id: 91, ad: "Amano Karides", emoji: "🦐", minLitre: 30, kategori: "Omurgasızlar" },
  { id: 92, ad: "Nerite Salyangoz", emoji: "🐌", minLitre: 10, kategori: "Omurgasızlar" },
  { id: 93, ad: "Mystery Salyangoz", emoji: "🐌", minLitre: 20, kategori: "Omurgasızlar" }
];

// Bitki listesi
const ORNEK_BITKILER = [
  { id: 1, ad: "Java Moss", emoji: "🌿", zorluk: "Kolay" },
  { id: 2, ad: "Anubias", emoji: "🌱", zorluk: "Kolay" },
  { id: 3, ad: "Java Fern", emoji: "🌿", zorluk: "Kolay" },
  { id: 4, ad: "Amazon Sword", emoji: "🌱", zorluk: "Orta" },
  { id: 5, ad: "Vallisneria", emoji: "🌿", zorluk: "Kolay" },
  { id: 6, ad: "Cryptocoryne", emoji: "🌱", zorluk: "Kolay" },
  { id: 7, ad: "Hygrophila", emoji: "🌿", zorluk: "Kolay" },
  { id: 8, ad: "Rotala", emoji: "🌱", zorluk: "Orta" },
  { id: 9, ad: "Ludwigia", emoji: "🌿", zorluk: "Orta" },
  { id: 10, ad: "Alternanthera", emoji: "🌱", zorluk: "Zor" },
  { id: 11, ad: "Monte Carlo", emoji: "🌿", zorluk: "Orta" },
  { id: 12, ad: "Dwarf Hairgrass", emoji: "🌱", zorluk: "Orta" },
  { id: 13, ad: "Bucephalandra", emoji: "🌿", zorluk: "Kolay" },
  { id: 14, ad: "Staurogyne Repens", emoji: "🌱", zorluk: "Orta" },
  { id: 15, ad: "Pogostemon Helferi", emoji: "🌿", zorluk: "Zor" }
];

const YEM_CESITLERI = [
  { id: 1, ad: "Pul Yem", icon: "🥣" },
  { id: 2, ad: "Granül Yem", icon: "⚫" },
  { id: 3, ad: "Canlı Yem", icon: "🪱" },
  { id: 4, ad: "Dondurulmuş Yem", icon: "🧊" },
  { id: 5, ad: "Tablet Yem", icon: "💊" },
  { id: 6, ad: "Sebze/Marul", icon: "🥬" }
];

const ILAC_LISTESI = [
  { id: 1, ad: "Metilen Mavisi", icon: "💙" },
  { id: 2, ad: "Tuz Tedavisi", icon: "🧂" },
  { id: 3, ad: "Anti-Parazit", icon: "💊" },
  { id: 4, ad: "Anti-Fungal", icon: "🍄" },
  { id: 5, ad: "Antibiyotik", icon: "💉" },
  { id: 6, ad: "Stres Coat", icon: "🛡️" }
];

const GUBRE_CESITLERI = [
  { id: 1, ad: "Sıvı Gübre (Makro)", icon: "💧" },
  { id: 2, ad: "Sıvı Gübre (Mikro)", icon: "💦" },
  { id: 3, ad: "Demir Gübresi", icon: "🔩" },
  { id: 4, ad: "Potasyum", icon: "🧪" },
  { id: 5, ad: "Root Tab", icon: "💊" },
  { id: 6, ad: "CO₂ Sıvı", icon: "🫧" }
];

// ==================== ANA KOMPONENT ====================

export default function KurulumSihirbazi({ kullanici, onKurulumTamamla }) {
  const navigate = useNavigate();
  const [aktifAdim, setAktifAdim] = useState(1);
  const [animasyonYonu, setAnimasyonYonu] = useState('ileri');
  const [yukleniyor, setYukleniyor] = useState(false);
  const [yuklemeMesaji, setYuklemeMesaji] = useState('');
  const [yuklemeDurumu, setYuklemeDurumu] = useState(0);
  
  const bugun = new Date().toISOString().split('T')[0];
  
  // ==================== FORM STATE ====================
  const [formData, setFormData] = useState({
    // Tank ID (multi-tank için)
    id: `tank_${Date.now()}`,
    
    // ADIM 1 - Akvaryum Bilgileri
    akvaryumAdi: '',
    suTuru: 'tatli',
    akvaryumTipi: 'bitkili',
    uzunluk: '',
    genislik: '',
    yukseklik: '',
    netLitre: 0,
    
    // ADIM 2 - Canlı Durumu
    balikVar: false,
    bitkiVar: false,
    omurgasizVar: false,
    seciliBaliklar: [],
    seciliBitkiler: [],
    bitkiYogunlugu: 'low',
    omurgasizTur: '',
    
    // ADIM 3 - Kurulum Seviyesi
    kurulumSeviyesi: '',
    
    // ADIM 4 - Ekipmanlar (detaylı)
    filtreVar: false,
    filtreTipi: '',
    filtreDebi: '',
    filtreMarka: '',
    filtreModel: '',
    filtreSonTemizlik: '',
    
    isiticiVar: false,
    isiticiWatt: '',
    isiticiMarka: '',
    hedefSicaklik: 25,
    
    ledVar: false,
    ledWatt: '',
    ledMarka: '',
    ledSaat: 8,
    
    havaMotoru: false,
    co2Sistemi: false,
    co2Tipi: '',
    suKaynagi: 'musluk',
    
    // ADIM 5 - Su Parametreleri
    sicaklik: 25,
    ph: 7.0,
    gh: '',
    kh: '',
    ghBilmiyor: false,
    khBilmiyor: false,
    nitrat: '',
    nitrit: '',
    amonyak: '',
    sonTestTarihi: '',
    
    // ADIM 6 - Bakım Geçmişi (YENİ)
    sonSuDegisimi: '',
    suDegisimOrani: 25,
    suDegisimSikligi: 'haftalik',
    sonYemlemeTarihi: '',
    yemCesitleri: [],
    yemlemeSikligi: 'gunde2',
    
    // ADIM 7 - Gözlem & Sağlık (YENİ)
    algDurumu: 'yok',
    suBerrakligi: 'berrak',
    hastaBalikVar: false,
    hastaBalikAciklama: '',
    ilacTedaviVar: false,
    sonIlacTarihi: '',
    kullanilanIlaclar: [],
    tedaviNotu: '',
    
    // ADIM 8 - Bitki Bakımı (bitkiVar ise) (YENİ)
    sonBudamaTarihi: '',
    sonGubrelemeTarihi: '',
    gubreCesitleri: [],
    gubrelemeSikligi: 'haftalik',
    
    // ADIM 9 - Stok Takibi (YENİ)
    stokTakibiVar: false,
    stoklar: [],
    
    // Meta
    olusturmaTarihi: new Date().toISOString()
  });

  // Toplam adım sayısı (bitkiVar ise 10, değilse 9)
  const toplamAdim = formData.bitkiVar ? 10 : 9;

  // ==================== EFFECTS ====================
  
  // Litre hesaplama
  useEffect(() => {
    if (formData.uzunluk && formData.genislik && formData.yukseklik) {
      const brut = (formData.uzunluk * formData.genislik * formData.yukseklik) / 1000;
      const net = Math.round(brut * 0.85);
      setFormData(prev => ({ ...prev, netLitre: net }));
    }
  }, [formData.uzunluk, formData.genislik, formData.yukseklik]);

  // ==================== HELPER FONKSİYONLAR ====================

  // Risk skoru hesaplama
  const hesaplaRiskSkoru = () => {
    let risk = 0;
    
    // Kapasite kontrolü
    const toplamBalik = formData.seciliBaliklar.reduce((t, b) => t + b.adet, 0);
    const kapasiteOrani = toplamBalik / Math.max(formData.netLitre / 5, 1);
    if (kapasiteOrani > 1) risk += 30;
    else if (kapasiteOrani > 0.8) risk += 15;
    
    // Ekipman kontrolleri
    if (formData.kurulumSeviyesi === 'high' && !formData.co2Sistemi) risk += 25;
    if (!formData.isiticiVar && formData.suTuru === 'tatli') risk += 10;
    if (!formData.filtreVar) risk += 20;
    
    // Sağlık kontrolleri
    if (formData.hastaBalikVar) risk += 20;
    if (formData.algDurumu === 'cok') risk += 15;
    if (formData.suBerrakligi === 'bulanik') risk += 10;
    
    return Math.min(risk, 100);
  };

  // Adım değiştirme
  const adimDegistir = (yeniAdim) => {
    setAnimasyonYonu(yeniAdim > aktifAdim ? 'ileri' : 'geri');
    setAktifAdim(yeniAdim);
  };

  const sonrakiAdim = () => {
    if (aktifAdim < toplamAdim) {
      adimDegistir(aktifAdim + 1);
    }
  };

  const oncekiAdim = () => {
    if (aktifAdim > 1) {
      adimDegistir(aktifAdim - 1);
    }
  };

  // Balık ekleme
  const balikEkle = (balik) => {
    const mevcut = formData.seciliBaliklar.find(b => b.id === balik.id);
    if (mevcut) {
      setFormData(prev => ({
        ...prev,
        seciliBaliklar: prev.seciliBaliklar.map(b => 
          b.id === balik.id ? { ...b, adet: b.adet + 1 } : b
        )
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        seciliBaliklar: [...prev.seciliBaliklar, { ...balik, adet: 1 }]
      }));
    }
  };

  const balikCikar = (balikId) => {
    setFormData(prev => ({
      ...prev,
      seciliBaliklar: prev.seciliBaliklar.filter(b => b.id !== balikId)
    }));
  };

  const balikAdetAzalt = (balikId) => {
    setFormData(prev => ({
      ...prev,
      seciliBaliklar: prev.seciliBaliklar.map(b => 
        b.id === balikId && b.adet > 1 ? { ...b, adet: b.adet - 1 } : b
      )
    }));
  };

  // Yem toggle
  const yemToggle = (yem) => {
    const mevcut = formData.yemCesitleri.find(y => y.id === yem.id);
    if (mevcut) {
      setFormData(prev => ({
        ...prev,
        yemCesitleri: prev.yemCesitleri.filter(y => y.id !== yem.id)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        yemCesitleri: [...prev.yemCesitleri, yem]
      }));
    }
  };

  // İlaç toggle
  const ilacToggle = (ilac) => {
    const mevcut = formData.kullanilanIlaclar.find(i => i.id === ilac.id);
    if (mevcut) {
      setFormData(prev => ({
        ...prev,
        kullanilanIlaclar: prev.kullanilanIlaclar.filter(i => i.id !== ilac.id)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        kullanilanIlaclar: [...prev.kullanilanIlaclar, ilac]
      }));
    }
  };

  // Gübre toggle
  const gubreToggle = (gubre) => {
    const mevcut = formData.gubreCesitleri.find(g => g.id === gubre.id);
    if (mevcut) {
      setFormData(prev => ({
        ...prev,
        gubreCesitleri: prev.gubreCesitleri.filter(g => g.id !== gubre.id)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        gubreCesitleri: [...prev.gubreCesitleri, gubre]
      }));
    }
  };

  // Stok işlemleri
  const stokEkle = () => {
    const yeniStok = {
      id: Date.now(),
      kategori: '',
      urunAdi: '',
      miktar: '',
      birim: 'adet',
      alisTarihi: ''
    };
    setFormData(prev => ({
      ...prev,
      stoklar: [...prev.stoklar, yeniStok]
    }));
  };

  const stokGuncelle = (stokId, alan, deger) => {
    setFormData(prev => ({
      ...prev,
      stoklar: prev.stoklar.map(s => 
        s.id === stokId ? { ...s, [alan]: deger } : s
      )
    }));
  };

  const stokSil = (stokId) => {
    setFormData(prev => ({
      ...prev,
      stoklar: prev.stoklar.filter(s => s.id !== stokId)
    }));
  };

  // ==================== KURULUM TAMAMLA ====================
  
  const kurulumTamamla = async () => {
    setYukleniyor(true);
    setYuklemeDurumu(0);
    
    const mesajlar = [
      'Akvaryum bilgileri kaydediliyor...',
      'Canlı envanteri oluşturuluyor...',
      'Su parametreleri analiz ediliyor...',
      'Bakım takvimi hazırlanıyor...',
      'Dashboard özelleştiriliyor...',
      'Günlük entegrasyonu yapılıyor...',
      'Son kontroller yapılıyor...',
      'Hazır! 🎉'
    ];
    
    for (let i = 0; i < mesajlar.length; i++) {
      setYuklemeMesaji(mesajlar[i]);
      setYuklemeDurumu(((i + 1) / mesajlar.length) * 100);
      await new Promise(resolve => setTimeout(resolve, 400));
    }
    
    // Tank verisini hazırla
    const tankVerisi = {
      ...formData,
      riskSkoru: hesaplaRiskSkoru(),
      sonGuncellemeTarihi: new Date().toISOString(),
      kullaniciId: kullanici?.id || 'misafir'
    };
    
    // Mevcut tanklara ekle
    const mevcutTanklar = JSON.parse(localStorage.getItem('akvaryumlar') || '[]');
    const yeniTanklar = [...mevcutTanklar, tankVerisi];
    localStorage.setItem('akvaryumlar', JSON.stringify(yeniTanklar));
    
    // Aktif tank olarak ayarla
    localStorage.setItem('aktifAkvaryumId', tankVerisi.id);
    localStorage.setItem('akvaryumKurulum', JSON.stringify(tankVerisi));
    
    // İlk günlük kaydını oluştur
    const ilkGunlukKaydi = {
      id: Date.now(),
      akvaryumId: tankVerisi.id,
      tarih: new Date().toISOString(),
      tip: 'kurulum',
      baslik: `${tankVerisi.akvaryumAdi} kurulumu tamamlandı`,
      detaylar: {
        litre: tankVerisi.netLitre,
        balikSayisi: tankVerisi.seciliBaliklar.reduce((t, b) => t + b.adet, 0),
        kurulumSeviyesi: tankVerisi.kurulumSeviyesi
      }
    };
    
    const mevcutGunluk = JSON.parse(localStorage.getItem('gunlukKayitlari') || '[]');
    localStorage.setItem('gunlukKayitlari', JSON.stringify([...mevcutGunluk, ilkGunlukKaydi]));
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Callback
    if (onKurulumTamamla) {
      onKurulumTamamla(tankVerisi);
    }
    
    // Ana sayfaya yönlendir
    navigate('/');
  };

  // ==================== ADIM 1: AKVARYUM BİLGİLERİ ====================
  
  const renderAdim1 = () => (
    <div className="adim-icerik">
      <div className="adim-baslik">
        <span className="adim-emoji">🐠</span>
        <h2>Akvaryumunu Tanımla</h2>
        <p>Temel bilgileri girerek başlayalım</p>
      </div>

      <div className="form-alan">
        <label>Akvaryum Adı</label>
        <input
          type="text"
          placeholder="Örn: Salon Tankı, Betta Evi..."
          value={formData.akvaryumAdi}
          onChange={(e) => setFormData({...formData, akvaryumAdi: e.target.value})}
        />
      </div>

      <div className="form-alan">
        <label>Su Türü</label>
        <div className="secim-kartlari mini">
          <div 
            className={`secim-kart ${formData.suTuru === 'tatli' ? 'secili' : ''}`}
            onClick={() => setFormData({...formData, suTuru: 'tatli'})}
          >
            <span>💧</span>
            <span>Tatlı Su</span>
          </div>
          <div 
            className={`secim-kart ${formData.suTuru === 'tuzlu' ? 'secili' : ''}`}
            onClick={() => setFormData({...formData, suTuru: 'tuzlu'})}
          >
            <span>🌊</span>
            <span>Tuzlu Su</span>
          </div>
        </div>
      </div>

      <div className="form-alan">
        <label>Akvaryum Tipi</label>
        <div className="secim-kartlari mini iki">
          {[
            { value: 'bitkili', label: 'Bitkili', emoji: '🌿', desc: 'Canlı bitkiler ile' },
            { value: 'bitkisiz', label: 'Bitkisiz', emoji: '🪨', desc: 'Yapay dekor ile' }
          ].map(tip => (
            <div 
              key={tip.value}
              className={`secim-kart buyuk ${formData.akvaryumTipi === tip.value ? 'secili' : ''}`}
              onClick={() => setFormData({...formData, akvaryumTipi: tip.value, bitkiVar: tip.value === 'bitkili'})}
            >
              <span className="secim-emoji">{tip.emoji}</span>
              <span className="secim-baslik">{tip.label}</span>
              <span className="secim-aciklama">{tip.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="form-alan">
        <label>Ölçüler (cm)</label>
        <div className="olcu-grid">
          <div className="olcu-input">
            <span>📏</span>
            <input
              type="number"
              placeholder="Uzunluk"
              value={formData.uzunluk}
              onChange={(e) => setFormData({...formData, uzunluk: e.target.value})}
            />
          </div>
          <div className="olcu-input">
            <span>📐</span>
            <input
              type="number"
              placeholder="Genişlik"
              value={formData.genislik}
              onChange={(e) => setFormData({...formData, genislik: e.target.value})}
            />
          </div>
          <div className="olcu-input">
            <span>📊</span>
            <input
              type="number"
              placeholder="Yükseklik"
              value={formData.yukseklik}
              onChange={(e) => setFormData({...formData, yukseklik: e.target.value})}
            />
          </div>
        </div>
      </div>

      {formData.netLitre > 0 && (
        <div className="hesaplanan-litre">
          <div className="litre-ikon">💧</div>
          <div className="litre-bilgi">
            <span className="litre-deger">{formData.netLitre} Litre</span>
            <span className="litre-aciklama">Net hacim (substrat düşülmüş)</span>
          </div>
        </div>
      )}
    </div>
  );

  // ==================== ADIM 2: CANLI DURUMU ====================
  
  const renderAdim2 = () => (
    <div className="adim-icerik">
      <div className="adim-baslik">
        <span className="adim-emoji">🐟</span>
        <h2>Canlı Durumu</h2>
        <p>Akvaryumundaki canlıları belirle</p>
      </div>

      {/* Balık Toggle */}
      <div className="toggle-alan">
        <div className="toggle-baslik">
          <span>🐠</span>
          <span>Balık var mı?</span>
        </div>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={formData.balikVar}
            onChange={(e) => setFormData({...formData, balikVar: e.target.checked})}
          />
          <span className="toggle-slider"></span>
        </label>
      </div>

      {formData.balikVar && (
        <div className="alt-secim balik-secim">
          <p className="secim-aciklama">🐠 Balık Rehberinden Seç:</p>
          
          {/* Kategorilere göre grupla */}
          {[...new Set(ORNEK_BALIKLAR.map(b => b.kategori))].map(kategori => (
            <div key={kategori} className="balik-kategori">
              <h5 className="kategori-baslik">{kategori}</h5>
              <div className="balik-listesi">
                {ORNEK_BALIKLAR.filter(b => b.kategori === kategori).map(balik => (
                  <div 
                    key={balik.id}
                    className={`balik-chip ${formData.seciliBaliklar.find(s => s.id === balik.id) ? 'secili' : ''}`}
                    onClick={() => balikEkle(balik)}
                  >
                    <span>{balik.emoji}</span>
                    <span>{balik.ad}</span>
                    <span className="min-litre">{balik.minLitre}L+</span>
                    <span className="ekle-btn">+</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {formData.seciliBaliklar.length > 0 && (
            <div className="secili-baliklar">
              <h4>✅ Seçilen Balıklar ({formData.seciliBaliklar.reduce((t, b) => t + b.adet, 0)} adet):</h4>
              <div className="secili-liste">
                {formData.seciliBaliklar.map(balik => (
                  <div key={balik.id} className="secili-balik">
                    <span>{balik.emoji} {balik.ad}</span>
                    <div className="adet-kontrol">
                      <button onClick={() => balikAdetAzalt(balik.id)}>-</button>
                      <span>{balik.adet}</span>
                      <button onClick={() => balikEkle(balik)}>+</button>
                      <button className="sil" onClick={() => balikCikar(balik.id)}>×</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bitki Toggle */}
      <div className="toggle-alan">
        <div className="toggle-baslik">
          <span>🌿</span>
          <span>Bitki var mı?</span>
        </div>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={formData.bitkiVar}
            onChange={(e) => setFormData({...formData, bitkiVar: e.target.checked})}
          />
          <span className="toggle-slider"></span>
        </label>
      </div>

      {formData.bitkiVar && (
        <div className="alt-secim">
          <p className="secim-aciklama">Bitki Yoğunluğu:</p>
          <div className="secim-kartlari mini uc">
            {[
              { value: 'low', label: 'Düşük', emoji: '🌱', desc: 'Az bitki' },
              { value: 'mid', label: 'Orta', emoji: '🌿', desc: 'Dengeli' },
              { value: 'high', label: 'Yoğun', emoji: '🌳', desc: 'Dutch style' }
            ].map(seviye => (
              <div 
                key={seviye.value}
                className={`secim-kart ${formData.bitkiYogunlugu === seviye.value ? 'secili' : ''}`}
                onClick={() => setFormData({...formData, bitkiYogunlugu: seviye.value})}
              >
                <span className="buyuk">{seviye.emoji}</span>
                <span className="label">{seviye.label}</span>
                <span className="desc">{seviye.desc}</span>
              </div>
            ))}
          </div>
          
          {/* Bitki Rehberinden Seç */}
          <p className="secim-aciklama" style={{marginTop: '20px'}}>🌿 Bitki Rehberinden Seç:</p>
          <div className="bitki-listesi">
            {ORNEK_BITKILER.map(bitki => (
              <div 
                key={bitki.id}
                className={`bitki-chip ${formData.seciliBitkiler?.includes(bitki.ad) ? 'secili' : ''}`}
                onClick={() => {
                  const mevcutBitkiler = formData.seciliBitkiler || [];
                  if (mevcutBitkiler.includes(bitki.ad)) {
                    setFormData({...formData, seciliBitkiler: mevcutBitkiler.filter(b => b !== bitki.ad)});
                  } else {
                    setFormData({...formData, seciliBitkiler: [...mevcutBitkiler, bitki.ad]});
                  }
                }}
              >
                <span>{bitki.emoji}</span>
                <span>{bitki.ad}</span>
                <span className={`zorluk ${bitki.zorluk.toLowerCase()}`}>{bitki.zorluk}</span>
              </div>
            ))}
          </div>
          
          {formData.seciliBitkiler?.length > 0 && (
            <div className="secili-bitkiler">
              <h4>✅ Seçilen Bitkiler ({formData.seciliBitkiler.length}):</h4>
              <div className="secili-bitki-liste">
                {formData.seciliBitkiler.map(bitki => (
                  <span key={bitki} className="bitki-tag">{bitki}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Omurgasız Toggle */}
      <div className="toggle-alan">
        <div className="toggle-baslik">
          <span>🦐</span>
          <span>Omurgasız var mı?</span>
        </div>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={formData.omurgasizVar}
            onChange={(e) => setFormData({...formData, omurgasizVar: e.target.checked})}
          />
          <span className="toggle-slider"></span>
        </label>
      </div>

      {formData.omurgasizVar && (
        <div className="alt-secim">
          <div className="secim-kartlari mini iki">
            <div 
              className={`secim-kart ${formData.omurgasizTur === 'karides' ? 'secili' : ''}`}
              onClick={() => setFormData({...formData, omurgasizTur: 'karides'})}
            >
              <span>🦐</span>
              <span>Karides</span>
            </div>
            <div 
              className={`secim-kart ${formData.omurgasizTur === 'salyangoz' ? 'secili' : ''}`}
              onClick={() => setFormData({...formData, omurgasizTur: 'salyangoz'})}
            >
              <span>🐌</span>
              <span>Salyangoz</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // ==================== ADIM 3: KURULUM SEVİYESİ ====================
  
  const renderAdim3 = () => (
    <div className="adim-icerik">
      <div className="adim-baslik">
        <span className="adim-emoji">⚙️</span>
        <h2>Kurulum Seviyesi</h2>
        <p>Akvaryum bakım stilini seç</p>
      </div>

      <div className="seviye-kartlari">
        <div 
          className={`seviye-kart low ${formData.kurulumSeviyesi === 'low' ? 'secili' : ''}`}
          onClick={() => setFormData({...formData, kurulumSeviyesi: 'low'})}
        >
          <div className="seviye-badge">🟢</div>
          <h3>Low Tech</h3>
          <p className="seviye-slogan">"Doğal ve rahat"</p>
          <ul className="seviye-ozellikler">
            <li>❌ CO₂ gerekmiyor</li>
            <li>💡 Orta seviye ışık</li>
            <li>🌱 Hardy bitkiler</li>
            <li>⏰ Haftalık bakım</li>
          </ul>
        </div>

        <div 
          className={`seviye-kart mid ${formData.kurulumSeviyesi === 'mid' ? 'secili' : ''}`}
          onClick={() => setFormData({...formData, kurulumSeviyesi: 'mid'})}
        >
          <div className="seviye-badge">🟡</div>
          <h3>Mid Tech</h3>
          <p className="seviye-slogan">"Dengeli performans"</p>
          <ul className="seviye-ozellikler">
            <li>🔄 CO₂ opsiyonel</li>
            <li>💡 Orta-yüksek ışık</li>
            <li>🌿 Çeşitli bitkiler</li>
            <li>⏰ Haftada 2-3 bakım</li>
          </ul>
        </div>

        <div 
          className={`seviye-kart high ${formData.kurulumSeviyesi === 'high' ? 'secili' : ''}`}
          onClick={() => setFormData({...formData, kurulumSeviyesi: 'high'})}
        >
          <div className="seviye-badge">🔴</div>
          <h3>High Tech</h3>
          <p className="seviye-slogan">"Maksimum performans"</p>
          <ul className="seviye-ozellikler">
            <li>✅ CO₂ şart</li>
            <li>💡 Güçlü aydınlatma</li>
            <li>🌳 Her türlü bitki</li>
            <li>⏰ Günlük takip</li>
          </ul>
        </div>
      </div>
    </div>
  );

  // ==================== ADIM 4: EKİPMANLAR ====================
  
  const renderAdim4 = () => (
    <div className="adim-icerik">
      <div className="adim-baslik">
        <span className="adim-emoji">🔧</span>
        <h2>Ekipmanların</h2>
        <p>Marka ve model bilgilerini de ekle</p>
      </div>

      {/* Filtre */}
      <div className="ekipman-grup">
        <div className="ekipman-header">
          <label className="ekipman-checkbox">
            <input
              type="checkbox"
              checked={formData.filtreVar}
              onChange={(e) => setFormData({...formData, filtreVar: e.target.checked})}
            />
            <span className="checkmark"></span>
            <span className="ekipman-icon">🔄</span>
            <span>Filtre</span>
          </label>
        </div>
        {formData.filtreVar && (
          <div className="ekipman-detay">
            <div className="detay-row">
              <select
                value={formData.filtreTipi}
                onChange={(e) => setFormData({...formData, filtreTipi: e.target.value})}
              >
                <option value="">Tip Seç</option>
                <option value="ic">İç Filtre</option>
                <option value="dis">Dış Filtre</option>
                <option value="asma">Asma Filtre</option>
                <option value="sump">Sump</option>
              </select>
              <input
                type="number"
                placeholder="Debi (L/h)"
                value={formData.filtreDebi}
                onChange={(e) => setFormData({...formData, filtreDebi: e.target.value})}
              />
            </div>
            <div className="detay-row">
              <input
                type="text"
                placeholder="Marka (Eheim, JBL...)"
                value={formData.filtreMarka}
                onChange={(e) => setFormData({...formData, filtreMarka: e.target.value})}
              />
              <input
                type="text"
                placeholder="Model"
                value={formData.filtreModel}
                onChange={(e) => setFormData({...formData, filtreModel: e.target.value})}
              />
            </div>
            <div className="detay-row">
              <div className="tarih-input">
                <label>Son Filtre Temizliği</label>
                <input
                  type="date"
                  value={formData.filtreSonTemizlik}
                  max={bugun}
                  onChange={(e) => setFormData({...formData, filtreSonTemizlik: e.target.value})}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Isıtıcı */}
      <div className="ekipman-grup">
        <div className="ekipman-header">
          <label className="ekipman-checkbox">
            <input
              type="checkbox"
              checked={formData.isiticiVar}
              onChange={(e) => setFormData({...formData, isiticiVar: e.target.checked})}
            />
            <span className="checkmark"></span>
            <span className="ekipman-icon">🌡️</span>
            <span>Isıtıcı</span>
          </label>
        </div>
        {formData.isiticiVar && (
          <div className="ekipman-detay">
            <div className="detay-row">
              <input
                type="number"
                placeholder="Watt"
                value={formData.isiticiWatt}
                onChange={(e) => setFormData({...formData, isiticiWatt: e.target.value})}
              />
              <input
                type="text"
                placeholder="Marka"
                value={formData.isiticiMarka}
                onChange={(e) => setFormData({...formData, isiticiMarka: e.target.value})}
              />
            </div>
            <div className="slider-grup full">
              <label>Hedef Sıcaklık: {formData.hedefSicaklik}°C</label>
              <input
                type="range"
                min="18"
                max="32"
                value={formData.hedefSicaklik}
                onChange={(e) => setFormData({...formData, hedefSicaklik: parseInt(e.target.value)})}
              />
            </div>
          </div>
        )}
      </div>

      {/* LED */}
      <div className="ekipman-grup">
        <div className="ekipman-header">
          <label className="ekipman-checkbox">
            <input
              type="checkbox"
              checked={formData.ledVar}
              onChange={(e) => setFormData({...formData, ledVar: e.target.checked})}
            />
            <span className="checkmark"></span>
            <span className="ekipman-icon">💡</span>
            <span>LED Aydınlatma</span>
          </label>
        </div>
        {formData.ledVar && (
          <div className="ekipman-detay">
            <div className="detay-row">
              <input
                type="number"
                placeholder="Watt"
                value={formData.ledWatt}
                onChange={(e) => setFormData({...formData, ledWatt: e.target.value})}
              />
              <input
                type="text"
                placeholder="Marka"
                value={formData.ledMarka}
                onChange={(e) => setFormData({...formData, ledMarka: e.target.value})}
              />
            </div>
            <div className="slider-grup full">
              <label>Günlük Işık: {formData.ledSaat} saat</label>
              <input
                type="range"
                min="4"
                max="12"
                value={formData.ledSaat}
                onChange={(e) => setFormData({...formData, ledSaat: parseInt(e.target.value)})}
              />
            </div>
          </div>
        )}
      </div>

      {/* Diğer */}
      <div className="diger-ekipmanlar">
        <label className="mini-checkbox">
          <input
            type="checkbox"
            checked={formData.havaMotoru}
            onChange={(e) => setFormData({...formData, havaMotoru: e.target.checked})}
          />
          <span>💨 Hava Motoru</span>
        </label>
        <label className="mini-checkbox">
          <input
            type="checkbox"
            checked={formData.co2Sistemi}
            onChange={(e) => setFormData({...formData, co2Sistemi: e.target.checked})}
          />
          <span>🫧 CO₂ Sistemi</span>
        </label>
      </div>

      {formData.co2Sistemi && (
        <div className="alt-secim">
          <p className="secim-aciklama">CO₂ Tipi:</p>
          <div className="secim-kartlari mini uc">
            <div 
              className={`secim-kart ${formData.co2Tipi === 'tup' ? 'secili' : ''}`}
              onClick={() => setFormData({...formData, co2Tipi: 'tup'})}
            >
              <span>🧪</span>
              <span>Tüp Sistemi</span>
            </div>
            <div 
              className={`secim-kart ${formData.co2Tipi === 'diy' ? 'secili' : ''}`}
              onClick={() => setFormData({...formData, co2Tipi: 'diy'})}
            >
              <span>🔧</span>
              <span>DIY</span>
            </div>
            <div 
              className={`secim-kart ${formData.co2Tipi === 'sivi' ? 'secili' : ''}`}
              onClick={() => setFormData({...formData, co2Tipi: 'sivi'})}
            >
              <span>💧</span>
              <span>Sıvı CO₂</span>
            </div>
          </div>
        </div>
      )}

      <div className="form-alan">
        <label>Su Kaynağı</label>
        <div className="secim-kartlari mini iki">
          <div 
            className={`secim-kart ${formData.suKaynagi === 'musluk' ? 'secili' : ''}`}
            onClick={() => setFormData({...formData, suKaynagi: 'musluk'})}
          >
            <span>🚰</span>
            <span>Musluk Suyu</span>
          </div>
          <div 
            className={`secim-kart ${formData.suKaynagi === 'ro' ? 'secili' : ''}`}
            onClick={() => setFormData({...formData, suKaynagi: 'ro'})}
          >
            <span>💧</span>
            <span>RO Suyu</span>
          </div>
        </div>
      </div>
    </div>
  );

  // ==================== ADIM 5: SU PARAMETRELERİ ====================
  
  const renderAdim5 = () => (
    <div className="adim-icerik">
      <div className="adim-baslik">
        <span className="adim-emoji">🧪</span>
        <h2>Su Parametreleri</h2>
        <p>Mevcut su değerlerini gir</p>
      </div>

      <div className="form-alan">
        <label>Son Test Tarihi</label>
        <input
          type="date"
          value={formData.sonTestTarihi}
          max={bugun}
          onChange={(e) => setFormData({...formData, sonTestTarihi: e.target.value})}
        />
      </div>

      <div className="parametre-grid">
        <div className="parametre-kart">
          <div className="parametre-icon">🌡️</div>
          <label>Sıcaklık</label>
          <div className="parametre-input">
            <input
              type="number"
              step="0.5"
              value={formData.sicaklik}
              onChange={(e) => setFormData({...formData, sicaklik: parseFloat(e.target.value)})}
            />
            <span className="birim">°C</span>
          </div>
        </div>

        <div className="parametre-kart">
          <div className="parametre-icon">📊</div>
          <label>pH</label>
          <div className="parametre-input">
            <input
              type="number"
              step="0.1"
              min="5"
              max="9"
              value={formData.ph}
              onChange={(e) => setFormData({...formData, ph: parseFloat(e.target.value)})}
            />
          </div>
        </div>

        <div className="parametre-kart">
          <div className="parametre-icon">💎</div>
          <label>GH</label>
          {!formData.ghBilmiyor ? (
            <div className="parametre-input">
              <input
                type="number"
                placeholder="dGH"
                value={formData.gh}
                onChange={(e) => setFormData({...formData, gh: e.target.value})}
              />
            </div>
          ) : (
            <div className="bilmiyor-mesaj">Bilmiyorum</div>
          )}
          <label className="bilmiyor-checkbox">
            <input
              type="checkbox"
              checked={formData.ghBilmiyor}
              onChange={(e) => setFormData({...formData, ghBilmiyor: e.target.checked, gh: ''})}
            />
            <span>Bilmiyorum</span>
          </label>
        </div>

        <div className="parametre-kart">
          <div className="parametre-icon">🧊</div>
          <label>KH</label>
          {!formData.khBilmiyor ? (
            <div className="parametre-input">
              <input
                type="number"
                placeholder="dKH"
                value={formData.kh}
                onChange={(e) => setFormData({...formData, kh: e.target.value})}
              />
            </div>
          ) : (
            <div className="bilmiyor-mesaj">Bilmiyorum</div>
          )}
          <label className="bilmiyor-checkbox">
            <input
              type="checkbox"
              checked={formData.khBilmiyor}
              onChange={(e) => setFormData({...formData, khBilmiyor: e.target.checked, kh: ''})}
            />
            <span>Bilmiyorum</span>
          </label>
        </div>
      </div>

      <div className="opsiyonel-parametreler">
        <h4>📋 Azot Döngüsü Değerleri (Opsiyonel)</h4>
        <div className="opsiyonel-grid">
          <div className="opsiyonel-input">
            <label>Amonyak (NH₃)</label>
            <input
              type="number"
              step="0.1"
              placeholder="ppm"
              value={formData.amonyak}
              onChange={(e) => setFormData({...formData, amonyak: e.target.value})}
            />
          </div>
          <div className="opsiyonel-input">
            <label>Nitrit (NO₂)</label>
            <input
              type="number"
              step="0.1"
              placeholder="ppm"
              value={formData.nitrit}
              onChange={(e) => setFormData({...formData, nitrit: e.target.value})}
            />
          </div>
          <div className="opsiyonel-input">
            <label>Nitrat (NO₃)</label>
            <input
              type="number"
              placeholder="ppm"
              value={formData.nitrat}
              onChange={(e) => setFormData({...formData, nitrat: e.target.value})}
            />
          </div>
        </div>
      </div>
    </div>
  );

  // DEVAMI PART 2'DE...
  // ==================== ADIM 6: BAKIM GEÇMİŞİ (YENİ) ====================
  
  const renderAdim6 = () => (
    <div className="adim-icerik">
      <div className="adim-baslik">
        <span className="adim-emoji">🔄</span>
        <h2>Bakım Geçmişi</h2>
        <p>Su değişimi ve yemleme bilgileri</p>
      </div>

      {/* Su Değişimi */}
      <div className="bakim-bolum">
        <h3>💧 Su Değişimi</h3>
        <div className="bakim-grid">
          <div className="form-alan">
            <label>Son Su Değişimi</label>
            <input
              type="date"
              value={formData.sonSuDegisimi}
              max={bugun}
              onChange={(e) => setFormData({...formData, sonSuDegisimi: e.target.value})}
            />
          </div>
          <div className="form-alan">
            <label>Değişim Oranı: %{formData.suDegisimOrani}</label>
            <input
              type="range"
              min="10"
              max="50"
              step="5"
              value={formData.suDegisimOrani}
              onChange={(e) => setFormData({...formData, suDegisimOrani: parseInt(e.target.value)})}
            />
          </div>
        </div>
        <div className="form-alan">
          <label>Su Değişim Sıklığı</label>
          <div className="secim-kartlari mini dort">
            {[
              { value: 'gunluk', label: 'Günlük', icon: '📅' },
              { value: 'haftalik', label: 'Haftalık', icon: '📆' },
              { value: '2hafta', label: '2 Hafta', icon: '🗓️' },
              { value: 'aylik', label: 'Aylık', icon: '📋' }
            ].map(opt => (
              <div 
                key={opt.value}
                className={`secim-kart ${formData.suDegisimSikligi === opt.value ? 'secili' : ''}`}
                onClick={() => setFormData({...formData, suDegisimSikligi: opt.value})}
              >
                <span>{opt.icon}</span>
                <span>{opt.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Yemleme */}
      <div className="bakim-bolum">
        <h3>🍽️ Yemleme</h3>
        <div className="form-alan">
          <label>Son Yemleme Tarihi</label>
          <input
            type="date"
            value={formData.sonYemlemeTarihi}
            max={bugun}
            onChange={(e) => setFormData({...formData, sonYemlemeTarihi: e.target.value})}
          />
        </div>
        <div className="form-alan">
          <label>Kullandığın Yem Çeşitleri</label>
          <div className="chip-secim">
            {YEM_CESITLERI.map(yem => (
              <div 
                key={yem.id}
                className={`chip ${formData.yemCesitleri.find(y => y.id === yem.id) ? 'secili' : ''}`}
                onClick={() => yemToggle(yem)}
              >
                <span>{yem.icon}</span>
                <span>{yem.ad}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="form-alan">
          <label>Yemleme Sıklığı</label>
          <div className="secim-kartlari mini dort">
            {[
              { value: 'gunde1', label: 'Günde 1', icon: '1️⃣' },
              { value: 'gunde2', label: 'Günde 2', icon: '2️⃣' },
              { value: 'gunde3', label: 'Günde 3', icon: '3️⃣' },
              { value: 'gunde4', label: 'Günde 4', icon: '4️⃣' }
            ].map(opt => (
              <div 
                key={opt.value}
                className={`secim-kart ${formData.yemlemeSikligi === opt.value ? 'secili' : ''}`}
                onClick={() => setFormData({...formData, yemlemeSikligi: opt.value})}
              >
                <span>{opt.icon}</span>
                <span>{opt.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ==================== ADIM 7: GÖZLEM & SAĞLIK (YENİ) ====================
  
  const renderAdim7 = () => (
    <div className="adim-icerik">
      <div className="adim-baslik">
        <span className="adim-emoji">👁️</span>
        <h2>Gözlem & Sağlık</h2>
        <p>Akvaryumun mevcut durumu</p>
      </div>

      {/* Alg Durumu */}
      <div className="form-alan">
        <label>🌿 Alg/Yosun Durumu</label>
        <div className="secim-kartlari mini dort">
          {[
            { value: 'yok', label: 'Yok', icon: '✅' },
            { value: 'az', label: 'Az', icon: '🟡' },
            { value: 'orta', label: 'Orta', icon: '🟠' },
            { value: 'cok', label: 'Çok', icon: '🔴' }
          ].map(opt => (
            <div 
              key={opt.value}
              className={`secim-kart ${formData.algDurumu === opt.value ? 'secili' : ''}`}
              onClick={() => setFormData({...formData, algDurumu: opt.value})}
            >
              <span>{opt.icon}</span>
              <span>{opt.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Su Berraklığı */}
      <div className="form-alan">
        <label>💧 Su Berraklığı</label>
        <div className="secim-kartlari mini uc">
          {[
            { value: 'berrak', label: 'Berrak', icon: '✨' },
            { value: 'hafif', label: 'Hafif Bulanık', icon: '🌫️' },
            { value: 'bulanik', label: 'Bulanık', icon: '☁️' }
          ].map(opt => (
            <div 
              key={opt.value}
              className={`secim-kart ${formData.suBerrakligi === opt.value ? 'secili' : ''}`}
              onClick={() => setFormData({...formData, suBerrakligi: opt.value})}
            >
              <span>{opt.icon}</span>
              <span>{opt.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hasta Balık */}
      <div className="toggle-alan">
        <div className="toggle-baslik">
          <span>🏥</span>
          <span>Hasta/Sorunlu balık var mı?</span>
        </div>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={formData.hastaBalikVar}
            onChange={(e) => setFormData({...formData, hastaBalikVar: e.target.checked})}
          />
          <span className="toggle-slider"></span>
        </label>
      </div>

      {formData.hastaBalikVar && (
        <div className="alt-secim">
          <textarea
            placeholder="Belirtileri kısaca açıkla... (Örn: Beyaz lekeler, yüzme bozukluğu, iştahsızlık)"
            value={formData.hastaBalikAciklama}
            onChange={(e) => setFormData({...formData, hastaBalikAciklama: e.target.value})}
            rows={3}
          />
        </div>
      )}

      {/* İlaç/Tedavi */}
      <div className="toggle-alan">
        <div className="toggle-baslik">
          <span>💊</span>
          <span>İlaç/Tedavi uyguladınız mı?</span>
        </div>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={formData.ilacTedaviVar}
            onChange={(e) => setFormData({...formData, ilacTedaviVar: e.target.checked})}
          />
          <span className="toggle-slider"></span>
        </label>
      </div>

      {formData.ilacTedaviVar && (
        <div className="alt-secim">
          <div className="form-alan">
            <label>Son İlaç Tarihi</label>
            <input
              type="date"
              value={formData.sonIlacTarihi}
              max={bugun}
              onChange={(e) => setFormData({...formData, sonIlacTarihi: e.target.value})}
            />
          </div>
          <div className="form-alan">
            <label>Kullanılan İlaçlar</label>
            <div className="chip-secim">
              {ILAC_LISTESI.map(ilac => (
                <div 
                  key={ilac.id}
                  className={`chip ${formData.kullanilanIlaclar.find(i => i.id === ilac.id) ? 'secili' : ''}`}
                  onClick={() => ilacToggle(ilac)}
                >
                  <span>{ilac.icon}</span>
                  <span>{ilac.ad}</span>
                </div>
              ))}
            </div>
          </div>
          <textarea
            placeholder="Tedavi notları..."
            value={formData.tedaviNotu}
            onChange={(e) => setFormData({...formData, tedaviNotu: e.target.value})}
            rows={2}
          />
        </div>
      )}
    </div>
  );

  // ==================== ADIM 8: BİTKİ BAKIMI (bitkiVar ise) (YENİ) ====================
  
  const renderAdim8Bitki = () => (
    <div className="adim-icerik">
      <div className="adim-baslik">
        <span className="adim-emoji">🌿</span>
        <h2>Bitki Bakımı</h2>
        <p>Budama ve gübreleme bilgileri</p>
      </div>

      {/* Budama */}
      <div className="bakim-bolum">
        <h3>✂️ Bitki Budama</h3>
        <div className="form-alan">
          <label>Son Budama Tarihi</label>
          <input
            type="date"
            value={formData.sonBudamaTarihi}
            max={bugun}
            onChange={(e) => setFormData({...formData, sonBudamaTarihi: e.target.value})}
          />
        </div>
      </div>

      {/* Gübreleme */}
      <div className="bakim-bolum">
        <h3>🧪 Gübreleme</h3>
        <div className="form-alan">
          <label>Son Gübreleme Tarihi</label>
          <input
            type="date"
            value={formData.sonGubrelemeTarihi}
            max={bugun}
            onChange={(e) => setFormData({...formData, sonGubrelemeTarihi: e.target.value})}
          />
        </div>
        <div className="form-alan">
          <label>Kullandığın Gübre Çeşitleri</label>
          <div className="chip-secim">
            {GUBRE_CESITLERI.map(gubre => (
              <div 
                key={gubre.id}
                className={`chip ${formData.gubreCesitleri.find(g => g.id === gubre.id) ? 'secili' : ''}`}
                onClick={() => gubreToggle(gubre)}
              >
                <span>{gubre.icon}</span>
                <span>{gubre.ad}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="form-alan">
          <label>Gübreleme Sıklığı</label>
          <div className="secim-kartlari mini dort">
            {[
              { value: 'gunluk', label: 'Günlük', icon: '📅' },
              { value: 'haftalik', label: 'Haftalık', icon: '📆' },
              { value: '2hafta', label: '2 Hafta', icon: '🗓️' },
              { value: 'aylik', label: 'Aylık', icon: '📋' }
            ].map(opt => (
              <div 
                key={opt.value}
                className={`secim-kart ${formData.gubrelemeSikligi === opt.value ? 'secili' : ''}`}
                onClick={() => setFormData({...formData, gubrelemeSikligi: opt.value})}
              >
                <span>{opt.icon}</span>
                <span>{opt.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ==================== ADIM 9 (veya 8): STOK TAKİBİ (YENİ) ====================
  
  const renderAdimStok = () => (
    <div className="adim-icerik">
      <div className="adim-baslik">
        <span className="adim-emoji">📦</span>
        <h2>Stok Yönetimi</h2>
        <p>Akvaryum malzemelerinizi profesyonelce takip edin</p>
      </div>

      <div className="stok-info-kart">
        <div className="stok-info-icon">📊</div>
        <div className="stok-info-icerik">
          <h4>Stok Takip Sistemi</h4>
          <p>Yem, ilaç, gübre ve ekipman stoklarınızı kaydedin. Azalan stoklarınız için otomatik uyarı alın.</p>
        </div>
      </div>

      <div className="toggle-alan profesyonel">
        <div className="toggle-baslik">
          <span>📋</span>
          <div className="toggle-text">
            <span className="toggle-ana">Stok Takibini Aktifleştir</span>
            <span className="toggle-aciklama">Malzeme ve yem stoklarınızı kaydetmeye başlayın</span>
          </div>
        </div>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={formData.stokTakibiVar}
            onChange={(e) => setFormData({...formData, stokTakibiVar: e.target.checked})}
          />
          <span className="toggle-slider"></span>
        </label>
      </div>

      {formData.stokTakibiVar && (
        <div className="stok-listesi-pro">
          <div className="stok-grid-container">
            {formData.stoklar.map((stok, index) => (
              <div key={stok.id} className="stok-kart-pro">
                <div className="stok-kart-header">
                  <div className="stok-numara">
                    <span className="numara-icon">
                      {stok.kategori === 'yem' ? '🍽️' : 
                       stok.kategori === 'ilac' ? '💊' :
                       stok.kategori === 'gubre' ? '🧪' :
                       stok.kategori === 'filtre' ? '🔄' :
                       stok.kategori === 'ekipman' ? '🔧' : '📦'}
                    </span>
                    <span className="numara-text">Ürün #{index + 1}</span>
                  </div>
                  <button className="stok-sil-btn" onClick={() => stokSil(stok.id)}>
                    <span>🗑️</span>
                  </button>
                </div>
                
                <div className="stok-kart-body">
                  <div className="stok-alan">
                    <label>Kategori</label>
                    <select
                      value={stok.kategori}
                      onChange={(e) => stokGuncelle(stok.id, 'kategori', e.target.value)}
                      className="stok-select"
                    >
                      <option value="">Seçin...</option>
                      <option value="yem">🍽️ Yem</option>
                      <option value="ilac">💊 İlaç</option>
                      <option value="gubre">🧪 Gübre</option>
                      <option value="filtre">🔄 Filtre Malzemesi</option>
                      <option value="ekipman">🔧 Ekipman</option>
                      <option value="diger">📦 Diğer</option>
                    </select>
                  </div>
                  
                  <div className="stok-alan">
                    <label>Ürün Adı</label>
                    <input
                      type="text"
                      placeholder="Örn: Tetra Pro Colour"
                      value={stok.urunAdi}
                      onChange={(e) => stokGuncelle(stok.id, 'urunAdi', e.target.value)}
                      className="stok-input"
                    />
                  </div>
                  
                  <div className="stok-row">
                    <div className="stok-alan kucuk">
                      <label>Miktar</label>
                      <input
                        type="number"
                        placeholder="0"
                        value={stok.miktar}
                        onChange={(e) => stokGuncelle(stok.id, 'miktar', e.target.value)}
                        className="stok-input"
                      />
                    </div>
                    <div className="stok-alan kucuk">
                      <label>Birim</label>
                      <select
                        value={stok.birim}
                        onChange={(e) => stokGuncelle(stok.id, 'birim', e.target.value)}
                        className="stok-select"
                      >
                        <option value="adet">Adet</option>
                        <option value="gram">Gram</option>
                        <option value="ml">ml</option>
                        <option value="litre">Litre</option>
                        <option value="paket">Paket</option>
                      </select>
                    </div>
                    <div className="stok-alan kucuk">
                      <label>Alış Tarihi</label>
                      <input
                        type="date"
                        value={stok.alisTarihi}
                        max={bugun}
                        onChange={(e) => stokGuncelle(stok.id, 'alisTarihi', e.target.value)}
                        className="stok-input"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="stok-ekle-btn-pro" onClick={stokEkle}>
            <span className="ekle-icon">➕</span>
            <span className="ekle-text">Yeni Ürün Ekle</span>
          </button>
        </div>
      )}
    </div>
  );

  // ==================== ADIM SON: ÖZET & ONAY ====================
  
  const renderAdimOzet = () => {
    const riskSkoru = hesaplaRiskSkoru();
    const toplamBalik = formData.seciliBaliklar.reduce((t, b) => t + b.adet, 0);
    const maksBalik = Math.floor(formData.netLitre / 5);
    
    return (
      <div className="adim-icerik ozet-adim">
        <div className="adim-baslik">
          <span className="adim-emoji">🎉</span>
          <h2>İşte Senin Tankın!</h2>
          <p>Her şey hazır, kurulumu tamamla</p>
        </div>

        {/* Ana Özet Kartı */}
        <div className="ozet-kart ana">
          <div className="ozet-header">
            <div className="tank-emoji">🐠</div>
            <div className="tank-bilgi">
              <h3>{formData.akvaryumAdi || 'Akvaryumum'}</h3>
              <span className="tank-tip">
                {formData.suTuru === 'tatli' ? '💧 Tatlı Su' : '🌊 Tuzlu Su'} • {formData.akvaryumTipi}
              </span>
            </div>
            <div className="tank-litre">
              <span className="deger">{formData.netLitre}</span>
              <span className="birim">Litre</span>
            </div>
          </div>

          <div className="ozet-stats">
            <div className="stat">
              <span className="stat-icon">🐟</span>
              <span className="stat-deger">{toplamBalik}</span>
              <span className="stat-label">Balık</span>
            </div>
            <div className="stat">
              <span className="stat-icon">🌿</span>
              <span className="stat-deger">
                {formData.bitkiVar ? (
                  formData.bitkiYogunlugu === 'low' ? 'Düşük' :
                  formData.bitkiYogunlugu === 'mid' ? 'Orta' : 'Yoğun'
                ) : 'Yok'}
              </span>
              <span className="stat-label">Bitki</span>
            </div>
            <div className="stat">
              <span className="stat-icon">⚙️</span>
              <span className="stat-deger">
                {formData.kurulumSeviyesi === 'low' ? 'Low' :
                 formData.kurulumSeviyesi === 'mid' ? 'Mid' : 'High'}
              </span>
              <span className="stat-label">Tech</span>
            </div>
            <div className={`stat risk ${riskSkoru < 30 ? 'dusuk' : riskSkoru < 60 ? 'orta' : 'yuksek'}`}>
              <span className="stat-icon">
                {riskSkoru < 30 ? '✅' : riskSkoru < 60 ? '⚠️' : '🔥'}
              </span>
              <span className="stat-deger">{riskSkoru}</span>
              <span className="stat-label">Risk</span>
            </div>
          </div>
        </div>

        {/* Detay Kartları */}
        <div className="ozet-detaylar">
          <div className="ozet-kart">
            <h4>🔧 Ekipmanlar</h4>
            <div className="etiketler">
              {formData.filtreVar && <span className="etiket">🔄 {formData.filtreMarka || formData.filtreTipi || 'Filtre'}</span>}
              {formData.isiticiVar && <span className="etiket">🌡️ {formData.isiticiWatt}W</span>}
              {formData.ledVar && <span className="etiket">💡 {formData.ledMarka || `${formData.ledWatt}W`}</span>}
              {formData.co2Sistemi && <span className="etiket">🫧 CO₂</span>}
              {formData.havaMotoru && <span className="etiket">💨 Hava</span>}
            </div>
          </div>

          <div className="ozet-kart">
            <h4>🧪 Su Değerleri</h4>
            <div className="parametre-ozet">
              <span>🌡️ {formData.sicaklik}°C</span>
              <span>📊 pH {formData.ph}</span>
              {formData.gh && <span>💎 GH {formData.gh}</span>}
              {formData.kh && <span>🧊 KH {formData.kh}</span>}
            </div>
          </div>

          <div className="ozet-kart">
            <h4>🔄 Bakım</h4>
            <div className="parametre-ozet">
              <span>💧 Su değişimi: {formData.suDegisimSikligi}</span>
              <span>🍽️ Yemleme: {formData.yemlemeSikligi}</span>
            </div>
          </div>

          <div className="ozet-kart">
            <h4>👁️ Gözlem</h4>
            <div className="parametre-ozet">
              <span>🌿 Alg: {formData.algDurumu}</span>
              <span>💧 Su: {formData.suBerrakligi}</span>
              {formData.hastaBalikVar && <span className="uyari">🏥 Hasta balık var</span>}
            </div>
          </div>
        </div>

        {/* Balıklar */}
        {formData.seciliBaliklar.length > 0 && (
          <div className="ozet-kart">
            <h4>🐟 Balıklar</h4>
            <div className="balik-etiketler">
              {formData.seciliBaliklar.map(balik => (
                <span key={balik.id} className="balik-etiket">
                  {balik.emoji} {balik.ad} × {balik.adet}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Uyarılar */}
        {(toplamBalik > maksBalik || !formData.filtreVar || formData.hastaBalikVar) && (
          <div className="ozet-uyarilar">
            <h4>⚠️ Dikkat Edilmesi Gerekenler</h4>
            <ul>
              {toplamBalik > maksBalik && <li>Balık sayısı kapasiteyi aşıyor ({toplamBalik}/{maksBalik})</li>}
              {!formData.filtreVar && <li>Filtre olmadan sağlıklı akvaryum zor</li>}
              {formData.hastaBalikVar && <li>Hasta balık için Balık Doktoru'nu kullan</li>}
              {formData.kurulumSeviyesi === 'high' && !formData.co2Sistemi && <li>High Tech için CO₂ sistemi önerilir</li>}
            </ul>
          </div>
        )}

        {/* Bilgi */}
        <div className="ozet-bilgi">
          <div className="bilgi-icon">✨</div>
          <p>
            Kurulum tamamlandığında tüm veriler <strong>Günlük</strong>'e aktarılacak 
            ve <strong>Dashboard</strong> sana özel hazırlanacak!
          </p>
        </div>
      </div>
    );
  };

  // DEVAMI PART 3'TE...
  // ==================== ADIM İÇERİĞİ RENDER ====================
  
  const renderAdimIcerigi = () => {
    // Temel adımlar (1-7)
    const adimHaritasi = {
      1: renderAdim1,
      2: renderAdim2,
      3: renderAdim3,
      4: renderAdim4,
      5: renderAdim5,
      6: renderAdim6,
      7: renderAdim7
    };
    
    // Bitkili tank ise: 8=Bitki Bakımı, 9=Stok, 10=Özet
    if (formData.bitkiVar) {
      if (aktifAdim === 8) return renderAdim8Bitki();
      if (aktifAdim === 9) return renderAdimStok();
      if (aktifAdim === 10) return renderAdimOzet();
    } else {
      // Bitkisiz tank: 8=Stok, 9=Özet
      if (aktifAdim === 8) return renderAdimStok();
      if (aktifAdim === 9) return renderAdimOzet();
    }
    
    return adimHaritasi[aktifAdim]?.() || null;
  };

  // ==================== ADIM LİSTESİ ====================
  
  const getAdimlar = () => {
    const temelAdimlar = [
      { id: 1, baslik: 'Akvaryum Bilgileri', icon: '🐠' },
      { id: 2, baslik: 'Canlı Durumu', icon: '🐟' },
      { id: 3, baslik: 'Kurulum Seviyesi', icon: '⚙️' },
      { id: 4, baslik: 'Ekipmanlar', icon: '🔧' },
      { id: 5, baslik: 'Su Parametreleri', icon: '🧪' },
      { id: 6, baslik: 'Bakım Geçmişi', icon: '🔄' },
      { id: 7, baslik: 'Gözlem & Sağlık', icon: '👁️' }
    ];
    
    if (formData.bitkiVar) {
      return [
        ...temelAdimlar,
        { id: 8, baslik: 'Bitki Bakımı', icon: '🌿' },
        { id: 9, baslik: 'Stok Takibi', icon: '📦' },
        { id: 10, baslik: 'Özet & Onay', icon: '✅' }
      ];
    }
    
    return [
      ...temelAdimlar,
      { id: 8, baslik: 'Stok Takibi', icon: '📦' },
      { id: 9, baslik: 'Özet & Onay', icon: '✅' }
    ];
  };

  // ==================== SAĞ PANEL (CANLI ÖZET) ====================
  
  const renderSagPanel = () => {
    const riskSkoru = hesaplaRiskSkoru();
    const toplamBalik = formData.seciliBaliklar.reduce((t, b) => t + b.adet, 0);
    const maksBalik = Math.floor(formData.netLitre / 5);
    const onerilerFiltre = Math.round(formData.netLitre * 4);
    const onerilerIsitici = Math.round(formData.netLitre * 1.5);

    return (
      <div className="sag-panel">
        <div className="panel-baslik">
          <span>📊</span>
          <h3>Canlı Özet</h3>
        </div>

        {/* Temel Bilgiler */}
        <div className="ozet-kutu">
          <div className="ozet-satir">
            <span>🐠 Tank</span>
            <span>{formData.akvaryumAdi || '-'}</span>
          </div>
          <div className="ozet-satir">
            <span>💧 Hacim</span>
            <span>{formData.netLitre > 0 ? `${formData.netLitre} L` : '-'}</span>
          </div>
          <div className="ozet-satir">
            <span>🐟 Balık</span>
            <span className={toplamBalik > maksBalik ? 'uyari' : ''}>
              {toplamBalik} / {maksBalik || '?'}
            </span>
          </div>
          <div className="ozet-satir">
            <span>🌿 Bitki</span>
            <span>{formData.bitkiVar ? 'Var' : 'Yok'}</span>
          </div>
        </div>

        {/* Risk Gösterge */}
        <div className="risk-gosterge">
          <div className="risk-baslik">
            <span>Risk Skoru</span>
            <span className={`risk-deger ${riskSkoru < 30 ? 'dusuk' : riskSkoru < 60 ? 'orta' : 'yuksek'}`}>
              {riskSkoru}
            </span>
          </div>
          <div className="risk-bar">
            <div 
              className={`risk-dolgu ${riskSkoru < 30 ? 'dusuk' : riskSkoru < 60 ? 'orta' : 'yuksek'}`}
              style={{ width: `${riskSkoru}%` }}
            ></div>
          </div>
        </div>

        {/* Anlık İpuçları */}
        <div className="anlik-uyarilar">
          <h4>💡 İpuçları</h4>
          {aktifAdim === 1 && <p>Ölçüleri girerek net litre hesaplayabilirsin.</p>}
          {aktifAdim === 2 && toplamBalik > maksBalik && <p className="uyari">⚠️ Balık sayısı kapasiteyi aşıyor!</p>}
          {aktifAdim === 2 && !formData.balikVar && <p>Balık ekleyerek başla.</p>}
          {aktifAdim === 3 && !formData.kurulumSeviyesi && <p>Bakım stilini seç.</p>}
          {aktifAdim === 4 && !formData.filtreVar && <p className="uyari">⚠️ Filtre olmadan sağlıklı tank kurulamaz.</p>}
          {aktifAdim === 5 && <p>Su testleri düzenli yapılmalı.</p>}
          {aktifAdim === 6 && <p>Düzenli su değişimi sağlıklı tank demek!</p>}
          {aktifAdim === 7 && formData.hastaBalikVar && <p className="uyari">⚠️ Hasta balık için Balık Doktoru'nu kullan.</p>}
          {aktifAdim === 7 && formData.algDurumu === 'cok' && <p className="uyari">⚠️ Alg problemi - ışık süresini azalt.</p>}
          {(aktifAdim === toplamAdim - 1 || aktifAdim === toplamAdim) && (
            <p className="basari">✅ Harika! Tank kurulumun dengeli görünüyor.</p>
          )}
        </div>

        {/* Öneriler */}
        {formData.netLitre > 0 && (
          <div className="oneriler">
            <h4>🎯 Öneriler</h4>
            <div className="oneri">
              <span>🔄</span>
              <span>Önerilen filtre: {onerilerFiltre}+ L/h debi</span>
            </div>
            <div className="oneri">
              <span>🌡️</span>
              <span>Önerilen ısıtıcı: {onerilerIsitici}W</span>
            </div>
            {formData.bitkiVar && (
              <div className="oneri">
                <span>💡</span>
                <span>LED: {Math.round(formData.netLitre * 0.5)}-{Math.round(formData.netLitre * 1)}W</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // ==================== YÜKLEME EKRANI ====================
  
  if (yukleniyor) {
    return (
      <div className="yukleme-ekrani">
        <div className="yukleme-icerik">
          <div className="yukleme-logo">🐠</div>
          <h2>Size Özel Dashboard Hazırlanıyor</h2>
          <p className="yukleme-mesaj">{yuklemeMesaji}</p>
          <div className="yukleme-bar">
            <div 
              className="yukleme-dolgu" 
              style={{ width: `${yuklemeDurumu}%` }}
            ></div>
          </div>
          <span className="yukleme-yuzde">%{Math.round(yuklemeDurumu)}</span>
        </div>
      </div>
    );
  }

  // ==================== ANA RENDER ====================
  
  const adimlar = getAdimlar();

  return (
    <div className="kurulum-sihirbazi">
      {/* Sol Panel - Adım Göstergesi */}
      <div className="sol-panel">
        <div className="logo-alan">
          <span className="logo">🐠</span>
          <h2>Kurulum Sihirbazı</h2>
        </div>
        
        <div className="adim-listesi">
          {adimlar.map((adim) => (
            <div 
              key={adim.id}
              className={`adim-item ${aktifAdim === adim.id ? 'aktif' : ''} ${aktifAdim > adim.id ? 'tamam' : ''}`}
              onClick={() => adimDegistir(adim.id)}
            >
              <div className="adim-numara">
                {aktifAdim > adim.id ? '✓' : adim.id}
              </div>
              <div className="adim-bilgi">
                <span className="adim-icon">{adim.icon}</span>
                <span className="adim-baslik">{adim.baslik}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="sol-footer">
          <p>🌊 ProgVaryum</p>
          <p>Akıllı Akvaryum Yönetimi</p>
        </div>
      </div>

      {/* Orta Panel - Form */}
      <div className="orta-panel">
        <div className={`form-container animasyon-${animasyonYonu}`}>
          {renderAdimIcerigi()}
        </div>
      </div>

      {/* Navigasyon Butonları - Fixed Bottom */}
      <div className="navigasyon-wrapper">
        <div className="navigasyon">
          {aktifAdim > 1 ? (
            <button className="btn-geri" onClick={oncekiAdim}>
              ← Geri
            </button>
          ) : (
            <div></div>
          )}
          
          {aktifAdim < toplamAdim ? (
            <button className="btn-ileri" onClick={sonrakiAdim}>
              Devam →
            </button>
          ) : (
            <button className="btn-tamamla" onClick={kurulumTamamla}>
              🎉 Kurulumu Tamamla
            </button>
          )}
        </div>
      </div>

      {/* Sağ Panel - Canlı Özet */}
      {renderSagPanel()}
    </div>
  );
}