// src/pages/hesaplamalar/Hesaplamalar.jsx
// SÜPER DETAYLI VERSİYON - TÜM ÖZELLİKLER

import React, { useState } from 'react';
import './Hesaplamalar.css';

// Balık veritabanları
import { canliDoguranlar } from '../balikRehberi/data/balikVeritabani1';
import { malawiCikletleri, tanganyikaCikletleri } from '../balikRehberi/data/balikVeritabani2';
import { amerikaCikletleri, cuceCikletler } from '../balikRehberi/data/balikVeritabani3';
import { labirentliler, tetralar } from '../balikRehberi/data/balikVeritabani4';
import { sazansigiller, kediBaliklari, gokkusagiBaliklari, digerTurler } from '../balikRehberi/data/balikVeritabani5';

// Davranış veritabanı
import balikDavranisVeritabani, { uyumlulukKontrol, stokUyarilari } from './data/balikDavranis';

// Tüm balıkları birleştir
const tumBaliklar = [
  ...(canliDoguranlar?.baliklar || canliDoguranlar || []),
  ...(malawiCikletleri?.baliklar || malawiCikletleri || []),
  ...(tanganyikaCikletleri?.baliklar || tanganyikaCikletleri || []),
  ...(amerikaCikletleri?.baliklar || amerikaCikletleri || []),
  ...(cuceCikletler?.baliklar || cuceCikletler || []),
  ...(labirentliler?.baliklar || labirentliler || []),
  ...(tetralar?.baliklar || tetralar || []),
  ...(sazansigiller?.baliklar || sazansigiller || []),
  ...(kediBaliklari?.baliklar || kediBaliklari || []),
  ...(gokkusagiBaliklari?.baliklar || gokkusagiBaliklari || []),
  ...(digerTurler?.baliklar || digerTurler || [])
];

function Hesaplamalar() {
  // ==================== STATE YÖNETİMİ ====================
  const [aktifHesap, setAktifHesap] = useState('isitici');
  
  // Isıtıcı
  const [isiticiLitre, setIsiticiLitre] = useState(100);
  const [isiticiOdaSicaklik, setIsiticiOdaSicaklik] = useState(20);
  const [isiticiHedefSicaklik, setIsiticiHedefSicaklik] = useState(26);
  
  // Işık
  const [isikLitre, setIsikLitre] = useState(100);
  const [isikUzunluk, setIsikUzunluk] = useState(80);
  const [isikGenislik, setIsikGenislik] = useState(35);
  const [isikYukseklik, setIsikYukseklik] = useState(40);
  const [isikTip, setIsikTip] = useState('orta');
  
  // CO2
  const [co2Litre, setCo2Litre] = useState(100);
  const [co2BitkiYogunlugu, setCo2BitkiYogunlugu] = useState('orta');
  const [co2IsikSeviyesi, setCo2IsikSeviyesi] = useState('orta');
  const [co2Ph, setCo2Ph] = useState(7.0);
  const [co2Kh, setCo2Kh] = useState(6);
  
  // Filtre
  const [filtreLitre, setFiltreLitre] = useState(100);
  const [filtreBalikYuku, setFiltreBalikYuku] = useState('orta');
  const [filtreBitkili, setFiltreBitkili] = useState(true);
  const [filtreTuru, setFiltreTuru] = useState('dis');
  
  // Balık Analizi
  const [analizLitre, setAnalizLitre] = useState(100);
  const [secilenBaliklar, setSecilenBaliklar] = useState([]);
  const [modalAcik, setModalAcik] = useState(false);
  const [aramaMetni, setAramaMetni] = useState('');
  
  
  // Elektrik
  const [elektrikHesap, setElektrikHesap] = useState({
    filtreAktif: true, filtreWatt: 20,
    isiticiAktif: true, isiticiWatt: 100, isiticiCalismaOrani: 30,
    ledAktif: true, ledWatt: 30, ledSaat: 8,
    havaAktif: false, havaWatt: 3,
    co2Aktif: false, co2Watt: 4,
    uvAktif: false, uvWatt: 9, uvSaat: 4,
    dalgaAktif: false, dalgaWatt: 5,
    dusukKademe: 2.6, yuksekKademe: 3.8, kademeSiniri: 240
  });
  
  // Su Değişimi
  const [suDegLitre, setSuDegLitre] = useState(100);
  const [suDegOran, setSuDegOran] = useState(30);
  const [suDegKova, setSuDegKova] = useState(10);
  const [suDegSiklik, setSuDegSiklik] = useState('haftalik');
  
  // Gübre/Dozaj
  const [gubreLitre, setGubreLitre] = useState(100);
  const [gubreMetod, setGubreMetod] = useState('ei');
  const [gubreBitkiYuku, setGubreBitkiYuku] = useState('orta');
  const [gubreIsik, setGubreIsik] = useState('orta');
  
  // Hacim Hesaplama
  const [hacimTip, setHacimTip] = useState('dikdortgen');
  const [hacimUzunluk, setHacimUzunluk] = useState(80);
  const [hacimGenislik, setHacimGenislik] = useState(35);
  const [hacimYukseklik, setHacimYukseklik] = useState(40);
  const [hacimCap, setHacimCap] = useState(40);
  const [hacimKumYukseklik, setHacimKumYukseklik] = useState(5);
  const [hacimTasOran, setHacimTasOran] = useState(10);

  // ==================== MENÜ ====================
  const hesapMenusu = [
    { id: 'isitici', emoji: '🌡️', text: 'Isıtıcı' },
    { id: 'isik', emoji: '💡', text: 'Işık/LED' },
    { id: 'co2', emoji: '🫧', text: 'CO2' },
    { id: 'filtre', emoji: '🔄', text: 'Filtre' },
    { id: 'balik', emoji: '🐠', text: 'Balık Kapasitesi' },
    { id: 'elektrik', emoji: '⚡', text: 'Elektrik' },
    { id: 'su', emoji: '💧', text: 'Su Değişimi' },
    { id: 'gubre', emoji: '🧪', text: 'Gübre/Dozaj' },
    { id: 'hacim', emoji: '🏠', text: 'Hacim' }
  ];

  // ==================== ISITICI HESAPLAMA ====================
  const isiticiHesapla = () => {
    const fark = isiticiHedefSicaklik - isiticiOdaSicaklik;
    let wattPerLitre;
    
    if (fark <= 3) wattPerLitre = 0.5;
    else if (fark <= 6) wattPerLitre = 1;
    else if (fark <= 10) wattPerLitre = 1.5;
    else wattPerLitre = 2;
    
    const hesaplananWatt = Math.round(isiticiLitre * wattPerLitre);
    const onerilenWatt = Math.ceil(hesaplananWatt / 25) * 25;
    
    // Piyasadaki watt seçenekleri
    const wattSecenekleri = [25, 50, 75, 100, 150, 200, 300, 500];
    const uygunSecenekler = wattSecenekleri.map(w => ({
      watt: w,
      durum: w < hesaplananWatt * 0.8 ? 'yetersiz' : w === onerilenWatt ? 'onerilen' : w <= hesaplananWatt * 1.5 ? 'uygun' : 'fazla'
    }));
    
    // Çift ısıtıcı önerisi
    const ciftIsiticiOner = isiticiLitre >= 200;
    const ciftWatt = ciftIsiticiOner ? Math.ceil(hesaplananWatt / 2 / 25) * 25 : 0;
    
    // Enerji maliyeti (aylık, %30 çalışma varsayımı)
    const aylikKwh = (onerilenWatt / 1000) * 24 * 30 * 0.3;
    const aylikMaliyet = aylikKwh * 2.6;
    
    let yorum = '';
    let uyarilar = [];
    
    if (fark <= 2) {
      yorum = 'Oda sıcaklığı hedefe çok yakın. Düşük watt yeterli, ısıtıcı nadiren çalışacak.';
    } else if (fark <= 5) {
      yorum = 'Normal şartlar. Standart ısıtıcı uygundur.';
    } else if (fark <= 8) {
      yorum = 'Sıcaklık farkı yüksek. Kaliteli termostat önemli.';
      uyarilar.push('⚠️ Kış aylarında oda sıcaklığı düşerse ısıtıcı yetersiz kalabilir.');
    } else {
      yorum = 'Çok yüksek sıcaklık farkı! Güçlü ısıtıcı veya çift ısıtıcı şart.';
      uyarilar.push('🔴 Bu farkta tek ısıtıcı riskli! Çift ısıtıcı kullanın.');
      uyarilar.push('⚠️ Elektrik kesintisinde hızlı soğuma riski var.');
    }
    
    if (isiticiLitre >= 150) {
      uyarilar.push('💡 Büyük tanklarda yedek ısıtıcı bulundurun.');
    }
    
    return { 
      hesaplananWatt, onerilenWatt, fark, wattSecenekleri: uygunSecenekler,
      ciftIsiticiOner, ciftWatt, aylikKwh: aylikKwh.toFixed(1), aylikMaliyet: aylikMaliyet.toFixed(2),
      yorum, uyarilar
    };
  };

  // ==================== IŞIK HESAPLAMA ====================
  const isikHesapla = () => {
    const tabanAlani = (isikUzunluk * isikGenislik) / 10000; // m²
    
    const lumenIhtiyac = {
      dusuk: { min: 15, max: 25, par: 30, kelvin: '5000-7000K', aciklama: 'Anubias, Java Fern, Moss, Cryptocoryne' },
      orta: { min: 25, max: 50, par: 50, kelvin: '6500-8000K', aciklama: 'Echinodorus, Vallisneria, Bacopa, Hygrophila' },
      yuksek: { min: 50, max: 80, par: 80, kelvin: '6500-10000K', aciklama: 'Kırmızı bitkiler, Carpet, HC Cuba, Rotala' }
    };
    
    const secilen = lumenIhtiyac[isikTip];
    const minLumen = Math.round(isikLitre * secilen.min);
    const maxLumen = Math.round(isikLitre * secilen.max);
    const onerilenWatt = Math.round((minLumen + maxLumen) / 2 / 100); // LED için ~100 lm/W
    const parDegeri = secilen.par;
    
    // Işık süresi önerisi
    let isikSuresi, yosunRiski;
    if (isikTip === 'yuksek') {
      isikSuresi = '6-8 saat';
      yosunRiski = 'Yüksek - CO2 şart, fazla ışık yosun patlatır!';
    } else if (isikTip === 'orta') {
      isikSuresi = '8-10 saat';
      yosunRiski = 'Orta - Dengeyi sağlayın, fazla yem yosun nedeni';
    } else {
      isikSuresi = '8-12 saat';
      yosunRiski = 'Düşük - Bu seviyede yosun riski minimal';
    }
    
    // Işık programı önerisi
    const programOnerisi = {
      sabah: '10:00 - Kademeli açılış (30 dk)',
      ogle: '10:30-17:30 - Tam güç',
      aksam: '17:30-18:00 - Kademeli kapanış',
      gece: '18:00-10:00 - Kapalı (mavi gece ışığı opsiyonel)'
    };
    
    // Su derinliği etkisi
    let derinlikNotu = '';
    if (isikYukseklik > 50) {
      derinlikNotu = '⚠️ Derin tank! Işık kaybı fazla, daha güçlü LED veya CO2 gerekebilir.';
    } else if (isikYukseklik > 40) {
      derinlikNotu = '💡 Orta derinlik. Standart LED yeterli.';
    } else {
      derinlikNotu = '✅ Sığ tank. Işık penetrasyonu iyi.';
    }
    
    return { 
      minLumen, maxLumen, onerilenWatt, parDegeri, kelvin: secilen.kelvin,
      tabanAlani: tabanAlani.toFixed(3), isikSuresi, yosunRiski,
      programOnerisi, derinlikNotu, uygunBitkiler: secilen.aciklama
    };
  };

  // ==================== CO2 HESAPLAMA ====================
  const co2Hesapla = () => {
    // Temel CO2 ihtiyacı (mg/L)
    const bazCO2 = { dusuk: 10, orta: 20, yuksek: 30 };
    const isikCarpan = { dusuk: 0.7, orta: 1, yuksek: 1.5 };
    
    const co2Ihtiyac = Math.round(bazCO2[co2BitkiYogunlugu] * isikCarpan[co2IsikSeviyesi]);
    
    // Günlük gram tüketim (yaklaşık)
    const gunlukGram = (co2Ihtiyac * co2Litre) / 1000;
    const aylikGram = Math.round(gunlukGram * 30);
    
    // Tüp süreleri
    const tupSureleri = [
      { boyut: '500g', sure: Math.round(500 / gunlukGram), fiyat: '200-300 TL' },
      { boyut: '1kg', sure: Math.round(1000 / gunlukGram), fiyat: '300-400 TL' },
      { boyut: '2kg', sure: Math.round(2000 / gunlukGram), fiyat: '400-500 TL' },
      { boyut: '4kg', sure: Math.round(4000 / gunlukGram), fiyat: '600-800 TL' }
    ];
    
    // Önerilen tüp
    let onerilenTup;
    if (co2Litre <= 50) onerilenTup = '500g';
    else if (co2Litre <= 100) onerilenTup = '1kg';
    else if (co2Litre <= 200) onerilenTup = '2kg';
    else onerilenTup = '4kg';
    
    // pH/KH tablosundan CO2 hesaplama
    const phKhTablo = {
      6.0: { 2: 95, 4: 190, 6: 285, 8: 380, 10: 475 },
      6.2: { 2: 60, 4: 120, 6: 180, 8: 240, 10: 300 },
      6.4: { 2: 38, 4: 76, 6: 114, 8: 152, 10: 190 },
      6.6: { 2: 24, 4: 48, 6: 72, 8: 96, 10: 120 },
      6.8: { 2: 15, 4: 30, 6: 45, 8: 60, 10: 75 },
      7.0: { 2: 9, 4: 19, 6: 28, 8: 38, 10: 47 },
      7.2: { 2: 6, 4: 12, 6: 18, 8: 24, 10: 30 },
      7.4: { 2: 4, 4: 8, 6: 11, 8: 15, 10: 19 },
      7.6: { 2: 2, 4: 5, 6: 7, 8: 10, 10: 12 }
    };
    
    // En yakın pH değerini bul
    const phKeys = Object.keys(phKhTablo).map(Number);
    const closestPh = phKeys.reduce((prev, curr) => 
      Math.abs(curr - co2Ph) < Math.abs(prev - co2Ph) ? curr : prev
    );
    const mevcutCO2 = phKhTablo[closestPh]?.[co2Kh] || 'N/A';
    
    // Drop checker renk rehberi
    let dropCheckerRenk, dropCheckerYorum;
    if (mevcutCO2 === 'N/A') {
      dropCheckerRenk = 'gray';
      dropCheckerYorum = 'Değer hesaplanamadı';
    } else if (mevcutCO2 < 15) {
      dropCheckerRenk = '#3498db'; // Mavi
      dropCheckerYorum = 'Çok düşük CO2 - Bitkiler için yetersiz';
    } else if (mevcutCO2 < 25) {
      dropCheckerRenk = '#2ecc71'; // Yeşil
      dropCheckerYorum = '✅ İdeal CO2 seviyesi!';
    } else if (mevcutCO2 < 35) {
      dropCheckerRenk = '#f1c40f'; // Sarı-yeşil
      dropCheckerYorum = 'Biraz yüksek ama güvenli';
    } else {
      dropCheckerRenk = '#e74c3c'; // Sarı/Kırmızı
      dropCheckerYorum = '⚠️ Tehlikeli! Balıklar için riskli';
    }
    
    // DIY vs Tüp karşılaştırma
    const diyKarsilastirma = {
      tup: { maliyet: 'Orta', stabilite: 'Çok iyi', bakim: 'Düşük', estetik: 'İyi' },
      diy: { maliyet: 'Düşük', stabilite: 'Değişken', bakim: 'Yüksek', estetik: 'Kötü' }
    };
    
    let genelYorum;
    if (co2BitkiYogunlugu === 'dusuk' && co2IsikSeviyesi === 'dusuk') {
      genelYorum = 'Bu kurulumda CO2 zorunlu değil. Sıvı karbon (Excel, Easycarbo) yeterli olabilir.';
    } else if (co2BitkiYogunlugu === 'yuksek' || co2IsikSeviyesi === 'yuksek') {
      genelYorum = 'Yüksek teknoloji tank! Basınçlı CO2 sistemi şart. Drop checker ile günlük takip edin.';
    } else {
      genelYorum = 'Orta seviye kurulum. CO2 bitki gelişimini %50-100 artırır. Şiddetle önerilir.';
    }
    
    return {
      co2Ihtiyac, gunlukGram: gunlukGram.toFixed(1), aylikGram, tupSureleri, onerilenTup,
      mevcutCO2, dropCheckerRenk, dropCheckerYorum, diyKarsilastirma, genelYorum
    };
  };

  // ==================== FİLTRE HESAPLAMA ====================
  const filtreHesapla = () => {
    const yukCarpani = { dusuk: 4, orta: 6, yuksek: 8, cok_yuksek: 10 };
    const minDebi = filtreLitre * yukCarpani[filtreBalikYuku];
    const idealDebi = Math.round(minDebi * 1.25);
    
    // Filtre türü önerileri
    const filtreTurleri = [
      { 
        tur: 'İç Filtre', 
        uygunLitre: '10-60L', 
        avantaj: 'Ucuz, kolay kurulum', 
        dezavantaj: 'Düşük kapasite, tank içinde yer kaplar',
        uygun: filtreLitre <= 60
      },
      { 
        tur: 'Asma Filtre', 
        uygunLitre: '20-100L', 
        avantaj: 'Orta fiyat, iyi oksijenasyon', 
        dezavantaj: 'Gürültülü olabilir, sınırlı medya',
        uygun: filtreLitre <= 100
      },
      { 
        tur: 'Dış Filtre', 
        uygunLitre: '60-500L+', 
        avantaj: 'Yüksek kapasite, sessiz, çok medya', 
        dezavantaj: 'Pahalı, kurulum zor',
        uygun: filtreLitre >= 60
      },
      { 
        tur: 'Sump', 
        uygunLitre: '200L+', 
        avantaj: 'En yüksek kapasite, gizli ekipman', 
        dezavantaj: 'Çok pahalı, alan gerektirir',
        uygun: filtreLitre >= 200
      }
    ];
    
    // Medya önerileri
    const medyaOnerileri = [
      { medya: 'Seramik halka', amac: 'Biyolojik (nitrifiye bakteriler)', miktar: `${Math.round(filtreLitre * 0.1)}L` },
      { medya: 'Bio-ball', amac: 'Biyolojik + oksijenasyon', miktar: `${Math.round(filtreLitre * 0.05)}L` },
      { medya: 'Sünger (kaba)', amac: 'Mekanik ön filtrasyon', miktar: '1-2 adet' },
      { medya: 'Sünger (ince)', amac: 'Mekanik ince filtrasyon', miktar: '1-2 adet' },
      { medya: 'Aktif karbon', amac: 'Kimyasal (ilaç sonrası)', miktar: 'Gerektiğinde' },
      { medya: 'Purigen', amac: 'Kimyasal (berraklık)', miktar: `${Math.round(filtreLitre / 100) * 100}ml` }
    ];
    
    // Bakım takvimi
    const bakimTakvimi = [
      { islem: 'Sünger sıkma (akvaryum suyunda)', siklik: 'Her 2 haftada' },
      { islem: 'Mekanik medya değişimi', siklik: 'Her 1-2 ayda' },
      { islem: 'Biyolojik medya kontrolü', siklik: 'Her 3-6 ayda' },
      { islem: 'Hortum temizliği', siklik: 'Her 2-3 ayda' },
      { islem: 'İmpeller kontrolü', siklik: 'Her 6 ayda' },
      { islem: 'O-ring vazelin', siklik: 'Her bakımda' }
    ];
    
    // Önerilen filtre türü
    let onerilenTur;
    if (filtreLitre <= 40) onerilenTur = 'İç Filtre veya Asma Filtre';
    else if (filtreLitre <= 100) onerilenTur = 'Asma Filtre veya Küçük Dış Filtre';
    else if (filtreLitre <= 250) onerilenTur = 'Dış Filtre (kova tipi)';
    else onerilenTur = 'Güçlü Dış Filtre veya Sump sistemi';
    
    // Çift filtrasyon önerisi
    const ciftFiltre = filtreLitre >= 200 || filtreBalikYuku === 'cok_yuksek';
    
    let yorum = '';
    if (filtreBalikYuku === 'cok_yuksek') {
      yorum = '🔴 Çok yüksek biyolojik yük! Haftalık %30-40 su değişimi şart. Çift filtrasyon düşünün.';
    } else if (filtreBalikYuku === 'yuksek') {
      yorum = '⚠️ Yüksek yük. İyi filtrasyon ve düzenli bakım önemli.';
    } else if (filtreBitkili) {
      yorum = '✅ Bitkiler filtrasyona yardımcı olacak. Yine de düzenli bakım şart.';
    } else {
      yorum = '✅ Standart filtrasyon yeterli.';
    }
    
    return {
      minDebi, idealDebi, filtreTurleri, medyaOnerileri, bakimTakvimi,
      onerilenTur, ciftFiltre, yorum
    };
  };// ==================== ELEKTRİK HESAPLAMA ====================
  const elektrikHesapla = () => {
    const cihazlar = [];
    let toplamGunluk = 0;
    
    if (elektrikHesap.filtreAktif) {
      const gunluk = (elektrikHesap.filtreWatt / 1000) * 24;
      cihazlar.push({ isim: 'Filtre', emoji: '🔄', watt: elektrikHesap.filtreWatt, saat: 24, gunlukKwh: gunluk, aylikKwh: gunluk * 30 });
      toplamGunluk += gunluk;
    }
    
    if (elektrikHesap.isiticiAktif) {
      const efektifSaat = 24 * (elektrikHesap.isiticiCalismaOrani / 100);
      const gunluk = (elektrikHesap.isiticiWatt / 1000) * efektifSaat;
      cihazlar.push({ isim: 'Isıtıcı', emoji: '🌡️', watt: elektrikHesap.isiticiWatt, saat: `~${efektifSaat.toFixed(1)}`, gunlukKwh: gunluk, aylikKwh: gunluk * 30 });
      toplamGunluk += gunluk;
    }
    
    if (elektrikHesap.ledAktif) {
      const gunluk = (elektrikHesap.ledWatt / 1000) * elektrikHesap.ledSaat;
      cihazlar.push({ isim: 'LED Aydınlatma', emoji: '💡', watt: elektrikHesap.ledWatt, saat: elektrikHesap.ledSaat, gunlukKwh: gunluk, aylikKwh: gunluk * 30 });
      toplamGunluk += gunluk;
    }
    
    if (elektrikHesap.havaAktif) {
      const gunluk = (elektrikHesap.havaWatt / 1000) * 24;
      cihazlar.push({ isim: 'Hava Motoru', emoji: '🫧', watt: elektrikHesap.havaWatt, saat: 24, gunlukKwh: gunluk, aylikKwh: gunluk * 30 });
      toplamGunluk += gunluk;
    }
    
    if (elektrikHesap.co2Aktif) {
      const gunluk = (elektrikHesap.co2Watt / 1000) * elektrikHesap.ledSaat;
      cihazlar.push({ isim: 'CO2 Solenoid', emoji: '🧪', watt: elektrikHesap.co2Watt, saat: elektrikHesap.ledSaat, gunlukKwh: gunluk, aylikKwh: gunluk * 30 });
      toplamGunluk += gunluk;
    }
    
    if (elektrikHesap.uvAktif) {
      const gunluk = (elektrikHesap.uvWatt / 1000) * elektrikHesap.uvSaat;
      cihazlar.push({ isim: 'UV Sterilizatör', emoji: '🔆', watt: elektrikHesap.uvWatt, saat: elektrikHesap.uvSaat, gunlukKwh: gunluk, aylikKwh: gunluk * 30 });
      toplamGunluk += gunluk;
    }
    
    if (elektrikHesap.dalgaAktif) {
      const gunluk = (elektrikHesap.dalgaWatt / 1000) * 24;
      cihazlar.push({ isim: 'Dalga Motoru', emoji: '🌊', watt: elektrikHesap.dalgaWatt, saat: 24, gunlukKwh: gunluk, aylikKwh: gunluk * 30 });
      toplamGunluk += gunluk;
    }
    
    const toplamAylik = toplamGunluk * 30;
    const toplamYillik = toplamAylik * 12;
    
    // Kademe hesaplama
    let aylikMaliyet, dusukTuketim, yuksekTuketim;
    if (toplamAylik <= elektrikHesap.kademeSiniri) {
      aylikMaliyet = toplamAylik * elektrikHesap.dusukKademe;
      dusukTuketim = toplamAylik;
      yuksekTuketim = 0;
    } else {
      dusukTuketim = elektrikHesap.kademeSiniri;
      yuksekTuketim = toplamAylik - elektrikHesap.kademeSiniri;
      aylikMaliyet = (dusukTuketim * elektrikHesap.dusukKademe) + (yuksekTuketim * elektrikHesap.yuksekKademe);
    }
    
    const yillikMaliyet = aylikMaliyet * 12;
    
    // Mevsimsel tahmin
    const mevsimselTahmin = {
      yaz: { isiticiOran: 10, maliyet: (toplamAylik - (elektrikHesap.isiticiAktif ? (elektrikHesap.isiticiWatt / 1000) * 24 * 0.2 * 30 : 0)) * elektrikHesap.dusukKademe },
      kis: { isiticiOran: 50, maliyet: aylikMaliyet * 1.3 }
    };
    
    // En çok tüketen
    const enCokTuketen = cihazlar.length > 0 ? cihazlar.reduce((max, c) => c.aylikKwh > max.aylikKwh ? c : max, cihazlar[0]) : null;
    
    // Öneriler
    const oneriler = [];
    if (elektrikHesap.isiticiCalismaOrani > 40) {
      oneriler.push({ tip: 'tasarruf', mesaj: 'Isıtıcı çok çalışıyor. Akvaryumu yalıtın veya oda sıcaklığını artırın.' });
    }
    if (elektrikHesap.ledSaat > 10) {
      const tasarruf = ((elektrikHesap.ledWatt / 1000) * 2 * 30 * elektrikHesap.dusukKademe).toFixed(2);
      oneriler.push({ tip: 'tasarruf', mesaj: `LED süresini 2 saat azaltarak ayda ~₺${tasarruf} tasarruf edin.` });
    }
    if (elektrikHesap.havaAktif && elektrikHesap.co2Aktif) {
      oneriler.push({ tip: 'uyari', mesaj: 'Hava motoru CO2\'yi suda tutar. Gece hava, gündüz CO2 çalıştırın.' });
    }
    if (yuksekTuketim > 0) {
      oneriler.push({ tip: 'uyari', mesaj: `Yüksek kademeye giriyorsunuz! ${yuksekTuketim.toFixed(1)} kWh yüksek tarifeden.` });
    }
    if (enCokTuketen && enCokTuketen.aylikKwh > toplamAylik * 0.4) {
      oneriler.push({ tip: 'bilgi', mesaj: `${enCokTuketen.isim} toplam tüketimin %${Math.round(enCokTuketen.aylikKwh / toplamAylik * 100)}'ini oluşturuyor.` });
    }
    
    return {
      cihazlar, toplamGunluk, toplamAylik, toplamYillik,
      aylikMaliyet, yillikMaliyet, dusukTuketim, yuksekTuketim,
      mevsimselTahmin, enCokTuketen, oneriler
    };
  };

  // ==================== SU DEĞİŞİMİ HESAPLAMA ====================
  const suDegisimiHesapla = () => {
    const degisimMiktari = Math.round(suDegLitre * (suDegOran / 100));
    const kovaSayisi = Math.ceil(degisimMiktari / suDegKova);
    const sifonSuresi = Math.round(degisimMiktari / 5); // ~5L/dk sifon hızı
    
    // Yıllık su tüketimi
    const haftalikDegisim = suDegSiklik === 'haftalik' ? degisimMiktari : suDegSiklik === '2hafta' ? degisimMiktari / 2 : degisimMiktari / 4;
    const yillikSu = Math.round(haftalikDegisim * 52);
    
    // Su maliyeti (ortalama 15 TL/m³)
    const yillikMaliyet = ((yillikSu / 1000) * 15).toFixed(2);
    
    // Öneriler
    const oneriler = [];
    if (suDegOran < 20) {
      oneriler.push({ tip: 'uyari', mesaj: '%20\'den az değişim yetersiz olabilir. Nitrat birikir.' });
    }
    if (suDegOran > 50) {
      oneriler.push({ tip: 'bilgi', mesaj: '%50+ değişim agresif. Parametreleri yavaş değiştirin.' });
    }
    if (suDegSiklik === 'aylik') {
      oneriler.push({ tip: 'uyari', mesaj: 'Aylık değişim çoğu tank için yetersiz. En az 2 haftada bir önerilir.' });
    }
    
    // Sifon tekniği
    const sifonTeknik = [
      '1. Elektrikli ekipmanları kapatın',
      '2. Sifon borusunu suya batırın, hava çıkana kadar bekleyin',
      '3. Parmağınızla ucunu kapatıp kovaya yönlendirin',
      '4. Zemini dairesel hareketlerle sifonlayın',
      '5. Hedef miktara ulaşınca sifonu çıkarın',
      '6. Aynı sıcaklıkta deklorlu su ekleyin'
    ];
    
    // Su hazırlama
    const suHazirlama = {
      deklor: `${Math.ceil(degisimMiktari / 10)} damla/ml deklor giderici`,
      sicaklik: 'Akvaryum suyuyla aynı (±1°C)',
      bekleme: 'Deklorlu su 15-30 dk bekletilebilir',
      alternatif: '24-48 saat bekletilen şebeke suyu da kullanılabilir'
    };
    
    return {
      degisimMiktari, kovaSayisi, sifonSuresi,
      haftalikDegisim: Math.round(haftalikDegisim), yillikSu, yillikMaliyet,
      oneriler, sifonTeknik, suHazirlama
    };
  };

  // ==================== GÜBRE/DOZAJ HESAPLAMA ====================
  const gubreHesapla = () => {
    // EI (Estimative Index) metodu - haftalık dozlar (100L için)
    const eiDozlari = {
      dusuk: {
        kno3: { miktar: 3.5, birim: 'g', aciklama: 'Potasyum Nitrat', gun: 'Pzt-Çar-Cum' },
        kh2po4: { miktar: 0.9, birim: 'g', aciklama: 'Mono Potasyum Fosfat', gun: 'Pzt-Çar-Cum' },
        k2so4: { miktar: 4.5, birim: 'g', aciklama: 'Potasyum Sülfat', gun: 'Pzt-Çar-Cum' },
        mgso4: { miktar: 4, birim: 'g', aciklama: 'Magnezyum Sülfat', gun: 'Pzt-Çar-Cum' },
        iz: { miktar: 5, birim: 'ml', aciklama: 'İz Elementler (Mikro)', gun: 'Sal-Per-Cmt' },
        fe: { miktar: 2, birim: 'ml', aciklama: 'Demir (Fe)', gun: 'Sal-Per-Cmt' }
      },
      orta: {
        kno3: { miktar: 7, birim: 'g', aciklama: 'Potasyum Nitrat', gun: 'Pzt-Çar-Cum' },
        kh2po4: { miktar: 1.4, birim: 'g', aciklama: 'Mono Potasyum Fosfat', gun: 'Pzt-Çar-Cum' },
        k2so4: { miktar: 7, birim: 'g', aciklama: 'Potasyum Sülfat', gun: 'Pzt-Çar-Cum' },
        mgso4: { miktar: 6, birim: 'g', aciklama: 'Magnezyum Sülfat', gun: 'Pzt-Çar-Cum' },
        iz: { miktar: 10, birim: 'ml', aciklama: 'İz Elementler (Mikro)', gun: 'Sal-Per-Cmt' },
        fe: { miktar: 5, birim: 'ml', aciklama: 'Demir (Fe)', gun: 'Sal-Per-Cmt' }
      },
      yuksek: {
        kno3: { miktar: 14, birim: 'g', aciklama: 'Potasyum Nitrat', gun: 'Pzt-Çar-Cum' },
        kh2po4: { miktar: 2.5, birim: 'g', aciklama: 'Mono Potasyum Fosfat', gun: 'Pzt-Çar-Cum' },
        k2so4: { miktar: 9, birim: 'g', aciklama: 'Potasyum Sülfat', gun: 'Pzt-Çar-Cum' },
        mgso4: { miktar: 8, birim: 'g', aciklama: 'Magnezyum Sülfat', gun: 'Pzt-Çar-Cum' },
        iz: { miktar: 15, birim: 'ml', aciklama: 'İz Elementler (Mikro)', gun: 'Sal-Per-Cmt' },
        fe: { miktar: 10, birim: 'ml', aciklama: 'Demir (Fe)', gun: 'Sal-Per-Cmt' }
      }
    };
    
    // PPS-Pro metodu - günlük dozlar (100L için)
    const ppsDozlari = {
      dusuk: { makro: 1, mikro: 1 },
      orta: { makro: 2, mikro: 2 },
      yuksek: { makro: 3, mikro: 3 }
    };
    
    // Litre çarpanı
    const carpan = gubreLitre / 100;
    
    // Seçilen metoda göre hesapla
    let hesaplananDozlar = {};
    let haftalikProgram = [];
    
    if (gubreMetod === 'ei') {
      const bazDoz = eiDozlari[gubreBitkiYuku];
      Object.keys(bazDoz).forEach(key => {
        hesaplananDozlar[key] = {
          ...bazDoz[key],
          hesaplanan: (bazDoz[key].miktar * carpan).toFixed(2)
        };
      });
      
      haftalikProgram = [
        { gun: 'Pazartesi', islem: 'Makro gübreler (KNO3, KH2PO4, K2SO4, MgSO4)', tip: 'makro' },
        { gun: 'Salı', islem: 'Mikro gübreler (İz element, Fe)', tip: 'mikro' },
        { gun: 'Çarşamba', islem: 'Makro gübreler', tip: 'makro' },
        { gun: 'Perşembe', islem: 'Mikro gübreler', tip: 'mikro' },
        { gun: 'Cuma', islem: 'Makro gübreler', tip: 'makro' },
        { gun: 'Cumartesi', islem: 'Mikro gübreler', tip: 'mikro' },
        { gun: 'Pazar', islem: '%50 su değişimi + dinlenme', tip: 'su' }
      ];
    } else {
      const bazDoz = ppsDozlari[gubreBitkiYuku];
      hesaplananDozlar = {
        makro: { hesaplanan: (bazDoz.makro * carpan).toFixed(1), birim: 'ml', aciklama: 'PPS-Pro Makro (günlük)' },
        mikro: { hesaplanan: (bazDoz.mikro * carpan).toFixed(1), birim: 'ml', aciklama: 'PPS-Pro Mikro (günlük)' }
      };
      
      haftalikProgram = [
        { gun: 'Her gün', islem: `${hesaplananDozlar.makro.hesaplanan}ml Makro + ${hesaplananDozlar.mikro.hesaplanan}ml Mikro`, tip: 'her-gun' },
        { gun: 'Haftada 1', islem: '%20-30 su değişimi', tip: 'su' }
      ];
    }
    
    // Metod karşılaştırma
    const metodKarsilastirma = {
      ei: {
        isim: 'EI (Estimative Index)',
        avantaj: ['Eksiklik olmaz', 'Hızlı bitki büyümesi', 'Basit hesaplama'],
        dezavantaj: ['Fazla gübre kullanımı', 'Haftalık büyük su değişimi şart', 'Yosun riski'],
        uygunluk: 'Yüksek ışık + CO2 tankları'
      },
      pps: {
        isim: 'PPS-Pro (Perpetual Preservation)',
        avantaj: ['Ekonomik', 'Az su değişimi', 'Stabil parametreler'],
        dezavantaj: ['Yavaş büyüme', 'Eksiklik olabilir', 'Günlük dozlama'],
        uygunluk: 'Düşük-orta ışık tankları'
      }
    };
    
    // Eksiklik belirtileri
    const eksiklikBelirtileri = [
      { element: 'Azot (N)', belirti: 'Yaşlı yapraklar sararır, büyüme durur', cozum: 'KNO3 artır' },
      { element: 'Fosfor (P)', belirti: 'Yapraklarda koyu lekeler, kırmızımsı renk', cozum: 'KH2PO4 artır' },
      { element: 'Potasyum (K)', belirti: 'Yaprak kenarları yanar, delikler', cozum: 'K2SO4 artır' },
      { element: 'Demir (Fe)', belirti: 'Yeni yapraklar soluk/beyaz', cozum: 'Fe artır' },
      { element: 'Magnezyum (Mg)', belirti: 'Damarlar arası sararma', cozum: 'MgSO4 artır' },
      { element: 'Kalsiyum (Ca)', belirti: 'Çarpık yeni yapraklar', cozum: 'GH artır veya CaSO4' }
    ];
    
    // Hazır gübre markaları
    const hazirGubreler = [
      { marka: 'Seachem Flourish', tip: 'Kapsamlı mikro', dozaj: '5ml/200L, 2x hafta' },
      { marka: 'Tropica Specialized', tip: 'Makro + Mikro', dozaj: '5ml/50L, haftalık' },
      { marka: 'ADA Brighty K', tip: 'Potasyum', dozaj: '1ml/20L, günlük' },
      { marka: 'Easy Life ProFito', tip: 'Kapsamlı', dozaj: '10ml/100L, haftalık' },
      { marka: 'JBL Ferropol', tip: 'Fe + mikro', dozaj: '10ml/40L, 2 haftada' }
    ];
    
    return {
      hesaplananDozlar, haftalikProgram, metodKarsilastirma,
      eksiklikBelirtileri, hazirGubreler, carpan
    };
  };

  // ==================== HACİM HESAPLAMA ====================
  const hacimHesapla = () => {
    let brutHacim, netHacim, camAlani;
    
    if (hacimTip === 'dikdortgen') {
      brutHacim = (hacimUzunluk * hacimGenislik * hacimYukseklik) / 1000; // Litre
      camAlani = 2 * (hacimUzunluk * hacimYukseklik + hacimGenislik * hacimYukseklik + hacimUzunluk * hacimGenislik);
    } else if (hacimTip === 'silindir') {
      brutHacim = Math.PI * Math.pow(hacimCap / 2, 2) * hacimYukseklik / 1000;
      camAlani = 2 * Math.PI * (hacimCap / 2) * hacimYukseklik + 2 * Math.PI * Math.pow(hacimCap / 2, 2);
    } else if (hacimTip === 'kup') {
      brutHacim = Math.pow(hacimUzunluk, 3) / 1000;
      camAlani = 6 * Math.pow(hacimUzunluk, 2);
    }
    
    // Kum hacmi çıkar
    const kumHacmi = hacimTip === 'dikdortgen' 
      ? (hacimUzunluk * hacimGenislik * hacimKumYukseklik) / 1000
      : hacimTip === 'silindir'
        ? Math.PI * Math.pow(hacimCap / 2, 2) * hacimKumYukseklik / 1000
        : Math.pow(hacimUzunluk, 2) * hacimKumYukseklik / 1000;
    
    // Taş/dekor hacmi çıkar
    const tasHacmi = brutHacim * (hacimTasOran / 100);
    
    netHacim = brutHacim - kumHacmi - tasHacmi;
    
    // Cam kalınlığı önerisi
    let camKalinligi;
    if (brutHacim <= 50) camKalinligi = '4-5mm';
    else if (brutHacim <= 100) camKalinligi = '5-6mm';
    else if (brutHacim <= 200) camKalinligi = '6-8mm';
    else if (brutHacim <= 400) camKalinligi = '8-10mm';
    else if (brutHacim <= 600) camKalinligi = '10-12mm';
    else camKalinligi = '12-15mm+';
    
    // Ağırlık hesabı
    const bosAgirlik = (camAlani / 10000) * 2.5 * 6; // cam yoğunluğu ~2.5 g/cm³, 6mm varsayılan
    const doluAgirlik = bosAgirlik + netHacim; // 1L su = 1kg
    const kumAgirlik = kumHacmi * 1.5; // kum yoğunluğu ~1.5 g/cm³
    const toplamAgirlik = doluAgirlik + kumAgirlik;
    
    // Zemin dayanıklılığı
    let zeminUyari = '';
    if (toplamAgirlik > 200) {
      zeminUyari = '⚠️ 200kg üzeri! Zemin dayanıklılığını kontrol edin.';
    }
    if (toplamAgirlik > 400) {
      zeminUyari = '🔴 400kg üzeri! Profesyonel destek veya özel sehpa şart.';
    }
    
    // Stand/sehpa önerisi
    let standOnerisi;
    if (brutHacim <= 60) standOnerisi = 'Sağlam mobilya veya küçük akvaryum sehpası';
    else if (brutHacim <= 150) standOnerisi = 'Akvaryum sehpası (ahşap veya metal)';
    else if (brutHacim <= 300) standOnerisi = 'Güçlendirilmiş akvaryum dolabı';
    else standOnerisi = 'Özel üretim çelik sehpa veya beton taban';
    
    return {
      brutHacim: brutHacim.toFixed(1),
      netHacim: netHacim.toFixed(1),
      kumHacmi: kumHacmi.toFixed(1),
      tasHacmi: tasHacmi.toFixed(1),
      camKalinligi,
      bosAgirlik: bosAgirlik.toFixed(1),
      doluAgirlik: doluAgirlik.toFixed(1),
      kumAgirlik: kumAgirlik.toFixed(1),
      toplamAgirlik: toplamAgirlik.toFixed(1),
      zeminUyari,
      standOnerisi,
      camAlani: (camAlani / 10000).toFixed(3) // m²
    };
  };

  // ==================== BALIK FONKSİYONLARI ====================
  const balikEkle = (balik) => {
    const mevcutIndex = secilenBaliklar.findIndex(b => b.id === balik.id);
    if (mevcutIndex === -1) {
      setSecilenBaliklar([...secilenBaliklar, { ...balik, adet: 1, erkek: 0, disi: 0 }]);
    }
    setModalAcik(false);
    setAramaMetni('');
  };

  const balikAdetGuncelle = (balikId, yeniAdet) => {
    setSecilenBaliklar(secilenBaliklar.map(b => b.id === balikId ? { ...b, adet: Math.max(0, yeniAdet) } : b).filter(b => b.adet > 0));
  };

  const cinsiyetGuncelle = (balikId, tip, deger) => {
    setSecilenBaliklar(secilenBaliklar.map(b => b.id === balikId ? { ...b, [tip]: Math.max(0, deger) } : b));
  };

  const balikSil = (balikId) => {
    setSecilenBaliklar(secilenBaliklar.filter(b => b.id !== balikId));
  };

  const filtrelenmisBaliklar = tumBaliklar.filter(balik => {
    if (!balik || !balik.isim) return false;
    const aranan = aramaMetni.toLowerCase();
    return balik.isim.toLowerCase().includes(aranan) || (balik.latince && balik.latince.toLowerCase().includes(aranan));
  });

  // ==================== BALIK ANALİZİ ====================
  const balikAnaliziYap = () => {
    if (secilenBaliklar.length === 0) return null;
    
    let toplamCm = 0;
    let kapasiteKullanim = 0;
    const detaylar = [];
    const uyumlulukSorunlari = [];
    const stokSorunlariListesi = [];
    const davranisUyarilari = [];
    let genelRiskSkoru = 0;
    
    secilenBaliklar.forEach(balik => {
      let ihtiyacLitre = 0;
      const maxBoy = balik.boyut?.max || 5;
      
      // Boyuta göre litre hesaplama
      if (maxBoy <= 3) ihtiyacLitre = balik.adet * 2;
      else if (maxBoy <= 5) ihtiyacLitre = balik.adet * 4;
      else if (maxBoy <= 10) ihtiyacLitre = balik.adet * 8;
      else if (maxBoy <= 15) ihtiyacLitre = balik.adet * 15;
      else if (maxBoy <= 25) ihtiyacLitre = balik.adet * 30;
      else ihtiyacLitre = balik.adet * 50;
      
      kapasiteKullanim += ihtiyacLitre;
      toplamCm += maxBoy * balik.adet;
      detaylar.push({ ...balik, ihtiyacLitre, maxBoy });

      // Davranış kontrolü
      const davranis = balikDavranisVeritabani ? balikDavranisVeritabani[balik.id] : null;
      if (davranis) {
        const stokUyari = stokUyarilari ? stokUyarilari(balik.id, balik.adet, balik.erkek, balik.disi) : [];
        if (stokUyari && stokUyari.length > 0) {
          stokSorunlariListesi.push({ balik: balik.isim, uyarilar: stokUyari });
          genelRiskSkoru += stokUyari.length * 10;
        }
        if (davranis.agresiflik >= 8) {
          davranisUyarilari.push(`⚠️ ${balik.isim}: Çok agresif tür!`);
          genelRiskSkoru += 15;
        }
        if (davranis.yirticilik >= 7) {
          davranisUyarilari.push(`🦈 ${balik.isim}: Yırtıcı - küçük balıkları yiyebilir!`);
          genelRiskSkoru += 20;
        }
      }
    });

    // Uyumluluk kontrolü
    if (uyumlulukKontrol) {
      for (let i = 0; i < secilenBaliklar.length; i++) {
        for (let j = i + 1; j < secilenBaliklar.length; j++) {
          const balik1 = secilenBaliklar[i];
          const balik2 = secilenBaliklar[j];
          const kontrol = uyumlulukKontrol(balik1.id, balik2.id);
          
          if (kontrol && kontrol.seviye === 'uyumsuz') {
            uyumlulukSorunlari.push({
              balik1: balik1.isim, balik2: balik2.isim, seviye: 'uyumsuz',
              mesaj: `🔴 ${balik1.isim} + ${balik2.isim}: UYUMSUZ!`,
              detay: kontrol.uyarilar || []
            });
            genelRiskSkoru += 30;
          } else if (kontrol && kontrol.seviye === 'dikkat') {
            uyumlulukSorunlari.push({
              balik1: balik1.isim, balik2: balik2.isim, seviye: 'dikkat',
              mesaj: `🟡 ${balik1.isim} + ${balik2.isim}: Dikkat gerekli`,
              detay: kontrol.uyarilar || []
            });
            genelRiskSkoru += 10;
          }
        }
      }
    }

    const kapasiteOran = (kapasiteKullanim / analizLitre) * 100;
    
    let durum, renk;
    if (kapasiteOran <= 70) { durum = 'İdeal'; renk = '#27ae60'; }
    else if (kapasiteOran <= 90) { durum = 'İyi'; renk = '#2ecc71'; }
    else if (kapasiteOran <= 100) { durum = 'Tam Kapasite'; renk = '#f39c12'; genelRiskSkoru += 10; }
    else if (kapasiteOran <= 120) { durum = 'Aşırı Yük'; renk = '#e67e22'; genelRiskSkoru += 25; }
    else { durum = 'Kritik!'; renk = '#e74c3c'; genelRiskSkoru += 40; }

    let riskSeviyesi, riskRenk;
    if (genelRiskSkoru <= 20) { riskSeviyesi = 'Düşük'; riskRenk = '#27ae60'; }
    else if (genelRiskSkoru <= 50) { riskSeviyesi = 'Orta'; riskRenk = '#f39c12'; }
    else if (genelRiskSkoru <= 80) { riskSeviyesi = 'Yüksek'; riskRenk = '#e67e22'; }
    else { riskSeviyesi = 'Kritik'; riskRenk = '#e74c3c'; }
    
    return {
      toplamCm, kapasiteKullanim: Math.round(kapasiteKullanim), kapasiteOran: Math.round(kapasiteOran),
      durum, renk, detaylar, uyumlulukSorunlari, stokSorunlariListesi, davranisUyarilari,
      genelRiskSkoru, riskSeviyesi, riskRenk
    };
  };

  const analizSonucu = balikAnaliziYap();
  // ==================== RENDER ====================
  return (
    <div className="hesaplamalar-sayfa">
      {/* HEADER */}
      <div className="hesap-header">
        <h1>🧮 Akvaryum Hesaplayıcıları</h1>
        <p>Profesyonel akvaryum yönetimi için tüm hesaplamalar</p>
      </div>

      {/* MENÜ */}
      <div className="hesap-menu">
        {hesapMenusu.map(item => (
          <button
            key={item.id}
            className={`hesap-menu-btn ${aktifHesap === item.id ? 'aktif' : ''}`}
            onClick={() => setAktifHesap(item.id)}
          >
            <span className="menu-emoji">{item.emoji}</span>
            <span className="menu-text">{item.text}</span>
          </button>
        ))}
      </div>

      {/* ==================== ISITICI ==================== */}
      {aktifHesap === 'isitici' && (
        <div className="hesap-panel">
          <h2>🌡️ Isıtıcı Watt Hesaplama</h2>
          <p className="hesap-aciklama">Akvaryumunuz için ideal ısıtıcı gücünü hesaplayın</p>
          
          <div className="hesap-grid">
            <div className="hesap-girdi-grup">
              <label>Akvaryum Hacmi (Litre)</label>
              <input type="number" value={isiticiLitre} onChange={(e) => setIsiticiLitre(Number(e.target.value))} min="10" max="2000" />
            </div>
            <div className="hesap-girdi-grup">
              <label>Oda Sıcaklığı (°C)</label>
              <input type="number" value={isiticiOdaSicaklik} onChange={(e) => setIsiticiOdaSicaklik(Number(e.target.value))} min="5" max="35" />
            </div>
            <div className="hesap-girdi-grup">
              <label>Hedef Sıcaklık (°C)</label>
              <input type="number" value={isiticiHedefSicaklik} onChange={(e) => setIsiticiHedefSicaklik(Number(e.target.value))} min="18" max="32" />
            </div>
          </div>

          {(() => {
            const sonuc = isiticiHesapla();
            return (
              <>
                <div className="hesap-sonuclar">
                  <div className="sonuc-kart">
                    <span className="sonuc-label">Sıcaklık Farkı</span>
                    <span className="sonuc-deger">{sonuc.fark}°C</span>
                  </div>
                  <div className="sonuc-kart">
                    <span className="sonuc-label">Hesaplanan</span>
                    <span className="sonuc-deger">{sonuc.hesaplananWatt}W</span>
                  </div>
                  <div className="sonuc-kart vurgulu">
                    <span className="sonuc-label">Önerilen</span>
                    <span className="sonuc-deger">{sonuc.onerilenWatt}W</span>
                  </div>
                  <div className="sonuc-kart">
                    <span className="sonuc-label">Aylık Maliyet</span>
                    <span className="sonuc-deger">~₺{sonuc.aylikMaliyet}</span>
                  </div>
                </div>

                <div className="watt-secenekleri">
                  <h4>📦 Piyasadaki Isıtıcı Seçenekleri</h4>
                  <div className="watt-grid">
                    {sonuc.wattSecenekleri.map(w => (
                      <div key={w.watt} className={`watt-item ${w.durum}`}>
                        <span className="watt-deger">{w.watt}W</span>
                        <span className="watt-durum">
                          {w.durum === 'yetersiz' && '❌ Yetersiz'}
                          {w.durum === 'onerilen' && '✅ Önerilen'}
                          {w.durum === 'uygun' && '👍 Uygun'}
                          {w.durum === 'fazla' && '📈 Fazla'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {sonuc.ciftIsiticiOner && (
                  <div className="hesap-oneri">
                    <h4>💡 Çift Isıtıcı Önerisi</h4>
                    <p>Büyük tankınız için 2 adet <strong>{sonuc.ciftWatt}W</strong> ısıtıcı kullanmanız önerilir.</p>
                    <ul>
                      <li>Biri arızalansa diğeri devreye girer</li>
                      <li>Isı daha homojen dağılır</li>
                      <li>Her iki uca yerleştirin</li>
                    </ul>
                  </div>
                )}

                <div className="hesap-yorum">{sonuc.yorum}</div>

                {sonuc.uyarilar.length > 0 && (
                  <div className="hesap-uyarilar">
                    {sonuc.uyarilar.map((uyari, i) => (
                      <div key={i} className="uyari-item">{uyari}</div>
                    ))}
                  </div>
                )}
              </>
            );
          })()}
        </div>
      )}

      {/* ==================== IŞIK/LED ==================== */}
      {aktifHesap === 'isik' && (
        <div className="hesap-panel">
          <h2>💡 LED/Işık Hesaplama</h2>
          <p className="hesap-aciklama">Bitkileriniz için ideal aydınlatmayı belirleyin</p>
          
          <div className="hesap-grid">
            <div className="hesap-girdi-grup">
              <label>Akvaryum Hacmi (Litre)</label>
              <input type="number" value={isikLitre} onChange={(e) => setIsikLitre(Number(e.target.value))} />
            </div>
            <div className="hesap-girdi-grup">
              <label>Uzunluk (cm)</label>
              <input type="number" value={isikUzunluk} onChange={(e) => setIsikUzunluk(Number(e.target.value))} />
            </div>
            <div className="hesap-girdi-grup">
              <label>Genişlik (cm)</label>
              <input type="number" value={isikGenislik} onChange={(e) => setIsikGenislik(Number(e.target.value))} />
            </div>
            <div className="hesap-girdi-grup">
              <label>Yükseklik (cm)</label>
              <input type="number" value={isikYukseklik} onChange={(e) => setIsikYukseklik(Number(e.target.value))} />
            </div>
            <div className="hesap-girdi-grup">
              <label>Bitki Işık İhtiyacı</label>
              <select value={isikTip} onChange={(e) => setIsikTip(e.target.value)}>
                <option value="dusuk">🌿 Düşük Işık</option>
                <option value="orta">🌱 Orta Işık</option>
                <option value="yuksek">🌺 Yüksek Işık</option>
              </select>
            </div>
          </div>

          {(() => {
            const sonuc = isikHesapla();
            return (
              <>
                <div className="hesap-sonuclar">
                  <div className="sonuc-kart">
                    <span className="sonuc-label">Min. Lümen</span>
                    <span className="sonuc-deger">{sonuc.minLumen}</span>
                  </div>
                  <div className="sonuc-kart">
                    <span className="sonuc-label">Max. Lümen</span>
                    <span className="sonuc-deger">{sonuc.maxLumen}</span>
                  </div>
                  <div className="sonuc-kart vurgulu">
                    <span className="sonuc-label">LED Watt</span>
                    <span className="sonuc-deger">~{sonuc.onerilenWatt}W</span>
                  </div>
                  <div className="sonuc-kart">
                    <span className="sonuc-label">PAR Değeri</span>
                    <span className="sonuc-deger">{sonuc.parDegeri} µmol</span>
                  </div>
                </div>

                <div className="isik-detay-grid">
                  <div className="isik-detay-kart">
                    <h4>🕐 Işık Süresi</h4>
                    <p className="buyuk-deger">{sonuc.isikSuresi}</p>
                  </div>
                  <div className="isik-detay-kart">
                    <h4>🌡️ Renk Sıcaklığı</h4>
                    <p className="buyuk-deger">{sonuc.kelvin}</p>
                  </div>
                  <div className="isik-detay-kart">
                    <h4>📐 Taban Alanı</h4>
                    <p className="buyuk-deger">{sonuc.tabanAlani} m²</p>
                  </div>
                </div>

                <div className="hesap-bilgi-kutu">
                  <h4>🌱 Uygun Bitkiler</h4>
                  <p>{sonuc.uygunBitkiler}</p>
                </div>

                <div className="hesap-bilgi-kutu uyari">
                  <h4>🦠 Yosun Riski</h4>
                  <p>{sonuc.yosunRiski}</p>
                </div>

                <div className="hesap-bilgi-kutu">
                  <h4>📅 Önerilen Işık Programı</h4>
                  <ul>
                    <li><strong>Sabah:</strong> {sonuc.programOnerisi.sabah}</li>
                    <li><strong>Öğle:</strong> {sonuc.programOnerisi.ogle}</li>
                    <li><strong>Akşam:</strong> {sonuc.programOnerisi.aksam}</li>
                    <li><strong>Gece:</strong> {sonuc.programOnerisi.gece}</li>
                  </ul>
                </div>

                <div className="hesap-yorum">{sonuc.derinlikNotu}</div>
              </>
            );
          })()}
        </div>
      )}

      {/* ==================== CO2 ==================== */}
      {aktifHesap === 'co2' && (
        <div className="hesap-panel">
          <h2>🫧 CO2 İhtiyaç Hesaplama</h2>
          <p className="hesap-aciklama">Bitkili akvaryumunuz için CO2 gereksinimini belirleyin</p>
          
          <div className="hesap-grid">
            <div className="hesap-girdi-grup">
              <label>Akvaryum Hacmi (Litre)</label>
              <input type="number" value={co2Litre} onChange={(e) => setCo2Litre(Number(e.target.value))} />
            </div>
            <div className="hesap-girdi-grup">
              <label>Bitki Yoğunluğu</label>
              <select value={co2BitkiYogunlugu} onChange={(e) => setCo2BitkiYogunlugu(e.target.value)}>
                <option value="dusuk">🌿 Düşük</option>
                <option value="orta">🌱 Orta</option>
                <option value="yuksek">🌺 Yüksek</option>
              </select>
            </div>
            <div className="hesap-girdi-grup">
              <label>Işık Seviyesi</label>
              <select value={co2IsikSeviyesi} onChange={(e) => setCo2IsikSeviyesi(e.target.value)}>
                <option value="dusuk">💡 Düşük</option>
                <option value="orta">💡💡 Orta</option>
                <option value="yuksek">💡💡💡 Yüksek</option>
              </select>
            </div>
          </div>

          <div className="hesap-grid" style={{marginTop: '15px'}}>
            <div className="hesap-girdi-grup">
              <label>Mevcut pH</label>
              <input type="number" step="0.1" value={co2Ph} onChange={(e) => setCo2Ph(Number(e.target.value))} min="6" max="8" />
            </div>
            <div className="hesap-girdi-grup">
              <label>Mevcut KH</label>
              <input type="number" value={co2Kh} onChange={(e) => setCo2Kh(Number(e.target.value))} min="1" max="15" />
            </div>
          </div>

          {(() => {
            const sonuc = co2Hesapla();
            return (
              <>
                <div className="hesap-sonuclar">
                  <div className="sonuc-kart vurgulu">
                    <span className="sonuc-label">CO2 İhtiyacı</span>
                    <span className="sonuc-deger">{sonuc.co2Ihtiyac} mg/L</span>
                  </div>
                  <div className="sonuc-kart">
                    <span className="sonuc-label">Günlük Tüketim</span>
                    <span className="sonuc-deger">~{sonuc.gunlukGram}g</span>
                  </div>
                  <div className="sonuc-kart">
                    <span className="sonuc-label">Aylık Tüketim</span>
                    <span className="sonuc-deger">~{sonuc.aylikGram}g</span>
                  </div>
                  <div className="sonuc-kart">
                    <span className="sonuc-label">Önerilen Tüp</span>
                    <span className="sonuc-deger">{sonuc.onerilenTup}</span>
                  </div>
                </div>

                <div className="co2-tup-tablosu">
                  <h4>📦 Tüp Süreleri & Fiyatları</h4>
                  <table>
                    <thead>
                      <tr>
                        <th>Tüp Boyutu</th>
                        <th>Tahmini Süre</th>
                        <th>Yaklaşık Fiyat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sonuc.tupSureleri.map(tup => (
                        <tr key={tup.boyut} className={tup.boyut === sonuc.onerilenTup ? 'onerilen' : ''}>
                          <td>{tup.boyut}</td>
                          <td>{tup.sure} gün ({Math.round(tup.sure / 30)} ay)</td>
                          <td>{tup.fiyat}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="drop-checker-panel">
                  <h4>🧪 pH/KH'dan CO2 Tahmini</h4>
                  <div className="drop-checker-sonuc">
                    <div className="drop-checker-renk" style={{backgroundColor: sonuc.dropCheckerRenk}}></div>
                    <div className="drop-checker-bilgi">
                      <p className="co2-deger">Mevcut CO2: <strong>{sonuc.mevcutCO2} mg/L</strong></p>
                      <p className="co2-yorum">{sonuc.dropCheckerYorum}</p>
                    </div>
                  </div>
                  <div className="drop-checker-rehber">
                    <span className="renk-ornek mavi"></span> Mavi = Düşük CO2
                    <span className="renk-ornek yesil"></span> Yeşil = İdeal
                    <span className="renk-ornek sari"></span> Sarı = Yüksek (Tehlikeli)
                  </div>
                </div>

                <div className="hesap-yorum">{sonuc.genelYorum}</div>

                <div className="karsilastirma-tablo">
                  <h4>⚖️ DIY vs Tüplü CO2</h4>
                  <table>
                    <thead>
                      <tr>
                        <th>Özellik</th>
                        <th>Tüplü Sistem</th>
                        <th>DIY (Maya)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>Maliyet</td><td>{sonuc.diyKarsilastirma.tup.maliyet}</td><td>{sonuc.diyKarsilastirma.diy.maliyet}</td></tr>
                      <tr><td>Stabilite</td><td>{sonuc.diyKarsilastirma.tup.stabilite}</td><td>{sonuc.diyKarsilastirma.diy.stabilite}</td></tr>
                      <tr><td>Bakım</td><td>{sonuc.diyKarsilastirma.tup.bakim}</td><td>{sonuc.diyKarsilastirma.diy.bakim}</td></tr>
                      <tr><td>Estetik</td><td>{sonuc.diyKarsilastirma.tup.estetik}</td><td>{sonuc.diyKarsilastirma.diy.estetik}</td></tr>
                    </tbody>
                  </table>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* ==================== FİLTRE ==================== */}
      {aktifHesap === 'filtre' && (
        <div className="hesap-panel">
          <h2>🔄 Filtre Kapasitesi Hesaplama</h2>
          <p className="hesap-aciklama">Akvaryumunuz için ideal filtrasyon sistemini belirleyin</p>
          
          <div className="hesap-grid">
            <div className="hesap-girdi-grup">
              <label>Akvaryum Hacmi (Litre)</label>
              <input type="number" value={filtreLitre} onChange={(e) => setFiltreLitre(Number(e.target.value))} />
            </div>
            <div className="hesap-girdi-grup">
              <label>Balık Yükü</label>
              <select value={filtreBalikYuku} onChange={(e) => setFiltreBalikYuku(e.target.value)}>
                <option value="dusuk">🐟 Düşük (Az balık)</option>
                <option value="orta">🐠 Orta</option>
                <option value="yuksek">🐡 Yüksek</option>
                <option value="cok_yuksek">🦈 Çok Yüksek (Ciklet/Japon)</option>
              </select>
            </div>
            <div className="hesap-girdi-grup">
              <label>Bitkili Akvaryum</label>
              <select value={filtreBitkili} onChange={(e) => setFiltreBitkili(e.target.value === 'true')}>
                <option value="true">🌱 Evet</option>
                <option value="false">❌ Hayır</option>
              </select>
            </div>
          </div>

          {(() => {
            const sonuc = filtreHesapla();
            return (
              <>
                <div className="hesap-sonuclar">
                  <div className="sonuc-kart">
                    <span className="sonuc-label">Min. Debi</span>
                    <span className="sonuc-deger">{sonuc.minDebi} L/s</span>
                  </div>
                  <div className="sonuc-kart vurgulu">
                    <span className="sonuc-label">İdeal Debi</span>
                    <span className="sonuc-deger">{sonuc.idealDebi} L/s</span>
                  </div>
                </div>

                <div className="hesap-bilgi-kutu">
                  <h4>🎯 Önerilen Filtre Türü</h4>
                  <p className="buyuk-deger">{sonuc.onerilenTur}</p>
                </div>

                {sonuc.ciftFiltre && (
                  <div className="hesap-oneri">
                    <h4>💡 Çift Filtrasyon Önerisi</h4>
                    <p>Bu tank boyutu/yük için çift filtrasyon sistemi önerilir!</p>
                  </div>
                )}

                <div className="filtre-turleri">
                  <h4>📋 Filtre Türleri Karşılaştırma</h4>
                  <div className="filtre-grid">
                    {sonuc.filtreTurleri.map(f => (
                      <div key={f.tur} className={`filtre-kart ${f.uygun ? 'uygun' : 'uygun-degil'}`}>
                        <h5>{f.tur} {f.uygun && '✅'}</h5>
                        <p className="litre-aralik">{f.uygunLitre}</p>
                        <p className="avantaj">✅ {f.avantaj}</p>
                        <p className="dezavantaj">❌ {f.dezavantaj}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="medya-onerileri">
                  <h4>🧱 Filtre Medyası Önerileri</h4>
                  <table>
                    <thead>
                      <tr>
                        <th>Medya</th>
                        <th>Amaç</th>
                        <th>Miktar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sonuc.medyaOnerileri.map((m, i) => (
                        <tr key={i}>
                          <td>{m.medya}</td>
                          <td>{m.amac}</td>
                          <td>{m.miktar}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bakim-takvimi">
                  <h4>📅 Bakım Takvimi</h4>
                  <ul>
                    {sonuc.bakimTakvimi.map((b, i) => (
                      <li key={i}><strong>{b.siklik}:</strong> {b.islem}</li>
                    ))}
                  </ul>
                </div>

                <div className="hesap-yorum">{sonuc.yorum}</div>
              </>
            );
          })()}
        </div>
      )}

      {/* ==================== BALIK KAPASİTESİ ==================== */}
      {aktifHesap === 'balik' && (
        <div className="hesap-panel">
          <h2>🐠 Balık Kapasitesi Analizi</h2>
          <p className="hesap-aciklama">Balıklarınızı ekleyin, kapasite ve uyumluluk analizi yapın</p>
          
          <div className="analiz-ust">
            <div className="hesap-girdi-grup">
              <label>Akvaryum Hacmi (Litre)</label>
              <input type="number" value={analizLitre} onChange={(e) => setAnalizLitre(Number(e.target.value))} min="10" />
            </div>
            <button className="btn-balik-ekle" onClick={() => setModalAcik(true)}>+ Balık Ekle</button>
          </div>

          <div className="secili-baliklar">
            {secilenBaliklar.length === 0 ? (
              <div className="bos-liste">
                <p>🐟</p>
                <p>Henüz balık eklenmedi</p>
                <p className="alt-aciklama">"Balık Ekle" butonuna tıklayarak başlayın</p>
              </div>
            ) : (
              secilenBaliklar.map(balik => (
                <div key={balik.id} className="analiz-balik-kart">
                  <img src={balik.resim || '/images/baliklar/default.jpg'} alt={balik.isim} onError={(e) => e.target.src = '/images/baliklar/default.jpg'} />
                  <div className="analiz-balik-bilgi">
                    <strong>{balik.isim}</strong>
                    <span>{balik.latince}</span>
                    <small>Max: {balik.boyut?.max || '?'}cm</small>
                  </div>
                  <div className="analiz-balik-sayilar">
                    <div className="sayi-grup">
                      <label>🔢</label>
                      <input type="number" value={balik.adet} onChange={(e) => balikAdetGuncelle(balik.id, Number(e.target.value))} min="0" />
                    </div>
                    <div className="sayi-grup">
                      <label>♂️</label>
                      <input type="number" value={balik.erkek} onChange={(e) => cinsiyetGuncelle(balik.id, 'erkek', Number(e.target.value))} min="0" />
                    </div>
                    <div className="sayi-grup">
                      <label>♀️</label>
                      <input type="number" value={balik.disi} onChange={(e) => cinsiyetGuncelle(balik.id, 'disi', Number(e.target.value))} min="0" />
                    </div>
                  </div>
                  <button className="btn-sil" onClick={() => balikSil(balik.id)}>🗑️</button>
                </div>
              ))
            )}
          </div>

          {analizSonucu && (
            <div className="analiz-sonuc" style={{borderColor: analizSonucu.renk}}>
              <div className="sonuc-baslik" style={{background: analizSonucu.renk}}>
                <h3>{analizSonucu.durum}</h3>
                <span>{analizSonucu.kapasiteKullanim}L / {analizLitre}L</span>
              </div>
              
              <div className="sonuc-detay">
                <div className="kapasite-bar">
                  <div className="kapasite-dolu" style={{width: `${Math.min(analizSonucu.kapasiteOran, 100)}%`, background: analizSonucu.renk}}></div>
                </div>
                <p>Kapasite Kullanımı: <strong>%{analizSonucu.kapasiteOran}</strong></p>
              </div>

              <div className="risk-panel" style={{borderColor: analizSonucu.riskRenk, background: `${analizSonucu.riskRenk}15`}}>
                <span>🎯 Risk Seviyesi:</span>
                <span className="risk-badge" style={{background: analizSonucu.riskRenk}}>{analizSonucu.riskSeviyesi}</span>
              </div>

              {analizSonucu.uyumlulukSorunlari.length > 0 && (
                <div className="sorun-liste">
                  <h4>🚫 Uyumluluk Sorunları</h4>
                  {analizSonucu.uyumlulukSorunlari.map((s, i) => (
                    <div key={i} className={`sorun-item ${s.seviye}`}>
                      <p>{s.mesaj}</p>
                      {s.detay && s.detay.map((d, j) => <small key={j}>• {d}</small>)}
                    </div>
                  ))}
                </div>
              )}

              {analizSonucu.davranisUyarilari.length > 0 && (
                <div className="uyari-liste">
                  <h4>⚠️ Davranış Uyarıları</h4>
                  {analizSonucu.davranisUyarilari.map((u, i) => <p key={i}>{u}</p>)}
                </div>
              )}

              {analizSonucu.detaylar.length > 0 && (
                <div className="detay-liste">
                  <h4>📋 Detaylı Kapasite</h4>
                  <table>
                    <thead><tr><th>Balık</th><th>Adet</th><th>Boy</th><th>İhtiyaç</th></tr></thead>
                    <tbody>
                      {analizSonucu.detaylar.map((d, i) => (
                        <tr key={i}>
                          <td>{d.isim}</td>
                          <td>{d.adet}</td>
                          <td>{d.maxBoy}cm</td>
                          <td>{d.ihtiyacLitre}L</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {analizSonucu.uyumlulukSorunlari.length === 0 && analizSonucu.kapasiteOran <= 100 && (
                <div className="basari-mesaj">
                  <span>✅</span>
                  <p>Harika! Balık seçiminiz uyumlu görünüyor.</p>
                </div>
              )}
            </div>
          )}

          {/* Balık Seçim Modalı */}
          {modalAcik && (
            <div className="modal-overlay" onClick={() => setModalAcik(false)}>
              <div className="modal-icerik" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h3>🐠 Balık Seç</h3>
                  <button onClick={() => setModalAcik(false)}>✕</button>
                </div>
                <div className="modal-arama">
                  <input 
                    type="text" 
                    placeholder="Balık ara... (isim veya latince)" 
                    value={aramaMetni} 
                    onChange={(e) => setAramaMetni(e.target.value)} 
                    autoFocus 
                  />
                </div>
                <div className="modal-liste">
                  {filtrelenmisBaliklar.slice(0, 50).map(balik => (
                    <div key={balik.id} className="modal-balik-item" onClick={() => balikEkle(balik)}>
                      <img src={balik.resim || '/images/baliklar/default.jpg'} alt={balik.isim} onError={(e) => e.target.src = '/images/baliklar/default.jpg'} />
                      <div className="modal-balik-bilgi">
                        <strong>{balik.isim}</strong>
                        <span>{balik.latince}</span>
                      </div>
                      <div className="modal-balik-boy">
                        {balik.boyut?.max || '?'}cm
                      </div>
                    </div>
                  ))}
                  {filtrelenmisBaliklar.length === 0 && (
                    <p className="modal-bos">Balık bulunamadı</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )

      /* ==================== ELEKTRİK ==================== */}
      {aktifHesap === 'elektrik' && (
        <div className="hesap-panel">
          <h2>⚡ Elektrik Tüketim Hesaplama</h2>
          <p className="hesap-aciklama">Akvaryum ekipmanlarınızın aylık elektrik maliyetini hesaplayın</p>
          
          <div className="elektrik-cihazlar">
            {/* Filtre */}
            <div className={`cihaz-kart ${elektrikHesap.filtreAktif ? 'aktif' : ''}`}>
              <div className="cihaz-header">
                <label className="cihaz-toggle">
                  <input type="checkbox" checked={elektrikHesap.filtreAktif} onChange={(e) => setElektrikHesap({...elektrikHesap, filtreAktif: e.target.checked})} />
                  <span className="toggle-slider"></span>
                </label>
                <span className="cihaz-icon">🔄</span>
                <span className="cihaz-isim">Filtre</span>
                <span className="cihaz-sure">24 saat</span>
              </div>
              {elektrikHesap.filtreAktif && (
                <div className="cihaz-ayarlar">
                  <div className="ayar-grup">
                    <label>Watt</label>
                    <input type="number" value={elektrikHesap.filtreWatt} onChange={(e) => setElektrikHesap({...elektrikHesap, filtreWatt: Number(e.target.value)})} min="3" max="100" />
                  </div>
                </div>
              )}
            </div>

            {/* Isıtıcı */}
            <div className={`cihaz-kart ${elektrikHesap.isiticiAktif ? 'aktif' : ''}`}>
              <div className="cihaz-header">
                <label className="cihaz-toggle">
                  <input type="checkbox" checked={elektrikHesap.isiticiAktif} onChange={(e) => setElektrikHesap({...elektrikHesap, isiticiAktif: e.target.checked})} />
                  <span className="toggle-slider"></span>
                </label>
                <span className="cihaz-icon">🌡️</span>
                <span className="cihaz-isim">Isıtıcı</span>
                <span className="cihaz-sure">Termostat</span>
              </div>
              {elektrikHesap.isiticiAktif && (
                <div className="cihaz-ayarlar">
                  <div className="ayar-grup">
                    <label>Watt</label>
                    <select value={elektrikHesap.isiticiWatt} onChange={(e) => setElektrikHesap({...elektrikHesap, isiticiWatt: Number(e.target.value)})}>
                      <option value="25">25W</option>
                      <option value="50">50W</option>
                      <option value="75">75W</option>
                      <option value="100">100W</option>
                      <option value="150">150W</option>
                      <option value="200">200W</option>
                      <option value="300">300W</option>
                    </select>
                  </div>
                  <div className="ayar-grup">
                    <label>Çalışma %</label>
                    <input type="number" value={elektrikHesap.isiticiCalismaOrani} onChange={(e) => setElektrikHesap({...elektrikHesap, isiticiCalismaOrani: Number(e.target.value)})} min="5" max="80" />
                  </div>
                </div>
              )}
            </div>

            {/* LED */}
            <div className={`cihaz-kart ${elektrikHesap.ledAktif ? 'aktif' : ''}`}>
              <div className="cihaz-header">
                <label className="cihaz-toggle">
                  <input type="checkbox" checked={elektrikHesap.ledAktif} onChange={(e) => setElektrikHesap({...elektrikHesap, ledAktif: e.target.checked})} />
                  <span className="toggle-slider"></span>
                </label>
                <span className="cihaz-icon">💡</span>
                <span className="cihaz-isim">LED Aydınlatma</span>
              </div>
              {elektrikHesap.ledAktif && (
                <div className="cihaz-ayarlar">
                  <div className="ayar-grup">
                    <label>Watt</label>
                    <input type="number" value={elektrikHesap.ledWatt} onChange={(e) => setElektrikHesap({...elektrikHesap, ledWatt: Number(e.target.value)})} min="5" max="200" />
                  </div>
                  <div className="ayar-grup">
                    <label>Saat/Gün</label>
                    <input type="number" value={elektrikHesap.ledSaat} onChange={(e) => setElektrikHesap({...elektrikHesap, ledSaat: Number(e.target.value)})} min="1" max="14" />
                  </div>
                </div>
              )}
            </div>

            {/* Hava Motoru */}
            <div className={`cihaz-kart ${elektrikHesap.havaAktif ? 'aktif' : ''}`}>
              <div className="cihaz-header">
                <label className="cihaz-toggle">
                  <input type="checkbox" checked={elektrikHesap.havaAktif} onChange={(e) => setElektrikHesap({...elektrikHesap, havaAktif: e.target.checked})} />
                  <span className="toggle-slider"></span>
                </label>
                <span className="cihaz-icon">🫧</span>
                <span className="cihaz-isim">Hava Motoru</span>
                <span className="cihaz-sure">24 saat</span>
              </div>
              {elektrikHesap.havaAktif && (
                <div className="cihaz-ayarlar">
                  <div className="ayar-grup">
                    <label>Watt</label>
                    <input type="number" value={elektrikHesap.havaWatt} onChange={(e) => setElektrikHesap({...elektrikHesap, havaWatt: Number(e.target.value)})} min="1" max="15" />
                  </div>
                </div>
              )}
            </div>

            {/* CO2 Solenoid */}
            <div className={`cihaz-kart ${elektrikHesap.co2Aktif ? 'aktif' : ''}`}>
              <div className="cihaz-header">
                <label className="cihaz-toggle">
                  <input type="checkbox" checked={elektrikHesap.co2Aktif} onChange={(e) => setElektrikHesap({...elektrikHesap, co2Aktif: e.target.checked})} />
                  <span className="toggle-slider"></span>
                </label>
                <span className="cihaz-icon">🧪</span>
                <span className="cihaz-isim">CO2 Solenoid</span>
                <span className="cihaz-sure">LED ile</span>
              </div>
              {elektrikHesap.co2Aktif && (
                <div className="cihaz-ayarlar">
                  <div className="ayar-grup">
                    <label>Watt</label>
                    <input type="number" value={elektrikHesap.co2Watt} onChange={(e) => setElektrikHesap({...elektrikHesap, co2Watt: Number(e.target.value)})} min="2" max="10" />
                  </div>
                </div>
              )}
            </div>

            {/* UV Sterilizatör */}
            <div className={`cihaz-kart ${elektrikHesap.uvAktif ? 'aktif' : ''}`}>
              <div className="cihaz-header">
                <label className="cihaz-toggle">
                  <input type="checkbox" checked={elektrikHesap.uvAktif} onChange={(e) => setElektrikHesap({...elektrikHesap, uvAktif: e.target.checked})} />
                  <span className="toggle-slider"></span>
                </label>
                <span className="cihaz-icon">🔆</span>
                <span className="cihaz-isim">UV Sterilizatör</span>
              </div>
              {elektrikHesap.uvAktif && (
                <div className="cihaz-ayarlar">
                  <div className="ayar-grup">
                    <label>Watt</label>
                    <input type="number" value={elektrikHesap.uvWatt} onChange={(e) => setElektrikHesap({...elektrikHesap, uvWatt: Number(e.target.value)})} min="5" max="36" />
                  </div>
                  <div className="ayar-grup">
                    <label>Saat/Gün</label>
                    <input type="number" value={elektrikHesap.uvSaat} onChange={(e) => setElektrikHesap({...elektrikHesap, uvSaat: Number(e.target.value)})} min="1" max="24" />
                  </div>
                </div>
              )}
            </div>

            {/* Dalga Motoru */}
            <div className={`cihaz-kart ${elektrikHesap.dalgaAktif ? 'aktif' : ''}`}>
              <div className="cihaz-header">
                <label className="cihaz-toggle">
                  <input type="checkbox" checked={elektrikHesap.dalgaAktif} onChange={(e) => setElektrikHesap({...elektrikHesap, dalgaAktif: e.target.checked})} />
                  <span className="toggle-slider"></span>
                </label>
                <span className="cihaz-icon">🌊</span>
                <span className="cihaz-isim">Dalga Motoru</span>
                <span className="cihaz-sure">24 saat</span>
              </div>
              {elektrikHesap.dalgaAktif && (
                <div className="cihaz-ayarlar">
                  <div className="ayar-grup">
                    <label>Watt</label>
                    <input type="number" value={elektrikHesap.dalgaWatt} onChange={(e) => setElektrikHesap({...elektrikHesap, dalgaWatt: Number(e.target.value)})} min="2" max="25" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tarife Ayarları */}
          <div className="elektrik-tarifeler">
            <h4>💰 Elektrik Tarifeleri (2024 EPDK)</h4>
            <div className="tarife-grid">
              <div className="tarife-grup">
                <label>Düşük Kademe (TL/kWh)</label>
                <input type="number" step="0.1" value={elektrikHesap.dusukKademe} onChange={(e) => setElektrikHesap({...elektrikHesap, dusukKademe: Number(e.target.value)})} />
              </div>
              <div className="tarife-grup">
                <label>Yüksek Kademe (TL/kWh)</label>
                <input type="number" step="0.1" value={elektrikHesap.yuksekKademe} onChange={(e) => setElektrikHesap({...elektrikHesap, yuksekKademe: Number(e.target.value)})} />
              </div>
              <div className="tarife-grup">
                <label>Kademe Sınırı (kWh/ay)</label>
                <input type="number" value={elektrikHesap.kademeSiniri} onChange={(e) => setElektrikHesap({...elektrikHesap, kademeSiniri: Number(e.target.value)})} />
              </div>
            </div>
          </div>

          {/* Sonuçlar */}
          {(() => {
            const sonuc = elektrikHesapla();
            return (
              <>
                {sonuc.cihazlar.length > 0 && (
                  <div className="elektrik-tablo">
                    <h4>📊 Cihaz Bazlı Tüketim</h4>
                    <table>
                      <thead>
                        <tr>
                          <th>Cihaz</th>
                          <th>Watt</th>
                          <th>Saat/Gün</th>
                          <th>Günlük kWh</th>
                          <th>Aylık kWh</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sonuc.cihazlar.map((c, i) => (
                          <tr key={i} className={sonuc.enCokTuketen?.isim === c.isim ? 'en-cok' : ''}>
                            <td>{c.emoji} {c.isim} {sonuc.enCokTuketen?.isim === c.isim && <span className="max-badge">MAX</span>}</td>
                            <td>{c.watt}W</td>
                            <td>{c.saat}</td>
                            <td>{c.gunlukKwh.toFixed(3)}</td>
                            <td>{c.aylikKwh.toFixed(1)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan="3"><strong>TOPLAM</strong></td>
                          <td><strong>{sonuc.toplamGunluk.toFixed(3)}</strong></td>
                          <td><strong>{sonuc.toplamAylik.toFixed(1)}</strong></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                )}

                <div className="elektrik-sonuclar">
                  <div className="elektrik-sonuc-kart">
                    <span className="sonuc-icon">📅</span>
                    <div>
                      <span className="sonuc-label">Günlük</span>
                      <span className="sonuc-deger">{sonuc.toplamGunluk.toFixed(2)} kWh</span>
                    </div>
                  </div>
                  <div className="elektrik-sonuc-kart">
                    <span className="sonuc-icon">📆</span>
                    <div>
                      <span className="sonuc-label">Aylık</span>
                      <span className="sonuc-deger">{sonuc.toplamAylik.toFixed(1)} kWh</span>
                    </div>
                  </div>
                  <div className="elektrik-sonuc-kart vurgulu">
                    <span className="sonuc-icon">💵</span>
                    <div>
                      <span className="sonuc-label">Aylık Maliyet</span>
                      <span className="sonuc-deger">₺{sonuc.aylikMaliyet.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="elektrik-sonuc-kart">
                    <span className="sonuc-icon">📊</span>
                    <div>
                      <span className="sonuc-label">Yıllık Maliyet</span>
                      <span className="sonuc-deger">₺{sonuc.yillikMaliyet.toFixed(0)}</span>
                    </div>
                  </div>
                </div>

                <div className="kademe-detay">
                  <h4>📈 Kademe Dağılımı</h4>
                  <div className="kademe-bar">
                    <div className="kademe-dusuk" style={{width: `${(sonuc.dusukTuketim / sonuc.toplamAylik) * 100}%`}}>
                      {sonuc.dusukTuketim.toFixed(1)} kWh
                    </div>
                    {sonuc.yuksekTuketim > 0 && (
                      <div className="kademe-yuksek" style={{width: `${(sonuc.yuksekTuketim / sonuc.toplamAylik) * 100}%`}}>
                        {sonuc.yuksekTuketim.toFixed(1)} kWh
                      </div>
                    )}
                  </div>
                  <div className="kademe-aciklama">
                    <span>🟢 Düşük: {sonuc.dusukTuketim.toFixed(1)} kWh × ₺{elektrikHesap.dusukKademe} = ₺{(sonuc.dusukTuketim * elektrikHesap.dusukKademe).toFixed(2)}</span>
                    {sonuc.yuksekTuketim > 0 && (
                      <span>🔴 Yüksek: {sonuc.yuksekTuketim.toFixed(1)} kWh × ₺{elektrikHesap.yuksekKademe} = ₺{(sonuc.yuksekTuketim * elektrikHesap.yuksekKademe).toFixed(2)}</span>
                    )}
                  </div>
                </div>

                {sonuc.oneriler.length > 0 && (
                  <div className="elektrik-oneriler">
                    <h4>💡 Öneriler</h4>
                    {sonuc.oneriler.map((o, i) => (
                      <div key={i} className={`oneri-item ${o.tip}`}>
                        {o.tip === 'tasarruf' && '💰'}
                        {o.tip === 'uyari' && '⚠️'}
                        {o.tip === 'bilgi' && 'ℹ️'}
                        {o.mesaj}
                      </div>
                    ))}
                  </div>
                )}

                <div className="mevsim-tahmini">
                  <h4>🌡️ Mevsimsel Tahmin</h4>
                  <div className="mevsim-grid">
                    <div className="mevsim-kart yaz">
                      <span>☀️ Yaz</span>
                      <p>Isıtıcı ~%{sonuc.mevsimselTahmin.yaz.isiticiOran} çalışır</p>
                      <p>~₺{sonuc.mevsimselTahmin.yaz.maliyet.toFixed(0)}/ay</p>
                    </div>
                    <div className="mevsim-kart kis">
                      <span>❄️ Kış</span>
                      <p>Isıtıcı ~%{sonuc.mevsimselTahmin.kis.isiticiOran} çalışır</p>
                      <p>~₺{sonuc.mevsimselTahmin.kis.maliyet.toFixed(0)}/ay</p>
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* ==================== SU DEĞİŞİMİ ==================== */}
      {aktifHesap === 'su' && (
        <div className="hesap-panel">
          <h2>💧 Su Değişimi Hesaplama</h2>
          <p className="hesap-aciklama">Akvaryumunuz için ideal su değişim planını oluşturun</p>
          
          <div className="hesap-grid">
            <div className="hesap-girdi-grup">
              <label>Akvaryum Hacmi (Litre)</label>
              <input type="number" value={suDegLitre} onChange={(e) => setSuDegLitre(Number(e.target.value))} min="10" />
            </div>
            <div className="hesap-girdi-grup">
              <label>Değişim Oranı (%)</label>
              <input type="number" value={suDegOran} onChange={(e) => setSuDegOran(Number(e.target.value))} min="10" max="80" />
            </div>
            <div className="hesap-girdi-grup">
              <label>Kova Boyutu (Litre)</label>
              <input type="number" value={suDegKova} onChange={(e) => setSuDegKova(Number(e.target.value))} min="5" max="30" />
            </div>
            <div className="hesap-girdi-grup">
              <label>Değişim Sıklığı</label>
              <select value={suDegSiklik} onChange={(e) => setSuDegSiklik(e.target.value)}>
                <option value="haftalik">Haftalık</option>
                <option value="2hafta">2 Haftada Bir</option>
                <option value="aylik">Aylık</option>
              </select>
            </div>
          </div>

          {(() => {
            const sonuc = suDegisimiHesapla();
            return (
              <>
                <div className="hesap-sonuclar">
                  <div className="sonuc-kart vurgulu">
                    <span className="sonuc-label">Değişim Miktarı</span>
                    <span className="sonuc-deger">{sonuc.degisimMiktari}L</span>
                  </div>
                  <div className="sonuc-kart">
                    <span className="sonuc-label">Kova Sayısı</span>
                    <span className="sonuc-deger">{sonuc.kovaSayisi} kova</span>
                  </div>
                  <div className="sonuc-kart">
                    <span className="sonuc-label">Sifon Süresi</span>
                    <span className="sonuc-deger">~{sonuc.sifonSuresi} dk</span>
                  </div>
                  <div className="sonuc-kart">
                    <span className="sonuc-label">Yıllık Su</span>
                    <span className="sonuc-deger">{sonuc.yillikSu}L</span>
                  </div>
                </div>

                <div className="hesap-bilgi-kutu">
                  <h4>💰 Yıllık Su Maliyeti</h4>
                  <p className="buyuk-deger">~₺{sonuc.yillikMaliyet}</p>
                  <small>(Ortalama 15 TL/m³ su fiyatıyla)</small>
                </div>

                {sonuc.oneriler.length > 0 && (
                  <div className="hesap-uyarilar">
                    {sonuc.oneriler.map((o, i) => (
                      <div key={i} className={`uyari-item ${o.tip}`}>
                        {o.tip === 'uyari' && '⚠️'}
                        {o.tip === 'bilgi' && 'ℹ️'}
                        {o.mesaj}
                      </div>
                    ))}
                  </div>
                )}

                <div className="sifon-rehber">
                  <h4>🔧 Sifon Tekniği</h4>
                  <ol>
                    {sonuc.sifonTeknik.map((adim, i) => (
                      <li key={i}>{adim}</li>
                    ))}
                  </ol>
                </div>

                <div className="su-hazirlama">
                  <h4>🧪 Su Hazırlama</h4>
                  <ul>
                    <li><strong>Deklor:</strong> {sonuc.suHazirlama.deklor}</li>
                    <li><strong>Sıcaklık:</strong> {sonuc.suHazirlama.sicaklik}</li>
                    <li><strong>Bekleme:</strong> {sonuc.suHazirlama.bekleme}</li>
                    <li><strong>Alternatif:</strong> {sonuc.suHazirlama.alternatif}</li>
                  </ul>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* ==================== GÜBRE/DOZAJ ==================== */}
      {aktifHesap === 'gubre' && (
        <div className="hesap-panel">
          <h2>🧪 Gübre/Dozaj Hesaplama</h2>
          <p className="hesap-aciklama">Bitkili akvaryumunuz için gübre dozlarını hesaplayın</p>
          
          <div className="hesap-grid">
            <div className="hesap-girdi-grup">
              <label>Akvaryum Hacmi (Litre)</label>
              <input type="number" value={gubreLitre} onChange={(e) => setGubreLitre(Number(e.target.value))} min="10" />
            </div>
            <div className="hesap-girdi-grup">
              <label>Gübreleme Metodu</label>
              <select value={gubreMetod} onChange={(e) => setGubreMetod(e.target.value)}>
                <option value="ei">EI (Estimative Index)</option>
                <option value="pps">PPS-Pro</option>
              </select>
            </div>
            <div className="hesap-girdi-grup">
              <label>Bitki Yükü</label>
              <select value={gubreBitkiYuku} onChange={(e) => setGubreBitkiYuku(e.target.value)}>
                <option value="dusuk">🌿 Düşük</option>
                <option value="orta">🌱 Orta</option>
                <option value="yuksek">🌺 Yüksek</option>
              </select>
            </div>
            <div className="hesap-girdi-grup">
              <label>Işık Seviyesi</label>
              <select value={gubreIsik} onChange={(e) => setGubreIsik(e.target.value)}>
                <option value="dusuk">💡 Düşük</option>
                <option value="orta">💡💡 Orta</option>
                <option value="yuksek">💡💡💡 Yüksek</option>
              </select>
            </div>
          </div>

          {(() => {
            const sonuc = gubreHesapla();
            return (
              <>
                <div className="gubre-metod-bilgi">
                  <h4>📋 {gubreMetod === 'ei' ? 'EI (Estimative Index)' : 'PPS-Pro'} Metodu</h4>
                  <p>{gubreMetod === 'ei' 
                    ? 'Haftalık yoğun gübre + %50 su değişimi. Eksiklik riski yok.' 
                    : 'Günlük az miktar gübre. Ekonomik, az su değişimi.'}</p>
                </div>

                {gubreMetod === 'ei' ? (
                  <div className="gubre-dozlar">
                    <h4>📊 Haftalık Dozlar ({gubreLitre}L için)</h4>
                    <table>
                      <thead>
                        <tr>
                          <th>Gübre</th>
                          <th>Açıklama</th>
                          <th>Doz (her seferde)</th>
                          <th>Günler</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(sonuc.hesaplananDozlar).map(([key, val]) => (
                          <tr key={key}>
                            <td><strong>{key.toUpperCase()}</strong></td>
                            <td>{val.aciklama}</td>
                            <td>{val.hesaplanan} {val.birim}</td>
                            <td>{val.gun}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="gubre-dozlar">
                    <h4>📊 Günlük Dozlar ({gubreLitre}L için)</h4>
                    <div className="pps-dozlar">
                      <div className="pps-doz">
                        <span className="pps-isim">Makro</span>
                        <span className="pps-miktar">{sonuc.hesaplananDozlar.makro?.hesaplanan} ml/gün</span>
                      </div>
                      <div className="pps-doz">
                        <span className="pps-isim">Mikro</span>
                        <span className="pps-miktar">{sonuc.hesaplananDozlar.mikro?.hesaplanan} ml/gün</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="haftalik-program">
                  <h4>📅 Haftalık Program</h4>
                  <div className="program-grid">
                    {sonuc.haftalikProgram.map((p, i) => (
                      <div key={i} className={`program-gun ${p.tip}`}>
                        <span className="gun">{p.gun}</span>
                        <span className="islem">{p.islem}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="eksiklik-rehber">
                  <h4>🔍 Eksiklik Belirtileri</h4>
                  <table>
                    <thead>
                      <tr>
                        <th>Element</th>
                        <th>Belirti</th>
                        <th>Çözüm</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sonuc.eksiklikBelirtileri.map((e, i) => (
                        <tr key={i}>
                          <td><strong>{e.element}</strong></td>
                          <td>{e.belirti}</td>
                          <td>{e.cozum}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="hazir-gubreler">
                  <h4>🛒 Hazır Gübre Markaları</h4>
                  <table>
                    <thead>
                      <tr>
                        <th>Marka</th>
                        <th>Tip</th>
                        <th>Dozaj</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sonuc.hazirGubreler.map((g, i) => (
                        <tr key={i}>
                          <td><strong>{g.marka}</strong></td>
                          <td>{g.tip}</td>
                          <td>{g.dozaj}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* ==================== HACİM ==================== */}
      {aktifHesap === 'hacim' && (
        <div className="hesap-panel">
          <h2>🏠 Akvaryum Hacim Hesaplama</h2>
          <p className="hesap-aciklama">Akvaryumunuzun gerçek hacmini ve ağırlığını hesaplayın</p>
          
          <div className="hesap-grid">
            <div className="hesap-girdi-grup">
              <label>Akvaryum Tipi</label>
              <select value={hacimTip} onChange={(e) => setHacimTip(e.target.value)}>
                <option value="dikdortgen">📦 Dikdörtgen</option>
                <option value="kup">🧊 Küp</option>
                <option value="silindir">🥫 Silindir</option>
              </select>
            </div>
            
            {hacimTip === 'dikdortgen' && (
              <>
                <div className="hesap-girdi-grup">
                  <label>Uzunluk (cm)</label>
                  <input type="number" value={hacimUzunluk} onChange={(e) => setHacimUzunluk(Number(e.target.value))} />
                </div>
                <div className="hesap-girdi-grup">
                  <label>Genişlik (cm)</label>
                  <input type="number" value={hacimGenislik} onChange={(e) => setHacimGenislik(Number(e.target.value))} />
                </div>
              </>
            )}
            
            {hacimTip === 'kup' && (
              <div className="hesap-girdi-grup">
                <label>Kenar (cm)</label>
                <input type="number" value={hacimUzunluk} onChange={(e) => setHacimUzunluk(Number(e.target.value))} />
              </div>
            )}
            
            {hacimTip === 'silindir' && (
              <div className="hesap-girdi-grup">
                <label>Çap (cm)</label>
                <input type="number" value={hacimCap} onChange={(e) => setHacimCap(Number(e.target.value))} />
              </div>
            )}
            
            <div className="hesap-girdi-grup">
              <label>Yükseklik (cm)</label>
              <input type="number" value={hacimYukseklik} onChange={(e) => setHacimYukseklik(Number(e.target.value))} />
            </div>
            
            <div className="hesap-girdi-grup">
              <label>Kum Yüksekliği (cm)</label>
              <input type="number" value={hacimKumYukseklik} onChange={(e) => setHacimKumYukseklik(Number(e.target.value))} min="0" max="15" />
            </div>
            
            <div className="hesap-girdi-grup">
              <label>Taş/Dekor Oranı (%)</label>
              <input type="number" value={hacimTasOran} onChange={(e) => setHacimTasOran(Number(e.target.value))} min="0" max="40" />
            </div>
          </div>

          {(() => {
            const sonuc = hacimHesapla();
            return (
              <>
                <div className="hesap-sonuclar">
                  <div className="sonuc-kart">
                    <span className="sonuc-label">Brüt Hacim</span>
                    <span className="sonuc-deger">{sonuc.brutHacim}L</span>
                  </div>
                  <div className="sonuc-kart vurgulu">
                    <span className="sonuc-label">Net Hacim</span>
                    <span className="sonuc-deger">{sonuc.netHacim}L</span>
                  </div>
                  <div className="sonuc-kart">
                    <span className="sonuc-label">Kum Hacmi</span>
                    <span className="sonuc-deger">{sonuc.kumHacmi}L</span>
                  </div>
                  <div className="sonuc-kart">
                    <span className="sonuc-label">Taş Hacmi</span>
                    <span className="sonuc-deger">{sonuc.tasHacmi}L</span>
                  </div>
                </div>

                <div className="agirlik-bilgi">
                  <h4>⚖️ Ağırlık Hesabı</h4>
                  <div className="agirlik-grid">
                    <div className="agirlik-item">
                      <span>Boş Akvaryum (cam)</span>
                      <span>~{sonuc.bosAgirlik} kg</span>
                    </div>
                    <div className="agirlik-item">
                      <span>Su Dolu</span>
                      <span>~{sonuc.doluAgirlik} kg</span>
                    </div>
                    <div className="agirlik-item">
                      <span>Kum/Çakıl</span>
                      <span>~{sonuc.kumAgirlik} kg</span>
                    </div>
                    <div className="agirlik-item toplam">
                      <span>TOPLAM</span>
                      <span>~{sonuc.toplamAgirlik} kg</span>
                    </div>
                  </div>
                </div>

                {sonuc.zeminUyari && (
                  <div className="hesap-uyari zemin">{sonuc.zeminUyari}</div>
                )}

                <div className="hesap-bilgi-kutu">
                  <h4>🪟 Önerilen Cam Kalınlığı</h4>
                  <p className="buyuk-deger">{sonuc.camKalinligi}</p>
                </div>

                <div className="hesap-bilgi-kutu">
                  <h4>🪑 Stand/Sehpa Önerisi</h4>
                  <p>{sonuc.standOnerisi}</p>
                </div>

                <div className="hesap-bilgi-kutu">
                  <h4>📐 Cam Alanı</h4>
                  <p>{sonuc.camAlani} m²</p>
                </div>
              </>
            );
          })()}
        </div>
      )}

    </div>
  );
}

export default Hesaplamalar;