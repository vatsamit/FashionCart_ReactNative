import React, { useContext, useCallback } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const Account = () => {
  const { logout, user } = useContext(AuthContext);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      //  triggers re-render on focus
    }, [user])
  );

  const handleLogout = () => {
    logout();
    alert('You have been logged out successfully.');
  };

  console.log('User from context:', user);

  return (
    <View style={styles.bg}>
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://randomuser.me/api/portraits/men/1.jpg',
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.name || 'User'}</Text>
        <Text style={styles.email}>{user?.email || ''}</Text>

        <View style={styles.options}>
          <TouchableOpacity
            style={styles.optionBtn}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={styles.optionText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionBtn}
            onPress={() => navigation.navigate('REORDER')}
          >
            <Text style={styles.optionText}>Order History</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('HOME_STACK')} style={styles.optionBtn}>
            <Text style={styles.optionText}>Go Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.optionBtn, styles.logoutBtn]} onPress={handleLogout}>
            <Text style={[styles.optionText, styles.logoutText]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#FDF0F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    paddingTop: 50,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 24,
    alignItems: 'center',
    paddingVertical: 36,
    paddingHorizontal: 20,
    marginTop: 40,
    shadowColor: '#E96E6E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 18,
    borderWidth: 3,
    borderColor: '#E96E6E',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E96E6E',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#888',
    marginBottom: 28,
  },
  options: {
    width: '100%',
    marginTop: 10,
  },
  optionBtn: {
    backgroundColor: '#F3EAEA',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 14,
    alignItems: 'center',
    shadowColor: '#E96E6E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  optionText: {
    fontSize: 17,
    color: '#222',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  logoutBtn: {
    backgroundColor: '#fff0f0',
    borderWidth: 1,
    borderColor: '#E96E6E',
  },
  logoutText: {
    color: '#E96E6E',
    fontWeight: 'bold',
  },
});