import React, { useState } from "react";
import { useAkvaryumStorage } from "../../hooks/useAkvaryumStorage";

const BITKI_TURLERI = [
  "Anubias",
  "Java Fern",
  "Amazon Sword",
  "Cryptocoryne",
  "Vallisneria",
  "Rotala",
  "Ludwigia",
  "Cabomba",
  "Hornwort",
  "Java Moss",
  "Riccia",
  "Monte Carlo",
  "Hygrophila",
  "Bucephalandra",
  "Staurogyne Repens",
  "Alternanthera",
  "Pogostemon",
  "Dwarf Hairgrass"
];

const BUDAMA_SEVIYELERI = [
  { value: 'hafif', label: '🍃 Hafif (%10-20)', desc: 'Sadece sararan yapraklar' },
  { value: 'normal', label: '✂️ Normal (%30-50)', desc: 'Standart bakım budaması' },
  { value: 'agir', label: '🪓 Ağır (%50-70)', desc: 'Yoğun kısaltma' },
  { value: 'kokten', label: '🔥 Kökten (%70+)', desc: 'Radikal yenileme' }
];

export default function BitkiBudama() {
  const [budamalar, setBudamalar] = useAkvaryumStorage("bitkiBudama", []);
  const [formAcik, setFormAcik] = useState(false);
  const [yeniBudama, setYeniBudama] = useState({
    bitkiTuru: "",
    budamaTipi: "normal",
    miktar: "",
    yeniFiliz: false,
    gubreEklendi: false,
    co2Ayar: false,
    notlar: ""
  });

  const handleKaydet = () => {
    if (!yeniBudama.bitkiTuru.trim()) {
      alert("Bitki türü seçin veya girin!");
      return;
    }

    const budama = {
      ...yeniBudama,
      id: Date.now(),
      tarih: new Date().toLocaleString("tr-TR")
    };

    setBudamalar([budama, ...budamalar]);
    setFormAcik(false);
    setYeniBudama({
      bitkiTuru: "",
      budamaTipi: "normal",
      miktar: "",
      yeniFiliz: false,
      gubreEklendi: false,
      co2Ayar: false,
      notlar: ""
    });
    alert("Budama kaydedildi!");
  };

  const handleSil = (id) => {
    if (window.confirm("Bu kaydı silmek istediğinize emin misiniz?")) {
      setBudamalar(budamalar.filter(b => b.id !== id));
    }
  };

  return (
    <div>
      <h2 style={{ color: "#ffffff" }}>🌱 Bitki Budama & Bakımı</h2>
      <p style={{ color: "#9CA3AF", marginBottom: "30px" }}>
        Akvaryum bitkilerinizin budama ve bakım kayıtları
      </p>

      <button
        onClick={() => setFormAcik(!formAcik)}
        style={{
          padding: "12px 24px",
          background: "#27ae60",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "15px",
          fontWeight: "600",
          cursor: "pointer",
          marginBottom: "25px"
        }}
      >
        {formAcik ? "❌ İptal" : "➕ Yeni Budama Kaydı"}
      </button>

      {/* FORM */}
      {formAcik && (
        <div style={{ background: "rgba(16, 185, 129, 0.1)", borderRadius: "10px", padding: "25px", marginBottom: "30px", border: "2px solid rgba(16, 185, 129, 0.3)" }}>
          <h3 style={{ marginTop: 0, color: "#10b981" }}>🌿 Budama Bilgileri</h3>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px", marginBottom: "15px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#E5E7EB" }}>
                Bitki Türü *
              </label>
              <select
                value={yeniBudama.bitkiTuru}
                onChange={(e) => setYeniBudama({ ...yeniBudama, bitkiTuru: e.target.value })}
                style={{ width: "100%", padding: "10px", background: "#1a2d3d", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "6px", fontSize: "14px", color: "#ffffff" }}
              >
                <option value="">Bitki Seçin</option>
                {BITKI_TURLERI.map(tur => (
                  <option key={tur} value={tur}>{tur}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#E5E7EB" }}>
                Budama Seviyesi
              </label>
              <select
                value={yeniBudama.budamaTipi}
                onChange={(e) => setYeniBudama({ ...yeniBudama, budamaTipi: e.target.value })}
                style={{ width: "100%", padding: "10px", background: "#1a2d3d", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "6px", fontSize: "14px", color: "#ffffff" }}
              >
                {BUDAMA_SEVIYELERI.map(seviye => (
                  <option key={seviye.value} value={seviye.value}>{seviye.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#E5E7EB" }}>
                Kesilen Miktar
              </label>
              <input
                type="text"
                value={yeniBudama.miktar}
                onChange={(e) => setYeniBudama({ ...yeniBudama, miktar: e.target.value })}
                placeholder="Örn: %30, 10 yaprak"
                style={{ width: "100%", padding: "10px", background: "#1a2d3d", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "6px", fontSize: "14px", color: "#ffffff" }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px", marginBottom: "20px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px", background: "rgba(255,255,255,0.05)", borderRadius: "8px", cursor: "pointer", color: "#E5E7EB" }}>
              <input
                type="checkbox"
                checked={yeniBudama.yeniFiliz}
                onChange={(e) => setYeniBudama({ ...yeniBudama, yeniFiliz: e.target.checked })}
                style={{ width: "18px", height: "18px" }}
              />
              <span style={{ fontSize: "14px", fontWeight: "600" }}>🌱 Yeni Filiz Var</span>
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px", background: "rgba(255,255,255,0.05)", borderRadius: "8px", cursor: "pointer", color: "#E5E7EB" }}>
              <input
                type="checkbox"
                checked={yeniBudama.gubreEklendi}
                onChange={(e) => setYeniBudama({ ...yeniBudama, gubreEklendi: e.target.checked })}
                style={{ width: "18px", height: "18px" }}
              />
              <span style={{ fontSize: "14px", fontWeight: "600" }}>💧 Gübre Eklendi</span>
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px", background: "rgba(255,255,255,0.05)", borderRadius: "8px", cursor: "pointer", color: "#E5E7EB" }}>
              <input
                type="checkbox"
                checked={yeniBudama.co2Ayar}
                onChange={(e) => setYeniBudama({ ...yeniBudama, co2Ayar: e.target.checked })}
                style={{ width: "18px", height: "18px" }}
              />
              <span style={{ fontSize: "14px", fontWeight: "600" }}>🫧 CO2 Ayarlandı</span>
            </label>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#E5E7EB" }}>
              Notlar
            </label>
            <textarea
              value={yeniBudama.notlar}
              onChange={(e) => setYeniBudama({ ...yeniBudama, notlar: e.target.value })}
              placeholder="Bitkinin durumu, renk değişimi, büyüme hızı vs..."
              rows="3"
              style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px", resize: "vertical" }}
            />
          </div>

          <button
            onClick={handleKaydet}
            style={{
              width: "100%",
              padding: "12px",
              background: "#27ae60",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            ✅ Budamayı Kaydet
          </button>
        </div>
      )}

      {/* GEÇMİŞ */}
      <div>
        <h3>📋 Budama Geçmişi</h3>
        {budamalar.length === 0 ? (
          <p style={{ color: "#999", textAlign: "center", padding: "40px" }}>Henüz budama kaydı yok</p>
        ) : (
          <div style={{ display: "grid", gap: "15px" }}>
            {budamalar.map(b => (
              <div key={b.id} style={{ background: "#f8f9fa", border: "1px solid #e0e0e0", borderRadius: "10px", padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "15px" }}>
                  <div>
                    <h4 style={{ margin: "0 0 5px 0", color: "#27ae60" }}>
                      🌱 {b.bitkiTuru}
                    </h4>
                    <p style={{ margin: "0", fontSize: "13px", color: "#9CA3AF" }}>
                      {b.tarih}
                    </p>
                  </div>
                  <button
                    onClick={() => handleSil(b.id)}
                    style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer" }}
                  >
                    🗑️
                  </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "10px", marginBottom: "15px" }}>
                  <div style={{ background: "white", padding: "10px", borderRadius: "6px", textAlign: "center" }}>
                    <div style={{ fontSize: "12px", color: "#9CA3AF", marginBottom: "3px" }}>Tip</div>
                    <div style={{ fontSize: "14px", fontWeight: "600" }}>
                      {b.budamaTipi === "normal" && "✂️ Normal"}
                      {b.budamaTipi === "agir" && "🪓 Ağır"}
                      {b.budamaTipi === "hafif" && "🍃 Hafif"}
                      {b.budamaTipi === "temizlik" && "🧹 Temizlik"}
                    </div>
                  </div>

                  {b.miktar && (
                    <div style={{ background: "white", padding: "10px", borderRadius: "6px", textAlign: "center" }}>
                      <div style={{ fontSize: "12px", color: "#9CA3AF", marginBottom: "3px" }}>Miktar</div>
                      <div style={{ fontSize: "14px", fontWeight: "600" }}>{b.miktar}</div>
                    </div>
                  )}
                </div>

                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "15px" }}>
                  {b.yeniFiliz && (
                    <span style={{ background: "#d4edda", color: "#155724", padding: "5px 12px", borderRadius: "15px", fontSize: "12px", fontWeight: "600" }}>
                      🌱 Yeni Filiz
                    </span>
                  )}
                  {b.gubreEklendi && (
                    <span style={{ background: "#d1ecf1", color: "#0c5460", padding: "5px 12px", borderRadius: "15px", fontSize: "12px", fontWeight: "600" }}>
                      💧 Gübre
                    </span>
                  )}
                  {b.co2Ayar && (
                    <span style={{ background: "#e2e3e5", color: "#383d41", padding: "5px 12px", borderRadius: "15px", fontSize: "12px", fontWeight: "600" }}>
                      🫧 CO2
                    </span>
                  )}
                </div>

                {b.notlar && (
                  <div style={{ fontSize: "14px", color: "#555", background: "white", padding: "12px", borderRadius: "6px" }}>
                    📝 {b.notlar}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}