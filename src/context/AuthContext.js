import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";


// Create AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Check login status on app start
  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setIsLoggedIn(true);
        try {
          const decoded = jwt_decode(token); 
          console.log('Decoded user:', decoded);
          setUser(decoded);
        } catch (e) {
          setUser(null);
          console.log('JWT decode error:', e);
        }
      }
      setLoading(false);
    };
    checkLogin();
  }, []);

  // Accept token as argument!
  const login = async (token) => {
    console.log('Token received in login:', token);
    setIsLoggedIn(true);
    await AsyncStorage.setItem('userToken', token);
    try {
      const decoded = jwt_decode(token); 
      console.log('Decoded user:', decoded);
      setUser(decoded);
    } catch (e) {
      setUser(null);
      console.log('JWT decode error:', e);
    }
  };

  const logout = async () => {
    setIsLoggedIn(false);
    setUser(null);
    await AsyncStorage.removeItem('userToken');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, loading, user }}>
      {children}
    </AuthContext.Provider>
  );
};
