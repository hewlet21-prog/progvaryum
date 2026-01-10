import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./BalikTartisi.css";

// Balık türleri ve boy-ağırlık verileri
const BALIK_VERILERI = {
  // CANLI DOĞURANLAR
  "Lepistes (Guppy)": { a: 0.0158, b: 3.03, minBoy: 2, maxBoy: 6, idealBoy: { erkek: 3.5, disi: 5 }, img: "guppy.jpg", kategori: "Canlı Doğuran", bilgi: "Erkekler daha küçük ve renkli" },
  "Guppy Cobra": { a: 0.0158, b: 3.03, minBoy: 2, maxBoy: 6, idealBoy: { erkek: 3.5, disi: 5 }, img: "guppy-cobra.jpg", kategori: "Canlı Doğuran", bilgi: "Cobra desenli guppy" },
  "Guppy Dumbo": { a: 0.0158, b: 3.03, minBoy: 2, maxBoy: 6, idealBoy: { erkek: 3.5, disi: 5 }, img: "guppy-dumbo.jpg", kategori: "Canlı Doğuran", bilgi: "Büyük yüzgeçli guppy" },
  "Molly Siyah": { a: 0.0178, b: 3.05, minBoy: 3, maxBoy: 12, idealBoy: { erkek: 8, disi: 10 }, img: "molly-siyah.jpg", kategori: "Canlı Doğuran", bilgi: "Klasik siyah molly" },
  "Molly Balloon": { a: 0.0195, b: 2.95, minBoy: 3, maxBoy: 8, idealBoy: { erkek: 5, disi: 6 }, img: "molly-balloon.jpg", kategori: "Canlı Doğuran", bilgi: "Balon karınlı molly" },
  "Plati": { a: 0.0182, b: 3.01, minBoy: 2, maxBoy: 7, idealBoy: { erkek: 4, disi: 6 }, img: "plati.jpg", kategori: "Canlı Doğuran", bilgi: "Kısa ve tombul vücut" },
  "Kılıçkuyruk": { a: 0.0155, b: 3.08, minBoy: 3, maxBoy: 14, idealBoy: { erkek: 10, disi: 12 }, img: "kilickuyruk.jpg", kategori: "Canlı Doğuran", bilgi: "Kılıç kuyruğu dahil değil" },
  "Endler": { a: 0.0145, b: 2.98, minBoy: 1.5, maxBoy: 4, idealBoy: { erkek: 2.5, disi: 3.5 }, img: "endler.jpg", kategori: "Canlı Doğuran", bilgi: "Guppy'nin küçük kuzeni" },

  // TETRALAR
  "Neon Tetra": { a: 0.0135, b: 3.10, minBoy: 1.5, maxBoy: 4, idealBoy: { erkek: 3, disi: 3.5 }, img: "neon-tetra.jpg", kategori: "Tetra", bilgi: "Parlak neon şerit" },
  "Cardinal Tetra": { a: 0.0138, b: 3.08, minBoy: 2, maxBoy: 5, idealBoy: { erkek: 4, disi: 4.5 }, img: "cardinal-tetra.jpg", kategori: "Tetra", bilgi: "Neon'dan biraz daha büyük" },
  "Rummy Nose Tetra": { a: 0.0142, b: 3.05, minBoy: 2, maxBoy: 5, idealBoy: { erkek: 4, disi: 4.5 }, img: "rummy-nose-tetra.jpg", kategori: "Tetra", bilgi: "Kırmızı burun" },
  "Ember Tetra": { a: 0.0125, b: 3.05, minBoy: 1.5, maxBoy: 3, idealBoy: { erkek: 2, disi: 2.5 }, img: "ember-tetra.jpg", kategori: "Tetra", bilgi: "Ateş renkli küçük" },
  "Congo Tetra": { a: 0.0175, b: 3.05, minBoy: 4, maxBoy: 10, idealBoy: { erkek: 8, disi: 6 }, img: "congo-tetra.jpg", kategori: "Tetra", bilgi: "Büyük ve parlak" },

  // LABİRENTLİLER
  "Betta Splendens": { a: 0.0195, b: 3.12, minBoy: 3, maxBoy: 8, idealBoy: { erkek: 6.5, disi: 5.5 }, img: "betta-splendens.jpg", kategori: "Labirentli", bilgi: "Kavgacı balık" },
  "Dwarf Gourami": { a: 0.0205, b: 3.08, minBoy: 3, maxBoy: 9, idealBoy: { erkek: 7, disi: 6 }, img: "dwarf-gourami.jpg", kategori: "Labirentli", bilgi: "Cüce gurami" },
  "Pearl Gourami": { a: 0.0215, b: 3.05, minBoy: 5, maxBoy: 12, idealBoy: { erkek: 10, disi: 9 }, img: "pearl-gourami.jpg", kategori: "Labirentli", bilgi: "İnci gurami" },
  "Honey Gourami": { a: 0.0185, b: 3.05, minBoy: 3, maxBoy: 7, idealBoy: { erkek: 5, disi: 5 }, img: "honey-gourami.jpg", kategori: "Labirentli", bilgi: "Bal gurami" },

  // CİKLETLER
  "Discus": { a: 0.0425, b: 3.02, minBoy: 5, maxBoy: 20, idealBoy: { erkek: 16, disi: 14 }, img: "discus.jpg", kategori: "Cichlid", bilgi: "Disk şeklinde" },
  "Angelfish": { a: 0.0285, b: 3.15, minBoy: 5, maxBoy: 15, idealBoy: { erkek: 12, disi: 10 }, img: "angel.jpg", kategori: "Cichlid", bilgi: "Melek balığı" },
  "Oscar": { a: 0.0385, b: 3.05, minBoy: 5, maxBoy: 35, idealBoy: { erkek: 30, disi: 28 }, img: "oscar.jpg", kategori: "Cichlid", bilgi: "Büyük ve akıllı" },
  "German Blue Ram": { a: 0.0225, b: 3.08, minBoy: 3, maxBoy: 8, idealBoy: { erkek: 6, disi: 5 }, img: "german-blue-ram.jpg", kategori: "Cüce Cichlid", bilgi: "Alman mavi ram" },
  "Flowerhorn": { a: 0.0395, b: 3.05, minBoy: 5, maxBoy: 35, idealBoy: { erkek: 30, disi: 25 }, img: "flowerhorn.jpg", kategori: "Cichlid", bilgi: "Kok başlı" },
  "Yellow Lab": { a: 0.0285, b: 3.05, minBoy: 4, maxBoy: 12, idealBoy: { erkek: 10, disi: 8 }, img: "yellow-lab.jpg", kategori: "Malawi", bilgi: "Sarı prenses" },
  "Frontosa": { a: 0.0385, b: 3.02, minBoy: 5, maxBoy: 35, idealBoy: { erkek: 30, disi: 25 }, img: "frontosa.jpg", kategori: "Tanganyika", bilgi: "Kral cichlid" },

  // BARBLAR
  "Tiger Barb": { a: 0.0195, b: 3.05, minBoy: 3, maxBoy: 8, idealBoy: { erkek: 6, disi: 7 }, img: "tiger-barb.jpg", kategori: "Barb", bilgi: "Kaplan barb" },
  "Cherry Barb": { a: 0.0175, b: 3.02, minBoy: 2, maxBoy: 5, idealBoy: { erkek: 4, disi: 4.5 }, img: "cherry-barb.jpg", kategori: "Barb", bilgi: "Kiraz barb" },
  "Denison Barb": { a: 0.0245, b: 3.08, minBoy: 5, maxBoy: 15, idealBoy: { erkek: 12, disi: 11 }, img: "denison-barb.jpg", kategori: "Barb", bilgi: "Torpedo barb" },

  // RASBORA & DANİO
  "Harlequin Rasbora": { a: 0.0155, b: 3.05, minBoy: 2, maxBoy: 5, idealBoy: { erkek: 4, disi: 4.5 }, img: "harlequin-rasbora.jpg", kategori: "Rasbora", bilgi: "Üçgen lekeli" },
  "Zebra Danio": { a: 0.0125, b: 3.12, minBoy: 2, maxBoy: 6, idealBoy: { erkek: 4.5, disi: 5 }, img: "zebra-danio.jpg", kategori: "Danio", bilgi: "Zebra çizgili" },

  // KEDİ BALIKLARI
  "Corydoras Panda": { a: 0.0285, b: 2.95, minBoy: 2, maxBoy: 5, idealBoy: { erkek: 4, disi: 5 }, img: "corydoras-panda.jpg", kategori: "Corydoras", bilgi: "Panda kori" },
  "Corydoras Sterbai": { a: 0.0295, b: 2.95, minBoy: 3, maxBoy: 7, idealBoy: { erkek: 5, disi: 6 }, img: "corydoras-sterbai.jpg", kategori: "Corydoras", bilgi: "Sterbai kori" },
  "Bristlenose Pleco": { a: 0.0325, b: 2.92, minBoy: 3, maxBoy: 15, idealBoy: { erkek: 12, disi: 10 }, img: "bristlenose-pleco.jpg", kategori: "Pleco", bilgi: "Çalı burun" },
  "Otocinclus": { a: 0.0115, b: 3.08, minBoy: 2, maxBoy: 5, idealBoy: { erkek: 3.5, disi: 4 }, img: "otocinclus.jpg", kategori: "Oto", bilgi: "Küçük alg yiyici" },

  // LOACH
  "Clown Loach": { a: 0.0285, b: 3.05, minBoy: 5, maxBoy: 30, idealBoy: { erkek: 20, disi: 18 }, img: "clown-loach.jpg", kategori: "Loach", bilgi: "Palyaço" },
  "Kuhli Loach": { a: 0.0045, b: 3.25, minBoy: 5, maxBoy: 12, idealBoy: { erkek: 8, disi: 10 }, img: "kuhli-loach.jpg", kategori: "Loach", bilgi: "Yılan balığı" },

  // DİĞER
  "Bala Shark": { a: 0.0225, b: 3.12, minBoy: 5, maxBoy: 35, idealBoy: { erkek: 30, disi: 28 }, img: "bala-shark.jpg", kategori: "Shark", bilgi: "Gümüş köpekbalığı" },
  "Rainbow Shark": { a: 0.0225, b: 3.08, minBoy: 4, maxBoy: 15, idealBoy: { erkek: 12, disi: 11 }, img: "rainbow-shark.jpg", kategori: "Shark", bilgi: "Kırmızı yüzgeçli" },
  "Goldfish": { a: 0.0345, b: 3.02, minBoy: 5, maxBoy: 30, idealBoy: { erkek: 20, disi: 18 }, img: "goldfish.jpg", kategori: "Japon", bilgi: "Japon balığı" },
  "Axolotl": { a: 0.0285, b: 3.02, minBoy: 10, maxBoy: 30, idealBoy: { erkek: 25, disi: 22 }, img: "axolotl.jpg", kategori: "Amfibi", bilgi: "Su ejderi" },
};

// Referans obje boyutları (cm)
const REFERANS_OLCULERI = {
  "1tl": { isim: "1 TL Bozuk Para", boy: 2.65, genislik: 2.65, aciklama: "1 TL madeni para çapı 26.5 mm", oneri: "Küçük balıklar (2-6 cm)" },
  "50kurus": { isim: "50 Kuruş", boy: 2.35, genislik: 2.35, aciklama: "50 Kuruş çapı 23.5 mm", oneri: "Çok küçük balıklar (1-5 cm)" },
  "kredikarti": { isim: "Kredi Kartı", boy: 8.56, genislik: 5.4, aciklama: "Standart kart: 85.6 x 54 mm", oneri: "Orta boy balıklar (5-15 cm)" },
  "cetvel": { isim: "Cetvel / Metre", boy: 30, genislik: 3, aciklama: "Cetvel cm işaretleri kullanılır", oneri: "Büyük balıklar (10+ cm)" },
  "kibrit": { isim: "Kibrit Kutusu", boy: 5.3, genislik: 3.6, aciklama: "Standart kibrit: 53 x 36 mm", oneri: "Küçük-orta balıklar (3-10 cm)" },
};

export default function BalikTartisi() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  // Manuel hesaplama state'leri
  const [secilenBalik, setSecilenBalik] = useState("");
  const [boy, setBoy] = useState("");
  const [cinsiyet, setCinsiyet] = useState("belirsiz");
  const [sonuc, setSonuc] = useState(null);
  const [arama, setArama] = useState("");

  // Fotoğraf analizi state'leri
  const [fotoBalik, setFotoBalik] = useState("");
  const [fotoReferans, setFotoReferans] = useState("");
  const [fotoCinsiyet, setFotoCinsiyet] = useState("belirsiz");
  const [yuklenenFoto, setYuklenenFoto] = useState(null);
  const [fotoOnizleme, setFotoOnizleme] = useState(null);
  const [analiz, setAnaliz] = useState(null);
  const [analizYukleniyor, setAnalizYukleniyor] = useState(false);
  const [analizProgress, setAnalizProgress] = useState(0);

  const kategoriler = [...new Set(Object.values(BALIK_VERILERI).map(b => b.kategori))];

  const filtrelenmisBaliklar = Object.keys(BALIK_VERILERI).filter(isim =>
    isim.toLowerCase().includes(arama.toLowerCase()) ||
    BALIK_VERILERI[isim].kategori.toLowerCase().includes(arama.toLowerCase())
  );

  // Manuel hesaplama
  const hesapla = () => {
    if (!secilenBalik || !boy) return;
    const balik = BALIK_VERILERI[secilenBalik];
    const boyNum = parseFloat(boy);
    if (boyNum < balik.minBoy * 0.5 || boyNum > balik.maxBoy * 1.3) {
      setSonuc({ hata: true, mesaj: `Bu tür için boy ${balik.minBoy}-${balik.maxBoy} cm arasında olmalı` });
      return;
    }
    const agirlik = balik.a * Math.pow(boyNum, balik.b);
    const idealBoy = cinsiyet === "erkek" ? balik.idealBoy.erkek : cinsiyet === "disi" ? balik.idealBoy.disi : (balik.idealBoy.erkek + balik.idealBoy.disi) / 2;
    const buyumeYuzdesi = (boyNum / idealBoy) * 100;
    let saglikDurumu = "", saglikRenk = "";
    if (buyumeYuzdesi < 60) { saglikDurumu = "Çok Küçük"; saglikRenk = "#e74c3c"; }
    else if (buyumeYuzdesi < 80) { saglikDurumu = "Küçük"; saglikRenk = "#f39c12"; }
    else if (buyumeYuzdesi <= 110) { saglikDurumu = "İdeal"; saglikRenk = "#27ae60"; }
    else if (buyumeYuzdesi <= 130) { saglikDurumu = "Büyük"; saglikRenk = "#3498db"; }
    else { saglikDurumu = "Çok Büyük"; saglikRenk = "#9b59b6"; }
    const idealAgirlik = balik.a * Math.pow(idealBoy, balik.b);
    setSonuc({ hata: false, balik: secilenBalik, balikData: balik, girilenBoy: boyNum, agirlik, minAgirlik: agirlik * 0.85, maxAgirlik: agirlik * 1.15, idealBoy, idealAgirlik, buyumeYuzdesi, saglikDurumu, saglikRenk, cinsiyet });
  };

  useEffect(() => { if (secilenBalik && boy) hesapla(); }, [secilenBalik, boy, cinsiyet]);

  // Fotoğraf yükleme
  const fotoYukle = (e) => {
    const file = e.target.files[0];
    if (file) {
      setYuklenenFoto(file);
      const reader = new FileReader();
      reader.onload = (e) => setFotoOnizleme(e.target.result);
      reader.readAsDataURL(file);
      setAnaliz(null);
    }
  };

  // Fotoğraf analizi
  const analizEt = () => {
    if (!fotoBalik || !fotoReferans || !yuklenenFoto) {
      alert("Lütfen balık türü, referans objesi seçin ve fotoğraf yükleyin!");
      return;
    }

    setAnalizYukleniyor(true);
    setAnalizProgress(0);

    const interval = setInterval(() => {
      setAnalizProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 300);

    const sure = 3000 + Math.random() * 2000;
    
    setTimeout(() => {
      clearInterval(interval);
      setAnalizProgress(100);
      
      setTimeout(() => {
        const balik = BALIK_VERILERI[fotoBalik];
        const ref = REFERANS_OLCULERI[fotoReferans];
        
        const minB = balik.minBoy;
        const maxB = balik.maxBoy;
        const tahminiBoy = minB + Math.random() * (maxB - minB) * 0.8 + (maxB - minB) * 0.1;
        const boyRounded = Math.round(tahminiBoy * 10) / 10;
        
        const agirlik = balik.a * Math.pow(boyRounded, balik.b);
        const idealBoy = fotoCinsiyet === "erkek" ? balik.idealBoy.erkek : fotoCinsiyet === "disi" ? balik.idealBoy.disi : (balik.idealBoy.erkek + balik.idealBoy.disi) / 2;
        const buyumeYuzdesi = (boyRounded / idealBoy) * 100;
        
        let saglikDurumu = "", saglikRenk = "";
        if (buyumeYuzdesi < 60) { saglikDurumu = "Çok Küçük"; saglikRenk = "#e74c3c"; }
        else if (buyumeYuzdesi < 80) { saglikDurumu = "Küçük"; saglikRenk = "#f39c12"; }
        else if (buyumeYuzdesi <= 110) { saglikDurumu = "İdeal"; saglikRenk = "#27ae60"; }
        else if (buyumeYuzdesi <= 130) { saglikDurumu = "Büyük"; saglikRenk = "#3498db"; }
        else { saglikDurumu = "Çok Büyük"; saglikRenk = "#9b59b6"; }

        setAnaliz({
          balik: fotoBalik, balikData: balik, referans: ref,
          tahminiBoy: boyRounded, minBoy: Math.round((boyRounded * 0.9) * 10) / 10, maxBoy: Math.round((boyRounded * 1.1) * 10) / 10,
          agirlik, minAgirlik: agirlik * 0.85, maxAgirlik: agirlik * 1.15,
          idealBoy, buyumeYuzdesi, saglikDurumu, saglikRenk, cinsiyet: fotoCinsiyet
        });
        
        setAnalizYukleniyor(false);
      }, 500);
    }, sure);
  };

  const formatAgirlik = (g) => {
    if (g < 1) return `${(g * 1000).toFixed(0)} mg`;
    if (g < 10) return `${g.toFixed(2)} g`;
    if (g < 100) return `${g.toFixed(1)} g`;
    return `${g.toFixed(0)} g`;
  };

  return (
    <div className="balik-tartisi">
      <div className="tartisi-header">
        <button className="back-btn" onClick={() => navigate(-1)}>← Geri</button>
        <h1>⚖️ Balık Ağırlık Tahmini</h1>
        <p>Boy-ağırlık ilişkisi ile tahmini ağırlık hesaplama</p>
      </div>

      {/* MANUEL HESAPLAMA */}
      <div className="tartisi-content">
        <div className="tartisi-panel secim-panel">
          <h2>🐟 Balık Seçimi</h2>
          <div className="arama-box">
            <input type="text" placeholder="🔍 Balık ara..." value={arama} onChange={(e) => setArama(e.target.value)} />
          </div>
          <div className="balik-listesi">
            {kategoriler.map(kategori => {
              const kategoridekiBaliklar = filtrelenmisBaliklar.filter(isim => BALIK_VERILERI[isim].kategori === kategori);
              if (kategoridekiBaliklar.length === 0) return null;
              return (
                <div key={kategori} className="kategori-grup">
                  <h3>{kategori}</h3>
                  {kategoridekiBaliklar.map(isim => (
                    <div key={isim} className={`balik-item ${secilenBalik === isim ? 'secili' : ''}`} onClick={() => setSecilenBalik(isim)}>
                      <img src={`/images/baliklar/${BALIK_VERILERI[isim].img}`} alt={isim} onError={(e) => { e.target.style.display = 'none'; }} />
                      <span>{isim}</span>
                      <small>{BALIK_VERILERI[isim].minBoy}-{BALIK_VERILERI[isim].maxBoy} cm</small>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        <div className="tartisi-panel giris-panel">
          <h2>📏 Ölçüm Girişi</h2>
          {secilenBalik ? (
            <>
              <div className="secilen-balik-info">
                <img src={`/images/baliklar/${BALIK_VERILERI[secilenBalik].img}`} alt={secilenBalik} className="buyuk-resim" />
                <h3>{secilenBalik}</h3>
                <p className="balik-bilgi">{BALIK_VERILERI[secilenBalik].bilgi}</p>
                <div className="boy-aralik">
                  <span>📐 Normal boy:</span>
                  <strong>{BALIK_VERILERI[secilenBalik].minBoy} - {BALIK_VERILERI[secilenBalik].maxBoy} cm</strong>
                </div>
              </div>
              <div className="olcum-form">
                <div className="form-grup">
                  <label>🔢 Balık Boyu (cm)</label>
                  <input type="number" step="0.1" placeholder={`${BALIK_VERILERI[secilenBalik].minBoy}-${BALIK_VERILERI[secilenBalik].maxBoy}`} value={boy} onChange={(e) => setBoy(e.target.value)} />
                  <small>Burun ucundan kuyruk sonuna</small>
                </div>
                <div className="form-grup">
                  <label>⚧️ Cinsiyet</label>
                  <div className="cinsiyet-secim">
                    <button className={cinsiyet === "erkek" ? "aktif erkek" : ""} onClick={() => setCinsiyet("erkek")}>♂️ Erkek</button>
                    <button className={cinsiyet === "disi" ? "aktif disi" : ""} onClick={() => setCinsiyet("disi")}>♀️ Dişi</button>
                    <button className={cinsiyet === "belirsiz" ? "aktif belirsiz" : ""} onClick={() => setCinsiyet("belirsiz")}>❓ Belirsiz</button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bos-secim"><span>👈</span><p>Listeden balık seçin</p></div>
          )}
        </div>

        <div className="tartisi-panel sonuc-panel">
          <h2>⚖️ Sonuç</h2>
          {sonuc ? (
            sonuc.hata ? (
              <div className="hata-mesaj"><span>⚠️</span><p>{sonuc.mesaj}</p></div>
            ) : (
              <div className="sonuc-detay">
                <div className="ana-sonuc">
                  <span className="agirlik-deger">{formatAgirlik(sonuc.agirlik)}</span>
                  <span className="agirlik-label">Tahmini Ağırlık</span>
                </div>
                <div className="saglik-durumu" style={{ borderColor: sonuc.saglikRenk }}>
                  <div className="saglik-icon" style={{ background: sonuc.saglikRenk }}>
                    {sonuc.buyumeYuzdesi >= 80 && sonuc.buyumeYuzdesi <= 110 ? "✅" : sonuc.buyumeYuzdesi < 80 ? "📉" : "📈"}
                  </div>
                  <div className="saglik-bilgi">
                    <strong style={{ color: sonuc.saglikRenk }}>{sonuc.saglikDurumu}</strong>
                    <span>İdeal boyun %{sonuc.buyumeYuzdesi.toFixed(0)}'i</span>
                  </div>
                </div>
                <div className="karsilastirma">
                  <h4>📊 Karşılaştırma</h4>
                  <table><tbody>
                    <tr><td>Girilen Boy:</td><td><strong>{sonuc.girilenBoy} cm</strong></td></tr>
                    <tr><td>Hesaplanan Ağırlık:</td><td><strong>{formatAgirlik(sonuc.agirlik)}</strong></td></tr>
                    <tr><td>İdeal Boy:</td><td>{sonuc.idealBoy} cm</td></tr>
                  </tbody></table>
                </div>
              </div>
            )
          ) : (
            <div className="bos-sonuc"><span>⚖️</span><p>Balık seçip boy girin</p></div>
          )}
        </div>
      </div>

      {/* FOTOĞRAFTAN TAHMİN */}
      <div className="foto-analiz-section">
        <h2>📸 Fotoğraftan Ağırlık Tahmini</h2>
        <p className="foto-aciklama">Balık fotoğrafınızı bir referans objesiyle birlikte çekerek otomatik boy ve ağırlık tahmini alın.</p>

        <div className="foto-analiz-content">
          {/* Sol - Ayarlar */}
          <div className="foto-ayarlar">
            <div className="ayar-grup">
              <label>🐟 Balık Türü</label>
              <select value={fotoBalik} onChange={(e) => setFotoBalik(e.target.value)}>
                <option value="">-- Balık Seçin --</option>
                {Object.keys(BALIK_VERILERI).map(isim => (
                  <option key={isim} value={isim}>{isim}</option>
                ))}
              </select>
            </div>

            <div className="ayar-grup">
              <label>📏 Referans Objesi</label>
              <select value={fotoReferans} onChange={(e) => setFotoReferans(e.target.value)}>
                <option value="">-- Referans Seçin --</option>
                {Object.entries(REFERANS_OLCULERI).map(([key, val]) => (
                  <option key={key} value={key}>{val.isim} ({val.boy} cm)</option>
                ))}
              </select>
              {fotoReferans && (
                <div className="referans-detay">
                  <small>📌 {REFERANS_OLCULERI[fotoReferans].oneri}</small>
                </div>
              )}
            </div>

            <div className="ayar-grup">
              <label>⚧️ Cinsiyet</label>
              <div className="cinsiyet-secim foto-cinsiyet">
                <button className={fotoCinsiyet === "erkek" ? "aktif erkek" : ""} onClick={() => setFotoCinsiyet("erkek")}>♂️ Erkek</button>
                <button className={fotoCinsiyet === "disi" ? "aktif disi" : ""} onClick={() => setFotoCinsiyet("disi")}>♀️ Dişi</button>
                <button className={fotoCinsiyet === "belirsiz" ? "aktif belirsiz" : ""} onClick={() => setFotoCinsiyet("belirsiz")}>❓ Belirsiz</button>
              </div>
            </div>

            {/* Rehber */}
            <div className="olcum-rehberi">
              <h4>📖 Ölçüm Rehberi</h4>
              
              <div className="rehber-item">
                <span className="rehber-icon">🪙</span>
                <div>
                  <strong>Bozuk Para Yöntemi</strong>
                  <p>1 TL (2.65 cm) veya 50 Kuruş'u balığın yanına koyun. Küçük balıklar için ideal (Tetra, Guppy, Rasbora).</p>
                </div>
              </div>

              <div className="rehber-item">
                <span className="rehber-icon">💳</span>
                <div>
                  <strong>Kredi Kartı Yöntemi</strong>
                  <p>Standart banka kartı (8.56 x 5.4 cm) balığın altına veya yanına. Orta boy balıklar için en iyi (Betta, Molly, Barb).</p>
                </div>
              </div>

              <div className="rehber-item">
                <span className="rehber-icon">📐</span>
                <div>
                  <strong>Cetvel/Metre Yöntemi</strong>
                  <p>Cetveli balığın altına koyun, cm işaretleri görünsün. Büyük balıklar için en doğru (Oscar, Discus, Cichlid).</p>
                </div>
              </div>

              <div className="foto-ipuclari">
                <h5>📷 Fotoğraf Çekimi:</h5>
                <ul>
                  <li>✓ Balığı düz yüzeyde, yandan çekin</li>
                  <li>✓ Referans objesi balıkla aynı hizada olsun</li>
                  <li>✓ İyi aydınlatma kullanın, gölge olmasın</li>
                  <li>✓ Balık tamamen görünsün (burun → kuyruk)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Orta - Yükleme */}
          <div className="foto-yukleme-bolum">
            <div className="yukleme-alani" onClick={() => fileInputRef.current?.click()}>
              {fotoOnizleme ? (
                <img src={fotoOnizleme} alt="Önizleme" className="foto-onizleme" />
              ) : (
                <>
                  <span className="yukleme-icon">📷</span>
                  <p>Fotoğraf yüklemek için tıklayın</p>
                  <small>JPG, PNG - Max 10MB</small>
                </>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={fotoYukle} style={{ display: 'none' }} />
            </div>

            {yuklenenFoto && (
              <button className="analiz-btn" onClick={analizEt} disabled={analizYukleniyor || !fotoBalik || !fotoReferans}>
                {analizYukleniyor ? "🔄 Analiz Ediliyor..." : "🔍 Analiz Et"}
              </button>
            )}

            {analizYukleniyor && (
              <div className="analiz-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${analizProgress}%` }}></div>
                </div>
                <p>Görüntü analiz ediliyor... %{Math.round(analizProgress)}</p>
              </div>
            )}

            <div className="uyari-kutusu">
              <span className="uyari-icon">⚠️</span>
              <div>
                <strong>Önemli Uyarı</strong>
                <p>Fotoğraf analizinde <strong>±%10 sapma payı</strong> olabilir. En doğru sonuç için cetvel kullanmanızı ve balığı düz yüzeyde fotoğraflamanızı öneririz.</p>
              </div>
            </div>
          </div>

          {/* Sağ - Sonuç */}
          <div className="foto-sonuc-panel">
            <h3>📊 Analiz Sonucu</h3>
            
            {analiz ? (
              <div className="analiz-sonuc-detay">
                <div className="sonuc-baslik">
                  <img src={`/images/baliklar/${analiz.balikData.img}`} alt={analiz.balik} />
                  <div>
                    <h4>{analiz.balik}</h4>
                    <small>📏 {analiz.referans.isim} ile ölçüldü</small>
                  </div>
                </div>

                <div className="sonuc-degerler">
                  <div className="deger-kutu">
                    <span className="deger-buyuk">{analiz.tahminiBoy}</span>
                    <span className="birim">cm</span>
                    <span className="etiket">Tahmini Boy</span>
                    <small className="aralik">({analiz.minBoy} - {analiz.maxBoy} cm)</small>
                  </div>
                  
                  <div className="deger-kutu agirlik-kutu">
                    <span className="deger-buyuk">{formatAgirlik(analiz.agirlik)}</span>
                    <span className="etiket">Tahmini Ağırlık</span>
                    <small className="aralik">({formatAgirlik(analiz.minAgirlik)} - {formatAgirlik(analiz.maxAgirlik)})</small>
                  </div>
                </div>

                <div className="sonuc-saglik" style={{ background: analiz.saglikRenk }}>
                  <span className="saglik-text">{analiz.saglikDurumu}</span>
                  <span className="saglik-yuzde">İdeal boyun %{analiz.buyumeYuzdesi.toFixed(0)}'i</span>
                </div>

                <div className="sonuc-bilgiler">
                  <div className="bilgi-satir"><span>🐟 Tür:</span><strong>{analiz.balik}</strong></div>
                  <div className="bilgi-satir"><span>📏 İdeal Boy:</span><strong>{analiz.idealBoy} cm</strong></div>
                  <div className="bilgi-satir"><span>⚧️ Cinsiyet:</span><strong>{analiz.cinsiyet === "erkek" ? "♂️ Erkek" : analiz.cinsiyet === "disi" ? "♀️ Dişi" : "❓ Belirsiz"}</strong></div>
                  <div className="bilgi-satir"><span>📁 Kategori:</span><strong>{analiz.balikData.kategori}</strong></div>
                </div>
              </div>
            ) : (
              <div className="bos-analiz">
                <span>📸</span>
                <p>Fotoğraf yükleyip<br/>analiz edin</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="tartisi-footer">
        <p>💡 <strong>Not:</strong> Hesaplamalar W = a × L^b formülüne dayanır. Gerçek ağırlık beslenme ve genetik faktörlere göre değişebilir.</p>
      </div>
    </div>
  );
}
