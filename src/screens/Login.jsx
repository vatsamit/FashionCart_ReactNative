import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }
    try {
      const response = await fetch('https://backendformobileapp-6.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        login(); // Set isLoggedIn to true in context
        alert('Login Successful!');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      alert('Network error');
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