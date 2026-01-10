import React, { useState } from "react";
import { useSafeStorage } from "../../hooks/useSafeStorage";

export default function SumpTemizlik() {
  const [sumpTemizlik, setSumpTemizlik] = useSafeStorage("sumpTemizlik", []);
  const [sumpCounter, setSumpCounter] = useSafeStorage("sumpCounter", 0);

  const [form, setForm] = useState({
    tarih: new Date().toISOString().slice(0, 16),
    mekanikFiltre: false,
    biyolojikFiltre: false,
    protein: false,
    uv: false,
    pompa: false,
    isitici: false,
    kireçCozme: false,
    suSeviyesi: "",
    notlar: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const temizlik = {
      id: Date.now(),
      tarih: form.tarih,
      mekanikFiltre: form.mekanikFiltre,
      biyolojikFiltre: form.biyolojikFiltre,
      protein: form.protein,
      uv: form.uv,
      pompa: form.pompa,
      isitici: form.isitici,
      kireçCozme: form.kireçCozme,
      suSeviyesi: form.suSeviyesi,
      notlar: form.notlar
    };

    setSumpTemizlik([temizlik, ...sumpTemizlik]);
    setSumpCounter(0); // Sayacı sıfırla

    setForm({
      tarih: new Date().toISOString().slice(0, 16),
      mekanikFiltre: false,
      biyolojikFiltre: false,
      protein: false,
      uv: false,
      pompa: false,
      isitici: false,
      kireçCozme: false,
      suSeviyesi: "",
      notlar: ""
    });

    alert("✅ Sump temizliği kaydedildi!");
  };

  const handleSil = (id) => {
    if (window.confirm("Bu kaydı silmek istediğinize emin misiniz?")) {
      setSumpTemizlik(sumpTemizlik.filter(t => t.id !== id));
    }
  };

  // Sayaç güncellemesi (her gün artar)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setSumpCounter(prev => prev + 1);
    }, 24 * 60 * 60 * 1000); // Her 24 saatte bir
    
    return () => clearInterval(interval);
  }, [setSumpCounter]);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginTop: 0, color: "#ffffff" }}>🔧 Sump Temizliği</h2>
      <p style={{ color: "#9CA3AF", marginBottom: "30px" }}>
        Sump filtrasyon sisteminizdeki tüm bileşenleri düzenli olarak temizleyin ve kaydedin.
      </p>

      {/* SON TEMİZLİK UYARISI */}
      <div style={{
        background: sumpCounter >= 30 ? "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)" 
                  : sumpCounter >= 21 ? "linear-gradient(135deg, #f39c12 0%, #e67e22 100%)"
                  : "linear-gradient(135deg, #27ae60 0%, #229954 100%)",
        color: "white",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "30px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
      }}>
        <h3 style={{ margin: "0 0 15px 0", fontSize: "18px" }}>
          {sumpCounter >= 30 ? "🚨 ACİL TEMİZLİK GEREKLİ!" 
         : sumpCounter >= 21 ? "⏰ TEMİZLİK ZAMANI YAKLAŞIYOR"
         : "✅ SUMP TEMİZ"}
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "15px" }}>
          <div>
            <div style={{ fontSize: "12px", opacity: 0.9 }}>Son Temizlik</div>
            <div style={{ fontSize: "24px", fontWeight: "700", marginTop: "5px" }}>
              {sumpCounter === 0 ? "Bugün" : `${sumpCounter} gün önce`}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "12px", opacity: 0.9 }}>Önerilen Periyot</div>
            <div style={{ fontSize: "20px", fontWeight: "600", marginTop: "5px" }}>
              21-30 gün
            </div>
          </div>
          <div>
            <div style={{ fontSize: "12px", opacity: 0.9 }}>Durum</div>
            <div style={{ fontSize: "20px", fontWeight: "600", marginTop: "5px" }}>
              {sumpCounter >= 30 ? "Gecikmiş" 
             : sumpCounter >= 21 ? "Yakında"
             : "Normal"}
            </div>
          </div>
        </div>
      </div>

      {/* FORM */}
      <div style={{
        background: "white",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        marginBottom: "30px"
      }}>
        <h3 style={{ marginTop: 0, color: "#ffffff" }}>Temizlik Kaydı Ekle</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#ffffff" }}>
              Temizlik Tarihi & Saati
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

          <div style={{ 
            background: "#f8f9fa", 
            padding: "20px", 
            borderRadius: "10px",
            marginBottom: "20px"
          }}>
            <h4 style={{ marginTop: 0, color: "#ffffff", marginBottom: "15px" }}>
              Temizlenen Bileşenler
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={form.mekanikFiltre}
                  onChange={(e) => setForm({ ...form, mekanikFiltre: e.target.checked })}
                  style={{ width: "18px", height: "18px" }}
                />
                <span style={{ fontWeight: "600", color: "#ffffff" }}>
                  🧽 Mekanik Filtre
                </span>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={form.biyolojikFiltre}
                  onChange={(e) => setForm({ ...form, biyolojikFiltre: e.target.checked })}
                  style={{ width: "18px", height: "18px" }}
                />
                <span style={{ fontWeight: "600", color: "#ffffff" }}>
                  🦠 Biyolojik Filtre
                </span>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={form.protein}
                  onChange={(e) => setForm({ ...form, protein: e.target.checked })}
                  style={{ width: "18px", height: "18px" }}
                />
                <span style={{ fontWeight: "600", color: "#ffffff" }}>
                  💨 Protein Skimmer
                </span>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={form.uv}
                  onChange={(e) => setForm({ ...form, uv: e.target.checked })}
                  style={{ width: "18px", height: "18px" }}
                />
                <span style={{ fontWeight: "600", color: "#ffffff" }}>
                  💡 UV Sterilizatör
                </span>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={form.pompa}
                  onChange={(e) => setForm({ ...form, pompa: e.target.checked })}
                  style={{ width: "18px", height: "18px" }}
                />
                <span style={{ fontWeight: "600", color: "#ffffff" }}>
                  🔄 Pompa
                </span>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={form.isitici}
                  onChange={(e) => setForm({ ...form, isitici: e.target.checked })}
                  style={{ width: "18px", height: "18px" }}
                />
                <span style={{ fontWeight: "600", color: "#ffffff" }}>
                  🌡️ Isıtıcı
                </span>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={form.kireçCozme}
                  onChange={(e) => setForm({ ...form, kireçCozme: e.target.checked })}
                  style={{ width: "18px", height: "18px" }}
                />
                <span style={{ fontWeight: "600", color: "#ffffff" }}>
                  🧪 Kireç Çözme (Sirke/Asit)
                </span>
              </label>
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#ffffff" }}>
              Su Seviyesi Kontrolü
            </label>
            <select
              value={form.suSeviyesi}
              onChange={(e) => setForm({ ...form, suSeviyesi: e.target.value })}
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
              <option value="normal">✅ Normal</option>
              <option value="dusuk">⚠️ Düşük (Tamamlandı)</option>
              <option value="yuksek">⚠️ Yüksek (Boşaltıldı)</option>
            </select>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#ffffff" }}>
              Notlar
            </label>
            <textarea
              value={form.notlar}
              onChange={(e) => setForm({ ...form, notlar: e.target.value })}
              placeholder="Temizlik sırasında fark ettiğiniz özel durumlar, değiştirilen parçalar, vb..."
              rows="4"
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
              width: "100%",
              background: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)",
              color: "white",
              border: "none",
              padding: "15px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(52, 152, 219, 0.4)"
            }}
          >
            ✅ Temizlik Kaydını Kaydet
          </button>
        </form>
      </div>

      {/* GEÇMİŞ */}
      <div>
        <h3 style={{ color: "#ffffff", marginBottom: "20px" }}>📋 Temizlik Geçmişi</h3>
        {sumpTemizlik.length === 0 ? (
          <div style={{
            background: "#f8f9fa",
            padding: "40px",
            borderRadius: "12px",
            textAlign: "center",
            color: "#9CA3AF"
          }}>
            Henüz sump temizliği kaydı yok.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {sumpTemizlik.map((temizlik) => (
              <div
                key={temizlik.id}
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
                    <div style={{ fontSize: "16px", fontWeight: "700", color: "#ffffff", marginBottom: "5px" }}>
                      🔧 Sump Temizliği
                    </div>
                    <div style={{ fontSize: "14px", color: "#9CA3AF" }}>
                      {new Date(temizlik.tarih).toLocaleString('tr-TR')}
                    </div>
                  </div>
                </div>

                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", 
                  gap: "10px",
                  marginBottom: "15px"
                }}>
                  {temizlik.mekanikFiltre && (
                    <div style={{ background: "#e8f5e9", padding: "8px 12px", borderRadius: "6px", fontSize: "13px", fontWeight: "600", color: "#27ae60" }}>
                      ✅ Mekanik Filtre
                    </div>
                  )}
                  {temizlik.biyolojikFiltre && (
                    <div style={{ background: "#e3f2fd", padding: "8px 12px", borderRadius: "6px", fontSize: "13px", fontWeight: "600", color: "#2196f3" }}>
                      ✅ Biyolojik Filtre
                    </div>
                  )}
                  {temizlik.protein && (
                    <div style={{ background: "#f3e5f5", padding: "8px 12px", borderRadius: "6px", fontSize: "13px", fontWeight: "600", color: "#9c27b0" }}>
                      ✅ Protein Skimmer
                    </div>
                  )}
                  {temizlik.uv && (
                    <div style={{ background: "#fff3e0", padding: "8px 12px", borderRadius: "6px", fontSize: "13px", fontWeight: "600", color: "#ff9800" }}>
                      ✅ UV Sterilizatör
                    </div>
                  )}
                  {temizlik.pompa && (
                    <div style={{ background: "#e0f2f1", padding: "8px 12px", borderRadius: "6px", fontSize: "13px", fontWeight: "600", color: "#009688" }}>
                      ✅ Pompa
                    </div>
                  )}
                  {temizlik.isitici && (
                    <div style={{ background: "#ffebee", padding: "8px 12px", borderRadius: "6px", fontSize: "13px", fontWeight: "600", color: "#f44336" }}>
                      ✅ Isıtıcı
                    </div>
                  )}
                  {temizlik.kireçCozme && (
                    <div style={{ background: "#fce4ec", padding: "8px 12px", borderRadius: "6px", fontSize: "13px", fontWeight: "600", color: "#e91e63" }}>
                      ✅ Kireç Çözme
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <strong style={{ color: "#ffffff" }}>Su Seviyesi:</strong>{" "}
                  <span style={{ 
                    color: temizlik.suSeviyesi === "normal" ? "#27ae60" : "#f39c12",
                    fontWeight: "600"
                  }}>
                    {temizlik.suSeviyesi === "normal" ? "✅ Normal" 
                   : temizlik.suSeviyesi === "dusuk" ? "⚠️ Düşük (Tamamlandı)"
                   : "⚠️ Yüksek (Boşaltıldı)"}
                  </span>
                </div>

                {temizlik.notlar && (
                  <div style={{
                    background: "#f8f9fa",
                    padding: "12px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    color: "#ffffff",
                    marginBottom: "15px"
                  }}>
                    <strong>Not:</strong> {temizlik.notlar}
                  </div>
                )}

                <button
                  onClick={() => handleSil(temizlik.id)}
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
        <h4 style={{ margin: "0 0 15px 0" }}>💡 Sump Bakım Rehberi</h4>
        <ul style={{ margin: 0, paddingLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>Mekanik Filtre:</strong> Haftada 1-2 kez yıkayın veya değiştirin</li>
          <li><strong>Biyolojik Filtre:</strong> Ayda 1 kez hafifçe durulay (klorunsuz su ile)</li>
          <li><strong>Protein Skimmer:</strong> Haftada 1 kez toplama kabını boşaltın, ayda 1 temizleyin</li>
          <li><strong>UV Sterilizatör:</strong> 6-12 ayda bir lamba değiştirin, 3 ayda bir temizleyin</li>
          <li><strong>Pompa:</strong> 3 ayda bir pervane ve giriş bölümünü temizleyin</li>
          <li><strong>Isıtıcı:</strong> Ayda 1 yosun ve kireç kontrolü yapın</li>
          <li><strong>Kireç Çözme:</strong> Beyaz kabuklanma varsa sirke veya sitrik asit kullanın</li>
          <li><strong>Su Seviyesi:</strong> Buharlaşma nedeniyle düzenli kontrol edin</li>
          <li><strong>Genel Temizlik:</strong> 21-30 günde bir kapsamlı temizlik yapın</li>
        </ul>
      </div>
    </div>
  );
}