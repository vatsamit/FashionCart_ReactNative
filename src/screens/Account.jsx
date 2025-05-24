import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';

const Account = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://randomuser.me/api/portraits/men/1.jpg',
        }}
        style={styles.avatar}
      />
      <Text style={styles.name}>Amit Kumar</Text>
      <Text style={styles.email}>amit.kumar@email.com</Text>

      <View style={styles.options}>
        <TouchableOpacity style={styles.optionBtn}>
          <Text style={styles.optionText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionBtn}>
          <Text style={styles.optionText}>Order History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionBtn}>
          <Text style={styles.optionText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionBtn}>
          <Text style={[styles.optionText, { color: '#E96E6E' }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },
  email: {
    fontSize: 16,
    color: '#888',
    marginBottom: 30,
  },
  options: {
    width: '90%',
    marginTop: 20,
  },
  optionBtn: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#222',
  },
});