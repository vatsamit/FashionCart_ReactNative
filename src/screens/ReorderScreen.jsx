import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ReorderScreen = () => {
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();
  const { setCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  // Use useFocusEffect to reload orders every time screen is focused
  useFocusEffect(
    useCallback(() => {
      const fetchOrders = async () => {
        if (!user?.email) return;
        const stored = await AsyncStorage.getItem(`orders_${user.email}`);
        if (stored) setOrders(JSON.parse(stored));
        else setOrders([]);
      };
      fetchOrders();
    }, [user])
  );

  return (
    <View style={styles.bg}>
      {/* Header with Back Button */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={28} color="#E96E6E" />
        </TouchableOpacity>
        <Text style={styles.header}>Your Past Orders</Text>
      </View>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.items[0]?.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.title}>
                {item.items[0]?.title} {item.items.length > 1 ? `+${item.items.length - 1} more` : ''}
              </Text>
              <Text style={styles.date}>Ordered on: {item.date}</Text>
              <Text style={styles.price}>₹{item.total}</Text>
              <TouchableOpacity
                style={styles.reorderBtn}
                onPress={() => {
                  setCart(item.items);
                  navigation.navigate('CART');
                }}
              >
                <Text style={styles.reorderText}>Reorder</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No past orders found.</Text>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ReorderScreen;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#FDF0F3',
    paddingHorizontal: 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 18,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F3EAEA',
    marginBottom: 6,
  },
  backBtn: {
    marginRight: 8,
    padding: 4,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E96E6E',
    flex: 1,
    textAlign: 'center',
    marginRight: 36, // To visually center the title with the back button
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 18,
    marginHorizontal: 16,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#E96E6E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#F3EAEA',
    backgroundColor: '#FDF0F3',
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 2,
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginVertical: 2,
  },
  price: {
    fontSize: 16,
    color: '#E96E6E',
    fontWeight: '500',
    marginBottom: 8,
  },
  reorderBtn: {
    backgroundColor: '#E96E6E',
    paddingVertical: 7,
    paddingHorizontal: 22,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  reorderText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.2,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 40,
  },
});