import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // false initially
  const [loading, setLoading] = useState(true); // Add loading state

  // Check login status on app start
  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) setIsLoggedIn(true);
      setLoading(false); // Done checking
    };
    checkLogin();
  }, []);

  const login = async () => {
    setIsLoggedIn(true);
    await AsyncStorage.setItem('userToken', 'dummy_token'); // You can store a real token here
  };

  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.removeItem('userToken');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
