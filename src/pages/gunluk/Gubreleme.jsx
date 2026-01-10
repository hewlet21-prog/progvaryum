import React, { useState } from "react";
import { useAkvaryumStorage } from "../../hooks/useAkvaryumStorage";

export default function Gubreleme() {
  const [gubreleme, setGubreleme] = useAkvaryumStorage("gubreleme", []);
  const [akvaryumBilgi] = useAkvaryumStorage("akvaryumBilgi", {
    hacim: 100,
    bitkili: true
  });

  // Yeni: Hesaplama parametreleri
  const [hesaplamaParams, setHesaplamaParams] = useAkvaryumStorage("hesaplamaParams", {
    hacim: akvaryumBilgi.hacim || 100,
    kumKalinlik: "orta", // ince, orta, kalin
    bitkiYogunluk: "orta", // az, orta, yogun
    teknoloji: "midtech" // lowtech, midtech, hightech
  });

  const [form, setForm] = useState({
    tarih: new Date().toISOString().slice(0, 16),
    tip: "makro",
    urun: "",
    doz: "",
    birim: "ml",
    metod: "ei",
    notlar: ""
  });

  // Gübre tipleri
  const gubreTipleri = {
    makro: [
      { id: "npk", name: "NPK (Makro Mix)", icerik: "N-P-K dengeli" },
      { id: "nitrat", name: "KNO3 (Potasyum Nitrat)", icerik: "Nitrat + Potasyum" },
      { id: "fosfat", name: "KH2PO4 (Potasyum Fosfat)", icerik: "Fosfat + Potasyum" },
      { id: "potasyum", name: "K2SO4 (Potasyum Sülfat)", icerik: "Sadece Potasyum" },
      { id: "magnezyum", name: "MgSO4 (Magnezyum Sülfat)", icerik: "Magnezyum" }
    ],
    mikro: [
      { id: "demir", name: "Fe (Demir)", icerik: "Chelated Iron" },
      { id: "trace", name: "Trace Elements", icerik: "Mn, Zn, Cu, B, Mo" },
      { id: "mikro-mix", name: "Mikro Mix", icerik: "Tüm mikro elementler" }
    ],
    co2: [
      { id: "sivi-co2", name: "Sıvı CO2 (Excel)", icerik: "Glutaraldehit" },
      { id: "co2-sistem", name: "Basınçlı CO2", icerik: "CO2 gaz" }
    ],
    tum: [
      { id: "all-in-one", name: "All-in-One Gübre", icerik: "Makro + Mikro" },
      { id: "baslangic", name: "Başlangıç Gübresi", icerik: "Kök gübresi" }
    ]
  };

  // Gelişmiş dozaj hesaplayıcı
  const hesaplaDozaj = () => {
    const { hacim, kumKalinlik, bitkiYogunluk, teknoloji } = hesaplamaParams;

    // Teknoloji faktörü
    const tekFaktor = {
      lowtech: 0.5,   // Az ışık, CO2 yok
      midtech: 1.0,   // Orta ışık, sıvı CO2
      hightech: 1.5   // Yüksek ışık, basınçlı CO2
    };

    // Bitki yoğunluğu faktörü
    const bitkiFaktor = {
      az: 0.6,      // %0-30 bitki
      orta: 1.0,    // %30-60 bitki
      yogun: 1.4    // %60-100 bitki
    };

    // Kum kalınlığı faktörü (sıvı gübreye etki)
    const kumFaktor = {
      ince: 1.2,    // <3cm - Daha fazla sıvı gübre
      orta: 1.0,    // 3-5cm - Normal
      kalin: 0.7    // >5cm - Daha az sıvı (kök gübresi önerilir)
    };

    const temelFaktor = tekFaktor[teknoloji] * bitkiFaktor[bitkiYogunluk];
    const siviGubreFaktor = temelFaktor * kumFaktor[kumKalinlik];

    // EI Metodu bazlı hesaplama (40L başına)
    // Kaynak: Estimative Index (Tom Barr, 2004)
    const eiDozaj = {
      kno3: ((hacim / 40) * 6 * temelFaktor).toFixed(1),        // 1/4 çay kaşığı ≈ 6g
      kh2po4: ((hacim / 40) * 1.5 * temelFaktor).toFixed(1),    // 1/16 çay kaşığı ≈ 1.5g
      k2so4: ((hacim / 40) * 6 * temelFaktor).toFixed(1),
      mgso4: ((hacim / 40) * 4 * temelFaktor).toFixed(1),
      mikro: ((hacim / 50) * 5 * siviGubreFaktor).toFixed(1),   // 5ml / 50L
      demir: ((hacim / 50) * 3 * siviGubreFaktor).toFixed(1)    // 3ml / 50L
    };

    // PPS-Pro bazlı günlük dozaj
    // Kaynak: Perpetual Preservation System (Edward, Sears & Conlin)
    const ppsDozaj = {
      kno3: ((hacim / 100) * 0.5 * temelFaktor).toFixed(2),
      kh2po4: ((hacim / 100) * 0.1 * temelFaktor).toFixed(2),
      mikro: ((hacim / 100) * 0.5 * siviGubreFaktor).toFixed(2)
    };

    return { eiDozaj, ppsDozaj, temelFaktor, siviGubreFaktor };
  };

  const { eiDozaj, ppsDozaj, temelFaktor, siviGubreFaktor } = hesaplaDozaj();

  const handleSubmit = (e) => {
    e.preventDefault();

    const yeniGubreleme = {
      id: Date.now(),
      tarih: form.tarih,
      tip: form.tip,
      urun: form.urun,
      doz: form.doz,
      birim: form.birim,
      metod: form.metod,
      hacim: hesaplamaParams.hacim,
      teknoloji: hesaplamaParams.teknoloji,
      notlar: form.notlar
    };

    setGubreleme([yeniGubreleme, ...gubreleme]);

    setForm({
      tarih: new Date().toISOString().slice(0, 16),
      tip: "makro",
      urun: "",
      doz: "",
      birim: "ml",
      metod: "ei",
      notlar: ""
    });

    alert("✅ Gübreleme kaydedildi!");
  };

  const handleSil = (id) => {
    if (window.confirm("Bu kaydı silmek istediğinizde emin misiniz?")) {
      setGubreleme(gubreleme.filter(g => g.id !== id));
    }
  };

  // Haftalık özet
  const haftalikOzet = () => {
    const birHaftaOnce = new Date();
    birHaftaOnce.setDate(birHaftaOnce.getDate() - 7);
    return gubreleme.filter(g => new Date(g.tarih) >= birHaftaOnce);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1400px", margin: "0 auto" }}>
      <h2 style={{ marginTop: 0, color: "#ffffff", textAlign: "center", fontSize: "28px" }}>
        🌱 Bitki Gübreleme
      </h2>
      <p style={{ color: "#9CA3AF", marginBottom: "30px", textAlign: "center", fontSize: "15px" }}>
        Bitkili akvaryumunuz için profesyonel gübre dozaj hesaplayıcı
      </p>

      {/* HESAPLAMA PARAMETRELERİ */}
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        padding: "25px",
        borderRadius: "15px",
        marginBottom: "30px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
      }}>
        <h3 style={{ margin: "0 0 20px 0", fontSize: "20px" }}>⚙️ Akvaryum Parametreleri</h3>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px"
        }}>
          {/* HACIM */}
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}>
              Akvaryum Hacmi (Litre)
            </label>
            <input
              type="number"
              value={hesaplamaParams.hacim}
              onChange={(e) => setHesaplamaParams({ ...hesaplamaParams, hacim: e.target.value })}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "2px solid white",
                fontSize: "14px",
                fontWeight: "600"
              }}
            />
          </div>

          {/* KUM KALINLIK */}
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}>
              Kum/Substrat Kalınlığı
            </label>
            <select
              value={hesaplamaParams.kumKalinlik}
              onChange={(e) => setHesaplamaParams({ ...hesaplamaParams, kumKalinlik: e.target.value })}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "2px solid white",
                fontSize: "14px",
                fontWeight: "600"
              }}
            >
              <option value="ince">İnce (&lt;3cm)</option>
              <option value="orta">Orta (3-5cm)</option>
              <option value="kalin">Kalın (&gt;5cm)</option>
            </select>
            <small style={{ fontSize: "11px", opacity: 0.9, display: "block", marginTop: "5px" }}>
              {hesaplamaParams.kumKalinlik === "ince" && "↑ Daha fazla sıvı gübre"}
              {hesaplamaParams.kumKalinlik === "orta" && "→ Normal dozaj"}
              {hesaplamaParams.kumKalinlik === "kalin" && "↓ Kök gübresi tercih edin"}
            </small>
          </div>

          {/* BİTKİ YOĞUNLUĞU */}
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}>
              Bitki Yoğunluğu
            </label>
            <select
              value={hesaplamaParams.bitkiYogunluk}
              onChange={(e) => setHesaplamaParams({ ...hesaplamaParams, bitkiYogunluk: e.target.value })}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "2px solid white",
                fontSize: "14px",
                fontWeight: "600"
              }}
            >
              <option value="az">Az Bitkili (%0-30)</option>
              <option value="orta">Orta Bitkili (%30-60)</option>
              <option value="yogun">Yoğun Bitkili (%60-100)</option>
            </select>
            <small style={{ fontSize: "11px", opacity: 0.9, display: "block", marginTop: "5px" }}>
              {hesaplamaParams.bitkiYogunluk === "az" && "↓ Düşük gübre dozu"}
              {hesaplamaParams.bitkiYogunluk === "orta" && "→ Standart dozaj"}
              {hesaplamaParams.bitkiYogunluk === "yogun" && "↑ Yüksek gübre dozu"}
            </small>
          </div>

          {/* TEKNOLOJİ */}
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}>
              Teknoloji Seviyesi
            </label>
            <select
              value={hesaplamaParams.teknoloji}
              onChange={(e) => setHesaplamaParams({ ...hesaplamaParams, teknoloji: e.target.value })}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "2px solid white",
                fontSize: "14px",
                fontWeight: "600"
              }}
            >
              <option value="lowtech">Low-Tech (Az ışık, CO2 yok)</option>
              <option value="midtech">Mid-Tech (Orta ışık, Sıvı CO2)</option>
              <option value="hightech">High-Tech (Yüksek ışık, Basınçlı CO2)</option>
            </select>
            <small style={{ fontSize: "11px", opacity: 0.9, display: "block", marginTop: "5px" }}>
              {hesaplamaParams.teknoloji === "lowtech" && "🔸 Haftalık 1-2x gübre"}
              {hesaplamaParams.teknoloji === "midtech" && "🔸 Haftalık 3x gübre"}
              {hesaplamaParams.teknoloji === "hightech" && "🔸 Günlük gübreleme"}
            </small>
          </div>
        </div>

        {/* FAKTÖR BİLGİLERİ */}
        <div style={{
          marginTop: "20px",
          padding: "15px",
          background: "rgba(255,255,255,0.15)",
          borderRadius: "10px",
          fontSize: "13px",
          lineHeight: "1.8"
        }}>
          <strong>📊 Hesaplanan Faktörler:</strong>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "10px" }}>
            <div>Temel Gübre Faktörü: <strong>{temelFaktor.toFixed(2)}x</strong></div>
            <div>Sıvı Gübre Faktörü: <strong>{siviGubreFaktor.toFixed(2)}x</strong></div>
          </div>
        </div>
      </div>

      {/* DOZAJ ÖNERİLERİ */}
      <div style={{
        background: "linear-gradient(135deg, #27ae60 0%, #229954 100%)",
        color: "white",
        padding: "25px",
        borderRadius: "15px",
        marginBottom: "30px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
      }}>
        <h3 style={{ margin: "0 0 20px 0", fontSize: "20px" }}>📊 Önerilen Dozajlar</h3>
        
        {/* EI METODU */}
        <div style={{
          background: "rgba(255,255,255,0.15)",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "20px"
        }}>
          <h4 style={{ margin: "0 0 15px 0", fontSize: "18px" }}>
            🌿 EI Metodu (Estimative Index) - Haftalık Dozaj
          </h4>
          <div style={{ fontSize: "12px", opacity: 0.9, marginBottom: "15px" }}>
            Akvaryum: <strong>{hesaplamaParams.hacim}L</strong> | 
            Teknoloji: <strong>{hesaplamaParams.teknoloji.toUpperCase()}</strong> | 
            Bitki: <strong>{hesaplamaParams.bitkiYogunluk.charAt(0).toUpperCase() + hesaplamaParams.bitkiYogunluk.slice(1)}</strong>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "15px"
          }}>
            <div style={{ background: "rgba(255,255,255,0.2)", padding: "12px", borderRadius: "8px" }}>
              <div style={{ fontSize: "11px", opacity: 0.9 }}>KNO3 (Nitrat)</div>
              <div style={{ fontSize: "22px", fontWeight: "700", marginTop: "5px" }}>
                {eiDozaj.kno3}g
              </div>
              <div style={{ fontSize: "10px", opacity: 0.8, marginTop: "3px" }}>Haftada 3x</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.2)", padding: "12px", borderRadius: "8px" }}>
              <div style={{ fontSize: "11px", opacity: 0.9 }}>KH2PO4 (Fosfat)</div>
              <div style={{ fontSize: "22px", fontWeight: "700", marginTop: "5px" }}>
                {eiDozaj.kh2po4}g
              </div>
              <div style={{ fontSize: "10px", opacity: 0.8, marginTop: "3px" }}>Haftada 3x</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.2)", padding: "12px", borderRadius: "8px" }}>
              <div style={{ fontSize: "11px", opacity: 0.9 }}>K2SO4 (Potasyum)</div>
              <div style={{ fontSize: "22px", fontWeight: "700", marginTop: "5px" }}>
                {eiDozaj.k2so4}g
              </div>
              <div style={{ fontSize: "10px", opacity: 0.8, marginTop: "3px" }}>Haftada 3x</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.2)", padding: "12px", borderRadius: "8px" }}>
              <div style={{ fontSize: "11px", opacity: 0.9 }}>MgSO4 (Magnezyum)</div>
              <div style={{ fontSize: "22px", fontWeight: "700", marginTop: "5px" }}>
                {eiDozaj.mgso4}g
              </div>
              <div style={{ fontSize: "10px", opacity: 0.8, marginTop: "3px" }}>Haftada 3x</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.2)", padding: "12px", borderRadius: "8px" }}>
              <div style={{ fontSize: "11px", opacity: 0.9 }}>Mikro Mix</div>
              <div style={{ fontSize: "22px", fontWeight: "700", marginTop: "5px" }}>
                {eiDozaj.mikro}ml
              </div>
              <div style={{ fontSize: "10px", opacity: 0.8, marginTop: "3px" }}>Haftada 3x</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.2)", padding: "12px", borderRadius: "8px" }}>
              <div style={{ fontSize: "11px", opacity: 0.9 }}>Fe (Demir)</div>
              <div style={{ fontSize: "22px", fontWeight: "700", marginTop: "5px" }}>
                {eiDozaj.demir}ml
              </div>
              <div style={{ fontSize: "10px", opacity: 0.8, marginTop: "3px" }}>Haftada 3x</div>
            </div>
          </div>
          <div style={{ fontSize: "11px", opacity: 0.85, marginTop: "15px", lineHeight: "1.6" }}>
            📅 <strong>Program:</strong> Pazartesi, Çarşamba, Cuma → Makro gübre | Salı, Perşembe, Cumartesi → Mikro gübre | Pazar → %50 su değişimi
          </div>
        </div>

        {/* PPS-PRO METODU */}
        <div style={{
          background: "rgba(255,255,255,0.15)",
          padding: "20px",
          borderRadius: "12px"
        }}>
          <h4 style={{ margin: "0 0 15px 0", fontSize: "18px" }}>
            🧪 PPS-Pro Metodu - Günlük Dozaj
          </h4>
          <div style={{ fontSize: "12px", opacity: 0.9, marginBottom: "15px" }}>
            Düşük doz, günlük gübreleme, minimal su değişimi
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "15px"
          }}>
            <div style={{ background: "rgba(255,255,255,0.2)", padding: "12px", borderRadius: "8px" }}>
              <div style={{ fontSize: "11px", opacity: 0.9 }}>KNO3</div>
              <div style={{ fontSize: "22px", fontWeight: "700", marginTop: "5px" }}>
                {ppsDozaj.kno3}g
              </div>
              <div style={{ fontSize: "10px", opacity: 0.8, marginTop: "3px" }}>Her gün</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.2)", padding: "12px", borderRadius: "8px" }}>
              <div style={{ fontSize: "11px", opacity: 0.9 }}>KH2PO4</div>
              <div style={{ fontSize: "22px", fontWeight: "700", marginTop: "5px" }}>
                {ppsDozaj.kh2po4}g
              </div>
              <div style={{ fontSize: "10px", opacity: 0.8, marginTop: "3px" }}>Her gün</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.2)", padding: "12px", borderRadius: "8px" }}>
              <div style={{ fontSize: "11px", opacity: 0.9 }}>Mikro Mix</div>
              <div style={{ fontSize: "22px", fontWeight: "700", marginTop: "5px" }}>
                {ppsDozaj.mikro}ml
              </div>
              <div style={{ fontSize: "10px", opacity: 0.8, marginTop: "3px" }}>Her gün</div>
            </div>
          </div>
          <div style={{ fontSize: "11px", opacity: 0.85, marginTop: "15px", lineHeight: "1.6" }}>
            📅 <strong>Program:</strong> Her gün aynı dozaj | 2 haftada 1 kez %30 su değişimi
          </div>
        </div>
      </div>

      {/* HAFTALIK ÖZET */}
      {haftalikOzet().length > 0 && (
        <div style={{
          background: "#e8f5e9",
          border: "2px solid #4caf50",
          borderRadius: "12px",
          padding: "15px",
          marginBottom: "30px"
        }}>
          <h4 style={{ margin: "0 0 10px 0", color: "#2e7d32" }}>
            📅 Bu Hafta: {haftalikOzet().length} gübreleme yapıldı
          </h4>
          <div style={{ fontSize: "13px", color: "#2e7d32" }}>
            {haftalikOzet().filter(g => g.tip === "makro").length} makro, {" "}
            {haftalikOzet().filter(g => g.tip === "mikro").length} mikro, {" "}
            {haftalikOzet().filter(g => g.tip === "co2").length} CO2
          </div>
        </div>
      )}

      {/* FORM */}
      <div style={{
        background: "white",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        marginBottom: "30px"
      }}>
        <h3 style={{ marginTop: 0, color: "#ffffff" }}>Gübreleme Kaydı Ekle</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#ffffff" }}>
                Tarih & Saat
              </label>
              <input
                type="datetime-local"
                value={form.tarih}
                onChange={(e) => setForm({ ...form, tarih: e.target.value })}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "2px solid #e0e0e0",
                  borderRadius: "8px",
                  fontSize: "14px"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#ffffff" }}>
                Gübre Tipi
              </label>
              <select
                value={form.tip}
                onChange={(e) => setForm({ ...form, tip: e.target.value, urun: "" })}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "2px solid #e0e0e0",
                  borderRadius: "8px",
                  fontSize: "14px"
                }}
              >
                <option value="makro">🌿 Makro Besinler (NPK)</option>
                <option value="mikro">🧪 Mikro Besinler (Trace)</option>
                <option value="co2">💨 CO2</option>
                <option value="tum">🌱 Tüm Besinler</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#ffffff" }}>
                Ürün/Gübre
              </label>
              <select
                value={form.urun}
                onChange={(e) => setForm({ ...form, urun: e.target.value })}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "2px solid #e0e0e0",
                  borderRadius: "8px",
                  fontSize: "14px"
                }}
              >
                <option value="">Seçiniz...</option>
                {gubreTipleri[form.tip].map(urun => (
                  <option key={urun.id} value={urun.name}>
                    {urun.name} - {urun.icerik}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#ffffff" }}>
                Dozaj
              </label>
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  type="number"
                  step="0.1"
                  value={form.doz}
                  onChange={(e) => setForm({ ...form, doz: e.target.value })}
                  required
                  placeholder="Miktar"
                  style={{
                    flex: 1,
                    padding: "10px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "8px",
                    fontSize: "14px"
                  }}
                />
                <select
                  value={form.birim}
                  onChange={(e) => setForm({ ...form, birim: e.target.value })}
                  style={{
                    padding: "10px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "8px",
                    fontSize: "14px"
                  }}
                >
                  <option value="ml">ml</option>
                  <option value="g">gram</option>
                  <option value="pump">pompa</option>
                  <option value="tsp">çay kaşığı</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#ffffff" }}>
                Gübreleme Metodu
              </label>
              <select
                value={form.metod}
                onChange={(e) => setForm({ ...form, metod: e.target.value })}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "2px solid #e0e0e0",
                  borderRadius: "8px",
                  fontSize: "14px"
                }}
              >
                <option value="ei">EI (Estimative Index)</option>
                <option value="pps-pro">PPS-Pro</option>
                <option value="manuel">Manuel/Özel</option>
              </select>
              <small style={{ fontSize: "11px", color: "#9CA3AF", display: "block", marginTop: "5px" }}>
                {form.metod === "ei" && "Hafta 3x makro + 3x mikro, Pazar %50 su değişimi"}
                {form.metod === "pps-pro" && "Günlük düşük doz, az ışık, yavaş büyüme"}
                {form.metod === "manuel" && "Kendi programınız"}
              </small>
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#ffffff" }}>
              Notlar
            </label>
            <textarea
              value={form.notlar}
              onChange={(e) => setForm({ ...form, notlar: e.target.value })}
              placeholder="Bitkilerinizin durumu, renklenme, büyüme hızı vb..."
              rows="3"
              style={{
                width: "100%",
                padding: "10px",
                border: "2px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "14px",
                fontFamily: "inherit",
                resize: "vertical"
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              marginTop: "20px",
              width: "100%",
              background: "linear-gradient(135deg, #27ae60 0%, #229954 100%)",
              color: "white",
              border: "none",
              padding: "15px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(39, 174, 96, 0.4)"
            }}
          >
            🌱 Gübreleme Kaydını Ekle
          </button>
        </form>
      </div>

      {/* GEÇMİŞ */}
      <div>
        <h3 style={{ color: "#ffffff", marginBottom: "20px" }}>📋 Gübreleme Geçmişi</h3>
        {gubreleme.length === 0 ? (
          <div style={{
            background: "#f8f9fa",
            padding: "40px",
            borderRadius: "12px",
            textAlign: "center",
            color: "#9CA3AF"
          }}>
            Henüz gübreleme kaydı yok.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {gubreleme.map((kayit) => (
              <div
                key={kayit.id}
                style={{
                  background: "white",
                  border: "1px solid #e0e0e0",
                  borderRadius: "12px",
                  padding: "20px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "15px" }}>
                  <div>
                    <div style={{
                      display: "inline-block",
                      background: kayit.tip === "makro" ? "#4caf50" 
                                : kayit.tip === "mikro" ? "#2196f3"
                                : kayit.tip === "co2" ? "#9c27b0"
                                : "#ff9800",
                      color: "white",
                      padding: "4px 12px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: "700",
                      marginBottom: "8px"
                    }}>
                      {kayit.tip === "makro" ? "🌿 MAKRO" 
                     : kayit.tip === "mikro" ? "🧪 MİKRO"
                     : kayit.tip === "co2" ? "💨 CO2"
                     : "🌱 TÜM BESİNLER"}
                    </div>
                    <div style={{ fontSize: "16px", fontWeight: "700", color: "#ffffff", marginBottom: "5px" }}>
                      {kayit.urun}
                    </div>
                    <div style={{ fontSize: "14px", color: "#9CA3AF" }}>
                      {new Date(kayit.tarih).toLocaleString('tr-TR')}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "28px", fontWeight: "700", color: "#27ae60" }}>
                      {kayit.doz} {kayit.birim}
                    </div>
                    <div style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "5px" }}>
                      {kayit.hacim}L | {kayit.teknoloji?.toUpperCase() || "N/A"}
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <strong style={{ color: "#ffffff", fontSize: "13px" }}>Metod:</strong>{" "}
                  <span style={{ 
                    background: "#f0f0f0",
                    padding: "3px 10px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#ffffff"
                  }}>
                    {kayit.metod === "ei" ? "EI (Estimative Index)" 
                   : kayit.metod === "pps-pro" ? "PPS-Pro"
                   : "Manuel"}
                  </span>
                </div>

                {kayit.notlar && (
                  <div style={{
                    background: "#f8f9fa",
                    padding: "12px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    color: "#ffffff",
                    marginBottom: "15px"
                  }}>
                    <strong>Not:</strong> {kayit.notlar}
                  </div>
                )}

                <button
                  onClick={() => handleSil(kayit.id)}
                  style={{
                    background: "#e74c3c",
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    fontWeight: "600",
                    cursor: "pointer",
                    fontSize: "13px"
                  }}
                >
                  🗑️ Sil
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BİLGİ KUTUSU */}
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "30px"
      }}>
        <h4 style={{ margin: "0 0 15px 0" }}>💡 Gübreleme Bilgi Bankası</h4>
        <div style={{ fontSize: "13px", lineHeight: "1.8" }}>
          <strong>Kaynaklar:</strong>
          <ul style={{ marginTop: "5px", paddingLeft: "20px" }}>
            <li>Estimative Index (EI) - Tom Barr, 2004</li>
            <li>Perpetual Preservation System (PPS-Pro) - Edward, Sears & Conlin, 2007</li>
            <li>The Planted Aquarium - Diana Walstad, 2013</li>
            <li>ADA (Aqua Design Amano) - Takashi Amano</li>
          </ul>

          <strong style={{ display: "block", marginTop: "15px" }}>Gübreleme Prensipleri:</strong>
          <ul style={{ marginTop: "5px", paddingLeft: "20px" }}>
            <li><strong>Low-Tech:</strong> 0.25-0.5 W/L ışık, CO2 yok, minimal gübre, yavaş büyüyen bitkiler</li>
            <li><strong>Mid-Tech:</strong> 0.5-1 W/L ışık, sıvı CO2, orta gübre, standart bitkiler</li>
            <li><strong>High-Tech:</strong> 1+ W/L ışık, basınçlı CO2, yoğun gübre, hızlı büyüme</li>
          </ul>

          <strong style={{ display: "block", marginTop: "15px" }}>Liebig Yasası (Minimum Kanunu):</strong>
          <ul style={{ marginTop: "5px", paddingLeft: "20px" }}>
            <li>Büyüme en az olan besin tarafından sınırlandırılır</li>
            <li>Tek bir besin eksikliği tüm sistemİ etkiler</li>
            <li>Dengeli gübreleme = Daha az alg</li>
          </ul>

          <strong style={{ display: "block", marginTop: "15px" }}>Redfield Oranı (N:P):</strong>
          <ul style={{ marginTop: "5px", paddingLeft: "20px" }}>
            <li>Deniz suyu: 16:1 (Nitrat:Fosfat)</li>
            <li>Tatlı su bitkileri: 10:1 - 20:1 arası ideal</li>
            <li>EI metodu: ~20:1 hedefler</li>
          </ul>
        </div>
      </div>
    </div>
  );
}