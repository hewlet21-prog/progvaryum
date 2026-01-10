import React, { useState } from "react";
import { useAkvaryumStorage } from "../../hooks/useAkvaryumStorage";

const TEST_PARAMETRELERI = [
  { id: "ph", label: "pH", min: 5.5, max: 8.5, ideal: "6.5-7.5", unit: "", icon: "🔵" },
  { id: "gh", label: "GH", min: 0, max: 30, ideal: "4-8", unit: "°dH", icon: "💎" },
  { id: "kh", label: "KH", min: 0, max: 20, ideal: "3-6", unit: "°dH", icon: "🪨" },
  { id: "nh3", label: "Amonyak (NH3)", min: 0, max: 8, ideal: "0", unit: "mg/L", icon: "☠️" },
  { id: "no2", label: "Nitrit (NO2)", min: 0, max: 5, ideal: "0", unit: "mg/L", icon: "⚠️" },
  { id: "no3", label: "Nitrat (NO3)", min: 0, max: 100, ideal: "0-20", unit: "mg/L", icon: "🟢" },
  { id: "sicaklik", label: "Sıcaklık", min: 18, max: 32, ideal: "24-26", unit: "°C", icon: "🌡️" }
];

export default function TestKiti() {
  const [testler, setTestler] = useAkvaryumStorage("testKiti", []);
  const [formAcik, setFormAcik] = useState(false);
  const [yeniTest, setYeniTest] = useState({
    ph: "",
    gh: "",
    kh: "",
    nh3: "",
    no2: "",
    no3: "",
    sicaklik: "",
    notlar: ""
  });

  const handleKaydet = () => {
    const doluAlanlar = Object.values(yeniTest).filter(v => v && v.toString().trim()).length;
    if (doluAlanlar === 0 || (doluAlanlar === 1 && yeniTest.notlar.trim())) {
      alert("En az bir test değeri girin!");
      return;
    }

    const test = {
      ...yeniTest,
      id: Date.now(),
      tarih: new Date().toLocaleString("tr-TR")
    };

    setTestler([test, ...testler]);
    setFormAcik(false);
    setYeniTest({
      ph: "",
      gh: "",
      kh: "",
      nh3: "",
      no2: "",
      no3: "",
      sicaklik: "",
      notlar: ""
    });
    alert("Test sonuçları kaydedildi!");
  };

  const handleSil = (id) => {
    if (window.confirm("Bu test kaydını silmek istediğinize emin misiniz?")) {
      setTestler(testler.filter(t => t.id !== id));
    }
  };

  const analizYap = (testSonucu) => {
    const uyarilar = [];

    if (testSonucu.ph && (parseFloat(testSonucu.ph) < 6.0 || parseFloat(testSonucu.ph) > 8.0)) {
      uyarilar.push({ tip: "warning", mesaj: "pH ideal aralık dışında" });
    }
    if (testSonucu.nh3 && parseFloat(testSonucu.nh3) > 0.5) {
      uyarilar.push({ tip: "critical", mesaj: "Amonyak yüksek! Acil su değişimi" });
    }
    if (testSonucu.no2 && parseFloat(testSonucu.no2) > 0.5) {
      uyarilar.push({ tip: "critical", mesaj: "Nitrit yüksek! Bakteriyel denge bozuk" });
    }
    if (testSonucu.no3 && parseFloat(testSonucu.no3) > 40) {
      uyarilar.push({ tip: "warning", mesaj: "Nitrat yüksek! Su değişimi yapın" });
    }
    if (testSonucu.sicaklik && (parseFloat(testSonucu.sicaklik) < 22 || parseFloat(testSonucu.sicaklik) > 28)) {
      uyarilar.push({ tip: "warning", mesaj: "Sıcaklık ideal aralık dışında" });
    }

    return uyarilar;
  };

  return (
    <div>
      <h2>🧪 Test Kiti Kayıtları</h2>
      <p style={{ color: "#666", marginBottom: "30px" }}>
        Su parametrelerinizi düzenli test edin ve kaydedin
      </p>

      <button
        onClick={() => setFormAcik(!formAcik)}
        style={{
          padding: "12px 24px",
          background: "#9b59b6",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "15px",
          fontWeight: "600",
          cursor: "pointer",
          marginBottom: "25px"
        }}
      >
        {formAcik ? "❌ İptal" : "➕ Yeni Test Sonucu"}
      </button>

      {/* FORM */}
      {formAcik && (
        <div style={{ background: "#f9f5ff", borderRadius: "10px", padding: "25px", marginBottom: "30px", border: "2px solid #9b59b6" }}>
          <h3 style={{ marginTop: 0 }}>🧪 Test Değerleri</h3>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "15px", marginBottom: "20px" }}>
            {TEST_PARAMETRELERI.map(param => (
              <div key={param.id}>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "13px", fontWeight: "600", color: "#555" }}>
                  {param.icon} {param.label}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={yeniTest[param.id]}
                  onChange={(e) => setYeniTest({ ...yeniTest, [param.id]: e.target.value })}
                  placeholder={`İdeal: ${param.ideal}`}
                  style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}
                />
                <div style={{ fontSize: "11px", color: "#999", marginTop: "3px" }}>
                  {param.unit && `(${param.unit})`} İdeal: {param.ideal}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#555" }}>
              Notlar
            </label>
            <textarea
              value={yeniTest.notlar}
              onChange={(e) => setYeniTest({ ...yeniTest, notlar: e.target.value })}
              placeholder="Su bulanık, renk değişimi vs..."
              rows="2"
              style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px", resize: "vertical" }}
            />
          </div>

          <button
            onClick={handleKaydet}
            style={{
              width: "100%",
              padding: "12px",
              background: "#9b59b6",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            ✅ Testi Kaydet
          </button>
        </div>
      )}

      {/* GEÇMİŞ */}
      <div>
        <h3>📋 Test Geçmişi</h3>
        {testler.length === 0 ? (
          <p style={{ color: "#999", textAlign: "center", padding: "40px" }}>Henüz test kaydı yok</p>
        ) : (
          <div style={{ display: "grid", gap: "15px" }}>
            {testler.map(test => {
              const uyarilar = analizYap(test);
              const kritikUyari = uyarilar.some(u => u.tip === "critical");

              return (
                <div
                  key={test.id}
                  style={{
                    background: kritikUyari ? "#fff5f5" : "#f8f9fa",
                    border: `2px solid ${kritikUyari ? "#e74c3c" : "#e0e0e0"}`,
                    borderRadius: "10px",
                    padding: "20px"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                    <div>
                      <h4 style={{ margin: "0 0 5px 0", color: "#2c3e50" }}>
                        🧪 Test Sonuçları
                      </h4>
                      <p style={{ margin: "0", fontSize: "13px", color: "#7f8c8d" }}>
                        {test.tarih}
                      </p>
                    </div>
                    <button
                      onClick={() => handleSil(test.id)}
                      style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer" }}
                    >
                      🗑️
                    </button>
                  </div>

                  {/* UYARILAR */}
                  {uyarilar.length > 0 && (
                    <div style={{ marginBottom: "15px" }}>
                      {uyarilar.map((uyari, idx) => (
                        <div
                          key={idx}
                          style={{
                            background: uyari.tip === "critical" ? "#fee" : "#fff3cd",
                            color: uyari.tip === "critical" ? "#c00" : "#856404",
                            padding: "10px",
                            borderRadius: "6px",
                            marginBottom: "8px",
                            fontSize: "13px",
                            fontWeight: "600"
                          }}
                        >
                          {uyari.tip === "critical" ? "🚨" : "⚠️"} {uyari.mesaj}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* DEĞERLER */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: "10px", marginBottom: "15px" }}>
                    {TEST_PARAMETRELERI.map(param => {
                      if (!test[param.id]) return null;
                      return (
                        <div key={param.id} style={{ background: "white", padding: "10px", borderRadius: "6px", textAlign: "center" }}>
                          <div style={{ fontSize: "20px", marginBottom: "3px" }}>{param.icon}</div>
                          <div style={{ fontSize: "18px", fontWeight: "700", color: "#2c3e50" }}>
                            {test[param.id]}
                          </div>
                          <div style={{ fontSize: "11px", color: "#7f8c8d" }}>
                            {param.label}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {test.notlar && (
                    <div style={{ fontSize: "14px", color: "#555", background: "white", padding: "12px", borderRadius: "6px" }}>
                      📝 {test.notlar}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}