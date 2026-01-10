// BalikDoktoru.jsx - Part 1: Import, State, Sorular
import React, { useState } from 'react';
import './BalikDoktoru.css';
import { hastaliklar, kategoriler, tehlikeSeviyeleri } from './data/hastalikVeritabani';

// ==================== SORU SETLERI ====================
const genelSorular = [
  { id: 'tur', soru: 'Balığınızın türü nedir?', tip: 'text', placeholder: 'Örn: Lepistes, Beta, Melek...' },
  { id: 'suTipi', soru: 'Su tipi nedir?', tip: 'select', secenekler: ['Tatlı su', 'Tuzlu su', 'Acı su'] },
  { id: 'boyut', soru: 'Balığınız yaklaşık kaç cm?', tip: 'number', placeholder: 'cm' },
  { id: 'yas', soru: 'Balığınız yaklaşık kaç aylık?', tip: 'select', secenekler: ['0-3 ay (yavru)', '3-6 ay (genç)', '6-12 ay (yetişkin)', '12+ ay (olgun)'] },
  { id: 'cinsiyet', soru: 'Cinsiyeti nedir?', tip: 'select', secenekler: ['Erkek', 'Dişi', 'Bilmiyorum'] },
  { id: 'akvaryumHacmi', soru: 'Akvaryum hacmi kaç litre?', tip: 'number', placeholder: 'Litre' },
  { id: 'balikSayisi', soru: 'Akvaryumda kaç balık var?', tip: 'number', placeholder: 'Adet' }
];

const davranisSorulari = [
  { id: 'd1', soru: 'Balık normalden daha hareketsiz mi?', tip: 'evet-hayir', ilgiliHastaliklar: ['dropsy', 'ic_parazit', 'stres', 'amonyak', 'nitrit'] },
  { id: 'd2', soru: 'Sürekli saklanıyor mu?', tip: 'evet-hayir', ilgiliHastaliklar: ['stres', 'ic_parazit'] },
  { id: 'd3', soru: 'Camlara veya dekorlara sürtünüyor mu?', tip: 'evet-hayir', ilgiliHastaliklar: ['ich', 'velvet', 'deri_parazit', 'solungac_parazit'] },
  { id: 'd4', soru: 'Dibe çöküp duruyor mu?', tip: 'evet-hayir', ilgiliHastaliklar: ['ic_parazit', 'stres', 'kabizlik', 'amonyak'] },
  { id: 'd5', soru: 'Yüzmekte zorlanıyor mu?', tip: 'evet-hayir', ilgiliHastaliklar: ['kabizlik', 'dropsy', 'isi_sok'] },
  { id: 'd6', soru: 'Yan yatma veya ters durma var mı?', tip: 'evet-hayir', ilgiliHastaliklar: ['kabizlik', 'isi_sok', 'ph_sok'] },
  { id: 'd7', soru: 'Yeme ilgisi azaldı mı?', tip: 'evet-hayir', ilgiliHastaliklar: ['ich', 'velvet', 'stres', 'ic_parazit', 'dropsy', 'amonyak'] },
  { id: 'd8', soru: 'Yüzeyde nefes almaya mı çalışıyor?', tip: 'evet-hayir', ilgiliHastaliklar: ['amonyak', 'nitrit', 'oksijen', 'solungac_parazit'] },
  { id: 'd9', soru: 'Hızlı veya zorluklu nefes alıyor mu?', tip: 'evet-hayir', ilgiliHastaliklar: ['ich', 'velvet', 'solungac_parazit', 'amonyak', 'nitrit', 'oksijen'] }
];

const gorunumSorulari = [
  { id: 'g1', soru: 'Vücutta beyaz noktalar var mı? (tuz serpilmiş gibi)', tip: 'evet-hayir', ilgiliHastaliklar: ['ich'] },
  { id: 'g2', soru: 'Altın/sarı toz gibi bir kaplama var mı?', tip: 'evet-hayir', ilgiliHastaliklar: ['velvet'] },
  { id: 'g3', soru: 'Pamuksu beyaz oluşum var mı?', tip: 'evet-hayir', ilgiliHastaliklar: ['mantar', 'columnaris'] },
  { id: 'g4', soru: 'Pullar kabarık mı? (çam kozalağı gibi)', tip: 'evet-hayir', ilgiliHastaliklar: ['dropsy'] },
  { id: 'g5', soru: 'Vücutta kızarıklık veya yara var mı?', tip: 'evet-hayir', ilgiliHastaliklar: ['kizariklik', 'fin_rot', 'amonyak'] },
  { id: 'g6', soru: 'Renk solması var mı?', tip: 'evet-hayir', ilgiliHastaliklar: ['stres', 'nitrit', 'ic_parazit', 'isi_sok'] },
  { id: 'g7', soru: 'Yüzgeçler erimiş/yırtık görünüyor mu?', tip: 'evet-hayir', ilgiliHastaliklar: ['fin_rot', 'columnaris'] },
  { id: 'g8', soru: 'Göz şişmiş mi?', tip: 'evet-hayir', ilgiliHastaliklar: ['popeye'] },
  { id: 'g9', soru: 'Karın anormal şiş mi?', tip: 'evet-hayir', ilgiliHastaliklar: ['dropsy', 'kabizlik', 'ic_parazit'] },
  { id: 'g10', soru: 'Dışkı beyaz ve ip gibi mi?', tip: 'evet-hayir', ilgiliHastaliklar: ['ic_parazit'] },
  { id: 'g11', soru: 'Solungaçlar kırmızı/kahverengi mi?', tip: 'evet-hayir', ilgiliHastaliklar: ['amonyak', 'nitrit', 'solungac_parazit'] },
  { id: 'g12', soru: 'Ağız çevresinde beyazlık var mı?', tip: 'evet-hayir', ilgiliHastaliklar: ['columnaris'] },
  { id: 'g13', soru: 'Karnabahar gibi çıkıntılar var mı?', tip: 'evet-hayir', ilgiliHastaliklar: ['lymphocystis'] },
  { id: 'g14', soru: 'Aşırı mukus (kaygan görünüm) var mı?', tip: 'evet-hayir', ilgiliHastaliklar: ['deri_parazit', 'ph_sok'] }
];

const ortamSorulari = [
  { id: 'o1', soru: 'Son 1 haftada su değişimi yaptınız mı?', tip: 'evet-hayir', ilgiliHastaliklar: [] },
  { id: 'o2', soru: 'Yeni balık eklediniz mi (son 2 hafta)?', tip: 'evet-hayir', ilgiliHastaliklar: ['ich', 'velvet', 'ic_parazit'] },
  { id: 'o3', soru: 'Su testi yaptınız mı? Sonuçlar normal mi?', tip: 'select', secenekler: ['Test yapmadım', 'Normal', 'Amonyak yüksek', 'Nitrit yüksek', 'Nitrat yüksek', 'pH anormal'] },
  { id: 'o4', soru: 'Isıtıcı düzgün çalışıyor mu?', tip: 'select', secenekler: ['Evet', 'Hayır/Emin değilim', 'Isıtıcı yok'] },
  { id: 'o5', soru: 'Filtre düzgün çalışıyor mu?', tip: 'evet-hayir', ilgiliHastaliklar: [] },
  { id: 'o6', soru: 'Havalandırma (hava taşı) var mı?', tip: 'evet-hayir', ilgiliHastaliklar: ['oksijen'] }
];

// ==================== ANA KOMPONENT ====================
const BalikDoktoru = () => {
  // Wizard adımları
  const [adim, setAdim] = useState(0);
  
  // Form verileri
  const [genelBilgiler, setGenelBilgiler] = useState({});
  const [davranisCevaplar, setDavranisCevaplar] = useState({});
  const [gorunumCevaplar, setGorunumCevaplar] = useState({});
  const [ortamCevaplar, setOrtamCevaplar] = useState({});
  
  // Sonuçlar
  const [olasiHastaliklar, setOlasiHastaliklar] = useState([]);
  const [seciliHastalik, setSeciliHastalik] = useState(null);
  const [pipiMesaj, setPipiMesaj] = useState('');

  // Pipi'nin mesajları
  const pipiMesajlari = {
    giris: "Merhaba! Ben Dr. Pipi 🐟👨‍⚕️ Sanırım canlı dostunuzun bir problemi var! Muayene etmem için bazı sorular sormam gerekli. Hazırsanız başlayalım!",
    genel: "Önce hastamız hakkında biraz bilgi alalım. Bu bilgiler teşhis koymama yardımcı olacak!",
    davranis: "Şimdi balığınızın davranışlarını sorgulayalım. Bunlar çok önemli ipuçları içerir!",
    gorunum: "Harika! Şimdi fiziksel belirtilere bakalım. Balığınızı dikkatli inceleyin...",
    ortam: "Son olarak akvaryum ortamını değerlendirelim. Su kalitesi çok kritik!",
    analiz: "Hmm, verilerinizi analiz ediyorum... 🔬",
    sonuc: "Muayene tamamlandı! İşte bulgularım:",
    tedavi: "İşte önerdiğim tedavi planı:"
  };

  // Hastalık analizi yap
  const analizYap = () => {
    const puanlar = {};
    
    // Tüm hastalıklar için başlangıç puanı
    hastaliklar.forEach(h => {
      puanlar[h.id] = 0;
    });

    // Davranış cevaplarından puan hesapla
    Object.entries(davranisCevaplar).forEach(([soruId, cevap]) => {
      if (cevap === 'evet') {
        const soru = davranisSorulari.find(s => s.id === soruId);
        if (soru && soru.ilgiliHastaliklar) {
          soru.ilgiliHastaliklar.forEach(hId => {
            puanlar[hId] = (puanlar[hId] || 0) + 15;
          });
        }
      }
    });

    // Görünüm cevaplarından puan hesapla (daha ağırlıklı)
    Object.entries(gorunumCevaplar).forEach(([soruId, cevap]) => {
      if (cevap === 'evet') {
        const soru = gorunumSorulari.find(s => s.id === soruId);
        if (soru && soru.ilgiliHastaliklar) {
          soru.ilgiliHastaliklar.forEach(hId => {
            puanlar[hId] = (puanlar[hId] || 0) + 25;
          });
        }
      }
    });

    // Ortam cevaplarından puan hesapla
    if (ortamCevaplar.o2 === 'evet') {
      puanlar['ich'] += 20;
      puanlar['velvet'] += 20;
      puanlar['ic_parazit'] += 15;
    }
    if (ortamCevaplar.o3 === 'Amonyak yüksek') {
      puanlar['amonyak'] += 40;
    }
    if (ortamCevaplar.o3 === 'Nitrit yüksek') {
      puanlar['nitrit'] += 40;
    }
    if (ortamCevaplar.o6 === 'hayir') {
      puanlar['oksijen'] += 25;
    }

    // Sonuçları sırala ve filtrele
    const sonuclar = Object.entries(puanlar)
      .filter(([_, puan]) => puan > 20)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([id, puan]) => {
        const hastalik = hastaliklar.find(h => h.id === id);
        const maxPuan = 100;
        const yuzde = Math.min(Math.round((puan / maxPuan) * 100), 95);
        return { ...hastalik, puan, yuzde };
      });

    setOlasiHastaliklar(sonuclar);
    setPipiMesaj(sonuclar.length > 0 ? pipiMesajlari.sonuc : "Hmm, belirtiler net değil. Lütfen bir veterinere danışın.");
    setAdim(5);
  };

  // Sonraki adıma geç
  const sonrakiAdim = () => {
    if (adim === 4) {
      analizYap();
    } else {
      setAdim(adim + 1);
    }
  };

  // Önceki adıma dön
  const oncekiAdim = () => {
    if (adim > 0) setAdim(adim - 1);
  };

  // Yeniden başla
  const yenidenBasla = () => {
    setAdim(0);
    setGenelBilgiler({});
    setDavranisCevaplar({});
    setGorunumCevaplar({});
    setOrtamCevaplar({});
    setOlasiHastaliklar([]);
    setSeciliHastalik(null);
  };

  // Genel bilgi input değişimi
  const handleGenelChange = (id, value) => {
    setGenelBilgiler({ ...genelBilgiler, [id]: value });
  };

  // Evet/Hayır cevap değişimi
  const handleCevapChange = (tip, soruId, cevap) => {
    if (tip === 'davranis') {
      setDavranisCevaplar({ ...davranisCevaplar, [soruId]: cevap });
    } else if (tip === 'gorunum') {
      setGorunumCevaplar({ ...gorunumCevaplar, [soruId]: cevap });
    } else if (tip === 'ortam') {
      setOrtamCevaplar({ ...ortamCevaplar, [soruId]: cevap });
    }
  };

// Part 2'de devam ediyor - Render fonksiyonları
// BalikDoktoru.jsx - Part 2: Render Fonksiyonları ve JSX
// Part 1'in devamı - bu kodu Part 1'in altına yapıştır

  // ==================== RENDER FONKSİYONLARI ====================

  // Dr. Pipi karakteri
  const renderPipi = (mesaj) => (
    <div className="pipi-container">
      <div className="pipi-avatar">
        <div className="pipi-fish">🐟</div>
        <div className="pipi-accessories">
          <span className="pipi-glasses">👓</span>
          <span className="pipi-coat">🥼</span>
        </div>
      </div>
      <div className="pipi-speech">
        <div className="pipi-name">Dr. Pipi</div>
        <p>{mesaj}</p>
      </div>
    </div>
  );

  // Progress bar
  const renderProgress = () => (
    <div className="progress-container">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${(adim / 5) * 100}%` }}></div>
      </div>
      <div className="progress-steps">
        {['Başlangıç', 'Genel Bilgi', 'Davranış', 'Görünüm', 'Ortam', 'Sonuç'].map((label, i) => (
          <div key={i} className={`progress-step ${adim >= i ? 'active' : ''} ${adim === i ? 'current' : ''}`}>
            <div className="step-dot">{adim > i ? '✓' : i + 1}</div>
            <span className="step-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // Giriş ekranı
  const renderGiris = () => (
    <div className="wizard-step giris-step">
      {renderPipi(pipiMesajlari.giris)}
      <div className="giris-content">
        <div className="giris-icon">🏥</div>
        <h2>Balık Sağlık Merkezi</h2>
        <p>Balığınızın sağlık durumunu analiz edeceğim ve olası hastalıkları tespit etmeye çalışacağım.</p>
        <div className="giris-features">
          <div className="feature">
            <span>🔍</span>
            <span>20+ Hastalık Tanısı</span>
          </div>
          <div className="feature">
            <span>💊</span>
            <span>Tedavi Önerileri</span>
          </div>
          <div className="feature">
            <span>📚</span>
            <span>Detaylı Bilgi</span>
          </div>
        </div>
        <button className="btn-basla" onClick={sonrakiAdim}>
          🩺 Muayeneye Başla
        </button>
      </div>
    </div>
  );

  // Genel bilgi formu
  const renderGenelBilgi = () => (
    <div className="wizard-step">
      {renderPipi(pipiMesajlari.genel)}
      <div className="form-container">
        <h3>🐟 Balık Profili</h3>
        {genelSorular.map(soru => (
          <div key={soru.id} className="form-grup">
            <label>{soru.soru}</label>
            {soru.tip === 'text' && (
              <input
                type="text"
                placeholder={soru.placeholder}
                value={genelBilgiler[soru.id] || ''}
                onChange={(e) => handleGenelChange(soru.id, e.target.value)}
              />
            )}
            {soru.tip === 'number' && (
              <input
                type="number"
                placeholder={soru.placeholder}
                value={genelBilgiler[soru.id] || ''}
                onChange={(e) => handleGenelChange(soru.id, e.target.value)}
              />
            )}
            {soru.tip === 'select' && (
              <select
                value={genelBilgiler[soru.id] || ''}
                onChange={(e) => handleGenelChange(soru.id, e.target.value)}
              >
                <option value="">Seçiniz...</option>
                {soru.secenekler.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // Evet/Hayır soru listesi render
  const renderSoruListesi = (sorular, cevaplar, tip, baslik, mesaj) => (
    <div className="wizard-step">
      {renderPipi(mesaj)}
      <div className="sorular-container">
        <h3>{baslik}</h3>
        {sorular.map(soru => (
          <div key={soru.id} className="soru-satir">
            <span className="soru-text">{soru.soru}</span>
            <div className="cevap-butonlar">
              {soru.tip === 'evet-hayir' ? (
                <>
                  <button
                    className={`cevap-btn evet ${cevaplar[soru.id] === 'evet' ? 'secili' : ''}`}
                    onClick={() => handleCevapChange(tip, soru.id, 'evet')}
                  >
                    ✓ Evet
                  </button>
                  <button
                    className={`cevap-btn hayir ${cevaplar[soru.id] === 'hayir' ? 'secili' : ''}`}
                    onClick={() => handleCevapChange(tip, soru.id, 'hayir')}
                  >
                    ✗ Hayır
                  </button>
                </>
              ) : soru.tip === 'select' ? (
                <select
                  value={cevaplar[soru.id] || ''}
                  onChange={(e) => handleCevapChange(tip, soru.id, e.target.value)}
                  className="soru-select"
                >
                  <option value="">Seçiniz...</option>
                  {soru.secenekler.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Sonuç ekranı
  const renderSonuc = () => (
    <div className="wizard-step sonuc-step">
      {renderPipi(pipiMesaj)}
      
      {olasiHastaliklar.length > 0 ? (
        <div className="sonuc-container">
          <h3>🔬 Olası Teşhisler</h3>
          <div className="uyari-kutusu">
            <span>⚠️</span>
            <p>Bu kesin bir teşhis değildir! Lütfen ciddi durumlarda bir veterinere danışın.</p>
          </div>
          
          <div className="hastalik-listesi">
            {olasiHastaliklar.map((h, index) => (
              <div 
                key={h.id} 
                className={`hastalik-karti ${seciliHastalik?.id === h.id ? 'secili' : ''}`}
                onClick={() => setSeciliHastalik(h)}
              >
                <div className="hastalik-header">
                  <span className="hastalik-emoji">{h.emoji}</span>
                  <div className="hastalik-info">
                    <h4>{h.isim}</h4>
                    <span className="hastalik-latin">{h.latinIsim}</span>
                  </div>
                  <div className="hastalik-yuzde">
                    <div className="yuzde-bar">
                      <div 
                        className="yuzde-fill" 
                        style={{ 
                          width: `${h.yuzde}%`,
                          backgroundColor: tehlikeSeviyeleri[h.tehlikeSeviyesi].renk 
                        }}
                      ></div>
                    </div>
                    <span className="yuzde-text">%{h.yuzde}</span>
                  </div>
                </div>
                <div className="hastalik-meta">
                  <span className="kategori-badge" style={{ backgroundColor: kategoriler[h.kategori].renk }}>
                    {kategoriler[h.kategori].emoji} {kategoriler[h.kategori].isim}
                  </span>
                  <span className="tehlike-badge" style={{ backgroundColor: tehlikeSeviyeleri[h.tehlikeSeviyesi].renk }}>
                    {tehlikeSeviyeleri[h.tehlikeSeviyesi].emoji} {tehlikeSeviyeleri[h.tehlikeSeviyesi].isim}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Seçili hastalık detayı */}
          {seciliHastalik && (
            <div className="hastalik-detay">
              <div className="detay-header">
                <span className="detay-emoji">{seciliHastalik.emoji}</span>
                <div>
                  <h3>{seciliHastalik.isim}</h3>
                  <p className="detay-latin">{seciliHastalik.latinIsim}</p>
                </div>
              </div>

              <div className="detay-section">
                <h4>🔬 Hastalık Nedir?</h4>
                <p>{seciliHastalik.nedenOlusur}</p>
              </div>

              <div className="detay-section">
                <h4>📋 Belirtiler</h4>
                <ul>
                  {seciliHastalik.belirtiler.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>

              <div className="detay-section ayirt-edici">
                <h4>🎯 Ayırt Edici Özellik</h4>
                <p>{seciliHastalik.ayirtEdici}</p>
              </div>

              <div className="detay-section tedavi-section">
                <h4>💊 Önerilen Tedavi</h4>
                <div className="tedavi-uyari">
                  <span>⚠️</span>
                  <p>Unutmayın, bu kesin bir teşhis değildir fakat ihtimali yüksektir!</p>
                </div>
                <ol className="tedavi-adimlari">
                  {seciliHastalik.tedavi.adimlar.map((adim, i) => (
                    <li key={i}>{adim}</li>
                  ))}
                </ol>
                <div className="ilaclar">
                  <strong>💉 Önerilen İlaçlar:</strong>
                  <div className="ilac-listesi">
                    {seciliHastalik.tedavi.ilaclar.map((ilac, i) => (
                      <span key={i} className="ilac-badge">{ilac}</span>
                    ))}
                  </div>
                </div>
                <div className="tedavi-sure">
                  <strong>⏱️ Tedavi Süresi:</strong> {seciliHastalik.tedavi.sure}
                </div>
                {seciliHastalik.tedavi.pipiNot && (
                  <div className="pipi-not">
                    <span>💡</span>
                    <p><strong>Dr. Pipi'nin Notu:</strong> {seciliHastalik.tedavi.pipiNot}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <button className="btn-yeniden" onClick={yenidenBasla}>
            🔄 Yeni Muayene Başlat
          </button>
        </div>
      ) : (
        <div className="sonuc-bos">
          <div className="bos-icon">🤔</div>
          <h3>Net Bir Teşhis Koyamadım</h3>
          <p>Verdiğiniz bilgilerle kesin bir hastalık tespit edemedim. Bu şu anlama gelebilir:</p>
          <ul>
            <li>Balığınız sağlıklı olabilir</li>
            <li>Belirtiler henüz belirgin değil</li>
            <li>Nadir görülen bir durum olabilir</li>
          </ul>
          <p>Şikayetler devam ederse lütfen bir veterinere danışın.</p>
          <button className="btn-yeniden" onClick={yenidenBasla}>
            🔄 Tekrar Dene
          </button>
        </div>
      )}
    </div>
  );

  // ==================== ANA RENDER ====================
  return (
    <div className="balik-doktoru-sayfa">
      <div className="doktor-header">
        <h1>🏥 Balık Doktoru</h1>
        <p>Yapay Zeka Destekli Hastalık Tanı Sistemi</p>
      </div>

      {adim > 0 && adim < 5 && renderProgress()}

      <div className="wizard-container">
        {adim === 0 && renderGiris()}
        {adim === 1 && renderGenelBilgi()}
        {adim === 2 && renderSoruListesi(davranisSorulari, davranisCevaplar, 'davranis', '🧠 Davranış Belirtileri', pipiMesajlari.davranis)}
        {adim === 3 && renderSoruListesi(gorunumSorulari, gorunumCevaplar, 'gorunum', '👁️ Fiziksel Belirtiler', pipiMesajlari.gorunum)}
        {adim === 4 && renderSoruListesi(ortamSorulari, ortamCevaplar, 'ortam', '🌡️ Akvaryum Ortamı', pipiMesajlari.ortam)}
        {adim === 5 && renderSonuc()}
      </div>

      {/* Navigasyon butonları */}
      {adim > 0 && adim < 5 && (
        <div className="wizard-nav">
          <button className="btn-geri" onClick={oncekiAdim}>
            ← Geri
          </button>
          <button className="btn-ileri" onClick={sonrakiAdim}>
            {adim === 4 ? '🔬 Analiz Et' : 'İleri →'}
          </button>
        </div>
      )}
    </div>
  );
};

export default BalikDoktoru;