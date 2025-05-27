import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal } from 'react-native';
import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const { login } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      setPopupMessage('Please enter email and password');
      setShowSuccess(true);
      return;
    }
    try {
      const response = await fetch('https://backendformobileapp-7.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setPopupMessage('Login Successful!');
        setShowSuccess(true);
        // Don't call login() yet
      } else {
        setPopupMessage(data.message || 'Login failed');
        setShowSuccess(true);
      }
    } catch (error) {
      setPopupMessage('Network error');
      setShowSuccess(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Login to your account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
      <Modal
        visible={showSuccess}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSuccess(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View style={{
            backgroundColor: '#fff',
            borderRadius: 16,
            padding: 30,
            alignItems: 'center',
            width: 300,
          }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#E96E6E', marginBottom: 10 }}>
              {popupMessage.includes('Successful') ? 'Success!' : 'Error'}
            </Text>
            <Text style={{ fontSize: 16, color: '#333', textAlign: 'center', marginBottom: 20 }}>
              {popupMessage}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#E96E6E',
                paddingVertical: 10,
                paddingHorizontal: 30,
                borderRadius: 8,
              }}
              onPress={() => {
                setShowSuccess(false);
                if (popupMessage === 'Login Successful!') {
                  login();
                }
              }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E96E6E',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: '#E96E6E',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 18,
    fontSize: 16,
    color: '#222',
    backgroundColor: '#FDF0F3',
  },
  button: {
    width: '100%',
    backgroundColor: '#E96E6E',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 18,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    color: '#E96E6E',
    fontSize: 15,
    marginTop: 8,
  },
});