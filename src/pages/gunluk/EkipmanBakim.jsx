import React, { useState } from "react";
import { useSafeStorage } from "../../hooks/useSafeStorage";

const EKIPMAN_TURLERI = [
  { id: "isik", label: "💡 Işık Ampulü", varsayilanGun: 180, icon: "💡" },
  { id: "co2", label: "🫧 CO2 Tüpü", varsayilanGun: 60, icon: "🫧" },
  { id: "hava", label: "🌬️ Hava Pompası", varsayilanGun: 365, icon: "🌬️" },
  { id: "isitici", label: "🔥 Isıtıcı", varsayilanGun: 730, icon: "🔥" },
  { id: "filtre", label: "⚙️ Filtre Motoru", varsayilanGun: 365, icon: "⚙️" },
  { id: "termometre", label: "🌡️ Termometre", varsayilanGun: 180, icon: "🌡️" }
];

export default function EkipmanBakim() {
  const [ekipmanlar, setEkipmanlar] = useSafeStorage("ekipmanBakim", []);
  const [formAcik, setFormAcik] = useState(false);
  const [yeniEkipman, setYeniEkipman] = useState({
    tur: "isik",
    marka: "",
    model: "",
    sonBakim: new Date().toISOString().split('T')[0],
    bakimAraligi: 180,
    notlar: ""
  });

  const handleEkle = () => {
    const ekipman = {
      ...yeniEkipman,
      id: Date.now(),
      eklemeTarihi: new Date().toLocaleString("tr-TR")
    };

    setEkipmanlar([...ekipmanlar, ekipman]);
    setFormAcik(false);
    setYeniEkipman({
      tur: "isik",
      marka: "",
      model: "",
      sonBakim: new Date().toISOString().split('T')[0],
      bakimAraligi: 180,
      notlar: ""
    });
  };

  const handleBakimYapildi = (id) => {
    setEkipmanlar(
      ekipmanlar.map(e =>
        e.id === id
          ? { ...e, sonBakim: new Date().toISOString().split('T')[0] }
          : e
      )
    );
    alert("Bakım tarihi güncellendi!");
  };

  const handleSil = (id) => {
    if (window.confirm("Bu ekipmanı silmek istediğinize emin misiniz?")) {
      setEkipmanlar(ekipmanlar.filter(e => e.id !== id));
    }
  };

  const kalanGun = (sonBakim, aralik) => {
    const bakim = new Date(sonBakim);
    const sonraki = new Date(bakim);
    sonraki.setDate(sonraki.getDate() + parseInt(aralik));
    const fark = Math.ceil((sonraki - new Date()) / (1000 * 60 * 60 * 24));
    return fark;
  };

  return (
    <div>
      <h2>🔧 Ekipman Bakımı</h2>
      <p style={{ color: "#666", marginBottom: "30px" }}>
        Akvaryum ekipmanlarınızın bakım zamanlamasını takip edin
      </p>

      <button
        onClick={() => setFormAcik(!formAcik)}
        style={{
          padding: "12px 24px",
          background: "#3498db",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "15px",
          fontWeight: "600",
          cursor: "pointer",
          marginBottom: "25px"
        }}
      >
        {formAcik ? "❌ İptal" : "➕ Yeni Ekipman Ekle"}
      </button>

      {/* FORM */}
      {formAcik && (
        <div style={{ background: "#f8f9fa", borderRadius: "10px", padding: "25px", marginBottom: "30px" }}>
          <h3 style={{ marginTop: 0 }}>➕ Ekipman Ekle</h3>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px", marginBottom: "15px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#555" }}>
                Ekipman Türü
              </label>
              <select
                value={yeniEkipman.tur}
                onChange={(e) => {
                  const secilen = EKIPMAN_TURLERI.find(t => t.id === e.target.value);
                  setYeniEkipman({ ...yeniEkipman, tur: e.target.value, bakimAraligi: secilen.varsayilanGun });
                }}
                style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}
              >
                {EKIPMAN_TURLERI.map(t => (
                  <option key={t.id} value={t.id}>{t.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#555" }}>
                Marka
              </label>
              <input
                type="text"
                value={yeniEkipman.marka}
                onChange={(e) => setYeniEkipman({ ...yeniEkipman, marka: e.target.value })}
                placeholder="Örn: Eheim"
                style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#555" }}>
                Model
              </label>
              <input
                type="text"
                value={yeniEkipman.model}
                onChange={(e) => setYeniEkipman({ ...yeniEkipman, model: e.target.value })}
                placeholder="Örn: Classic 250"
                style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#555" }}>
                Son Bakım Tarihi
              </label>
              <input
                type="date"
                value={yeniEkipman.sonBakim}
                onChange={(e) => setYeniEkipman({ ...yeniEkipman, sonBakim: e.target.value })}
                style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#555" }}>
                Bakım Aralığı (Gün)
              </label>
              <input
                type="number"
                value={yeniEkipman.bakimAraligi}
                onChange={(e) => setYeniEkipman({ ...yeniEkipman, bakimAraligi: e.target.value })}
                style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#555" }}>
              Notlar
            </label>
            <textarea
              value={yeniEkipman.notlar}
              onChange={(e) => setYeniEkipman({ ...yeniEkipman, notlar: e.target.value })}
              placeholder="Garanti süresi, satın alma tarihi vs..."
              rows="2"
              style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px", resize: "vertical" }}
            />
          </div>

          <button
            onClick={handleEkle}
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
            ✅ Ekle
          </button>
        </div>
      )}

      {/* LİSTE */}
      <div>
        <h3>📋 Ekipman Listesi</h3>
        {ekipmanlar.length === 0 ? (
          <p style={{ color: "#999", textAlign: "center", padding: "40px" }}>Henüz ekipman eklenmemiş</p>
        ) : (
          <div style={{ display: "grid", gap: "15px" }}>
            {ekipmanlar.map(e => {
              const kalan = kalanGun(e.sonBakim, e.bakimAraligi);
              const turBilgi = EKIPMAN_TURLERI.find(t => t.id === e.tur);
              const durum = kalan <= 0 ? "kritik" : kalan <= 7 ? "yakin" : "normal";

              return (
                <div
                  key={e.id}
                  style={{
                    background: durum === "kritik" ? "#fff5f5" : durum === "yakin" ? "#fffbeb" : "#f8f9fa",
                    border: `2px solid ${durum === "kritik" ? "#e74c3c" : durum === "yakin" ? "#f39c12" : "#e0e0e0"}`,
                    borderRadius: "10px",
                    padding: "20px"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "15px" }}>
                    <div>
                      <div style={{ fontSize: "24px", marginBottom: "5px" }}>{turBilgi?.icon}</div>
                      <h4 style={{ margin: "0 0 5px 0", color: "#2c3e50" }}>
                        {turBilgi?.label}
                      </h4>
                      {(e.marka || e.model) && (
                        <p style={{ margin: "0", fontSize: "13px", color: "#7f8c8d" }}>
                          {e.marka} {e.model}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleSil(e.id)}
                      style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer" }}
                    >
                      🗑️
                    </button>
                  </div>

                  <div style={{ marginBottom: "15px" }}>
                    <div style={{ fontSize: "32px", fontWeight: "700", color: durum === "kritik" ? "#e74c3c" : durum === "yakin" ? "#f39c12" : "#27ae60" }}>
                      {kalan > 0 ? `${kalan} gün` : "⚠️ Bakım zamanı!"}
                    </div>
                    <div style={{ fontSize: "13px", color: "#7f8c8d" }}>
                      Son bakım: {new Date(e.sonBakim).toLocaleDateString("tr-TR")}
                    </div>
                  </div>

                  {e.notlar && (
                    <div style={{ marginBottom: "15px", fontSize: "13px", color: "#555", background: "white", padding: "10px", borderRadius: "6px" }}>
                      📝 {e.notlar}
                    </div>
                  )}

                  <button
                    onClick={() => handleBakimYapildi(e.id)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      background: "#3498db",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer"
                    }}
                  >
                    ✅ Bakım Yapıldı
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}