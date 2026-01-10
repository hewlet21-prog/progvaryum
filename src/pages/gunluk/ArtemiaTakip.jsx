import React, { useState } from "react";
import { useAkvaryumStorage } from "../../hooks/useAkvaryumStorage";

export default function ArtemiaTakip() {
  const [artemiaTakip, setArtemiaTakip] = useAkvaryumStorage("artemiaTakip", []);
  const [aktifKuluçka, setAktifKuluçka] = useAkvaryumStorage("aktifKuluçka", null);

  const [form, setForm] = useState({
    baslangic: new Date().toISOString().slice(0, 16),
    miktar: "",
    tuzluluk: "30", // ppt
    sicaklik: "26", // °C
    havalandirma: true,
    isik: true,
    notlar: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const kuluçka = {
      id: Date.now(),
      baslangic: form.baslangic,
      bitis: new Date(new Date(form.baslangic).getTime() + 24 * 60 * 60 * 1000).toISOString(),
      miktar: form.miktar,
      tuzluluk: form.tuzluluk,
      sicaklik: form.sicaklik,
      havalandirma: form.havalandirma,
      isik: form.isik,
      notlar: form.notlar,
      durum: "devam-ediyor"
    };

    setArtemiaTakip([kuluçka, ...artemiaTakip]);
    setAktifKuluçka(kuluçka);

    setForm({
      baslangic: new Date().toISOString().slice(0, 16),
      miktar: "",
      tuzluluk: "30",
      sicaklik: "26",
      havalandirma: true,
      isik: true,
      notlar: ""
    });
  };

  const handleTamamla = (id) => {
    const updated = artemiaTakip.map(k => 
      k.id === id ? { ...k, durum: "tamamlandi", gercekBitis: new Date().toISOString() } : k
    );
    setArtemiaTakip(updated);
    if (aktifKuluçka?.id === id) {
      setAktifKuluçka(null);
    }
  };

  const handleSil = (id) => {
    if (window.confirm("Bu kuluçka kaydını silmek istediğinize emin misiniz?")) {
      setArtemiaTakip(artemiaTakip.filter(k => k.id !== id));
      if (aktifKuluçka?.id === id) {
        setAktifKuluçka(null);
      }
    }
  };

  // Kalan süreyi hesapla
  const getKalanSure = (kuluçka) => {
    if (kuluçka.durum === "tamamlandi") return "Tamamlandı";
    
    const bitis = new Date(kuluçka.bitis);
    const now = new Date();
    const diff = bitis - now;

    if (diff <= 0) return "🔔 Hazır!";

    const hours = Math.floor(diff / 3600000);
    const mins = Math.floor((diff / 60000) % 60);
    
    return `${hours}s ${mins}d`;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginTop: 0, color: "#ffffff" }}>🦐 Artemia Kuluçka Takibi</h2>
      <p style={{ color: "#9CA3AF", marginBottom: "30px" }}>
        Artemia yumurtalarınızı kuluçkaya yatırın ve 24 saatlik süreci takip edin.
      </p>

      {/* AKTİF KULUÇKA UYARISI */}
      {aktifKuluçka && aktifKuluçka.durum === "devam-ediyor" && (
        <div style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "30px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
        }}>
          <h3 style={{ margin: "0 0 15px 0", fontSize: "18px" }}>⏱️ Aktif Kuluçka Devam Ediyor</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "15px" }}>
            <div>
              <div style={{ fontSize: "12px", opacity: 0.9 }}>Kalan Süre</div>
              <div style={{ fontSize: "24px", fontWeight: "700", marginTop: "5px" }}>
                {getKalanSure(aktifKuluçka)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "12px", opacity: 0.9 }}>Miktar</div>
              <div style={{ fontSize: "20px", fontWeight: "600", marginTop: "5px" }}>
                {aktifKuluçka.miktar}g
              </div>
            </div>
            <div>
              <div style={{ fontSize: "12px", opacity: 0.9 }}>Tuzluluk</div>
              <div style={{ fontSize: "20px", fontWeight: "600", marginTop: "5px" }}>
                {aktifKuluçka.tuzluluk} ppt
              </div>
            </div>
            <div>
              <div style={{ fontSize: "12px", opacity: 0.9 }}>Sıcaklık</div>
              <div style={{ fontSize: "20px", fontWeight: "600", marginTop: "5px" }}>
                {aktifKuluçka.sicaklik}°C
              </div>
            </div>
          </div>
          <button
            onClick={() => handleTamamla(aktifKuluçka.id)}
            style={{
              marginTop: "15px",
              background: "rgba(255,255,255,0.2)",
              border: "2px solid white",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "14px"
            }}
          >
            ✅ Kuluçkayı Tamamla
          </button>
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
        <h3 style={{ marginTop: 0, color: "#ffffff" }}>Yeni Kuluçka Başlat</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#ffffff" }}>
                Başlangıç Zamanı
              </label>
              <input
                type="datetime-local"
                value={form.baslangic}
                onChange={(e) => setForm({ ...form, baslangic: e.target.value })}
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
                Yumurta Miktarı (gram)
              </label>
              <input
                type="number"
                step="0.1"
                value={form.miktar}
                onChange={(e) => setForm({ ...form, miktar: e.target.value })}
                required
                placeholder="Örn: 5"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "2px solid #e0e0e0",
                  borderRadius: "8px",
                  fontSize: "14px"
                }}
              />
              <small style={{ color: "#9CA3AF", fontSize: "12px" }}>
                1g ≈ 200.000 yumurta
              </small>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#ffffff" }}>
                Tuzluluk (ppt)
              </label>
              <input
                type="number"
                value={form.tuzluluk}
                onChange={(e) => setForm({ ...form, tuzluluk: e.target.value })}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "2px solid #e0e0e0",
                  borderRadius: "8px",
                  fontSize: "14px"
                }}
              />
              <small style={{ color: "#9CA3AF", fontSize: "12px" }}>
                İdeal: 25-35 ppt
              </small>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#ffffff" }}>
                Su Sıcaklığı (°C)
              </label>
              <input
                type="number"
                value={form.sicaklik}
                onChange={(e) => setForm({ ...form, sicaklik: e.target.value })}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "2px solid #e0e0e0",
                  borderRadius: "8px",
                  fontSize: "14px"
                }}
              />
              <small style={{ color: "#9CA3AF", fontSize: "12px" }}>
                İdeal: 25-28°C
              </small>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
            <div>
              <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={form.havalandirma}
                  onChange={(e) => setForm({ ...form, havalandirma: e.target.checked })}
                  style={{ width: "18px", height: "18px" }}
                />
                <span style={{ fontWeight: "600", color: "#ffffff" }}>
                  Havalandırma Aktif
                </span>
              </label>
              <small style={{ color: "#9CA3AF", fontSize: "12px", marginLeft: "28px", display: "block", marginTop: "5px" }}>
                Güçlü hava pompası kullanın
              </small>
            </div>

            <div>
              <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={form.isik}
                  onChange={(e) => setForm({ ...form, isik: e.target.checked })}
                  style={{ width: "18px", height: "18px" }}
                />
                <span style={{ fontWeight: "600", color: "#ffffff" }}>
                  Işık Açık
                </span>
              </label>
              <small style={{ color: "#9CA3AF", fontSize: "12px", marginLeft: "28px", display: "block", marginTop: "5px" }}>
                Sürekli veya 12 saat ışık
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
              placeholder="Kuluçka hakkında notlarınız..."
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
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              padding: "15px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)"
            }}
          >
            🦐 Kuluçkayı Başlat
          </button>
        </form>
      </div>

      {/* KULUÇKA GEÇMİŞİ */}
      <div>
        <h3 style={{ color: "#ffffff", marginBottom: "20px" }}>📋 Kuluçka Geçmişi</h3>
        {artemiaTakip.length === 0 ? (
          <div style={{
            background: "#f8f9fa",
            padding: "40px",
            borderRadius: "12px",
            textAlign: "center",
            color: "#9CA3AF"
          }}>
            Henüz kuluçka kaydı yok. Yukarıdaki formu kullanarak ilk kuluçkanızı başlatın!
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {artemiaTakip.map((kuluçka) => (
              <div
                key={kuluçka.id}
                style={{
                  background: kuluçka.durum === "devam-ediyor" ? "#fff8e1" : "white",
                  border: kuluçka.durum === "devam-ediyor" ? "2px solid #ffc107" : "1px solid #e0e0e0",
                  borderRadius: "12px",
                  padding: "20px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "15px" }}>
                  <div>
                    <div style={{
                      display: "inline-block",
                      background: kuluçka.durum === "devam-ediyor" ? "#ffc107" : "#27ae60",
                      color: "white",
                      padding: "4px 12px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: "700",
                      marginBottom: "10px"
                    }}>
                      {kuluçka.durum === "devam-ediyor" ? "⏱️ Devam Ediyor" : "✅ Tamamlandı"}
                    </div>
                    <div style={{ fontSize: "14px", color: "#9CA3AF" }}>
                      Başlangıç: {new Date(kuluçka.baslangic).toLocaleString('tr-TR')}
                    </div>
                    {kuluçka.gercekBitis && (
                      <div style={{ fontSize: "14px", color: "#9CA3AF", marginTop: "3px" }}>
                        Bitiş: {new Date(kuluçka.gercekBitis).toLocaleString('tr-TR')}
                      </div>
                    )}
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "24px", fontWeight: "700", color: "#ffffff" }}>
                      {getKalanSure(kuluçka)}
                    </div>
                  </div>
                </div>

                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", 
                  gap: "15px",
                  marginBottom: "15px"
                }}>
                  <div>
                    <div style={{ fontSize: "12px", color: "#9CA3AF" }}>Miktar</div>
                    <div style={{ fontSize: "16px", fontWeight: "600", color: "#ffffff", marginTop: "3px" }}>
                      {kuluçka.miktar}g
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "12px", color: "#9CA3AF" }}>Tuzluluk</div>
                    <div style={{ fontSize: "16px", fontWeight: "600", color: "#ffffff", marginTop: "3px" }}>
                      {kuluçka.tuzluluk} ppt
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "12px", color: "#9CA3AF" }}>Sıcaklık</div>
                    <div style={{ fontSize: "16px", fontWeight: "600", color: "#ffffff", marginTop: "3px" }}>
                      {kuluçka.sicaklik}°C
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "12px", color: "#9CA3AF" }}>Havalandırma</div>
                    <div style={{ fontSize: "16px", fontWeight: "600", color: "#ffffff", marginTop: "3px" }}>
                      {kuluçka.havalandirma ? "✅ Var" : "❌ Yok"}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "12px", color: "#9CA3AF" }}>Işık</div>
                    <div style={{ fontSize: "16px", fontWeight: "600", color: "#ffffff", marginTop: "3px" }}>
                      {kuluçka.isik ? "✅ Açık" : "❌ Kapalı"}
                    </div>
                  </div>
                </div>

                {kuluçka.notlar && (
                  <div style={{
                    background: "#f8f9fa",
                    padding: "12px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    color: "#ffffff",
                    marginBottom: "15px"
                  }}>
                    <strong>Not:</strong> {kuluçka.notlar}
                  </div>
                )}

                <div style={{ display: "flex", gap: "10px" }}>
                  {kuluçka.durum === "devam-ediyor" && (
                    <button
                      onClick={() => handleTamamla(kuluçka.id)}
                      style={{
                        flex: 1,
                        background: "#27ae60",
                        color: "white",
                        border: "none",
                        padding: "10px",
                        borderRadius: "6px",
                        fontWeight: "600",
                        cursor: "pointer",
                        fontSize: "14px"
                      }}
                    >
                      ✅ Tamamla
                    </button>
                  )}
                  <button
                    onClick={() => handleSil(kuluçka.id)}
                    style={{
                      flex: 1,
                      background: "#e74c3c",
                      color: "white",
                      border: "none",
                      padding: "10px",
                      borderRadius: "6px",
                      fontWeight: "600",
                      cursor: "pointer",
                      fontSize: "14px"
                    }}
                  >
                    🗑️ Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BİLGİ KUTUSU */}
      <div style={{
        background: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)",
        color: "white",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "30px"
      }}>
        <h4 style={{ margin: "0 0 15px 0" }}>💡 Artemia Kuluçka İpuçları</h4>
        <ul style={{ margin: 0, paddingLeft: "20px", lineHeight: "1.8" }}>
          <li>Kuluçka süresi 18-36 saat arasıdır (ortalama 24 saat)</li>
          <li>1 gram yumurta yaklaşık 200.000 adet artemia verir</li>
          <li>Su sıcaklığı 25-28°C arasında tutulmalıdır</li>
          <li>Tuzluluk 25-35 ppt olmalıdır (deniz suyu: 35 ppt)</li>
          <li>Güçlü havalandırma şarttır (yumurtalar dibe çökmemeli)</li>
          <li>pH 8.0-8.5 arasında olmalıdır</li>
          <li>Sürekli veya en az 12 saat ışık gereklidir</li>
          <li>Kuluçkadan 6-8 saat sonra yumurta kabukları suyun üstünde toplanır</li>
          <li>Yeni çıkan artemiaları hemen yemleyin (en besleyici hali)</li>
        </ul>
      </div>
    </div>
  );
}