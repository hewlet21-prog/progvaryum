import React, { useState, useEffect, useRef } from 'react';
import './Forum.css';

const KATEGORILER = [
  { id: 'genel', isim: 'Genel Sohbet', ikon: '💬', renk: '#3498db' },
  { id: 'balik', isim: 'Balık Türleri', ikon: '🐠', renk: '#e74c3c' },
  { id: 'bitki', isim: 'Bitkili Akvaryum', ikon: '🌿', renk: '#27ae60' },
  { id: 'hastalik', isim: 'Hastalık & Tedavi', ikon: '🏥', renk: '#9b59b6' },
  { id: 'ekipman', isim: 'Ekipman & Kurulum', ikon: '🔧', renk: '#f39c12' },
  { id: 'satis', isim: "Hobici'den Al", ikon: '🛒', renk: '#1abc9c' },
  { id: 'oneri', isim: 'Geliştiriciye Öneriler', ikon: '💡', renk: '#e91e63' }
];

const ETIKETLER = ['tetra', 'discus', 'guppy', 'betta', 'cichlid', 'karides', 'hastalık', 'tedavi', 'kurulum', 'filtre', 'aydınlatma', 'co2', 'bitki', 'beslenme', 'acil', 'duyuru'];

const SEVIYELER = [
  { isim: 'Yeni Hobici', ikon: '🌱', renk: '#95a5a6', min: 0 },
  { isim: 'Hobi Başlangıç', ikon: '🐟', renk: '#3498db', min: 50 },
  { isim: 'Deneyimli', ikon: '🐠', renk: '#27ae60', min: 200 },
  { isim: 'Usta', ikon: '🏆', renk: '#f39c12', min: 500 },
  { isim: 'Uzman', ikon: '👑', renk: '#9b59b6', min: 1000 }
];

const getSeviye = (puan) => SEVIYELER.slice().reverse().find(s => puan >= s.min) || SEVIYELER[0];
const formatTarih = (t) => {
  const f = Math.floor((Date.now() - new Date(t)) / 1000);
  if (f < 60) return 'Az önce';
  if (f < 3600) return `${Math.floor(f/60)} dakika önce`;
  if (f < 86400) return `${Math.floor(f/3600)} saat önce`;
  if (f < 604800) return `${Math.floor(f/86400)} gün önce`;
  return new Date(t).toLocaleDateString('tr-TR');
};
const genId = () => Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

// Props: kullanici (site auth'dan), onAuthModalAc (giriş modalı açmak için)
export default function Forum({ kullanici, onAuthModalAc }) {
  // Kullanıcı kontrolü - misafir değilse aktif kullanıcı
  const user = kullanici && !kullanici.isMisafir ? {
    id: kullanici.id,
    ad: kullanici.nickname || kullanici.kullaniciAdi,
    avatar: kullanici.avatar || '🐟',
    isAdmin: kullanici.kullaniciAdi === 'admin',
    puan: 0,
    konuSay: 0,
    yorumSay: 0
  } : null;

  const [forumProfiller, setForumProfiller] = useState({});
  const [konular, setKonular] = useState([]);
  const [seciliKat, setSeciliKat] = useState('hepsi');
  const [seciliKonu, setSeciliKonu] = useState(null);
  const [siralama, setSiralama] = useState('yeni');
  const [arama, setArama] = useState('');
  const [konuModal, setKonuModal] = useState(false);
  const [yeniKonu, setYeniKonu] = useState({ baslik: '', icerik: '', kat: 'genel', etiketler: [], fiyat: '', konum: '', tel: '' });
  const [yeniYorum, setYeniYorum] = useState('');
  const [cevapTo, setCevapTo] = useState(null);
  
  const [chatMsgs, setChatMsgs] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [chatOnline] = useState(Math.floor(Math.random() * 15) + 8);
  const [lastChatTime, setLastChatTime] = useState(0);
  const chatRef = useRef(null);

  // Forum profilleri (puan, konu sayısı vb.) - localStorage'dan
  useEffect(() => {
    let fp = localStorage.getItem('forumProfiller');
    if (fp) {
      setForumProfiller(JSON.parse(fp));
    }
  }, []);

  // Kullanıcı değiştiğinde forum profilini güncelle/oluştur
  useEffect(() => {
    if (user && user.id) {
      setForumProfiller(prev => {
        const yeni = { ...prev };
        if (!yeni[user.id]) {
          yeni[user.id] = { puan: 0, konuSay: 0, yorumSay: 0 };
        }
        localStorage.setItem('forumProfiller', JSON.stringify(yeni));
        return yeni;
      });
    }
  }, [user?.id]);

  // Konuları yükle
  useEffect(() => {
    let k = localStorage.getItem('forumKonular6');
    if (k) {
      setKonular(JSON.parse(k));
    } else {
      const ornek = [
        { id: genId(), baslik: '🎉 Yeni Üyelere Hoş Geldiniz! Buradan başlayın', icerik: 'Merhaba akvaryum severler! Foruma hoş geldiniz. Kendinizi tanıtın, akvaryumunuzdan bahsedin.', kat: 'genel', etiketler: ['duyuru'], yazar: 'Admin', yazarId: 'admin', tarih: new Date(Date.now() - 432000000).toISOString(), gor: 592, begen: [], yorumlar: [], sabit: true, kilitli: false },
        { id: genId(), baslik: 'Yeni kurulum sonrası bulanıklık?', icerik: 'Akvaryumu yeni kurdum ama su çok bulanık. Normal mi? Ne yapmalıyım?', kat: 'ekipman', etiketler: ['kurulum', 'filtre'], yazar: 'BurakYaman', yazarId: 'burak1', tarih: new Date(Date.now() - 60000).toISOString(), gor: 252, begen: [], yorumlar: ornekYorumlar(5), sabit: false, kilitli: false },
        { id: genId(), baslik: 'Neon tetralarım yem yemiyor?', icerik: '3 gündür neon tetralarım yem yemiyorlar, endişeleniyorum. Ne yapmalıyım?', kat: 'balik', etiketler: ['tetra', 'beslenme'], yazar: 'DenizBalikci', yazarId: 'deniz1', tarih: new Date(Date.now() - 259200000).toISOString(), gor: 194, begen: [], yorumlar: ornekYorumlar(3), sabit: false, kilitli: false },
        { id: genId(), baslik: 'En uygun discus yemi hangisi?', icerik: 'Kaliteli ama uygun fiyatlı discus yemi arıyorum. Önerileriniz neler?', kat: 'balik', etiketler: ['discus', 'beslenme'], yazar: 'CiclidSever', yazarId: 'ciclid1', tarih: new Date(Date.now() - 86400000).toISOString(), gor: 387, begen: [], yorumlar: ornekYorumlar(8), sabit: false, kilitli: false },
        { id: genId(), baslik: 'Akvaryum ışığı kaç saat açık kalmalı?', icerik: 'Bitkili akvaryumda aydınlatma süresi ne kadar olmalı? 8 saat yeterli mi?', kat: 'bitki', etiketler: ['aydınlatma'], yazar: 'MaviDunya', yazarId: 'mavi1', tarih: new Date(Date.now() - 432000000).toISOString(), gor: 288, begen: [], yorumlar: ornekYorumlar(4), sabit: false, kilitli: false }
      ];
      localStorage.setItem('forumKonular6', JSON.stringify(ornek));
      setKonular(ornek);
    }
    
    // Chat mesajları
    let c = localStorage.getItem('forumChat6');
    if (c) {
      setChatMsgs(JSON.parse(c));
    } else {
      const ornekChat = [
        { id: genId(), yazar: 'Ali', avatar: '🐟', msg: 'Discus için pH kaç olmalı?', tarih: new Date(Date.now() - 120000).toISOString() },
        { id: genId(), yazar: 'Mehmet', avatar: '🐠', msg: '6.0-6.5 ideal 👍', tarih: new Date(Date.now() - 60000).toISOString() },
        { id: genId(), yazar: 'Ayşe', avatar: '🌿', msg: 'Filtre önerisi olan?', tarih: new Date(Date.now() - 30000).toISOString() }
      ];
      localStorage.setItem('forumChat6', JSON.stringify(ornekChat));
      setChatMsgs(ornekChat);
    }
  }, []);

  function ornekYorumlar(count) {
    const isimler = ['umutbalik', 'denizci23', 'akvaryumcu', 'balikci', 'hobici', 'mavisu', 'yesilbahce'];
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        id: genId(),
        yazar: isimler[Math.floor(Math.random() * isimler.length)],
        yazarId: 'ornek' + i,
        icerik: 'Yeni akvaryumlarda bulanıklık çok normal. Bakteri dengesizliği yüzünden olabilir. 1-2 hafta içinde geçer genelde. Filtreyi çalıştırmaya devam et! 😊',
        tarih: new Date(Date.now() - Math.random() * 172800000).toISOString(),
        begen: [],
        cevaplar: []
      });
    }
    return arr;
  }

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollLeft = chatRef.current.scrollWidth;
    }
  }, [chatMsgs]);

  const kaydet = (k) => { localStorage.setItem('forumKonular6', JSON.stringify(k)); setKonular(k); };

  const puanEkle = (userId, p, alan) => {
    if (!userId) return;
    setForumProfiller(prev => {
      const yeni = { ...prev };
      if (!yeni[userId]) yeni[userId] = { puan: 0, konuSay: 0, yorumSay: 0 };
      yeni[userId].puan = (yeni[userId].puan || 0) + p;
      yeni[userId][alan] = (yeni[userId][alan] || 0) + 1;
      localStorage.setItem('forumProfiller', JSON.stringify(yeni));
      return yeni;
    });
  };

  const getForumProfil = (userId) => forumProfiller[userId] || { puan: 0, konuSay: 0, yorumSay: 0 };

  // Giriş gerekli kontrolü
  const girisGerekli = (callback) => {
    if (!user) {
      if (onAuthModalAc) onAuthModalAc('login');
      return false;
    }
    return true;
  };

  const chatGonder = () => {
    if (!girisGerekli()) return;
    if (!chatInput.trim()) return;
    if (chatInput.length > 120) { alert('Mesaj max 120 karakter'); return; }
    if (Date.now() - lastChatTime < 5000) { alert('5 saniye bekleyin'); return; }
    const m = { id: genId(), yazar: user.ad, avatar: user.avatar, msg: chatInput.trim(), tarih: new Date().toISOString() };
    const yeni = [...chatMsgs, m].slice(-20);
    localStorage.setItem('forumChat6', JSON.stringify(yeni));
    setChatMsgs(yeni);
    setChatInput('');
    setLastChatTime(Date.now());
  };

  const chatToKonu = (msg) => {
    if (!girisGerekli()) return;
    setYeniKonu({ ...yeniKonu, baslik: msg.msg.substring(0, 50), icerik: msg.msg });
    setKonuModal(true);
  };

  const konuAc = () => {
    if (!girisGerekli()) return;
    if (yeniKonu.baslik.length < 10) { alert('Başlık min 10 karakter'); return; }
    if (yeniKonu.icerik.length < 30) { alert('İçerik min 30 karakter'); return; }
    const k = { 
      id: genId(), 
      baslik: yeniKonu.baslik, 
      icerik: yeniKonu.icerik, 
      kat: yeniKonu.kat, 
      etiketler: yeniKonu.etiketler, 
      yazar: user.ad, 
      yazarId: user.id,
      tarih: new Date().toISOString(), 
      gor: 0, 
      begen: [], 
      yorumlar: [], 
      sabit: false, 
      kilitli: false, 
      fiyat: yeniKonu.fiyat, 
      konum: yeniKonu.konum, 
      tel: yeniKonu.tel 
    };
    kaydet([k, ...konular]);
    puanEkle(user.id, 10, 'konuSay');
    setYeniKonu({ baslik: '', icerik: '', kat: 'genel', etiketler: [], fiyat: '', konum: '', tel: '' });
    setKonuModal(false);
  };

  const konuGor = (k) => {
    const g = konular.map(x => x.id === k.id ? { ...x, gor: (x.gor||0)+1 } : x);
    kaydet(g);
    setSeciliKonu(g.find(x => x.id === k.id));
  };

  const konuSil = (id) => {
    if (!window.confirm('Silmek istediğinize emin misiniz?')) return;
    kaydet(konular.filter(k => k.id !== id));
    setSeciliKonu(null);
  };

  const konuSabit = (id) => {
    const g = konular.map(k => k.id === id ? { ...k, sabit: !k.sabit } : k);
    kaydet(g);
    if (seciliKonu?.id === id) setSeciliKonu(g.find(k => k.id === id));
  };

  const konuKilit = (id) => {
    const g = konular.map(k => k.id === id ? { ...k, kilitli: !k.kilitli } : k);
    kaydet(g);
    if (seciliKonu?.id === id) setSeciliKonu(g.find(k => k.id === id));
  };

  const yorumYap = () => {
    if (!girisGerekli()) return;
    if (!yeniYorum.trim() || seciliKonu?.kilitli) return;
    const y = { 
      id: genId(), 
      yazar: user.ad, 
      yazarId: user.id,
      icerik: yeniYorum, 
      tarih: new Date().toISOString(), 
      begen: [], 
      cevaplar: [] 
    };
    let g;
    if (cevapTo) {
      g = konular.map(k => k.id === seciliKonu.id ? { ...k, yorumlar: k.yorumlar.map(yy => yy.id === cevapTo.id ? { ...yy, cevaplar: [...(yy.cevaplar||[]), y] } : yy) } : k);
    } else {
      g = konular.map(k => k.id === seciliKonu.id ? { ...k, yorumlar: [...k.yorumlar, y] } : k);
    }
    kaydet(g);
    setSeciliKonu(g.find(k => k.id === seciliKonu.id));
    puanEkle(user.id, 5, 'yorumSay');
    setYeniYorum('');
    setCevapTo(null);
  };

  const yorumSil = (yid, ustId = null) => {
    let g;
    if (ustId) {
      g = konular.map(k => k.id === seciliKonu.id ? { ...k, yorumlar: k.yorumlar.map(y => y.id === ustId ? { ...y, cevaplar: y.cevaplar.filter(c => c.id !== yid) } : y) } : k);
    } else {
      g = konular.map(k => k.id === seciliKonu.id ? { ...k, yorumlar: k.yorumlar.filter(y => y.id !== yid) } : k);
    }
    kaydet(g);
    setSeciliKonu(g.find(k => k.id === seciliKonu.id));
  };

  const begen = (konuId, yorumId = null) => {
    if (!girisGerekli()) return;
    const g = konular.map(k => {
      if (k.id !== konuId) return k;
      if (yorumId) {
        return { ...k, yorumlar: k.yorumlar.map(y => y.id === yorumId ? { ...y, begen: y.begen.includes(user.id) ? y.begen.filter(b=>b!==user.id) : [...y.begen, user.id] } : y) };
      }
      return { ...k, begen: k.begen.includes(user.id) ? k.begen.filter(b=>b!==user.id) : [...k.begen, user.id] };
    });
    kaydet(g);
    if (seciliKonu?.id === konuId) setSeciliKonu(g.find(k => k.id === konuId));
  };

  const filtre = konular.filter(k => {
    if (seciliKat !== 'hepsi' && k.kat !== seciliKat) return false;
    if (arama && !k.baslik.toLowerCase().includes(arama.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    if (a.sabit && !b.sabit) return -1;
    if (!a.sabit && b.sabit) return 1;
    if (siralama === 'populer') return (b.yorumlar?.length||0) - (a.yorumlar?.length||0);
    if (siralama === 'gor') return (b.gor||0) - (a.gor||0);
    return new Date(b.tarih) - new Date(a.tarih);
  });

  const toplamYorum = konular.reduce((t, k) => t + (k.yorumlar?.length || 0), 0);
  const toplamUye = Object.keys(forumProfiller).length + 5; // +5 örnek için
  const onlineAvatars = ['🐟', '🐠', '🦈', '🐡', '🦐', '🌿'];

  return (
    <div className="forum-wrapper">
      {/* HEADER + CANLI SOHBET BANT */}
      <header className="forum-top-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => window.history.back()}>← Geri</button>
        </div>
        <div className="header-center">
          <span className="logo">🐟</span>
          <div>
            <h1>Akvaryum Forumu</h1>
            <p>Hobicilerle sohbet et, deneyimlerini paylaş.</p>
          </div>
        </div>
        <div className="header-right">
          {!seciliKonu && (
            <button className="btn-new" onClick={() => user ? setKonuModal(true) : onAuthModalAc && onAuthModalAc('login')}>
              + Yeni Konu
            </button>
          )}
        </div>
      </header>

      {/* CANLI SOHBET BANT */}
      <div className="chat-band">
        <div className="chat-band-header">
          <div className="chat-indicator"></div>
          <span className="chat-title">Canlı Sohbet</span>
          <span className="chat-online">• {chatOnline} kişi çevrimiçi</span>
          <div className="chat-avatars">
            {onlineAvatars.map((a, i) => <span key={i} className="online-av">{a}</span>)}
          </div>
        </div>
        <div className="chat-band-messages" ref={chatRef}>
          {chatMsgs.map(m => (
            <div key={m.id} className="chat-bubble">
              <span className="bubble-avatar">{m.avatar}</span>
              <div className="bubble-content">
                <strong>{m.yazar}:</strong> {m.msg}
                {user && <button className="bubble-to-topic" onClick={() => chatToKonu(m)} title="Konu yap">🧵</button>}
              </div>
            </div>
          ))}
        </div>
        <div className="chat-band-input">
          <span className="input-dots">•••</span>
          <input
            placeholder={user ? "Mesajını yaz..." : "Giriş yaparak sohbete katıl"}
            value={chatInput}
            onChange={e => setChatInput(e.target.value.slice(0, 120))}
            onKeyPress={e => e.key === 'Enter' && chatGonder()}
            disabled={!user}
            onClick={() => !user && onAuthModalAc && onAuthModalAc('login')}
          />
          <button onClick={chatGonder} disabled={!user}>➤</button>
        </div>
      </div>

      <div className="forum-body">
        {/* SOL SIDEBAR */}
        <aside className="forum-categories">
          <div className="cat-list">
            <div className={`cat-item ${seciliKat === 'hepsi' ? 'active' : ''}`} onClick={() => { setSeciliKat('hepsi'); setSeciliKonu(null); }}>
              <span>📋</span> Tümü <span className="cnt">{konular.length}</span>
            </div>
            {KATEGORILER.map(k => (
              <div key={k.id} className={`cat-item ${seciliKat === k.id ? 'active' : ''}`} onClick={() => { setSeciliKat(k.id); setSeciliKonu(null); }} style={{'--cat-color': k.renk}}>
                <span>{k.ikon}</span> {k.isim} <span className="cnt">{konular.filter(x => x.kat === k.id).length}</span>
              </div>
            ))}
          </div>

          <div className="cat-divider"></div>

          <div className="search-box">
            <span>🔍</span>
            <input placeholder="Forumda ara..." value={arama} onChange={e => setArama(e.target.value)} />
          </div>

          {/* Kullanıcı durumu */}
          {user ? (
            <div className="user-box">
              <span className="user-avatar">{user.avatar}</span>
              <div className="user-info">
                <strong>{user.ad}</strong>
                <small>{getForumProfil(user.id).puan} puan</small>
              </div>
            </div>
          ) : (
            <button className="login-btn" onClick={() => onAuthModalAc && onAuthModalAc('login')}>
              🔐 Giriş Yap
            </button>
          )}
        </aside>

        {/* ANA İÇERİK */}
        <main className="forum-content">
          {!seciliKonu ? (
            <>
              {/* STATS */}
              <div className="stats-bar">
                <div className="stat"><span>📄</span><strong>{konular.length}</strong><small>Toplam Konu</small></div>
                <div className="stat"><span>👤</span><strong>{toplamUye}</strong><small>Toplam Üye</small></div>
                <div className="stat"><span>💬</span><strong>{toplamYorum}</strong><small>Toplam Yorum</small></div>
              </div>

              {/* SIRALAMA */}
              <div className="sort-bar">
                <button className={siralama === 'yeni' ? 'active' : ''} onClick={() => setSiralama('yeni')}>🕐 En Yeni</button>
                <button className={siralama === 'populer' ? 'active' : ''} onClick={() => setSiralama('populer')}>💬 En Çok Yanıtlanan</button>
                <button className={siralama === 'gor' ? 'active' : ''} onClick={() => setSiralama('gor')}>👁️ En Çok Görüntülenen</button>
              </div>

              {/* KONU LİSTESİ */}
              <div className="topic-list">
                {filtre.length === 0 ? (
                  <div className="empty"><span>📭</span><p>Konu bulunamadı</p></div>
                ) : filtre.map(k => {
                  const profil = getForumProfil(k.yazarId);
                  const sev = getSeviye(profil.puan);
                  const kat = KATEGORILER.find(x => x.id === k.kat);
                  return (
                    <div key={k.id} className={`topic-card ${k.sabit ? 'pinned' : ''}`} onClick={() => konuGor(k)}>
                      <div className="topic-left">
                        <div className="topic-avatar">
                          <span>🐟</span>
                          <span className="level-dot" style={{background: sev.renk}}>{sev.ikon}</span>
                        </div>
                      </div>
                      <div className="topic-main">
                        <div className="topic-meta">
                          <strong>{k.yazar}</strong>
                          <span>• {formatTarih(k.tarih)}</span>
                          {kat && <span className="kat-badge" style={{background: kat.renk}}>{kat.isim}</span>}
                        </div>
                        <h3>{k.sabit && '📌 '}{k.kilitli && '🔒 '}{k.baslik}</h3>
                        <p>{k.icerik.substring(0, 100)}...</p>
                        {k.etiketler?.length > 0 && (
                          <div className="topic-tags">{k.etiketler.map(t => <span key={t}>#{t}</span>)}</div>
                        )}
                      </div>
                      <div className="topic-right">
                        <div className="topic-stat">❤️ {k.begen?.length || 0}</div>
                        <div className="topic-stat">👁️ {k.gor || 0}</div>
                        <div className="topic-stat">💬 {k.yorumlar?.length || 0}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            /* KONU DETAY */
            <div className="topic-detail">
              <button className="detail-back" onClick={() => setSeciliKonu(null)}>← Geri</button>

              <article className="detail-post">
                <div className="post-header">
                  <div className="post-author">
                    <span className="author-avatar">🐟</span>
                    <div>
                      <strong>{seciliKonu.yazar}</strong>
                      <span className="author-time">• {formatTarih(seciliKonu.tarih)}</span>
                    </div>
                  </div>
                </div>

                <h1 className="post-title">{seciliKonu.baslik}</h1>
                
                {seciliKonu.etiketler?.length > 0 && (
                  <div className="post-tags">{seciliKonu.etiketler.map(t => <span key={t}>#{t}</span>)}</div>
                )}

                <div className="post-body">{seciliKonu.icerik}</div>

                {seciliKonu.kat === 'satis' && (seciliKonu.fiyat || seciliKonu.konum || seciliKonu.tel) && (
                  <div className="sale-box">
                    {seciliKonu.fiyat && <div>💰 {seciliKonu.fiyat} TL</div>}
                    {seciliKonu.konum && <div>📍 {seciliKonu.konum}</div>}
                    {seciliKonu.tel && <div>📞 {seciliKonu.tel}</div>}
                  </div>
                )}

                <div className="post-footer">
                  <button className={`like-btn ${seciliKonu.begen?.includes(user?.id) ? 'liked' : ''}`} onClick={() => begen(seciliKonu.id)}>
                    ❤️ {seciliKonu.begen?.length || 0}
                  </button>
                  <span className="view-count">👁️ {seciliKonu.gor}</span>
                  <span className="comment-count">💬 {seciliKonu.yorumlar?.length || 0}</span>
                  
                  {user && (user.isAdmin || user.id === seciliKonu.yazarId) && (
                    <div className="admin-btns">
                      {user.isAdmin && <button onClick={() => konuSabit(seciliKonu.id)}>{seciliKonu.sabit ? '📌' : '📍'}</button>}
                      {user.isAdmin && <button onClick={() => konuKilit(seciliKonu.id)}>{seciliKonu.kilitli ? '🔓' : '🔒'}</button>}
                      <button onClick={() => konuSil(seciliKonu.id)}>🗑️</button>
                    </div>
                  )}
                </div>
              </article>

              {/* YANITLAR */}
              <section className="replies-section">
                <div className="replies-header">
                  <h3>{seciliKonu.yorumlar?.length || 0} Yanıt</h3>
                </div>

                <div className="replies-list">
                  {seciliKonu.yorumlar?.map(y => {
                    const profil = getForumProfil(y.yazarId);
                    const sev = getSeviye(profil.puan);
                    return (
                      <div key={y.id} className="reply-card">
                        <div className="reply-header">
                          <span className="reply-avatar">🐟</span>
                          <div className="reply-author">
                            <strong>{y.yazar}</strong>
                            <span className="reply-level" style={{background: sev.renk}}>{sev.isim}</span>
                          </div>
                          <span className="reply-time">{formatTarih(y.tarih)}</span>
                        </div>
                        <p className="reply-text">{y.icerik}</p>
                        <div className="reply-footer">
                          <button className={`small-like ${y.begen?.includes(user?.id) ? 'liked' : ''}`} onClick={() => begen(seciliKonu.id, y.id)}>
                            ❤️ {y.begen?.length || 0}
                          </button>
                          <button onClick={() => setCevapTo(y)}>Yanıtla</button>
                          {user && (user.isAdmin || user.id === y.yazarId) && (
                            <button className="del-btn" onClick={() => yorumSil(y.id)}>🗑️</button>
                          )}
                        </div>

                        {/* ALT CEVAPLAR */}
                        {y.cevaplar?.map(c => (
                          <div key={c.id} className="sub-reply">
                            <span className="sub-avatar">🐟</span>
                            <div>
                              <strong>{c.yazar}</strong>
                              <p>{c.icerik}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>

                {/* YANIT YAZ */}
                {!seciliKonu.kilitli ? (
                  <div className="reply-form">
                    <div className="form-header">
                      <span>✏️</span> Yanıt Yaz
                    </div>
                    {cevapTo && (
                      <div className="reply-to">
                        ↩️ {cevapTo.yazar}'a yanıt
                        <button onClick={() => setCevapTo(null)}>✕</button>
                      </div>
                    )}
                    <div className="form-input-row">
                      <span className="form-avatar">{user?.avatar || '🐟'}</span>
                      <input
                        placeholder={user ? "Yanıtınızı buraya yazın..." : "Yanıt yazmak için giriş yapın"}
                        value={yeniYorum}
                        onChange={e => setYeniYorum(e.target.value)}
                        disabled={!user}
                        onClick={() => !user && onAuthModalAc && onAuthModalAc('login')}
                      />
                      <button className="send-btn" onClick={yorumYap} disabled={!user || !yeniYorum.trim()}>Gönder</button>
                    </div>
                  </div>
                ) : (
                  <div className="locked-msg">🔒 Bu konu kilitli</div>
                )}
              </section>
            </div>
          )}
        </main>
      </div>

      {/* YENİ KONU MODAL */}
      {konuModal && (
        <div className="modal-bg" onClick={() => setKonuModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-head"><h2>+ Yeni Konu</h2><button onClick={() => setKonuModal(false)}>✕</button></div>
            <div className="modal-content">
              <label>Kategori</label>
              <div className="kat-btns">{KATEGORILER.map(k => <button key={k.id} className={yeniKonu.kat === k.id ? 'active' : ''} onClick={() => setYeniKonu({...yeniKonu, kat: k.id})} style={{'--c': k.renk}}>{k.ikon} {k.isim}</button>)}</div>
              <label>Başlık <small>(min 10)</small></label>
              <input value={yeniKonu.baslik} onChange={e => setYeniKonu({...yeniKonu, baslik: e.target.value})} placeholder="Açıklayıcı başlık..." />
              <label>İçerik <small>(min 30)</small></label>
              <textarea value={yeniKonu.icerik} onChange={e => setYeniKonu({...yeniKonu, icerik: e.target.value})} placeholder="Detaylı açıklama..." rows={5} />
              <label>Etiketler <small>(max 3)</small></label>
              <div className="tag-btns">{ETIKETLER.map(t => <button key={t} className={yeniKonu.etiketler.includes(t) ? 'active' : ''} disabled={!yeniKonu.etiketler.includes(t) && yeniKonu.etiketler.length >= 3} onClick={() => setYeniKonu({...yeniKonu, etiketler: yeniKonu.etiketler.includes(t) ? yeniKonu.etiketler.filter(x=>x!==t) : [...yeniKonu.etiketler, t]})}>#{t}</button>)}</div>
              {yeniKonu.kat === 'satis' && (
                <>
                  <label>💰 Fiyat</label>
                  <input value={yeniKonu.fiyat} onChange={e => setYeniKonu({...yeniKonu, fiyat: e.target.value})} placeholder="150 TL" />
                  <label>📍 Konum</label>
                  <input value={yeniKonu.konum} onChange={e => setYeniKonu({...yeniKonu, konum: e.target.value})} placeholder="İstanbul" />
                  <label>📞 İletişim</label>
                  <input value={yeniKonu.tel} onChange={e => setYeniKonu({...yeniKonu, tel: e.target.value})} placeholder="Tel veya sosyal medya" />
                </>
              )}
              <button className="submit-btn" onClick={konuAc}>✅ Konu Oluştur</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}