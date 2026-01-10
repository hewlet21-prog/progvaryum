// Auth Context - Uygulama genelinde auth durumunu yönetir
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthChange, logoutUser } from '../firebase/authService';
import { getUserProfile, getAllUserData, saveAllUserData } from '../firebase/firestoreService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Auth state değişikliklerini dinle
  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
        
        // Kullanıcı verilerini Firestore'dan al
        const result = await getAllUserData(user.uid);
        if (result.success) {
          setUserData(result.data);
          
          // LocalStorage'a da yedekle (offline erişim için)
          localStorage.setItem('currentUser', JSON.stringify({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName
          }));
        }
      } else {
        setCurrentUser(null);
        setUserData(null);
        setIsAuthenticated(false);
        localStorage.removeItem('currentUser');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Kullanıcı verilerini güncelle
  const updateUserData = async (newData) => {
    if (currentUser) {
      const result = await saveAllUserData(currentUser.uid, newData);
      if (result.success) {
        setUserData(prev => ({ ...prev, ...newData }));
      }
      return result;
    }
    return { success: false, error: 'Kullanıcı giriş yapmamış' };
  };

  // Kullanıcı verilerini yenile
  const refreshUserData = async () => {
    if (currentUser) {
      const result = await getAllUserData(currentUser.uid);
      if (result.success) {
        setUserData(result.data);
      }
      return result;
    }
    return { success: false, error: 'Kullanıcı giriş yapmamış' };
  };

  // Çıkış yap
  const logout = async () => {
    const result = await logoutUser();
    if (result.success) {
      setCurrentUser(null);
      setUserData(null);
      setIsAuthenticated(false);
      localStorage.clear(); // Tüm local verileri temizle
    }
    return result;
  };

  const value = {
    currentUser,
    userData,
    isAuthenticated,
    loading,
    updateUserData,
    refreshUserData,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;