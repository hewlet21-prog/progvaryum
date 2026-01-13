import React, { useState } from "react";
import { useAkvaryumStorage } from "../../hooks/useAkvaryumStorage";

const STOK_KATEGORILERI = [
  { id: "yem", label: "🍽️ Yem", icon: "🍽️" },
  { id: "test", label: "🧪 Test Kiti", icon: "🧪" },
  { id: "ilac", label: "💊 İlaç", icon: "💊" },
  { id: "filtre", label: "🧽 Filtre Malzemesi", icon: "🧽" },
  { id: "kimyasal", label: "⚗️ Kimyasal", icon: "⚗️" },
  { id: "diger", label: "📦 Diğer", icon: "📦" }
];

export default function StokTakip() {
  const [stoklar, setStoklar] = useAkvaryumStorage("stokTakip", []);
  const [formAcik, setFormAcik] = useState(false);
  const [yeniStok, setYeniStok] = useState({
    kategori: "yem",
    urunAdi: "",
    marka: "",
    miktar: "",
    birim: "adet",
    minStok: "",
    sonKullanma: "",
    notlar: ""
  });

  const handleEkle = () => {
    if (!yeniStok.urunAdi.trim()) {
      alert("Ürün adı girin!");
      return;
    }

    const stok = {
      ...yeniStok,
      id: Date.now(),
      eklemeTarihi: new Date().toLocaleString("tr-TR")
    };

    setStoklar([...stoklar, stok]);
    setFormAcik(false);
    setYeniStok({
      kategori: "yem",
      urunAdi: "",
      marka: "",
      miktar: "",
      birim: "adet",
      minStok: "",
      sonKullanma: "",
      notlar: ""
    });
    alert("Stok eklendi!");
  };

  const handleMiktarGuncelle = (id, yeniMiktar) => {
    setStoklar(
      stoklar.map(s =>
        s.id === id ? { ...s, miktar: yeniMiktar } : s
      )
    );
  };

  const handleSil = (id) => {
    if (window.confirm("Bu stok kaydını silmek istediğinize emin misiniz?")) {
      setStoklar(stoklar.filter(s => s.id !== id));
    }
  };

  const stokDurumu = (stok) => {
    const miktar = parseFloat(stok.miktar);
    const minStok = parseFloat(stok.minStok);

    if (miktar === 0) return { durum: "bitti", renk: "#e74c3c", mesaj: "Bitti!" };
    if (minStok && miktar <= minStok) return { durum: "az", renk: "#f39c12", mesaj: "Az Kaldı" };
    return { durum: "normal", renk: "#27ae60", mesaj: "Yeterli" };
  };

  const sonKullanmaKontrol = (tarih) => {
    if (!tarih) return null;
    const skTarih = new Date(tarih);
    const bugun = new Date();
    const fark = Math.ceil((skTarih - bugun) / (1000 * 60 * 60 * 24));

    if (fark < 0) return { durum: "gecmis", mesaj: "Süresi doldu!", renk: "#e74c3c" };
    if (fark <= 30) return { durum: "yakin", mesaj: `${fark} gün kaldı`, renk: "#f39c12" };
    return { durum: "normal", mesaj: `${fark} gün kaldı`, renk: "#27ae60" };
  };

  const kategoriyeGoreStoklar = (kategori) => stoklar.filter(s => s.kategori === kategori);

  return (
    <div>
      <h2>📦 Stok Takibi</h2>
      <p style={{ color: "#666", marginBottom: "30px" }}>
        Akvaryum malzemelerinizin stok durumunu takip edin
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
        {formAcik ? "❌ İptal" : "➕ Yeni Stok Ekle"}
      </button>

      {/* FORM */}
      {formAcik && (
        <div style={{ background: "#f0f8ff", borderRadius: "10px", padding: "25px", marginBottom: "30px", border: "2px solid #3498db" }}>
          <h3 style={{ marginTop: 0 }}>📦 Stok Bilgileri</h3>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px", marginBottom: "15px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#555" }}>
                Kategori
              </label>
              <select
                value={yeniStok.kategori}
                onChange={(e) => setYeniStok({ ...yeniStok, kategori: e.target.value })}
                style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}
              >
                {STOK_KATEGORILERI.map(k => (
                  <option key={k.id} value={k.id}>{k.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#555" }}>
                Ürün Adı *
              </label>
              <input
                type="text"
                value={yeniStok.urunAdi}
                onChange={(e) => setYeniStok({ ...yeniStok, urunAdi: e.target.value })}
                placeholder="Örn: Tetra Min Pul Yem"
                style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#555" }}>
                Marka
              </label>
              <input
                type="text"
                value={yeniStok.marka}
                onChange={(e) => setYeniStok({ ...yeniStok, marka: e.target.value })}
                placeholder="Örn: Tetra"
                style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "15px", marginBottom: "15px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#555" }}>
                Miktar
              </label>
              <input
                type="number"
                step="0.1"
                value={yeniStok.miktar}
                onChange={(e) => setYeniStok({ ...yeniStok, miktar: e.target.value })}
                placeholder="Örn: 250"
                style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#555" }}>
                Birim
              </label>
              <select
                value={yeniStok.birim}
                onChange={(e) => setYeniStok({ ...yeniStok, birim: e.target.value })}
                style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}
              >
                <option value="adet">Adet</option>
                <option value="gram">Gram</option>
                <option value="ml">ML</option>
                <option value="litre">Litre</option>
                <option value="paket">Paket</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#555" }}>
                Min. Stok (Uyarı)
              </label>
              <input
                type="number"
                value={yeniStok.minStok}
                onChange={(e) => setYeniStok({ ...yeniStok, minStok: e.target.value })}
                placeholder="Örn: 50"
                style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#555" }}>
                Son Kullanma
              </label>
              <input
                type="date"
                value={yeniStok.sonKullanma}
                onChange={(e) => setYeniStok({ ...yeniStok, sonKullanma: e.target.value })}
                style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#555" }}>
              Notlar
            </label>
            <textarea
              value={yeniStok.notlar}
              onChange={(e) => setYeniStok({ ...yeniStok, notlar: e.target.value })}
              placeholder="Satın alma tarihi, fiyat vs..."
              rows="2"
              style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px", resize: "vertical" }}
            />
          </div>

          <button
            onClick={handleEkle}
            style={{
              width: "100%",
              padding: "12px",
              background: "#3498db",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            ✅ Stok Ekle
          </button>
        </div>
      )}

      {/* STOK LİSTESİ (KATEGORİ BAZLI) */}
      <div>
        {STOK_KATEGORILERI.map(kategori => {
          const kategoriStoklari = kategoriyeGoreStoklar(kategori.id);
          if (kategoriStoklari.length === 0) return null;

          return (
            <div key={kategori.id} style={{ marginBottom: "30px" }}>
              <h3>{kategori.label}</h3>
              <div style={{ display: "grid", gap: "15px" }}>
                {kategoriStoklari.map(stok => {
                  const durum = stokDurumu(stok);
                  const skDurum = sonKullanmaKontrol(stok.sonKullanma);

                  return (
                    <div
                      key={stok.id}
                      style={{
                        background: "#f8f9fa",
                        border: `2px solid ${durum.durum === "bitti" || durum.durum === "az" ? durum.renk : "#e0e0e0"}`,
                        borderRadius: "10px",
                        padding: "20px"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "15px" }}>
                        <div>
                          <h4 style={{ margin: "0 0 5px 0", color: "#2c3e50" }}>
                            {kategori.icon} {stok.urunAdi}
                          </h4>
                          {stok.marka && (
                            <p style={{ margin: "0", fontSize: "13px", color: "#7f8c8d" }}>
                              {stok.marka}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => handleSil(stok.id)}
                          style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer" }}
                        >
                          🗑️
                        </button>
                      </div>

                      {/* STOK DURUMU */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
                        <div style={{ background: "white", padding: "15px", borderRadius: "8px", textAlign: "center" }}>
                          <div style={{ fontSize: "11px", color: "#7f8c8d", marginBottom: "5px" }}>Mevcut</div>
                          <div style={{ fontSize: "28px", fontWeight: "700", color: durum.renk }}>
                            {stok.miktar}
                          </div>
                          <div style={{ fontSize: "12px", color: "#7f8c8d" }}>{stok.birim}</div>
                          <div style={{ marginTop: "8px", fontSize: "12px", fontWeight: "600", color: durum.renk }}>
                            {durum.mesaj}
                          </div>
                        </div>

                        <div style={{ background: "white", padding: "15px", borderRadius: "8px" }}>
                          <div style={{ fontSize: "11px", color: "#7f8c8d", marginBottom: "8px" }}>Miktar Güncelle</div>
                          <input
                            type="number"
                            step="0.1"
                            value={stok.miktar}
                            onChange={(e) => handleMiktarGuncelle(stok.id, e.target.value)}
                            style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "16px", fontWeight: "600", marginBottom: "8px" }}
                          />
                          {stok.minStok && (
                            <div style={{ fontSize: "11px", color: "#7f8c8d" }}>
                              Min. stok: {stok.minStok} {stok.birim}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* SON KULLANMA */}
                      {skDurum && (
                        <div
                          style={{
                            background: skDurum.durum === "gecmis" ? "#fee" : skDurum.durum === "yakin" ? "#fff3cd" : "#d4edda",
                            color: skDurum.renk,
                            padding: "12px",
                            borderRadius: "8px",
                            marginBottom: "15px",
                            fontSize: "13px",
                            fontWeight: "600",
                            textAlign: "center"
                          }}
                        >
                          {skDurum.durum === "gecmis" ? "⚠️" : "📅"} Son Kullanma: {skDurum.mesaj}
                        </div>
                      )}

                      {stok.notlar && (
                        <div style={{ fontSize: "13px", color: "#555", background: "white", padding: "12px", borderRadius: "6px" }}>
                          📝 {stok.notlar}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {stoklar.length === 0 && (
        <p style={{ color: "#999", textAlign: "center", padding: "40px" }}>
          Henüz stok eklenmemiş. "Yeni Stok Ekle" butonuna tıklayın!
        </p>
      )}
    </div>
  );
}