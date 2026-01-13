// useSafeStorage.js - localStorage + Firebase senkronizasyonu
import { useState, useEffect, useCallback } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/config';

// Güvenli JSON parse
const safeJSONParse = (str, fallback) => {
  try {
    return str ? JSON.parse(str) : fallback;
  } catch {
    return fallback;
  }
};

// Firebase'e kaydet (debounced)
let saveTimeout = {};
const saveToFirebase = async (key, value) => {
  const user = auth.currentUser;
  console.log("🔥 Firebase User:", user);
  console.log("🔥 User UID:", user?.uid);
  
  if (!user) {
    console.log("❌ Kullanıcı yok, Firebase'e kaydedilemedi");
    return;
  }

  // Debounce - 2 saniye bekle
  if (saveTimeout[key]) {
    clearTimeout(saveTimeout[key]);
  }

  saveTimeout[key] = setTimeout(async () => {
    try {
      console.log("📤 Firebase'e kaydediliyor:", key);
      const docRef = doc(db, 'users', user.uid, 'appData', key);
      await setDoc(docRef, {
        key,
        value,
        updatedAt: new Date().toISOString()
      });
      console.log(`✅ Firebase'e kaydedildi: ${key}`);
    } catch (error) {
      console.error(`❌ Firebase kayıt hatası (${key}):`, error);
    }
  }, 2000);
};

// Firebase'den oku
const loadFromFirebase = async (key) => {
  const user = auth.currentUser;
  if (!user) return null;

  try {
    const docRef = doc(db, 'users', user.uid, 'appData', key);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data().value;
    }
    return null;
  } catch (error) {
    console.error(`Firebase okuma hatası (${key}):`, error);
    return null;
  }
};

// ==================== ANA HOOK ====================
export function useSafeStorage(key, initialValue) {
  // İlk değer: localStorage'dan oku
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue;
    const stored = localStorage.getItem(key);
    return safeJSONParse(stored, initialValue);
  });

  const [isFirebaseLoaded, setIsFirebaseLoaded] = useState(false);

  // Firebase'den veri yükle (bir kere)
  useEffect(() => {
    let isMounted = true;
    
    const loadFirebaseData = async () => {
      const user = auth.currentUser;
      if (!user || isFirebaseLoaded) return;

      const firebaseValue = await loadFromFirebase(key);
      
      if (firebaseValue !== null && isMounted) {
        setValue(firebaseValue);
        localStorage.setItem(key, JSON.stringify(firebaseValue));
        console.log(`📥 Firebase'den yüklendi: ${key}`);
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
  }, [key, isFirebaseLoaded]);

  // Değer değiştiğinde hem localStorage hem Firebase'e kaydet
  const setStoredValue = useCallback((newValue) => {
    setValue((prev) => {
      const valueToStore = typeof newValue === 'function' ? newValue(prev) : newValue;
      
      // localStorage'a kaydet
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(valueToStore));
      }
      
      // Firebase'e kaydet
      saveToFirebase(key, valueToStore);
      
      return valueToStore;
    });
  }, [key]);

  return [value, setStoredValue];
}

// Default export da ekle
export default useSafeStorage;