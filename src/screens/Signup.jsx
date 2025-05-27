import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const navigation = useNavigation();

  const handleSignup = async () => {
    if (!name || !phone || !email || !password || !confirmPassword) {
      setPopupMessage('Please fill all fields');
      setShowPopup(true);
      return;
    }
    if (password !== confirmPassword) {
      setPopupMessage('Passwords do not match');
      setShowPopup(true);
      return;
    }

    try {
      const response = await fetch('https://backendformobileapp-6.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setPopupMessage('Signup Successful!');
        setShowPopup(true);
      } else {
        setPopupMessage(data.message || 'Signup failed');
        setShowPopup(true);
      }
    } catch (error) {
      setPopupMessage('An error occurred. Please try again.');
      setShowPopup(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor="#888"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#888"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>

      {/* Popup Modal */}
      <Modal
        visible={showPopup}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPopup(false)}
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
                setShowPopup(false);
                if (popupMessage === 'Signup Successful!') {
                  navigation.navigate('Login');
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

export default Signup;

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
  loginText: {
    color: '#E96E6E',
    fontSize: 15,
    marginTop: 8,
  },
});