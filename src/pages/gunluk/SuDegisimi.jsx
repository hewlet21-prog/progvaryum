import React, { useState, useEffect, useRef } from "react";
import { useAkvaryumStorage } from "../../hooks/useAkvaryumStorage";

export default function SuDegisimi() {
  const [waterCounter, setWaterCounter] = useAkvaryumStorage("waterCounter", 0);
  const [suDegisimleri, setSuDegisimleri] = useAkvaryumStorage("suDegisimleri", []);
  const [akvaryumBilgi] = useAkvaryumStorage("akvaryumBilgi", { hacim: 100 });

  const [form, setForm] = useState({
    tarih: new Date().toISOString().slice(0, 16),
    yuzde: "30",
    miktar: (akvaryumBilgi.hacim * 0.3).toFixed(1),
    sebep: "rutin",
    notlar: ""
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [waterQuality, setWaterQuality] = useState(50); // 0-100 (0=çok pis, 100=tertemiz)
  const canvasRef = useRef(null);

  // Su kalitesi güncellemesi
  useEffect(() => {
    if (waterCounter === 0) {
      setWaterQuality(95);
    } else if (waterCounter <= 3) {
      setWaterQuality(80);
    } else if (waterCounter <= 7) {
      setWaterQuality(60);
    } else if (waterCounter <= 14) {
      setWaterQuality(35);
    } else {
      setWaterQuality(15);
    }
  }, [waterCounter]);

  // Canvas su animasyonu
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;
    let waveOffset = 0;

    function animate() {
      // Arka plan (akvaryum duvarı)
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGradient.addColorStop(0, "#2c3e50");
      bgGradient.addColorStop(1, "#34495e");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Su seviyesi (berraklığa göre renk)
      const waterLevel = canvas.height * 0.85;
      const clarity = waterQuality / 100;
      
      // Su rengi (pis -> berrak)
      const waterColor = {
        r: Math.floor(100 + (68 * clarity)),  // 100 -> 168
        g: Math.floor(120 + (60 * clarity)),  // 120 -> 180
        b: Math.floor(80 + (146 * clarity))   // 80 -> 226
      };

      const waterGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      waterGradient.addColorStop(0, `rgba(${waterColor.r}, ${waterColor.g}, ${waterColor.b}, 0.6)`);
      waterGradient.addColorStop(1, `rgba(${waterColor.r - 20}, ${waterColor.g - 20}, ${waterColor.b - 20}, 0.9)`);

      // Su dalgaları
      ctx.fillStyle = waterGradient;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      for (let x = 0; x <= canvas.width; x += 10) {
        const y = waterLevel + Math.sin((x + waveOffset) * 0.02) * 8;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fill();

      // Kirlilik partikülleri (su pislikse)
      if (waterQuality < 70) {
        const particleCount = Math.floor((70 - waterQuality) / 2);
        ctx.fillStyle = `rgba(100, 80, 60, ${0.3 + (70 - waterQuality) / 100})`;
        
        for (let i = 0; i < particleCount; i++) {
          const x = (Math.sin(waveOffset * 0.01 + i) * canvas.width / 2) + canvas.width / 2;
          const y = (Math.cos(waveOffset * 0.015 + i * 0.5) * waterLevel / 2) + waterLevel / 2;
          const size = 2 + Math.random() * 3;
          
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Kabarcıklar (temiz suda)
      if (waterQuality > 60) {
        const bubbleCount = Math.floor(waterQuality / 20);
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        
        for (let i = 0; i < bubbleCount; i++) {
          const x = (Math.sin(waveOffset * 0.02 + i * 2) * canvas.width * 0.8) + canvas.width * 0.1;
          const y = waterLevel - ((waveOffset * 2 + i * 50) % waterLevel);
          const size = 2 + Math.random() * 2;
          
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Işık yansıması
      if (waterQuality > 50) {
        ctx.fillStyle = `rgba(255, 255, 255, ${waterQuality / 400})`;
        ctx.fillRect(canvas.width * 0.1, 20, canvas.width * 0.2, waterLevel - 40);
      }

      waveOffset += 1;
      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [waterQuality]);

  const handleYuzdeChange = (yuzde) => {
    const miktar = (akvaryumBilgi.hacim * (yuzde / 100)).toFixed(1);
    setForm({ ...form, yuzde, miktar });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const yeniDegisim = {
      id: Date.now(),
      tarih: form.tarih,
      yuzde: form.yuzde,
      miktar: form.miktar,
      sebep: form.sebep,
      notlar: form.notlar
    };

    setSuDegisimleri([yeniDegisim, ...suDegisimleri]);
    setWaterCounter(0);
    setWaterQuality(95); // Su berraklaştı!
    setShowSuccess(true);

    // Success mesajını 5 saniye göster
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);

    setForm({
      tarih: new Date().toISOString().slice(0, 16),
      yuzde: "30",
      miktar: (akvaryumBilgi.hacim * 0.3).toFixed(1),
      sebep: "rutin",
      notlar: ""
    });
  };

  const handleSil = (id) => {
    if (window.confirm("Bu kaydı silmek istediğinize emin misiniz?")) {
      setSuDegisimleri(suDegisimleri.filter(d => d.id !== id));
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ marginTop: 0, color: "#ffffff", textAlign: "center", fontSize: "28px" }}>
        💧 Su Değişimi
      </h2>
      <p style={{ color: "#9CA3AF", marginBottom: "30px", textAlign: "center", fontSize: "15px" }}>
        Düzenli su değişimi temiz ve sağlıklı akvaryum için şarttır
      </p>

      {/* BAŞARI MESAJI */}
      {showSuccess && (
        <div style={{
          background: "linear-gradient(135deg, #27ae60 0%, #229954 100%)",
          color: "white",
          padding: "25px",
          borderRadius: "15px",
          marginBottom: "30px",
          textAlign: "center",
          boxShadow: "0 8px 25px rgba(39, 174, 96, 0.4)",
          animation: "slideDown 0.5s ease-out"
        }}>
          <div style={{ fontSize: "48px", marginBottom: "15px" }}>🎉</div>
          <h3 style={{ margin: "0 0 10px 0", fontSize: "24px" }}>Tebrikler!</h3>
          <p style={{ margin: 0, fontSize: "16px", opacity: 0.95 }}>
            Su değişimi başarıyla tamamlandı! Akvaryumunuz artık daha temiz ve sağlıklı.
          </p>
        </div>
      )}

      {/* SU KALİTESİ GÖSTERGESİ + CANVAS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "25px",
        marginBottom: "30px"
      }}>
        {/* CANVAS AKVARYUM */}
        <div style={{
          background: "white",
          borderRadius: "15px",
          padding: "20px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
        }}>
          <h3 style={{ marginTop: 0, color: "#ffffff", textAlign: "center", marginBottom: "15px" }}>
            🐟 Akvaryum Görünümü
          </h3>
          <canvas
            ref={canvasRef}
            width="400"
            height="300"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "10px",
              border: "3px solid #34495e",
              boxShadow: "inset 0 0 20px rgba(0,0,0,0.2)"
            }}
          />
        </div>

        {/* SU KALİTESİ BİLGİSİ */}
        <div style={{
          background: "white",
          borderRadius: "15px",
          padding: "20px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>
          <h3 style={{ marginTop: 0, color: "#ffffff", textAlign: "center", marginBottom: "20px" }}>
            💧 Su Kalitesi
          </h3>

          {/* Kalite Göstergesi */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{
              background: "#ecf0f1",
              height: "40px",
              borderRadius: "20px",
              overflow: "hidden",
              position: "relative",
              boxShadow: "inset 0 2px 5px rgba(0,0,0,0.1)"
            }}>
              <div style={{
                width: `${waterQuality}%`,
                height: "100%",
                background: waterQuality > 70 ? "linear-gradient(90deg, #27ae60 0%, #2ecc71 100%)"
                         : waterQuality > 40 ? "linear-gradient(90deg, #f39c12 0%, #f1c40f 100%)"
                         : "linear-gradient(90deg, #e74c3c 0%, #c0392b 100%)",
                transition: "width 1s ease-out",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "700",
                fontSize: "18px"
              }}>
                {waterQuality}%
              </div>
            </div>
          </div>

          {/* Durum Açıklaması */}
          <div style={{
            background: waterQuality > 70 ? "#d5f4e6"
                     : waterQuality > 40 ? "#fff3cd"
                     : "#f8d7da",
            padding: "20px",
            borderRadius: "12px",
            textAlign: "center",
            border: `2px solid ${waterQuality > 70 ? "#27ae60" : waterQuality > 40 ? "#f39c12" : "#e74c3c"}`
          }}>
            <div style={{ fontSize: "42px", marginBottom: "10px" }}>
              {waterQuality > 70 ? "😊" : waterQuality > 40 ? "😐" : "😟"}
            </div>
            <div style={{
              fontSize: "18px",
              fontWeight: "700",
              color: waterQuality > 70 ? "#27ae60" : waterQuality > 40 ? "#856404" : "#721c24",
              marginBottom: "8px"
            }}>
              {waterQuality > 70 ? "Mükemmel!" 
             : waterQuality > 40 ? "İyileştirme Gerekli"
             : "Acil Su Değişimi!"}
            </div>
            <div style={{
              fontSize: "14px",
              color: waterQuality > 70 ? "#155724" : waterQuality > 40 ? "#856404" : "#721c24"
            }}>
              Son su değişimi: {waterCounter === 0 ? "Bugün" : `${waterCounter} gün önce`}
            </div>
          </div>

          {/* Öneriler */}
          <div style={{
            marginTop: "20px",
            padding: "15px",
            background: "#f8f9fa",
            borderRadius: "10px",
            fontSize: "13px",
            lineHeight: "1.8",
            color: "#ffffff"
          }}>
            <strong>💡 Öneri:</strong>
            {waterQuality > 70 && " Harika! Mevcut bakım rutininize devam edin."}
            {waterQuality > 40 && waterQuality <= 70 && " %30-50 su değişimi yapmanız önerilir."}
            {waterQuality <= 40 && " Balık sağlığı için hemen su değiştirin!"}
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
        <h3 style={{ marginTop: 0, color: "#ffffff" }}>Su Değişimi Kaydı Ekle</h3>
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
                Değişim Yüzdesi
              </label>
              <select
                value={form.yuzde}
                onChange={(e) => handleYuzdeChange(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "2px solid #e0e0e0",
                  borderRadius: "8px",
                  fontSize: "14px"
                }}
              >
                <option value="10">10% - Hafif</option>
                <option value="20">20% - Orta</option>
                <option value="30">30% - Standart</option>
                <option value="50">50% - Ağır</option>
                <option value="75">75% - Çok Ağır</option>
                <option value="100">100% - Tam Değişim</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#ffffff" }}>
                Miktar (Litre)
              </label>
              <input
                type="number"
                step="0.1"
                value={form.miktar}
                onChange={(e) => setForm({ ...form, miktar: e.target.value })}
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
                Akvaryum: {akvaryumBilgi.hacim}L
              </small>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#ffffff" }}>
                Sebep
              </label>
              <select
                value={form.sebep}
                onChange={(e) => setForm({ ...form, sebep: e.target.value })}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "2px solid #e0e0e0",
                  borderRadius: "8px",
                  fontSize: "14px"
                }}
              >
                <option value="rutin">Rutin Bakım</option>
                <option value="nitrat">Yüksek Nitrat</option>
                <option value="bulanıklık">Bulanık Su</option>
                <option value="hastalık">Hastalık Tedavisi</option>
                <option value="ilaç">İlaç Sonrası</option>
                <option value="acil">Acil Durum</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#ffffff" }}>
              Notlar
            </label>
            <textarea
              value={form.notlar}
              onChange={(e) => setForm({ ...form, notlar: e.target.value })}
              placeholder="Su sıcaklığı, pH, klor giderici kullanımı vb..."
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
            💧 Su Değişimi Kaydını Ekle
          </button>
        </form>
      </div>

      {/* GEÇMİŞ */}
      <div>
        <h3 style={{ color: "#ffffff", marginBottom: "20px" }}>📋 Su Değişimi Geçmişi</h3>
        {suDegisimleri.length === 0 ? (
          <div style={{
            background: "#f8f9fa",
            padding: "40px",
            borderRadius: "12px",
            textAlign: "center",
            color: "#9CA3AF"
          }}>
            Henüz su değişimi kaydı yok.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {suDegisimleri.map((degisim) => (
              <div
                key={degisim.id}
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
                      💧 %{degisim.yuzde} Su Değişimi ({degisim.miktar}L)
                    </div>
                    <div style={{ fontSize: "14px", color: "#9CA3AF" }}>
                      {new Date(degisim.tarih).toLocaleString('tr-TR')}
                    </div>
                  </div>
                  <div style={{
                    background: "#3498db",
                    color: "white",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "700"
                  }}>
                    {degisim.sebep === "rutin" ? "Rutin"
                   : degisim.sebep === "nitrat" ? "Yüksek Nitrat"
                   : degisim.sebep === "bulanıklık" ? "Bulanık Su"
                   : degisim.sebep === "hastalık" ? "Hastalık"
                   : degisim.sebep === "ilaç" ? "İlaç Sonrası"
                   : "Acil"}
                  </div>
                </div>

                {degisim.notlar && (
                  <div style={{
                    background: "#f8f9fa",
                    padding: "12px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    color: "#ffffff",
                    marginBottom: "15px"
                  }}>
                    <strong>Not:</strong> {degisim.notlar}
                  </div>
                )}

                <button
                  onClick={() => handleSil(degisim.id)}
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
        background: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)",
        color: "white",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "30px"
      }}>
        <h4 style={{ margin: "0 0 15px 0" }}>💡 Su Değişimi Rehberi</h4>
        <ul style={{ margin: 0, paddingLeft: "20px", lineHeight: "1.8" }}>
          <li>Haftalık %20-30 su değişimi idealdir</li>
          <li>Yeni su sıcaklığı mevcut su ile aynı olmalıdır (±2°C)</li>
          <li>Musluk suyu kullanıyorsanız mutlaka klor giderici kullanın</li>
          <li>Su değişimi sırasında dip temizliği yapın</li>
          <li>Yüksek nitrat (&gt;40ppm) varsa %50 su değiştirin</li>
          <li>İlaç tedavisi sonrası %75-100 su değiştirin</li>
          <li>Filtreyi su değişimi sırasında durdurmayın</li>
        </ul>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}