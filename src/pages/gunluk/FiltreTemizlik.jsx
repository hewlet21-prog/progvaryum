import React, { useState, useEffect } from "react";
import { useSafeStorage } from "../../hooks/useSafeStorage";

export default function FiltreTemizlik() {
  const [filterCounter, setFilterCounter] = useSafeStorage("filterCounter", 0);
  const [filterHistory, setFilterHistory] = useSafeStorage("filterHistory", []);
  const [note, setNote] = useState("");

  // Gün sayacı
  useEffect(() => {
    const timer = setInterval(() => {
      setFilterCounter((prev) => prev + 1);
    }, 86400000); // 24 saat = 86400000 ms

    return () => clearInterval(timer);
  }, [setFilterCounter]);

  // Filtre temizlendi
  const handleClean = () => {
    const newEntry = {
      date: new Date().toLocaleString("tr-TR"),
      note: note.trim() || "Not girilmedi",
      daysPassed: filterCounter
    };

    setFilterHistory([newEntry, ...filterHistory.slice(0, 9)]); // Son 10 kayıt
    setFilterCounter(0);
    setNote("");
    alert("Filtre temizliği kaydedildi!");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px" }}>
      <h2>🧽 Filtre Temizliği</h2>
      <p style={{ color: "#666", marginBottom: "30px" }}>
        Filtre bakım takibi - İdeal temizlik süresi: 14 gün
      </p>

      {/* SAYAÇ KARTI */}
      <div
        style={{
          background: filterCounter >= 14 ? "#fff5f5" : "#f0f8ff",
          border: `2px solid ${filterCounter >= 14 ? "#e74c3c" : "#3498db"}`,
          borderRadius: "12px",
          padding: "30px",
          marginBottom: "30px",
          textAlign: "center"
        }}
      >
        <div style={{ fontSize: "18px", color: "#666", marginBottom: "10px" }}>
          Son Temizlikten Beri
        </div>
        <div style={{ fontSize: "64px", fontWeight: "700", color: filterCounter >= 14 ? "#e74c3c" : "#3498db" }}>
          {filterCounter}
        </div>
        <div style={{ fontSize: "20px", color: "#666" }}>gün geçti</div>
        {filterCounter >= 14 && (
          <div style={{ marginTop: "15px", fontSize: "16px", color: "#e74c3c", fontWeight: "600" }}>
            ⚠️ Temizlik zamanı geldi!
          </div>
        )}
      </div>

      {/* TEMİZLİK FORMU */}
      <div style={{ background: "white", border: "1px solid #e0e0e0", borderRadius: "10px", padding: "25px", marginBottom: "30px" }}>
        <h3 style={{ marginTop: 0 }}>✅ Temizlik Yap</h3>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#555" }}>
            Not (opsiyonel)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Filtre malzemesi değiştirildi, köpük temizlendi..."
            rows="3"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "14px",
              resize: "vertical"
            }}
          />
        </div>
        <button
          onClick={handleClean}
          style={{
            width: "100%",
            padding: "15px",
            background: "#27ae60",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "background 0.3s"
          }}
          onMouseOver={(e) => (e.target.style.background = "#229954")}
          onMouseOut={(e) => (e.target.style.background = "#27ae60")}
        >
          🧽 Filtre Temizlendi
        </button>
      </div>

      {/* GEÇMİŞ */}
      <div style={{ background: "white", border: "1px solid #e0e0e0", borderRadius: "10px", padding: "25px" }}>
        <h3 style={{ marginTop: 0 }}>📋 Temizlik Geçmişi</h3>
        {filterHistory.length === 0 ? (
          <p style={{ color: "#999", textAlign: "center", padding: "30px" }}>
            Henüz kayıt yok
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {filterHistory.map((entry, idx) => (
              <div
                key={idx}
                style={{
                  background: "#f8f9fa",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  padding: "15px"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontWeight: "600", color: "#2c3e50" }}>{entry.date}</span>
                  <span style={{ fontSize: "13px", color: "#7f8c8d" }}>
                    {entry.daysPassed} gün sonra
                  </span>
                </div>
                <div style={{ fontSize: "14px", color: "#555" }}>
                  📝 {entry.note}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}