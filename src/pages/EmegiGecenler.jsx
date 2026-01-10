import React from 'react';
import { useNavigate } from 'react-router-dom';

const KATKILAR = [
  'Salih Taş',
  'Hakan Balcı',
  'Alper Bursalıoğlu',
  'Mert Menteş',
  'Ahmet Altan',
  'Taner Yaşar',
  'İlker Kırkar'
];

export default function EmegiGecenler() {
  const navigate = useNavigate();

  return (
    <div style={{
      padding: '30px',
      maxWidth: '900px',
      margin: '0 auto',
      minHeight: '100vh'
    }}>
      {/* Geri Butonu */}
      <button
        onClick={() => navigate('/')}
        style={{
          background: 'rgba(45, 125, 210, 0.2)',
          border: '1px solid rgba(45, 125, 210, 0.4)',
          color: '#2d7dd2',
          padding: '10px 20px',
          borderRadius: '25px',
          fontSize: '0.9rem',
          fontWeight: '600',
          cursor: 'pointer',
          marginBottom: '30px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.3s ease'
        }}
      >
        ← Ana Sayfa
      </button>

      {/* Ana Başlık */}
      <div style={{
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <span style={{ fontSize: '4rem', display: 'block', marginBottom: '15px' }}>💙</span>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#ffffff',
          margin: '0',
          background: 'linear-gradient(135deg, #2d7dd2, #1abc9c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Emeği Geçenler
        </h1>
      </div>

      {/* Misyon Kartı */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(45, 125, 210, 0.15), rgba(26, 188, 156, 0.1))',
        border: '1px solid rgba(45, 125, 210, 0.3)',
        borderRadius: '24px',
        padding: '35px',
        marginBottom: '40px',
        textAlign: 'center',
        backdropFilter: 'blur(10px)'
      }}>
        <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '15px' }}>🎯</span>
        <h2 style={{
          color: '#ffffff',
          fontSize: '1.4rem',
          fontWeight: '700',
          margin: '0 0 15px 0'
        }}>
          Misyonumuz
        </h2>
        <p style={{
          color: '#E5E7EB',
          fontSize: '1rem',
          lineHeight: '1.8',
          margin: '0',
          maxWidth: '700px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Bu program, <strong style={{ color: '#4ecdc4' }}>hobicilere yardım</strong>, 
          <strong style={{ color: '#f39c12' }}> bilgi paylaşımı</strong> ve 
          <strong style={{ color: '#e91e63' }}> yeni hobicilere destek</strong> olmak 
          amacıyla oluşturulmuştur. Akvaryum hobisini seven herkes için ücretsiz 
          ve açık bir kaynak olmayı hedefliyoruz.
        </p>
      </div>

      {/* Facebook Grubu Teşekkür */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(66, 103, 178, 0.2), rgba(66, 103, 178, 0.1))',
        border: '1px solid rgba(66, 103, 178, 0.4)',
        borderRadius: '24px',
        padding: '35px',
        marginBottom: '40px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Facebook Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #4267B2, #5b7bd5)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          fontSize: '2.5rem',
          boxShadow: '0 10px 30px rgba(66, 103, 178, 0.4)'
        }}>
          📘
        </div>
        
        <p style={{
          color: '#E5E7EB',
          fontSize: '1rem',
          lineHeight: '1.7',
          margin: '0 0 25px 0',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Bu programın geliştirilmesine katkı veren 
          <a 
            href="https://www.facebook.com/groups/479225605539195" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              color: '#5b9aff',
              fontWeight: '700',
              textDecoration: 'none',
              marginLeft: '5px',
              marginRight: '5px'
            }}
          >
            'AKVARYUM BİLGİ PAYLAŞIM'
          </a> 
          Facebook grubu üyelerine teşekkür ederiz!
        </p>
        
        <a 
          href="https://www.facebook.com/groups/479225605539195" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: 'linear-gradient(135deg, #4267B2, #5b7bd5)',
            color: 'white',
            padding: '14px 30px',
            borderRadius: '30px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1rem',
            boxShadow: '0 8px 25px rgba(66, 103, 178, 0.4)',
            transition: 'all 0.3s ease'
          }}
        >
          📘 Gruba Katıl
        </a>
      </div>

      {/* Emeği Geçenler - Sade Liste */}
      <div style={{
        background: 'rgba(20, 45, 80, 0.9)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '24px',
        padding: '35px',
        marginBottom: '40px',
        backdropFilter: 'blur(10px)'
      }}>
        <h2 style={{
          color: '#ffffff',
          fontSize: '1.4rem',
          fontWeight: '700',
          margin: '0 0 25px 0',
          textAlign: 'center'
        }}>
          🌟 Özel Teşekkürler
        </h2>

        {/* İsim Listesi - Sade */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '25px'
        }}>
          {KATKILAR.map((isim, index) => (
            <span
              key={index}
              style={{
                background: 'rgba(45, 125, 210, 0.15)',
                border: '1px solid rgba(45, 125, 210, 0.3)',
                padding: '10px 20px',
                borderRadius: '25px',
                color: '#E5E7EB',
                fontSize: '0.95rem',
                fontWeight: '500'
              }}
            >
              {isim}
            </span>
          ))}
        </div>

        {/* Diğer Hobiciler */}
        <div style={{
          textAlign: 'center',
          padding: '20px',
          background: 'rgba(26, 58, 92, 0.5)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <p style={{
            color: '#9CA3AF',
            fontSize: '0.95rem',
            margin: '0'
          }}>
            Ve diğer saygıdeğer hobiciler...
          </p>
        </div>
      </div>

      {/* Geliştirici Notu */}
      <div style={{
        background: 'rgba(139, 92, 246, 0.1)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        borderRadius: '20px',
        padding: '25px',
        textAlign: 'center'
      }}>
        <p style={{
          color: '#B8A5D6',
          fontSize: '0.9rem',
          margin: '0',
          lineHeight: '1.6'
        }}>
          <strong style={{ color: '#a78bfa' }}>👨‍💻 Geliştirici:</strong> Ali Samhal
        </p>
      </div>

      {/* Alt Boşluk */}
      <div style={{ height: '50px' }}></div>
    </div>
  );
}
