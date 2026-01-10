import React, { useState, useEffect } from "react";
import { useAkvaryumStorage } from "../../hooks/useAkvaryumStorage";

const FEED_TYPES = [
  { key: "pul", label: "🐠 Pul Yem", color: "#3498db" },
  { key: "granul", label: "🟤 Granül Yem", color: "#e67e22" },
  { key: "canli", label: "🪱 Canlı Yem", color: "#27ae60" },
  { key: "dondurulmus", label: "🧊 Dondurulmuş", color: "#9b59b6" }
];

export default function Yemleme() {
  const [feeds, setFeeds] = useAkvaryumStorage("feeds", {
    pul: { last: null, brand: "", feedsPerDay: 2 },
    granul: { last: null, brand: "", feedsPerDay: 2 },
    canli: { last: null, brand: "", feedsPerDay: 1 },
    dondurulmus: { last: null, brand: "", feedsPerDay: 1 }
  });

  const [feedInterval, setFeedInterval] = useAkvaryumStorage("feedInterval", 8);
  const [sonYemleme, setSonYemleme] = useAkvaryumStorage("sonYemleme", null);
  const [remaining, setRemaining] = useState({ text: "Başlatılmadı", status: "neutral" });

  // Tek sayaç - en son yemlemeye göre
  useEffect(() => {
    const interval = setInterval(() => {
      if (!sonYemleme) {
        setRemaining({ text: "Henüz yemleme yapılmadı", status: "neutral" });
      } else {
        const next = new Date(sonYemleme);
        next.setHours(next.getHours() + feedInterval);
        const diff = next - new Date();

        if (diff <= 0) {
          setRemaining({ text: "🔔 Yemleme zamanı!", status: "alert" });
        } else {
          const hours = Math.floor(diff / 3600000);
          const mins = Math.floor((diff / 60000) % 60);
          setRemaining({ 
            text: `${hours}s ${mins}d kaldı`, 
            status: hours < 1 ? "warning" : "ok" 
          });
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [sonYemleme, feedInterval]);

  // Herhangi bir yem verildiğinde - TÜM yemleri güncelle
  const handleFeed = (feedKey) => {
    const now = new Date().toISOString();
    
    // Tüm yemlerin last değerini güncelle
    const updatedFeeds = {};
    FEED_TYPES.forEach(f => {
      updatedFeeds[f.key] = { 
        ...feeds[f.key], 
        last: now,
        // Hangisi verildiğini işaretle
        sonVerilen: f.key === feedKey
      };
    });
    
    setFeeds(updatedFeeds);
    setSonYemleme(now);
  };

  const handleBrandChange = (feedKey, brand) => {
    setFeeds({
      ...feeds,
      [feedKey]: { ...feeds[feedKey], brand }
    });
  };

  const handleIntervalChange = (value) => {
    setFeedInterval(parseInt(value));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ marginTop: 0, color: "#ffffff", textAlign: "center", fontSize: "28px" }}>
        🍽️ Yemleme Takibi
      </h2>
      <p style={{ color: "#9CA3AF", marginBottom: "30px", textAlign: "center", fontSize: "15px" }}>
        Herhangi bir yem türünü verdiğinizde yemleme tamamlanır
      </p>

      {/* GENEL SAYAÇ */}
      <div style={{
        background: remaining.status === "alert" 
          ? "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)"
          : remaining.status === "warning"
          ? "linear-gradient(135deg, #f39c12 0%, #e67e22 100%)"
          : "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)",
        color: "white",
        padding: "30px",
        borderRadius: "16px",
        marginBottom: "30px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
        textAlign: "center",
        animation: remaining.status === "alert" ? "pulse 2s infinite" : "none"
      }}>
        <div style={{ fontSize: "18px", marginBottom: "10px", opacity: 0.9 }}>
          {sonYemleme 
            ? `Son yemleme: ${new Date(sonYemleme).toLocaleString('tr-TR')}`
            : "Henüz yemleme yapılmadı"}
        </div>
        <div style={{ fontSize: "48px", fontWeight: "800" }}>
          {remaining.text}
        </div>
      </div>

      {/* AYARLAR */}
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "30px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
      }}>
        <h3 style={{ margin: "0 0 15px 0", fontSize: "18px" }}>⚙️ Genel Ayarlar</h3>
        <div style={{ display: "flex", alignItems: "center", gap: "15px", flexWrap: "wrap" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "14px", fontWeight: "600" }}>Yemleme Aralığı:</span>
            <select
              value={feedInterval}
              onChange={(e) => handleIntervalChange(e.target.value)}
              style={{
                padding: "8px 12px",
                borderRadius: "6px",
                border: "none",
                fontSize: "14px",
                fontWeight: "600"
              }}
            >
              <option value="4">4 saat (günde 6x)</option>
              <option value="6">6 saat (günde 4x)</option>
              <option value="8">8 saat (günde 3x)</option>
              <option value="12">12 saat (günde 2x)</option>
              <option value="24">24 saat (günde 1x)</option>
            </select>
          </label>
        </div>
      </div>

      {/* YEM KARTLARI - GRID 2x2 */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px",
        marginBottom: "30px"
      }}>
        {FEED_TYPES.map((feedType) => {
          const feedData = feeds[feedType.key];
          const isLastUsed = feedData?.sonVerilen;

          return (
            <div
              key={feedType.key}
              style={{
                background: "white",
                borderRadius: "15px",
                padding: "25px",
                boxShadow: isLastUsed 
                  ? `0 4px 20px ${feedType.color}44`
                  : "0 4px 12px rgba(0,0,0,0.08)",
                borderLeft: `6px solid ${feedType.color}`,
                borderTop: isLastUsed ? `3px solid ${feedType.color}` : "none",
                transition: "all 0.3s",
                position: "relative"
              }}
            >
              {/* SON VERİLEN BADGE */}
              {isLastUsed && (
                <div style={{
                  position: "absolute",
                  top: "-10px",
                  right: "15px",
                  background: feedType.color,
                  color: "white",
                  padding: "5px 12px",
                  borderRadius: "12px",
                  fontSize: "11px",
                  fontWeight: "700"
                }}>
                  ✓ Son Verilen
                </div>
              )}

              {/* HEADER */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px"
              }}>
                <h3 style={{
                  margin: 0,
                  fontSize: "20px",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}>
                  {feedType.label}
                </h3>
              </div>

              {/* MARKA */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#ffffff"
                }}>
                  Marka / Etiket
                </label>
                <input
                  type="text"
                  value={feedData?.brand || ""}
                  onChange={(e) => handleBrandChange(feedType.key, e.target.value)}
                  placeholder="Örn: Tetra Min"
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "8px",
                    fontSize: "14px",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              {/* YEM VER BUTONU */}
              <button
                onClick={() => handleFeed(feedType.key)}
                style={{
                  width: "100%",
                  background: `linear-gradient(135deg, ${feedType.color} 0%, ${feedType.color}dd 100%)`,
                  color: "white",
                  border: "none",
                  padding: "15px",
                  borderRadius: "10px",
                  fontSize: "16px",
                  fontWeight: "700",
                  cursor: "pointer",
                  boxShadow: `0 4px 12px ${feedType.color}66`,
                  transition: "transform 0.2s"
                }}
                onMouseOver={(e) => e.target.style.transform = "scale(1.02)"}
                onMouseOut={(e) => e.target.style.transform = "scale(1)"}
              >
                ✅ Bu Yemi Ver
              </button>
            </div>
          );
        })}
      </div>

      {/* BİLGİ KUTUSU */}
      <div style={{
        background: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)",
        color: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
      }}>
        <h4 style={{ margin: "0 0 15px 0" }}>💡 Yemleme İpuçları</h4>
        <ul style={{ margin: 0, paddingLeft: "20px", lineHeight: "1.8" }}>
          <li>Balıklar 2-3 dakikada yiyebileceği kadar yem verin</li>
          <li>Fazla yem su kalitesini bozar ve alg oluşturur</li>
          <li>Yavru balıklar günde 4-6 kez, yetişkinler günde 1-2 kez yemlenebilir</li>
          <li>Farklı yem çeşitleri dengeli beslenme sağlar</li>
          <li>Canlı yem haftada 1-2 kez protein takviyesi için uygundur</li>
        </ul>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.01); box-shadow: 0 8px 40px rgba(231, 76, 60, 0.4); }
        }
      `}</style>
    </div>
  );
}