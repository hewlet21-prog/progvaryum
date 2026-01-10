// Firebase Auth Service
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { auth, db } from "./config";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Kullanıcı Kaydı
export const registerUser = async (email, password, kullaniciAdi) => {
  try {
    // Firebase Auth ile kayıt
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Profil güncelle
    await updateProfile(user, {
      displayName: kullaniciAdi
    });
    
    // Firestore'a kullanıcı bilgilerini kaydet
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: email,
      kullaniciAdi: kullaniciAdi,
      olusturmaTarihi: new Date().toISOString(),
      propimagelUrl: null,
      seviye: 'Çaylak'
    });
    
    return { success: true, user };
  } catch (error) {
    console.error("Kayıt hatası:", error);
    let message = "Kayıt başarısız";
    
    switch (error.code) {
      case 'auth/email-already-in-use':
        message = "Bu e-posta adresi zaten kullanımda";
        break;
      case 'auth/invalid-email':
        message = "Geçersiz e-posta adresi";
        break;
      case 'auth/weak-password':
        message = "Şifre en az 6 karakter olmalı";
        break;
      default:
        message = error.message;
    }
    
    return { success: false, error: message };
  }
};

// Kullanıcı Girişi
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Firestore'dan kullanıcı bilgilerini al
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const userData = userDoc.exists() ? userDoc.data() : null;
    
    return { success: true, user, userData };
  } catch (error) {
    console.error("Giriş hatası:", error);
    let message = "Giriş başarısız";
    
    switch (error.code) {
      case 'auth/user-not-found':
        message = "Kullanıcı bulunamadı";
        break;
      case 'auth/wrong-password':
        message = "Hatalı şifre";
        break;
      case 'auth/invalid-email':
        message = "Geçersiz e-posta adresi";
        break;
      case 'auth/invalid-credential':
        message = "E-posta veya şifre hatalı";
        break;
      default:
        message = error.message;
    }
    
    return { success: false, error: message };
  }
};

// Çıkış Yap
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error("Çıkış hatası:", error);
    return { success: false, error: error.message };
  }
};

// Auth State Listener
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Mevcut Kullanıcıyı Al
export const getCurrentUser = () => {
  return auth.currentUser;
};