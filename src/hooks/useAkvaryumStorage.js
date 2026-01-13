import { useState, useEffect, useCallback } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/config';

// Firebase'e kaydet (debounced)
let saveTimeout = {};
const saveToFirebase = async (storageKey, value) => {
  const user = auth.currentUser;
  console.log("🔥 Firebase User:", user?.email);
  
  if (!user) {
    console.log("❌ Kullanıcı yok, Firebase'e kaydedilemedi");
    return;
  }

  // Debounce - 2 saniye bekle
  if (saveTimeout[storageKey]) {
    clearTimeout(saveTimeout[storageKey]);
  }

  saveTimeout[storageKey] = setTimeout(async () => {
    try {
      console.log("📤 Firebase'e kaydediliyor:", storageKey);
      const docRef = doc(db, 'users', user.uid, 'appData', storageKey);
      await setDoc(docRef, {
        key: storageKey,
        value,
        updatedAt: new Date().toISOString()
      });
      console.log(`✅ Firebase'e kaydedildi: ${storageKey}`);
    } catch (error) {
      console.error(`❌ Firebase kayıt hatası (${storageKey}):`, error);
    }
  }, 2000);
};

// Firebase'den oku
const loadFromFirebase = async (storageKey) => {
  const user = auth.currentUser;
  if (!user) return null;

  try {
    const docRef = doc(db, 'users', user.uid, 'appData', storageKey);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log(`📥 Firebase'den yüklendi: ${storageKey}`);
      return docSnap.data().value;
    }
    return null;
  } catch (error) {
    console.error(`Firebase okuma hatası (${storageKey}):`, error);
    return null;
  }
};

/**
 * useAkvaryumStorage - Aktif akvaryuma özel veri saklama hook'u
 * Firebase + localStorage senkronizasyonu
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
  const [isFirebaseLoaded, setIsFirebaseLoaded] = useState(false);

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

  // Firebase'den veri yükle (bir kere)
  useEffect(() => {
    let isMounted = true;
    
    const loadFirebaseData = async () => {
      const user = auth.currentUser;
      const storageKey = getStorageKey(aktifId);
      
      if (!user || isFirebaseLoaded) return;

      const firebaseValue = await loadFromFirebase(storageKey);
      
      if (firebaseValue !== null && isMounted) {
        setValue(firebaseValue);
        localStorage.setItem(storageKey, JSON.stringify(firebaseValue));
      }
      
      if (isMounted) setIsFirebaseLoaded(true);
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && !isFirebaseLoaded) {
        loadFirebaseData();
      }
    });

    if (auth.currentUser) {
      loadFirebaseData();
    }

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [aktifId, getStorageKey, isFirebaseLoaded]);

  // Aktif akvaryum değişikliklerini dinle
  useEffect(() => {
    const handleStorageChange = () => {
      const yeniId = getAktifAkvaryumId();
      if (yeniId !== aktifId) {
        setAktifId(yeniId);
        setIsFirebaseLoaded(false); // Yeni akvaryum için Firebase'den yükle
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

  // Değer setter - hem localStorage hem Firebase'e kaydet
  const setStoredValue = useCallback((newValue) => {
    setValue((prev) => {
      const valueToStore = typeof newValue === 'function' ? newValue(prev) : newValue;
      
      // localStorage'a kaydet
      try {
        const storageKey = getStorageKey(aktifId);
        localStorage.setItem(storageKey, JSON.stringify(valueToStore));
        
        // Firebase'e kaydet
        saveToFirebase(storageKey, valueToStore);
      } catch (e) {
        console.error('Storage error:', e);
      }
      
      return valueToStore;
    });
  }, [aktifId, getStorageKey]);

  return [value, setStoredValue, aktifId];
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