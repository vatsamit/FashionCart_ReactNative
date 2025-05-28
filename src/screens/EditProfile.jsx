import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

const EditProfile = ({ navigation }) => {
  const { user, login } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    // Prevent API call if nothing changed
    if (name === user?.name && email === user?.email) {
      Alert.alert('Nothing to update', 'No changes detected.');
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      // Only send changed fields (optional, but good practice)
      const updateData = {};
      if (name !== user?.name) updateData.name = name;
      if (email !== user?.email) updateData.email = email;

      const response = await fetch('https://backendformobileapp-10.onrender.com/api/auth/edit-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });
      const data = await response.json();
      console.log('Edit profile response:', data); // <-- Add this line
      if (response.ok) {
        // Assume API returns a new token with updated info
        if (data.token) {
          await login(data.token); // update context and AsyncStorage
        }
        Alert.alert('Success', 'Profile updated successfully!');
        navigation.goBack();
      } else {
        Alert.alert('Error', data.message || 'Failed to update profile');
      }
    } catch (e) {
      Alert.alert('Error', 'Network error');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button and Heading */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={28} color="#E96E6E" />
        </TouchableOpacity>
        <Text style={styles.heading}>Edit Profile</Text>
      </View>

      {/* Centered Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="Enter your email"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={handleSave} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Saving...' : 'Save'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F3EAEA',
  },
  backBtn: {
    marginRight: 10,
    padding: 4,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E96E6E',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    color: '#222',
    alignSelf: 'flex-start',
    marginBottom: 4,
    marginTop: 16,
  },
  input: {
    width: 280,
    borderWidth: 1,
    borderColor: '#E96E6E',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FDF0F3',
    marginBottom: 8,
  },
  button: {
    marginTop: 32,
    backgroundColor: '#E96E6E',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: 280,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});