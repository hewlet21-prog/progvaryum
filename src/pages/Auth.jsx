import React, { useState } from "react";
import { registerUser, loginUser } from "../firebase/authService";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const SEHIRLER = [
  "Adana", "Adıyaman", "Afyon", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin",
  "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa",
  "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ",
  "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari",
  "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri",
  "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa",
  "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Rize",
  "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat", "Trabzon",
  "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt",
  "Karaman", "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova",
  "Karabük", "Kilis", "Osmaniye", "Düzce"
];

const NEREDEN_DUYDUNUZ = [
  "Google Arama", "YouTube", "Instagram", "Facebook", "Twitter/X", "TikTok",
  "Arkadaş Tavsiyesi", "Forum/Blog", "Akvaryum Mağazası", "Diğer"
];

const BALIK_TURLERI = [
  "Discus", "Angel", "Tetra", "Guppy", "Betta", "Cichlid", "Pleco", "Corydoras",
  "Rasbora", "Barb", "Molly", "Platy", "Swordtail", "Goldfish", "Koi", "Oscar",
  "Arowana", "Flowerhorn", "Rainbowfish", "Killifish", "Karides", "Salyangoz", "Diğer"
];

const MARKALAR = [
  "Eheim", "Fluval", "Tetra", "Sera", "JBL", "Aquael", "Oase", "API",
  "Seachem", "Tropica", "ADA", "Dennerle", "Hikari", "Ocean Free", "Diğer"
];

const AKVARYUM_TIPLERI = [
  { id: "bitkili", label: "🌿 Bitkili" },
  { id: "bitkisiz", label: "🪨 Bitkisiz" },
  { id: "iwagumi", label: "🗻 Iwagumi" },
  { id: "hardscape", label: "⛰️ Hardscape" },
  { id: "biotop", label: "🌍 Biotop" },
  { id: "dutch", label: "🇳🇱 Dutch Style" },
  { id: "walstad", label: "🌱 Walstad" },
  { id: "deniz", label: "🌊 Deniz/Tuzlu" },
  { id: "cichlid", label: "🐟 Cichlid Tank" },
  { id: "community", label: "👥 Community" },
  { id: "breeding", label: "🥚 Üretim" },
  { id: "nano", label: "🔬 Nano Tank" },
  { id: "paludarium", label: "🐸 Paludarium" },
  { id: "blackwater", label: "🟤 Blackwater" }
];

const HOBICI_SINIFLARI = {
  kirik: { label: "Kırık Hobici", emoji: "💔", color: "#e74c3c", description: "Yeni başlayan veya ara veren hobici", avatars: ["🐠", "🐟", "🐡", "🦐", "🐚"] },
  acemi: { label: "Acemi Hobici", emoji: "🌱", color: "#95a5a6", description: "Hobiye yeni adım atmış", avatars: ["🌱", "🐣", "🌿", "💧", "🔰"] },
  yeni: { label: "Yeni Hobici", emoji: "🐟", color: "#3498db", description: "Temel bilgilere sahip", avatars: ["🐟", "🐠", "🌊", "🎣", "🏊"] },
  usta: { label: "Usta Hobici", emoji: "🏆", color: "#f39c12", description: "Deneyimli ve bilgili", avatars: ["🏆", "⭐", "🎖️", "🥇", "👨‍🔬"] },
  profesyonel: { label: "Profesyonel Hobici", emoji: "👑", color: "#9b59b6", description: "Uzman seviyesinde", avatars: ["👑", "💎", "🔱", "🌟", "🎭"] }
};

function hesaplaHobiciSinifi(form) {
  let puan = 0;
  const yil = parseInt(form.hobiciYil) || 0;
  if (yil === 0) puan += 0;
  else if (yil <= 1) puan += 10;
  else if (yil <= 3) puan += 25;
  else if (yil <= 5) puan += 40;
  else if (yil <= 10) puan += 60;
  else puan += 80;
  
  const akvSayisi = parseInt(form.akvaryumSayisi) || 0;
  if (akvSayisi === 0) puan -= 10;
  else if (akvSayisi === 1) puan += 5;
  else if (akvSayisi <= 3) puan += 15;
  else if (akvSayisi <= 5) puan += 25;
  else puan += 40;
  
  puan += (form.akvaryumTipleri?.length || 0) * 5;
  puan += (form.favoriBaliklar?.length || 0) * 3;
  
  if (puan <= 10) return "kirik";
  if (puan <= 30) return "acemi";
  if (puan <= 50) return "yeni";
  if (puan <= 80) return "usta";
  return "profesyonel";
}

// KOYU TEMA İÇİN STİLLER - BEYAZ YAZILAR
const s = {
  card: { 
    background: 'linear-gradient(135deg, #1a2a3a 0%, #0d1b2a 100%)', 
    borderRadius: '24px', 
    padding: '40px', 
    width: '100%', 
    maxWidth: '500px', 
    boxShadow: '0 20px 60px rgba(0,0,0,0.5)', 
    maxHeight: '90vh', 
    overflowY: 'auto',
    border: '1px solid rgba(255,255,255,0.1)'
  },
  header: { textAlign: 'center', marginBottom: '30px' },
  icon: { fontSize: '50px', display: 'block', marginBottom: '15px' },
  h2: { margin: '0 0 8px', fontSize: '1.8rem', color: '#ffffff', fontWeight: '700' },
  p: { margin: 0, color: '#94a3b8', fontSize: '0.95rem' },
  stepProgress: { display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px' },
  stepDot: { width: '35px', height: '35px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '14px', border: '2px solid rgba(255,255,255,0.2)' },
  stepDotActive: { background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: '2px solid #667eea' },
  formGroup: { marginBottom: '20px' },
  label: { display: 'block', marginBottom: '8px', fontWeight: '700', color: '#ffffff', fontSize: '14px' },
  labelSmall: { fontWeight: '400', color: '#94a3b8', fontSize: '12px', marginLeft: '5px' },
  input: { width: '100%', padding: '14px 16px', border: '2px solid rgba(255,255,255,0.15)', borderRadius: '12px', fontSize: '15px', boxSizing: 'border-box', background: 'rgba(255,255,255,0.08)', color: '#ffffff' },
  select: { width: '100%', padding: '14px 16px', border: '2px solid rgba(255,255,255,0.15)', borderRadius: '12px', fontSize: '15px', boxSizing: 'border-box', background: 'rgba(255,255,255,0.08)', color: '#ffffff' },
  formRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
  toggleBtns: { display: 'flex', gap: '10px' },
  toggleBtn: { flex: 1, padding: '12px', border: '2px solid rgba(255,255,255,0.2)', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: '#94a3b8' },
  toggleBtnActive: { borderColor: '#667eea', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white' },
  tagGrid: { display: 'flex', flexWrap: 'wrap', gap: '8px' },
  tagBtn: { padding: '8px 16px', border: '2px solid rgba(255,255,255,0.2)', borderRadius: '20px', background: 'rgba(255,255,255,0.05)', cursor: 'pointer', fontSize: '13px', color: '#cbd5e1' },
  tagBtnSelected: { borderColor: '#667eea', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white' },
  typeGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '25px' },
  typeBtn: { padding: '15px 12px', border: '3px solid rgba(255,255,255,0.15)', borderRadius: '14px', background: 'rgba(255,255,255,0.05)', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: '#cbd5e1' },
  typeBtnSelected: { borderColor: '#667eea', background: 'rgba(102, 126, 234, 0.25)', color: '#a5b4fc' },
  btnNext: { width: '100%', padding: '16px', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', marginTop: '10px' },
  btnSubmit: { width: '100%', padding: '16px', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', background: 'linear-gradient(135deg, #27ae60, #2ecc71)', color: 'white', marginTop: '10px' },
  error: { background: 'rgba(231, 76, 60, 0.2)', color: '#ff6b6b', padding: '12px 16px', borderRadius: '10px', marginBottom: '20px', fontSize: '14px', fontWeight: '500', border: '1px solid rgba(231, 76, 60, 0.3)' },
  switchMode: { textAlign: 'center', marginTop: '25px', color: '#94a3b8', fontSize: '14px' },
  switchBtn: { background: 'none', border: 'none', color: '#667eea', fontWeight: '700', cursor: 'pointer' },
  avatarGrid: { display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px', flexWrap: 'wrap' },
  avatarOption: { width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', cursor: 'pointer', border: '4px solid transparent', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' },
  sectionTitle: { margin: '0 0 20px', color: '#ffffff', fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px' },
  loading: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: '#667eea' }
};

export default function Auth({ onLogin, initialMode = "register" }) {
  const [mode, setMode] = useState(initialMode);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [belirlenenSinif, setBelirlenenSinif] = useState(null);

  const [form, setForm] = useState({
    isim: "", soyisim: "", kullaniciAdi: "", nickname: "", email: "", sifre: "", sifreTekrar: "",
    yas: "", sehir: "", nerelerdanDuydunuz: "",
    hobiciYil: "", akvaryumSayisi: "", favoriBaliklar: [], favoriMarka: "",
    akvaryumTipleri: [],
    avatar: "🐠"
  });

  const [loginForm, setLoginForm] = useState({
    email: "", sifre: ""
  });

  // Firebase ile Kayıt İşlemi
  const handleRegister = async () => {
    setLoading(true);
    setError("");

    try {
      // Şifre kontrolü
      if (form.sifre !== form.sifreTekrar) {
        setError("Şifreler eşleşmiyor");
        setLoading(false);
        return;
      }

      if (form.sifre.length < 6) {
        setError("Şifre en az 6 karakter olmalı");
        setLoading(false);
        return;
      }

      // Firebase'e kayıt
      const result = await registerUser(form.email, form.sifre, form.kullaniciAdi);

      if (result.success) {
        const user = result.user;
        
        // Hobici sınıfını hesapla
        const sinif = hesaplaHobiciSinifi(form);
        
        // Ek kullanıcı bilgilerini Firestore'a kaydet
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: form.email,
          isim: form.isim,
          soyisim: form.soyisim,
          kullaniciAdi: form.kullaniciAdi,
          nickname: form.nickname,
          yas: form.yas,
          sehir: form.sehir,
          nerelerdanDuydunuz: form.nerelerdanDuydunuz,
          hobiciYil: form.hobiciYil,
          akvaryumSayisi: form.akvaryumSayisi,
          favoriBaliklar: form.favoriBaliklar,
          favoriMarka: form.favoriMarka,
          akvaryumTipleri: form.akvaryumTipleri,
          avatar: form.avatar,
          seviye: HOBICI_SINIFLARI[sinif]?.label || 'Çaylak',
          seviyeKey: sinif,
          olusturmaTarihi: new Date().toISOString(),
          propimagelUrl: null
        }, { merge: true });

        // Başarılı giriş
        onLogin({
          uid: user.uid,
          email: form.email,
          kullaniciAdi: form.kullaniciAdi,
          nickname: form.nickname,
          avatar: form.avatar,
          seviye: HOBICI_SINIFLARI[sinif]?.label || 'Çaylak'
        });
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error("Kayıt hatası:", err);
      setError("Kayıt sırasında bir hata oluştu");
    }

    setLoading(false);
  };

  // Firebase ile Giriş İşlemi
  const handleLogin = async () => {
    setLoading(true);
    setError("");

    if (!loginForm.email || !loginForm.sifre) {
      setError("E-posta ve şifre gerekli");
      setLoading(false);
      return;
    }

    try {
      const result = await loginUser(loginForm.email, loginForm.sifre);

      if (result.success) {
        const user = result.user;
        const userData = result.userData;

        // Başarılı giriş
        onLogin({
          uid: user.uid,
          email: user.email,
          kullaniciAdi: userData?.kullaniciAdi || user.displayName || 'Kullanıcı',
          nickname: userData?.nickname || user.displayName || 'Kullanıcı',
          avatar: userData?.avatar || '🐠',
          seviye: userData?.seviye || 'Çaylak',
          ...userData
        });
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error("Giriş hatası:", err);
      setError("Giriş sırasında bir hata oluştu");
    }

    setLoading(false);
  };

  // GİRİŞ MODU
  if (mode === "login") {
    return (
      <div style={s.card}>
        <div style={s.header}>
          <span style={s.icon}>🐠</span>
          <h2 style={s.h2}>Hoş Geldiniz!</h2>
          <p style={s.p}>Progvaryum'a giriş yapın</p>
        </div>

        {error && <div style={s.error}>⚠️ {error}</div>}

        <div style={s.formGroup}>
          <label style={s.label}>E-posta</label>
          <input 
            type="email" 
            placeholder="ornek@mail.com" 
            style={s.input} 
            value={loginForm.email} 
            onChange={e => setLoginForm({...loginForm, email: e.target.value})}
            disabled={loading}
          />
        </div>
        <div style={s.formGroup}>
          <label style={s.label}>Şifre</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            style={s.input} 
            value={loginForm.sifre} 
            onChange={e => setLoginForm({...loginForm, sifre: e.target.value})}
            disabled={loading}
            onKeyPress={e => e.key === 'Enter' && handleLogin()}
          />
        </div>

        <button 
          style={{...s.btnSubmit, opacity: loading ? 0.7 : 1}} 
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <span style={s.loading}>⏳ Giriş yapılıyor...</span>
          ) : (
            '🚀 Giriş Yap'
          )}
        </button>

        <p style={s.switchMode}>
          Hesabınız yok mu? {' '}
          <button style={s.switchBtn} onClick={() => { setMode("register"); setError(""); }}>
            Üye Ol
          </button>
        </p>
      </div>
    );
  }

  // KAYIT MODU
  return (
    <div style={s.card}>
      <div style={s.header}>
        <span style={s.icon}>🐠</span>
        <h2 style={s.h2}>Progvaryum'a Katıl</h2>
        <p style={s.p}>Akvaryum tutkunlarının platformu</p>
      </div>

      <div style={s.stepProgress}>
        {[1, 2, 3, 4].map(n => (
          <div 
            key={n} 
            style={{
              ...s.stepDot, 
              ...(step >= n ? s.stepDotActive : {})
            }}
          >
            {n}
          </div>
        ))}
      </div>

      {error && <div style={s.error}>⚠️ {error}</div>}

      {step === 1 && (
        <div>
          <h3 style={s.sectionTitle}>📝 Hesap Bilgileri</h3>
          <div style={s.formRow}>
            <div style={s.formGroup}>
              <label style={s.label}>İsim <span style={{color: '#ff6b6b'}}>*</span></label>
              <input type="text" placeholder="Adınız" style={s.input} value={form.isim} onChange={e => setForm({...form, isim: e.target.value})} />
            </div>
            <div style={s.formGroup}>
              <label style={s.label}>Soyisim <span style={{color: '#ff6b6b'}}>*</span></label>
              <input type="text" placeholder="Soyadınız" style={s.input} value={form.soyisim} onChange={e => setForm({...form, soyisim: e.target.value})} />
            </div>
          </div>
          <div style={s.formGroup}>
            <label style={s.label}>Kullanıcı Adı <span style={{color: '#ff6b6b'}}>*</span></label>
            <input type="text" placeholder="kullaniciadi" style={s.input} value={form.kullaniciAdi} onChange={e => setForm({...form, kullaniciAdi: e.target.value.toLowerCase().replace(/\s/g, "")})} />
          </div>
          <div style={s.formGroup}>
            <label style={s.label}>Nickname <span style={{color: '#ff6b6b'}}>*</span> <span style={s.labelSmall}>(Programda görünecek)</span></label>
            <input type="text" placeholder="Takma adınız" style={s.input} value={form.nickname} onChange={e => setForm({...form, nickname: e.target.value})} />
          </div>
          <div style={s.formGroup}>
            <label style={s.label}>E-posta <span style={{color: '#ff6b6b'}}>*</span></label>
            <input type="email" placeholder="ornek@mail.com" style={s.input} value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          </div>
          <div style={s.formRow}>
            <div style={s.formGroup}>
              <label style={s.label}>Şifre <span style={{color: '#ff6b6b'}}>*</span></label>
              <input type="password" placeholder="En az 6 karakter" style={s.input} value={form.sifre} onChange={e => setForm({...form, sifre: e.target.value})} />
            </div>
            <div style={s.formGroup}>
              <label style={s.label}>Şifre Tekrar <span style={{color: '#ff6b6b'}}>*</span></label>
              <input type="password" placeholder="Tekrar" style={s.input} value={form.sifreTekrar} onChange={e => setForm({...form, sifreTekrar: e.target.value})} />
            </div>
          </div>
          <button style={s.btnNext} onClick={() => { 
            if (!form.isim || !form.soyisim || !form.kullaniciAdi || !form.nickname || !form.email || !form.sifre) { 
              setError("Zorunlu alanları doldurun"); 
              return; 
            } 
            if (form.sifre !== form.sifreTekrar) { 
              setError("Şifreler eşleşmiyor"); 
              return; 
            } 
            if (form.sifre.length < 6) {
              setError("Şifre en az 6 karakter olmalı");
              return;
            }
            setError(""); 
            setStep(2); 
          }}>Devam →</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 style={s.sectionTitle}>👤 Kişisel Bilgiler</h3>
          <div style={s.formRow}>
            <div style={s.formGroup}>
              <label style={s.label}>Yaşınız</label>
              <input type="number" placeholder="25" style={s.input} value={form.yas} onChange={e => setForm({...form, yas: e.target.value})} />
            </div>
            <div style={s.formGroup}>
              <label style={s.label}>Şehir</label>
              <select style={s.select} value={form.sehir} onChange={e => setForm({...form, sehir: e.target.value})}>
                <option value="">Seçin...</option>
                {SEHIRLER.map(st => <option key={st} value={st}>{st}</option>)}
              </select>
            </div>
          </div>
          <div style={s.formGroup}>
            <label style={s.label}>Bizi nereden duydunuz?</label>
            <select style={s.select} value={form.nerelerdanDuydunuz} onChange={e => setForm({...form, nerelerdanDuydunuz: e.target.value})}>
              <option value="">Seçin...</option>
              {NEREDEN_DUYDUNUZ.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <button style={s.btnNext} onClick={() => setStep(3)}>Devam →</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 style={s.sectionTitle}>🐟 Hobi Bilgileri</h3>
          <div style={s.formRow}>
            <div style={s.formGroup}>
              <label style={s.label}>Kaç yıldır hobicisiniz?</label>
              <select style={s.select} value={form.hobiciYil} onChange={e => setForm({...form, hobiciYil: e.target.value})}>
                <option value="">Seçin...</option>
                <option value="0">Yeni başlıyorum</option>
                <option value="1">1 yıldan az</option>
                <option value="2">1-2 yıl</option>
                <option value="3">3-5 yıl</option>
                <option value="7">5-10 yıl</option>
                <option value="15">10+ yıl</option>
              </select>
            </div>
            <div style={s.formGroup}>
              <label style={s.label}>Kaç akvaryumunuz var?</label>
              <select style={s.select} value={form.akvaryumSayisi} onChange={e => setForm({...form, akvaryumSayisi: e.target.value})}>
                <option value="">Seçin...</option>
                <option value="0">Henüz yok</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3-5</option>
                <option value="6">5+</option>
              </select>
            </div>
          </div>
          <div style={s.formGroup}>
            <label style={s.label}>Favori Balık Türleri</label>
            <div style={s.tagGrid}>
              {BALIK_TURLERI.map(b => (
                <button 
                  key={b} 
                  type="button"
                  style={{...s.tagBtn, ...(form.favoriBaliklar.includes(b) ? s.tagBtnSelected : {})}} 
                  onClick={() => setForm({...form, favoriBaliklar: form.favoriBaliklar.includes(b) ? form.favoriBaliklar.filter(x => x !== b) : [...form.favoriBaliklar, b]})}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
          <div style={s.formGroup}>
            <label style={s.label}>Favori Marka</label>
            <select style={s.select} value={form.favoriMarka} onChange={e => setForm({...form, favoriMarka: e.target.value})}>
              <option value="">Seçin...</option>
              {MARKALAR.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <button style={s.btnNext} onClick={() => setStep(4)}>Devam →</button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h3 style={s.sectionTitle}>🏠 Akvaryum Kurulum Tipleri</h3>
          <p style={{...s.p, marginBottom: '20px'}}>Hangi tip akvaryumlarınız var?</p>
          <div style={s.typeGrid}>
            {AKVARYUM_TIPLERI.map(tip => (
              <button 
                key={tip.id} 
                type="button"
                style={{...s.typeBtn, ...(form.akvaryumTipleri.includes(tip.id) ? s.typeBtnSelected : {})}} 
                onClick={() => setForm({...form, akvaryumTipleri: form.akvaryumTipleri.includes(tip.id) ? form.akvaryumTipleri.filter(x => x !== tip.id) : [...form.akvaryumTipleri, tip.id]})}
              >
                {tip.label}
              </button>
            ))}
          </div>
          <button 
            style={{...s.btnSubmit, opacity: loading ? 0.7 : 1}} 
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <span style={s.loading}>⏳ Kayıt yapılıyor...</span>
            ) : (
              '✅ Kaydı Tamamla'
            )}
          </button>
        </div>
      )}

      <p style={s.switchMode}>
        Zaten üye misiniz? {' '}
        <button style={s.switchBtn} onClick={() => { setMode("login"); setError(""); }}>
          Giriş Yap
        </button>
      </p>
    </div>
  );
}