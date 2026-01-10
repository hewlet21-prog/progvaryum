import { useState, useEffect, useCallback } from 'react';

/**
 * useAkvaryumStorage - Aktif akvaryuma özel veri saklama hook'u
 * 
 * Bu hook, her akvaryum için ayrı günlük verileri tutar.
 * Örnek: akvaryum1 için yemleme kayıtları ayrı, akvaryum2 için ayrı
 * 
 * @param {string} key - Veri anahtarı (örn: "yemleme", "testKiti")
 * @param {any} initialValue - Varsayılan değer
 * @returns {[any, Function, string]} - [değer, setter, aktifAkvaryumId]
 */
export function useAkvaryumStorage(key, initialValue) {
  // Aktif akvaryum ID'sini al
  const getAktifAkvaryumId = () => {
    try {
      return localStorage.getItem('aktifAkvaryumId') || 'default';
    } catch {
      return 'default';
    }
  };

  const [aktifId, setAktifId] = useState(getAktifAkvaryumId);

  // Akvaryuma özel key oluştur
  const getStorageKey = useCallback((akvaryumId) => {
    return `akvaryum_${akvaryumId}_${key}`;
  }, [key]);

  // Değeri state olarak tut
  const [value, setValue] = useState(() => {
    try {
      const storageKey = getStorageKey(getAktifAkvaryumId());
      const item = localStorage.getItem(storageKey);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Aktif akvaryum değişikliklerini dinle
  useEffect(() => {
    const handleStorageChange = () => {
      const yeniId = getAktifAkvaryumId();
      if (yeniId !== aktifId) {
        setAktifId(yeniId);
        // Yeni akvaryumun verilerini yükle
        try {
          const storageKey = getStorageKey(yeniId);
          const item = localStorage.getItem(storageKey);
          setValue(item ? JSON.parse(item) : initialValue);
        } catch {
          setValue(initialValue);
        }
      }
    };

    // Custom event dinle (akvaryum değişikliği için)
    window.addEventListener('akvaryumDegisti', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('akvaryumDegisti', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [aktifId, getStorageKey, initialValue]);

  // Değer değiştiğinde localStorage'a kaydet
  useEffect(() => {
    try {
      const storageKey = getStorageKey(aktifId);
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch (e) {
      console.error('Storage error:', e);
    }
  }, [value, aktifId, getStorageKey]);

  return [value, setValue, aktifId];
}

/**
 * Aktif akvaryumu değiştir ve event tetikle
 * @param {string} yeniAkvaryumId 
 */
export function akvaryumDegistir(yeniAkvaryumId) {
  localStorage.setItem('aktifAkvaryumId', yeniAkvaryumId);
  // Custom event tetikle - tüm componentler bunu dinleyecek
  window.dispatchEvent(new CustomEvent('akvaryumDegisti', { 
    detail: { akvaryumId: yeniAkvaryumId } 
  }));
}

/**
 * Aktif akvaryum ID'sini al
 */
export function getAktifAkvaryumId() {
  try {
    return localStorage.getItem('aktifAkvaryumId') || 'default';
  } catch {
    return 'default';
  }
}

/**
 * Belirli bir akvaryumun tüm verilerini al
 * @param {string} akvaryumId 
 */
export function getAkvaryumVerileri(akvaryumId) {
  const keys = [
    'balikEnvanteri', 'testKiti', 'gozlemler', 'ilacTedavi',
    'bitkiBudama', 'stokTakip', 'gubreleme', 'sonYemleme',
    'waterCounter', 'filterCounter', 'sumpCounter', 'aktifKuluçka'
  ];

  const veriler = {};
  keys.forEach(key => {
    try {
      const storageKey = `akvaryum_${akvaryumId}_${key}`;
      const item = localStorage.getItem(storageKey);
      veriler[key] = item ? JSON.parse(item) : null;
    } catch {
      veriler[key] = null;
    }
  });

  return veriler;
}

export default useAkvaryumStorage;