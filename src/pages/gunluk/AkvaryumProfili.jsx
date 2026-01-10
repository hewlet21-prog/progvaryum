import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAkvaryumStorage, akvaryumDegistir } from '../../hooks/useAkvaryumStorage';
import AquariumVideoCanvas from '../../components/AquariumVideoCanvas';
import './AkvaryumProfili.css';

// NOT: Bu dosya src/pages/gunluk/AkvaryumProfili.jsx konumunda olmalı

export default function AkvaryumProfili() {
  const navigate = useNavigate();
  const [akvaryumlar, setAkvaryumlar] = useState([]);
  const [aktifTank, setAktifTank] = useState(null);
  const [aktifTankId, setAktifTankId] = useState(null);
  
  // Profil değiştirme loading state
  const [profilDegistiriliyor, setProfilDegistiriliyor] = useState(false);

  // Günlük veriler - Akvaryuma özel hook kullanıyoruz
  const [balikEnvanteri] = useAkvaryumStorage("balikEnvanteri", []);
  const [testler] = useAkvaryumStorage("testKiti", []);
  const [gozlemler] = useAkvaryumStorage("gozlemler", []);
  const [ilacTedavi] = useAkvaryumStorage("ilacTedavi", []);
  const [sonYemleme] = useAkvaryumStorage("sonYemleme", null);
  const [waterCounter] = useAkvaryumStorage("waterCounter", 0);
  const [filterCounter] = useAkvaryumStorage("filterCounter", 0);

  useEffect(() => {
    // LocalStorage'dan tüm akvaryumları yükle
    const kayitliAkvaryumlar = JSON.parse(localStorage.getItem('akvaryumlar') || '[]');
    const aktifId = localStorage.getItem('aktifAkvaryumId');
    
    setAkvaryumlar(kayitliAkvaryumlar);
    
    if (aktifId && kayitliAkvaryumlar.length > 0) {
      const aktif = kayitliAkvaryumlar.find(a => a.id === aktifId);
      if (aktif) {
        setAktifTank(aktif);
        setAktifTankId(aktifId);
      } else {
        setAktifTank(kayitliAkvaryumlar[0]);
        setAktifTankId(kayitliAkvaryumlar[0].id);
      }
    } else if (kayitliAkvaryumlar.length > 0) {
      setAktifTank(kayitliAkvaryumlar[0]);
      setAktifTankId(kayitliAkvaryumlar[0].id);
    }
  }, []);

  const tankSecimDegistir = (tankId) => {
    // Aynı tank seçiliyse bir şey yapma
    if (tankId === aktifTankId) return;
    
    const secilen = akvaryumlar.find(a => a.id === tankId);
    if (secilen) {
      // Loading başlat
      setProfilDegistiriliyor(true);
      
      // 2 saniye bekle (geçiş animasyonu için)
      setTimeout(() => {
        setAktifTank(secilen);
        setAktifTankId(tankId);
        
        // Global akvaryum değiştir - tüm componentlere haber ver
        akvaryumDegistir(tankId);
        
        // Loading bitir
        setProfilDegistiriliyor(false);
      }, 2000);
    }
  };

  const formatTarih = (tarihStr) => {
    if (!tarihStr) return 'Belirtilmedi';
    const tarih = new Date(tarihStr);
    return tarih.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const gunGecti = (tarihStr) => {
    if (!tarihStr) return null;
    const tarih = new Date(tarihStr);
    const bugun = new Date();
    const fark = Math.floor((bugun - tarih) / (1000 * 60 * 60 * 24));
    return fark;
  };

  // Kaç gün önce kuruldu
  const kurulumGunu = () => {
    if (!aktifTank?.olusturmaTarihi) return null;
    const tarih = new Date(aktifTank.olusturmaTarihi);
    const bugun = new Date();
    const fark = Math.floor((bugun - tarih) / (1000 * 60 * 60 * 24));
    return fark;
  };

  // Boş durum - Akvaryum yok
  if (akvaryumlar.length === 0) {
    return (
      <div className="akvaryum-profili">
        <div className="profil-bos">
          <div className="bos-icerik">
            <span className="bos-emoji">🐠</span>
            <h2>Henüz Akvaryum Eklenmemiş</h2>
            <p>Kurulum sihirbazını kullanarak ilk akvaryumunuzu ekleyin</p>
            <button className="btn-kurulum" onClick={() => navigate('/kurulum')}>
              🧙 Kurulum Sihirbazını Başlat
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!aktifTank) return <div className="yukleniyor">Yükleniyor...</div>;

  // Profil değiştirme loading ekranı
  if (profilDegistiriliyor) {
    return (
      <div className="profil-degistirme-overlay">
        <div className="degistirme-icerik">
          <div className="degistirme-animasyon">
            <div className="dalga dalga-1"></div>
            <div className="dalga dalga-2"></div>
            <div className="dalga dalga-3"></div>
            <span className="degistirme-icon">🐠</span>
          </div>
          <h2>Profil Değiştiriliyor</h2>
          <p>Akvaryum verileri yükleniyor...</p>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  const toplamBalik = aktifTank.seciliBaliklar?.reduce((t, b) => t + b.adet, 0) || 0;
  const maksBalik = Math.floor(aktifTank.netLitre / 5);
  const kapasiteYuzdesi = maksBalik > 0 ? Math.round((toplamBalik / maksBalik) * 100) : 0;

  // Son test verisi
  const sonTest = testler.length > 0 ? testler[0] : null;

  // Aktif tedavi kontrolü
  const aktifTedaviVar = ilacTedavi.some(t => t.aktif);

  // Hasta balık sayısı (envanterdeki)
  const hastaBalikSayisi = balikEnvanteri.reduce((toplam, b) => 
    toplam + parseInt(b.hasta || 0), 0
  );

  // AquariumVideoCanvas için veri hazırlama
  const akvaryumBilgiForCanvas = {
    hacim: aktifTank.netLitre || 100,
    boy: aktifTank.uzunluk || 80,
    en: aktifTank.genislik || 30,
    yukseklik: aktifTank.yukseklik || 40,
    bitkili: aktifTank.bitkiVar || false
  };

  return (
    <div className="akvaryum-profili">
      {/* Tank Seçici */}
      {akvaryumlar.length > 0 && (
        <div className="tank-secici">
          <div className="tank-tabs">
            {akvaryumlar.map(tank => (
              <button
                key={tank.id}
                className={`tank-tab ${aktifTankId === tank.id ? 'aktif' : ''}`}
                onClick={() => tankSecimDegistir(tank.id)}
              >
                <span className="tab-emoji">🐠</span>
                <span className="tab-isim">{tank.akvaryumAdi || 'Akvaryum'}</span>
                <span className="tab-litre">{tank.netLitre}L</span>
              </button>
            ))}
            <button className="tank-tab ekle" onClick={() => navigate('/kurulum')}>
              <span className="tab-emoji">➕</span>
              <span className="tab-isim">Yeni Ekle</span>
            </button>
          </div>
        </div>
      )}

      {/* ========== YENİ: AKVARYUM GÖRSELİ/VİDEOSU ========== */}
      <div className="profil-akvaryum-gorsel">
        <AquariumVideoCanvas
          akvaryumBilgi={akvaryumBilgiForCanvas}
          balikEnvanteri={[
            // Kurulum sihirbazından seçilen balıklar
            ...(aktifTank.seciliBaliklar?.map(b => ({
              tur: b.ad,
              adet: b.adet,
              emoji: b.emoji
            })) || []),
            // Canlı envanterinden eklenen balıklar
            ...balikEnvanteri
          ]}
          toplamBalik={toplamBalik}
          litreBasinaBalik={toplamBalik > 0 ? (aktifTank.netLitre / toplamBalik).toFixed(1) : 0}
          yemZamani={false}
          kapasite={toplamBalik > maksBalik}
          nitratYuksek={sonTest?.no3 && parseFloat(sonTest.no3) > 40}
        />
        
        {/* Görsel üstünde bilgi overlay */}
        <div className="gorsel-overlay">
          <div className="overlay-sol">
            <h2>{aktifTank.akvaryumAdi || 'Akvaryumum'}</h2>
            <span className="overlay-badge">
              {aktifTank.suTuru === 'tatli' ? '💧 Tatlı Su' : '🌊 Tuzlu Su'}
            </span>
          </div>
          <div className="overlay-sag">
            <div className="overlay-stat">
              <span className="overlay-deger">{aktifTank.netLitre}</span>
              <span className="overlay-etiket">Litre</span>
            </div>
            <div className="overlay-stat">
              <span className="overlay-deger">{toplamBalik}</span>
              <span className="overlay-etiket">Balık</span>
            </div>
            {kurulumGunu() !== null && (
              <div className="overlay-stat">
                <span className="overlay-deger">{kurulumGunu()}</span>
                <span className="overlay-etiket">Gün</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ana Başlık Kartı */}
      <div className="profil-header-kart">
        <div className="header-sol">
          <div className="tank-avatar">🐠</div>
          <div className="tank-bilgileri">
            <h1>{aktifTank.akvaryumAdi || 'Akvaryumum'}</h1>
            <div className="tank-badges">
              <span className="badge su-turu">
                {aktifTank.suTuru === 'tatli' ? '💧 Tatlı Su' : '🌊 Tuzlu Su'}
              </span>
              <span className="badge tank-tipi">{aktifTank.akvaryumTipi}</span>
              <span className={`badge seviye ${aktifTank.kurulumSeviyesi}`}>
                {aktifTank.kurulumSeviyesi === 'low' ? '🟢 Low Tech' :
                 aktifTank.kurulumSeviyesi === 'mid' ? '🟡 Mid Tech' : '🔴 High Tech'}
              </span>
            </div>
          </div>
        </div>
        <div className="header-sag">
          <div className="litre-gosterge">
            <span className="litre-deger">{aktifTank.netLitre}</span>
            <span className="litre-birim">Litre</span>
          </div>
          {aktifTank.riskSkoru !== undefined && (
            <div className={`risk-badge ${aktifTank.riskSkoru < 30 ? 'dusuk' : aktifTank.riskSkoru < 60 ? 'orta' : 'yuksek'}`}>
              Risk: {aktifTank.riskSkoru}
            </div>
          )}
        </div>
      </div>

      {/* ========== YENİ: DETAYLI ÖZET KART ========== */}
      <div className="profil-detay-ozet">
        <div className="detay-grid">
          {/* Boyutlar */}
          <div className="detay-item">
            <span className="detay-icon">📐</span>
            <div className="detay-bilgi">
              <span className="detay-baslik">Boyutlar</span>
              <span className="detay-deger">{aktifTank.uzunluk || '-'} × {aktifTank.genislik || '-'} × {aktifTank.yukseklik || '-'} cm</span>
            </div>
          </div>

          {/* Net Litre */}
          <div className="detay-item">
            <span className="detay-icon">💧</span>
            <div className="detay-bilgi">
              <span className="detay-baslik">Net Hacim</span>
              <span className="detay-deger">{aktifTank.netLitre || 0} Litre</span>
            </div>
          </div>

          {/* Balık Kapasitesi */}
          <div className="detay-item">
            <span className="detay-icon">🐟</span>
            <div className="detay-bilgi">
              <span className="detay-baslik">Kapasite</span>
              <span className={`detay-deger ${toplamBalik > maksBalik ? 'uyari' : ''}`}>
                {toplamBalik} / {maksBalik} balık ({kapasiteYuzdesi}%)
              </span>
            </div>
          </div>

          {/* pH */}
          <div className="detay-item">
            <span className="detay-icon">📊</span>
            <div className="detay-bilgi">
              <span className="detay-baslik">pH Değeri</span>
              <span className="detay-deger">{aktifTank.ph || sonTest?.ph || '-'}</span>
            </div>
          </div>

          {/* Sıcaklık */}
          <div className="detay-item">
            <span className="detay-icon">🌡️</span>
            <div className="detay-bilgi">
              <span className="detay-baslik">Sıcaklık</span>
              <span className="detay-deger">{aktifTank.sicaklik || sonTest?.sicaklik || '-'}°C</span>
            </div>
          </div>

          {/* Sağlık Durumu */}
          <div className="detay-item">
            <span className="detay-icon">🏥</span>
            <div className="detay-bilgi">
              <span className="detay-baslik">Sağlık</span>
              <span className={`detay-deger ${aktifTank.hastaBalikVar || hastaBalikSayisi > 0 ? 'hasta' : 'saglikli'}`}>
                {aktifTank.hastaBalikVar || hastaBalikSayisi > 0 
                  ? `⚠️ ${hastaBalikSayisi || 1} Hasta Balık` 
                  : '✅ Sağlıklı'}
              </span>
            </div>
          </div>

          {/* Kurulum Tarihi */}
          <div className="detay-item">
            <span className="detay-icon">📅</span>
            <div className="detay-bilgi">
              <span className="detay-baslik">Kurulum</span>
              <span className="detay-deger">{formatTarih(aktifTank.olusturmaTarihi)}</span>
            </div>
          </div>

          {/* Tank Yaşı */}
          <div className="detay-item">
            <span className="detay-icon">⏰</span>
            <div className="detay-bilgi">
              <span className="detay-baslik">Tank Yaşı</span>
              <span className="detay-deger">{kurulumGunu() !== null ? `${kurulumGunu()} Gün` : '-'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* İstatistik Satırı */}
      <div className="profil-stats">
        <div className="stat-item">
          <span className="stat-icon">🐟</span>
          <div className="stat-bilgi">
            <span className="stat-deger">{toplamBalik}</span>
            <span className="stat-label">Balık</span>
          </div>
          <span className={`kapasite ${toplamBalik > maksBalik ? 'asim' : ''}`}>
            / {maksBalik} maks
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🌿</span>
          <div className="stat-bilgi">
            <span className="stat-deger">
              {aktifTank.bitkiVar ? (
                aktifTank.bitkiYogunlugu === 'low' ? 'Düşük' :
                aktifTank.bitkiYogunlugu === 'mid' ? 'Orta' : 'Yoğun'
              ) : 'Yok'}
            </span>
            <span className="stat-label">Bitki</span>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🌡️</span>
          <div className="stat-bilgi">
            <span className="stat-deger">{aktifTank.sicaklik || '-'}°C</span>
            <span className="stat-label">Sıcaklık</span>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-icon">📊</span>
          <div className="stat-bilgi">
            <span className="stat-deger">{aktifTank.ph || '-'}</span>
            <span className="stat-label">pH</span>
          </div>
        </div>
        {aktifTank.omurgasizVar && (
          <div className="stat-item">
            <span className="stat-icon">{aktifTank.omurgasizTur === 'karides' ? '🦐' : '🐌'}</span>
            <div className="stat-bilgi">
              <span className="stat-deger">Var</span>
              <span className="stat-label">{aktifTank.omurgasizTur === 'karides' ? 'Karides' : 'Salyangoz'}</span>
            </div>
          </div>
        )}
      </div>

      {/* ========== CANLI POPÜLASYONU - PROFESYONEL TASARIM ========== */}
      {(aktifTank.seciliBaliklar?.length > 0 || aktifTank.seciliBitkiler?.length > 0 || aktifTank.omurgasizVar) && (
        <div className="canli-populasyon-kart pro">
          <div className="populasyon-header">
            <div className="populasyon-header-sol">
              <h3>🐠 Canlı Popülasyonu</h3>
              <p className="populasyon-aciklama">Akvaryumunuzdaki tüm canlılar</p>
            </div>
            <div className="populasyon-header-sag">
              <div className="populasyon-stat">
                <span className="stat-sayi">{toplamBalik}</span>
                <span className="stat-etiket">Balık</span>
              </div>
              <div className="populasyon-stat">
                <span className="stat-sayi">{aktifTank.seciliBitkiler?.length || 0}</span>
                <span className="stat-etiket">Bitki Türü</span>
              </div>
              <div className="populasyon-stat">
                <span className="stat-sayi">{aktifTank.seciliBaliklar?.length || 0}</span>
                <span className="stat-etiket">Balık Türü</span>
              </div>
            </div>
          </div>
          
          {/* Balıklar - Detaylı Kart Görünümü */}
          {aktifTank.seciliBaliklar?.length > 0 && (
            <div className="populasyon-bolum">
              <div className="bolum-baslik">
                <h4>🐟 Balıklar</h4>
                <span className="bolum-badge">{aktifTank.seciliBaliklar.length} tür</span>
              </div>
              <div className="canli-grid pro">
                {aktifTank.seciliBaliklar.map((balik, idx) => (
                  <div key={balik.id || idx} className="canli-kart balik">
                    <div className="canli-kart-ust">
                      <span className="canli-emoji-buyuk">{balik.emoji || '🐠'}</span>
                      <div className="canli-adet-badge">{balik.adet}×</div>
                    </div>
                    <div className="canli-kart-alt">
                      <span className="canli-ad">{balik.ad}</span>
                      <span className="canli-kategori">{balik.kategori || 'Balık'}</span>
                      <div className="canli-oran-bar">
                        <div 
                          className="canli-oran-dolum" 
                          style={{ width: `${Math.min((balik.adet / toplamBalik) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <span className="canli-yuzde">%{Math.round((balik.adet / toplamBalik) * 100)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bitkiler - Tag Cloud Görünümü */}
          {aktifTank.seciliBitkiler?.length > 0 && (
            <div className="populasyon-bolum">
              <div className="bolum-baslik">
                <h4>🌿 Bitkiler</h4>
                <span className="bolum-badge">{aktifTank.seciliBitkiler.length} tür</span>
              </div>
              <div className="bitki-cloud">
                {aktifTank.seciliBitkiler.map((bitki, idx) => (
                  <div key={idx} className="bitki-kart">
                    <span className="bitki-icon">🌱</span>
                    <span className="bitki-ad">{bitki}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Omurgasızlar */}
          {aktifTank.omurgasizVar && (
            <div className="populasyon-bolum">
              <div className="bolum-baslik">
                <h4>{aktifTank.omurgasizTur === 'karides' ? '🦐 Karides' : '🐌 Salyangoz'}</h4>
                <span className="bolum-badge aktif">Aktif</span>
              </div>
              <div className="omurgasiz-kart">
                <span className="omurgasiz-emoji">{aktifTank.omurgasizTur === 'karides' ? '🦐' : '🐌'}</span>
                <div className="omurgasiz-bilgi">
                  <span className="omurgasiz-ad">{aktifTank.omurgasizTur === 'karides' ? 'Karides Kolonisi' : 'Salyangoz Grubu'}</span>
                  <span className="omurgasiz-aciklama">Temizlik ekibi olarak çalışıyor</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* İçerik Grid - PROFESYONEL TASARIM */}
      <div className="profil-grid-pro">
        {/* Ekipmanlar */}
        <div className="profil-kart-pro">
          <div className="kart-header-pro">
            <div className="header-sol">
              <span className="kart-icon-pro">🔧</span>
              <h3>Ekipmanlar</h3>
            </div>
            <span className="kart-badge">{[aktifTank.filtreVar, aktifTank.isiticiVar, aktifTank.ledVar, aktifTank.havaMotoru, aktifTank.co2Sistemi].filter(Boolean).length} Aktif</span>
          </div>
          <div className="kart-icerik-pro">
            <div className="ekipman-grid">
              {aktifTank.filtreVar && (
                <div className="ekipman-kart">
                  <div className="ekipman-kart-icon">🔄</div>
                  <div className="ekipman-kart-bilgi">
                    <span className="ekipman-baslik">Filtre</span>
                    <span className="ekipman-detay">
                      {aktifTank.filtreTipi || 'Dış Filtre'} • {aktifTank.filtreDebi || '?'} L/h
                    </span>
                    {aktifTank.filtreMarka && (
                      <span className="ekipman-marka">{aktifTank.filtreMarka}</span>
                    )}
                  </div>
                  <div className="ekipman-durum aktif">Aktif</div>
                </div>
              )}

              {aktifTank.isiticiVar && (
                <div className="ekipman-kart">
                  <div className="ekipman-kart-icon">🔥</div>
                  <div className="ekipman-kart-bilgi">
                    <span className="ekipman-baslik">Isıtıcı</span>
                    <span className="ekipman-detay">
                      {aktifTank.isiticiWatt || '?'}W • Hedef {aktifTank.hedefSicaklik || 25}°C
                    </span>
                    {aktifTank.isiticiMarka && (
                      <span className="ekipman-marka">{aktifTank.isiticiMarka}</span>
                    )}
                  </div>
                  <div className="ekipman-durum aktif">Aktif</div>
                </div>
              )}

              {aktifTank.ledVar && (
                <div className="ekipman-kart">
                  <div className="ekipman-kart-icon">💡</div>
                  <div className="ekipman-kart-bilgi">
                    <span className="ekipman-baslik">LED Aydınlatma</span>
                    <span className="ekipman-detay">
                      {aktifTank.ledWatt || '?'}W • {aktifTank.ledSaat || 8} saat/gün
                    </span>
                    {aktifTank.ledMarka && (
                      <span className="ekipman-marka">{aktifTank.ledMarka}</span>
                    )}
                  </div>
                  <div className="ekipman-durum aktif">Aktif</div>
                </div>
              )}

              {aktifTank.havaMotoru && (
                <div className="ekipman-kart">
                  <div className="ekipman-kart-icon">💨</div>
                  <div className="ekipman-kart-bilgi">
                    <span className="ekipman-baslik">Hava Motoru</span>
                    <span className="ekipman-detay">Oksijen takviyesi</span>
                  </div>
                  <div className="ekipman-durum aktif">Aktif</div>
                </div>
              )}

              {aktifTank.co2Sistemi && (
                <div className="ekipman-kart">
                  <div className="ekipman-kart-icon">🫧</div>
                  <div className="ekipman-kart-bilgi">
                    <span className="ekipman-baslik">CO₂ Sistemi</span>
                    <span className="ekipman-detay">{aktifTank.co2Tipi || 'Basınçlı'}</span>
                  </div>
                  <div className="ekipman-durum aktif">Aktif</div>
                </div>
              )}

              {!aktifTank.filtreVar && !aktifTank.isiticiVar && !aktifTank.ledVar && (
                <div className="ekipman-bos">
                  <span>⚙️</span>
                  <p>Ekipman bilgisi girilmemiş</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Su Parametreleri */}
        <div className="profil-kart-pro">
          <div className="kart-header-pro">
            <div className="header-sol">
              <span className="kart-icon-pro">🧪</span>
              <h3>Su Parametreleri</h3>
            </div>
            {sonTest && <span className="kart-tarih">Son: {formatTarih(sonTest.tarih)}</span>}
          </div>
          <div className="kart-icerik-pro">
            <div className="parametre-grid-pro">
              <div className="param-kart">
                <div className="param-ust">
                  <span className="param-icon-pro">🌡️</span>
                  <span className="param-label-pro">Sıcaklık</span>
                </div>
                <span className="param-deger-pro">{aktifTank.sicaklik || sonTest?.sicaklik || '-'}°C</span>
              </div>
              
              <div className="param-kart">
                <div className="param-ust">
                  <span className="param-icon-pro">📊</span>
                  <span className="param-label-pro">pH</span>
                </div>
                <span className="param-deger-pro">{aktifTank.ph || sonTest?.ph || '-'}</span>
              </div>
              
              <div className="param-kart">
                <div className="param-ust">
                  <span className="param-icon-pro">💧</span>
                  <span className="param-label-pro">GH</span>
                </div>
                <span className="param-deger-pro">{aktifTank.gh || sonTest?.gh || '-'}</span>
              </div>
              
              <div className="param-kart">
                <div className="param-ust">
                  <span className="param-icon-pro">🪨</span>
                  <span className="param-label-pro">KH</span>
                </div>
                <span className="param-deger-pro">{aktifTank.kh || sonTest?.kh || '-'}</span>
              </div>
              
              <div className={`param-kart ${sonTest?.nh3 > 0.5 ? 'tehlike' : ''}`}>
                <div className="param-ust">
                  <span className="param-icon-pro">☠️</span>
                  <span className="param-label-pro">NH₃</span>
                </div>
                <span className="param-deger-pro">{aktifTank.amonyak || sonTest?.nh3 || '-'}</span>
              </div>
              
              <div className={`param-kart ${sonTest?.no2 > 0.5 ? 'tehlike' : ''}`}>
                <div className="param-ust">
                  <span className="param-icon-pro">⚠️</span>
                  <span className="param-label-pro">NO₂</span>
                </div>
                <span className="param-deger-pro">{aktifTank.nitrit || sonTest?.no2 || '-'}</span>
              </div>
              
              <div className={`param-kart ${sonTest?.no3 > 40 ? 'uyari' : ''}`}>
                <div className="param-ust">
                  <span className="param-icon-pro">🟢</span>
                  <span className="param-label-pro">NO₃</span>
                </div>
                <span className="param-deger-pro">{aktifTank.nitrat || sonTest?.no3 || '-'}</span>
              </div>
              
              <div className="param-kart">
                <div className="param-ust">
                  <span className="param-icon-pro">🚰</span>
                  <span className="param-label-pro">Kaynak</span>
                </div>
                <span className="param-deger-pro kaynak">{aktifTank.suKaynagi === 'musluk' ? 'Musluk' : 'RO'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bakım Takvimi */}
        <div className="profil-kart-pro">
          <div className="kart-header-pro">
            <div className="header-sol">
              <span className="kart-icon-pro">📅</span>
              <h3>Bakım Takvimi</h3>
            </div>
          </div>
          <div className="kart-icerik-pro">
            <div className="bakim-grid-pro">
              {/* Su Değişimi */}
              <div className="bakim-kart">
                <div className="bakim-kart-icon su">💧</div>
                <div className="bakim-kart-bilgi">
                  <span className="bakim-kart-baslik">Su Değişimi</span>
                  <span className="bakim-kart-tarih">
                    {aktifTank.sonSuDegisimi ? (
                      <>
                        {formatTarih(aktifTank.sonSuDegisimi)}
                        <span className={`gun-badge-pro ${gunGecti(aktifTank.sonSuDegisimi) > 7 ? 'gecikti' : 'tamam'}`}>
                          {gunGecti(aktifTank.sonSuDegisimi)} gün önce
                        </span>
                      </>
                    ) : waterCounter > 0 ? (
                      <span className={`gun-badge-pro ${waterCounter > 7 ? 'gecikti' : 'tamam'}`}>
                        {waterCounter} gün önce
                      </span>
                    ) : 'Belirtilmedi'}
                  </span>
                </div>
              </div>

              {/* Yemleme */}
              <div className="bakim-kart">
                <div className="bakim-kart-icon yem">🍽️</div>
                <div className="bakim-kart-bilgi">
                  <span className="bakim-kart-baslik">Yemleme</span>
                  <span className="bakim-kart-tarih">
                    {aktifTank.sonYemlemeTarihi ? (
                      <>
                        {formatTarih(aktifTank.sonYemlemeTarihi)}
                        <span className={`gun-badge-pro ${gunGecti(aktifTank.sonYemlemeTarihi) > 1 ? 'gecikti' : 'tamam'}`}>
                          {gunGecti(aktifTank.sonYemlemeTarihi)} gün önce
                        </span>
                      </>
                    ) : sonYemleme ? new Date(sonYemleme).toLocaleDateString('tr-TR') : 'Belirtilmedi'}
                  </span>
                </div>
              </div>

              {/* Filtre Temizliği */}
              <div className="bakim-kart">
                <div className="bakim-kart-icon filtre">🧽</div>
                <div className="bakim-kart-bilgi">
                  <span className="bakim-kart-baslik">Filtre Temizliği</span>
                  <span className="bakim-kart-tarih">
                    {aktifTank.filtreSonTemizlik ? (
                      <>
                        {formatTarih(aktifTank.filtreSonTemizlik)}
                        <span className={`gun-badge-pro ${gunGecti(aktifTank.filtreSonTemizlik) > 14 ? 'gecikti' : 'tamam'}`}>
                          {gunGecti(aktifTank.filtreSonTemizlik)} gün önce
                        </span>
                      </>
                    ) : filterCounter > 0 ? (
                      <span className={`gun-badge-pro ${filterCounter > 14 ? 'gecikti' : 'tamam'}`}>
                        {filterCounter} gün önce
                      </span>
                    ) : 'Belirtilmedi'}
                  </span>
                </div>
              </div>

              {/* Bitki Bakımı - sadece bitkiVar ise */}
              {aktifTank.bitkiVar && (
                <>
                  <div className="bakim-kart">
                    <div className="bakim-kart-icon gozlem">✂️</div>
                    <div className="bakim-kart-bilgi">
                      <span className="bakim-kart-baslik">Bitki Budama</span>
                      <span className="bakim-kart-tarih">
                        {aktifTank.sonBudamaTarihi ? formatTarih(aktifTank.sonBudamaTarihi) : 'Belirtilmedi'}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Gözlem & Sağlık */}
        <div className="profil-kart-pro">
          <div className="kart-header-pro">
            <div className="header-sol">
              <span className="kart-icon-pro">👁️</span>
              <h3>Gözlem & Sağlık</h3>
            </div>
          </div>
          <div className="kart-icerik-pro">
            <div className="gozlem-grid-pro">
              <div className={`gozlem-kart ${aktifTank.algDurumu === 'yok' || aktifTank.algDurumu === 'az' ? 'iyi' : 'kotu'}`}>
                <span className="gozlem-icon">🌿</span>
                <span className="gozlem-label">Alg Durumu</span>
                <span className={`gozlem-deger ${aktifTank.algDurumu === 'yok' ? 'yesil' : aktifTank.algDurumu === 'cok' ? 'kirmizi' : ''}`}>
                  {aktifTank.algDurumu === 'yok' ? '✅ Yok' :
                   aktifTank.algDurumu === 'az' ? '🟡 Az' :
                   aktifTank.algDurumu === 'orta' ? '🟠 Orta' : '🔴 Çok'}
                </span>
              </div>
              <div className={`gozlem-kart ${aktifTank.suBerrakligi === 'berrak' ? 'iyi' : aktifTank.suBerrakligi === 'bulanik' ? 'kotu' : ''}`}>
                <span className="gozlem-icon">💧</span>
                <span className="gozlem-label">Su Berraklığı</span>
                <span className={`gozlem-deger ${aktifTank.suBerrakligi === 'berrak' ? 'mavi' : aktifTank.suBerrakligi === 'bulanik' ? 'kirmizi' : ''}`}>
                  {aktifTank.suBerrakligi === 'berrak' ? '✨ Berrak' :
                   aktifTank.suBerrakligi === 'hafif' ? '🌫️ Hafif Bulanık' : '☁️ Bulanık'}
                </span>
              </div>
              <div className={`gozlem-kart ${aktifTank.hastaBalikVar || hastaBalikSayisi > 0 ? 'kotu' : 'iyi'}`}>
                <span className="gozlem-icon">🏥</span>
                <span className="gozlem-label">Hasta Balık</span>
                <span className={`gozlem-deger ${aktifTank.hastaBalikVar || hastaBalikSayisi > 0 ? 'kirmizi' : 'yesil'}`}>
                  {aktifTank.hastaBalikVar || hastaBalikSayisi > 0 ? `⚠️ ${hastaBalikSayisi || 'Var'}` : '✅ Yok'}
                </span>
              </div>
            </div>
            
            {aktifTank.hastaBalikVar && aktifTank.hastaBalikAciklama && (
              <div className="hasta-aciklama-pro">
                <span className="hasta-icon">⚠️</span>
                <p>{aktifTank.hastaBalikAciklama}</p>
              </div>
            )}
            
            {(aktifTank.ilacTedaviVar || aktifTedaviVar) && (
              <div className="tedavi-bilgi-pro">
                <div className="tedavi-header">
                  <span className="tedavi-icon">💊</span>
                  <h4>Aktif Tedavi</h4>
                </div>
                <p className="tedavi-tarih">Son ilaç: {formatTarih(aktifTank.sonIlacTarihi)}</p>
                {aktifTank.kullanilanIlaclar?.length > 0 && (
                  <div className="ilac-chips-pro">
                    {aktifTank.kullanilanIlaclar.map(ilac => (
                      <span key={ilac.id} className="ilac-chip-pro">{ilac.icon} {ilac.ad}</span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Bilgi */}
      <div className="profil-footer">
        <span>🗓️ Kurulum: {formatTarih(aktifTank.olusturmaTarihi)}</span>
        <span>⏰ Tank Yaşı: {kurulumGunu() !== null ? `${kurulumGunu()} gün` : '-'}</span>
        <span>💧 Su Kaynağı: {aktifTank.suKaynagi === 'musluk' ? '🚰 Musluk' : '💧 RO'}</span>
      </div>
    </div>
  );
}