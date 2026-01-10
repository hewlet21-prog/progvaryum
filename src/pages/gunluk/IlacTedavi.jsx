import React, { useState } from "react";
import { useAkvaryumStorage } from "../../hooks/useAkvaryumStorage";

export default function IlacTedavi() {
  const [tedaviler, setTedaviler] = useAkvaryumStorage("ilacTedavi", []);
  const [formAcik, setFormAcik] = useState(false);
  const [yeniTedavi, setYeniTedavi] = useState({
    balikTuru: "",
    hastalik: "",
    ilacAdi: "",
    doz: "",
    baslangic: new Date().toISOString().split('T')[0],
    sure: 7,
    notlar: ""
  });

  const handleEkle = () => {
    if (!yeniTedavi.ilacAdi.trim() || !yeniTedavi.balikTuru.trim()) {
      alert("Balık türü ve ilaç adı zorunludur!");
      return;
    }

    const tedavi = {
      ...yeniTedavi,
      id: Date.now(),
      aktif: true,
      tamamlananGun: 0
    };

    setTedaviler([...tedaviler, tedavi]);
    setFormAcik(false);
    setYeniTedavi({
      balikTuru: "",
      hastalik: "",
      ilacAdi: "",
      doz: "",
      baslangic: new Date().toISOString().split('T')[0],
      sure: 7,
      notlar: ""
    });
    alert("Tedavi kaydı oluşturuldu!");
  };

  const handleGunTamamla = (id) => {
    setTedaviler(
      tedaviler.map(t => {
        if (t.id === id) {
          const yeniGun = t.tamamlananGun + 1;
          return {
            ...t,
            tamamlananGun: yeniGun,
            aktif: yeniGun < parseInt(t.sure)
          };
        }
        return t;
      })
    );
  };

  const handleSil = (id) => {
    if (window.confirm("Bu tedaviyi silmek istediğinize emin misiniz?")) {
      setTedaviler(tedaviler.filter(t => t.id !== id));
    }
  };

  const aktifTedaviler = tedaviler.filter(t => t.aktif);
  const tamamlananTedaviler = tedaviler.filter(t => !t.aktif);

  return (
    <div>
      <h2>💊 İlaç / Tedavi Takibi</h2>
      <p style={{ color: "#666", marginBottom: "30px" }}>
        Hasta balıklarınız için tedavi sürecini takip edin
      </p>

      <button
        onClick={() => setFormAcik(!formAcik)}
        style={{
          padding: "12px 24px",
          background: "#e74c3c",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "15px",
          fontWeight: "600",
          cursor: "pointer",
          marginBottom: "25px"
        }}
      >
        {formAcik ? "❌ İptal" : "➕ Yeni Tedavi Başlat"}
      </button>

      {/* FORM */}
      {formAcik && (
        <div style={{ background: "#fff5f5", borderRadius: "10px", padding: "25px", marginBottom: "30px", border: "2px solid #e74c3c" }}>
          <h3 style={{ marginTop: 0 }}>💊 Tedavi Bilgileri</h3>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px", marginBottom: "15px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#555" }}>
                Balık Türü *
              </label>
              <input
                type="text"
                value={yeniTedavi.balikTuru}
                onChange={(e) => setYeniTedavi({ ...yeniTedavi, balikTuru: e.target.value })}
                placeholder="Örn: Guppy, Neon Tetra"
                style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#555" }}>
                Hastalık
              </label>
              <input
                type="text"
                value={yeniTedavi.hastalik}
                onChange={(e) => setYeniTedavi({ ...yeniTedavi, hastalik: e.target.value })}
                placeholder="Örn: İch, Mantar, Yüzgeç Çürümesi"
                style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px", marginBottom: "15px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#555" }}>
                İlaç Adı *
              </label>
              <input
                type="text"
                value={yeniTedavi.ilacAdi}
                onChange={(e) => setYeniTedavi({ ...yeniTedavi, ilacAdi: e.target.value })}
                placeholder="Örn: Sera Costapur"
                style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#555" }}>
                Doz
              </label>
              <input
                type="text"
                value={yeniTedavi.doz}
                onChange={(e) => setYeniTedavi({ ...yeniTedavi, doz: e.target.value })}
                placeholder="Örn: 10 damla / 10L"
                style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#555" }}>
                Başlangıç Tarihi
              </label>
              <input
                type="date"
                value={yeniTedavi.baslangic}
                onChange={(e) => setYeniTedavi({ ...yeniTedavi, baslangic: e.target.value })}
                style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#555" }}>
                Tedavi Süresi (Gün)
              </label>
              <input
                type="number"
                value={yeniTedavi.sure}
                onChange={(e) => setYeniTedavi({ ...yeniTedavi, sure: e.target.value })}
                style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#555" }}>
              Notlar
            </label>
            <textarea
              value={yeniTedavi.notlar}
              onChange={(e) => setYeniTedavi({ ...yeniTedavi, notlar: e.target.value })}
              placeholder="Yan etkiler, iyileşme durumu vs..."
              rows="2"
              style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px", resize: "vertical" }}
            />
          </div>

          <button
            onClick={handleEkle}
            style={{
              width: "100%",
              padding: "12px",
              background: "#e74c3c",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            ✅ Tedaviyi Başlat
          </button>
        </div>
      )}

      {/* AKTİF TEDAVİLER */}
      {aktifTedaviler.length > 0 && (
        <div style={{ marginBottom: "30px" }}>
          <h3>🚨 Aktif Tedaviler</h3>
          <div style={{ display: "grid", gap: "15px" }}>
            {aktifTedaviler.map(t => (
              <div key={t.id} style={{ background: "#fff5f5", border: "2px solid #e74c3c", borderRadius: "10px", padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "15px" }}>
                  <div>
                    <h4 style={{ margin: "0 0 5px 0", color: "#e74c3c" }}>
                      🐟 {t.balikTuru}
                    </h4>
                    {t.hastalik && (
                      <p style={{ margin: "0", fontSize: "13px", color: "#7f8c8d" }}>
                        Hastalık: {t.hastalik}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleSil(t.id)}
                    style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer" }}
                  >
                    🗑️
                  </button>
                </div>

                <div style={{ background: "white", borderRadius: "8px", padding: "15px", marginBottom: "15px" }}>
                  <div style={{ marginBottom: "10px" }}>
                    <strong>💊 İlaç:</strong> {t.ilacAdi}
                  </div>
                  {t.doz && (
                    <div style={{ marginBottom: "10px", fontSize: "14px", color: "#555" }}>
                      <strong>💉 Doz:</strong> {t.doz}
                    </div>
                  )}
                  <div style={{ fontSize: "14px", color: "#7f8c8d" }}>
                    📅 Başlangıç: {new Date(t.baslangic).toLocaleDateString("tr-TR")}
                  </div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontSize: "14px", fontWeight: "600" }}>İlerleme</span>
                    <span style={{ fontSize: "14px", fontWeight: "700", color: "#e74c3c" }}>
                      {t.tamamlananGun} / {t.sure} gün
                    </span>
                  </div>
                  <div style={{ width: "100%", height: "12px", background: "#ecf0f1", borderRadius: "6px", overflow: "hidden" }}>
                    <div
                      style={{
                        width: `${(t.tamamlananGun / parseInt(t.sure)) * 100}%`,
                        height: "100%",
                        background: "#e74c3c",
                        transition: "width 0.5s"
                      }}
                    />
                  </div>
                </div>

                {t.notlar && (
                  <div style={{ marginBottom: "15px", fontSize: "13px", color: "#555", background: "white", padding: "10px", borderRadius: "6px" }}>
                    📝 {t.notlar}
                  </div>
                )}

                <button
                  onClick={() => handleGunTamamla(t.id)}
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
                  ✅ Bugünün Dozunu Verdim
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAMAMLANAN TEDAVİLER */}
      {tamamlananTedaviler.length > 0 && (
        <div>
          <h3>✅ Tamamlanan Tedaviler</h3>
          <div style={{ display: "grid", gap: "15px" }}>
            {tamamlananTedaviler.map(t => (
              <div key={t.id} style={{ background: "#f0fff4", border: "2px solid #27ae60", borderRadius: "10px", padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h4 style={{ margin: "0 0 5px 0", color: "#27ae60" }}>
                      🐟 {t.balikTuru} - ✅ Tedavi Tamamlandı
                    </h4>
                    <p style={{ margin: "0", fontSize: "13px", color: "#7f8c8d" }}>
                      {t.ilacAdi} ({t.sure} gün)
                    </p>
                  </div>
                  <button
                    onClick={() => handleSil(t.id)}
                    style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer" }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tedaviler.length === 0 && (
        <p style={{ color: "#999", textAlign: "center", padding: "40px" }}>
          Henüz tedavi kaydı yok. Balıklarınızın sağlıklı olduğunu umuyoruz! 🐟💚
        </p>
      )}
    </div>
  );
}