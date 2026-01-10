import React, { useState } from "react";
import { useAkvaryumStorage } from "../../hooks/useAkvaryumStorage";

export default function Gozlem() {
  const [gozlemler, setGozlemler] = useAkvaryumStorage("gozlemler", []);
  const [yeniGozlem, setYeniGozlem] = useState({
    balikDavranis: "",
    suDurumu: "berrak",
    algDurumu: "yok",
    hastaBalik: false,
    ekipmanSorun: false,
    notlar: ""
  });

  const handleKaydet = () => {
    if (!yeniGozlem.notlar.trim() && !yeniGozlem.balikDavranis.trim()) {
      alert("En azından bir gözlem notu girin!");
      return;
    }

    const gozlem = {
      ...yeniGozlem,
      tarih: new Date().toLocaleString("tr-TR"),
      id: Date.now()
    };

    setGozlemler([gozlem, ...gozlemler]);
    setYeniGozlem({
      balikDavranis: "",
      suDurumu: "berrak",
      algDurumu: "yok",
      hastaBalik: false,
      ekipmanSorun: false,
      notlar: ""
    });
    alert("Gözlem kaydedildi!");
  };

  const handleSil = (id) => {
    if (window.confirm("Bu gözlemi silmek istediğinize emin misiniz?")) {
      setGozlemler(gozlemler.filter(g => g.id !== id));
    }
  };

  return (
    <div>
      <h2>📝 Günlük Gözlem Kaydı</h2>
      <p style={{ color: "#666", marginBottom: "30px" }}>
        Akvaryumunuzdaki değişiklikleri, gözlemlerinizi kaydedin
      </p>

      {/* FORM */}
      <div style={{ background: "#f8f9fa", borderRadius: "10px", padding: "25px", marginBottom: "30px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginBottom: "20px" }}>
          
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#555" }}>
              💧 Su Durumu
            </label>
            <select
              value={yeniGozlem.suDurumu}
              onChange={(e) => setYeniGozlem({ ...yeniGozlem, suDurumu: e.target.value })}
              style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}
            >
              <option value="berrak">✅ Berrak</option>
              <option value="hafif-bulanik">⚠️ Hafif Bulanık</option>
              <option value="bulanik">❌ Bulanık</option>
              <option value="yesil">🟢 Yeşil (Alg)</option>
              <option value="sari">🟡 Sarı</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#555" }}>
              🌿 Alg Durumu
            </label>
            <select
              value={yeniGozlem.algDurumu}
              onChange={(e) => setYeniGozlem({ ...yeniGozlem, algDurumu: e.target.value })}
              style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}
            >
              <option value="yok">✅ Yok</option>
              <option value="az">⚠️ Az Miktarda</option>
              <option value="orta">❗ Orta Seviye</option>
              <option value="cok">❌ Çok Fazla</option>
            </select>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "20px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px", background: "white", borderRadius: "8px", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={yeniGozlem.hastaBalik}
              onChange={(e) => setYeniGozlem({ ...yeniGozlem, hastaBalik: e.target.checked })}
              style={{ width: "20px", height: "20px" }}
            />
            <span style={{ fontSize: "14px", fontWeight: "600" }}>🩺 Hasta Balık Gözlemlendi</span>
          </label>

          <label style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px", background: "white", borderRadius: "8px", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={yeniGozlem.ekipmanSorun}
              onChange={(e) => setYeniGozlem({ ...yeniGozlem, ekipmanSorun: e.target.checked })}
              style={{ width: "20px", height: "20px" }}
            />
            <span style={{ fontSize: "14px", fontWeight: "600" }}>⚠️ Ekipman Sorunu Var</span>
          </label>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#555" }}>
            🐟 Balık Davranışları
          </label>
          <input
            type="text"
            value={yeniGozlem.balikDavranis}
            onChange={(e) => setYeniGozlem({ ...yeniGozlem, balikDavranis: e.target.value })}
            placeholder="Örn: Guppyler çok aktif, neon'lar sakin..."
            style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#555" }}>
            📋 Genel Notlar
          </label>
          <textarea
            value={yeniGozlem.notlar}
            onChange={(e) => setYeniGozlem({ ...yeniGozlem, notlar: e.target.value })}
            placeholder="Bugün dikkatinizi çeken her şeyi yazın..."
            rows="4"
            style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px", resize: "vertical" }}
          />
        </div>

        <button
          onClick={handleKaydet}
          style={{
            width: "100%",
            padding: "15px",
            background: "#27ae60",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          ✅ Gözlemi Kaydet
        </button>
      </div>

      {/* GEÇMİŞ */}
      <div>
        <h3>📋 Gözlem Geçmişi</h3>
        {gozlemler.length === 0 ? (
          <p style={{ color: "#999", textAlign: "center", padding: "40px" }}>Henüz gözlem kaydı yok</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {gozlemler.map(g => (
              <div key={g.id} style={{ background: "#f8f9fa", border: "1px solid #e0e0e0", borderRadius: "10px", padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                  <span style={{ fontWeight: "600", color: "#2c3e50" }}>{g.tarih}</span>
                  <button
                    onClick={() => handleSil(g.id)}
                    style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer" }}
                  >
                    🗑️
                  </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "10px", marginBottom: "15px" }}>
                  <div style={{ fontSize: "13px" }}>
                    💧 Su: <strong>{g.suDurumu}</strong>
                  </div>
                  <div style={{ fontSize: "13px" }}>
                    🌿 Alg: <strong>{g.algDurumu}</strong>
                  </div>
                  {g.hastaBalik && <div style={{ fontSize: "13px", color: "#e74c3c" }}>🩺 Hasta balık var</div>}
                  {g.ekipmanSorun && <div style={{ fontSize: "13px", color: "#e67e22" }}>⚠️ Ekipman sorunu</div>}
                </div>

                {g.balikDavranis && (
                  <div style={{ marginBottom: "10px", fontSize: "14px" }}>
                    <strong>🐟 Davranış:</strong> {g.balikDavranis}
                  </div>
                )}

                {g.notlar && (
                  <div style={{ fontSize: "14px", color: "#555", background: "white", padding: "10px", borderRadius: "6px" }}>
                    📝 {g.notlar}
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