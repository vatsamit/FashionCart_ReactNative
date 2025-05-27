import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from '../context/CartContext'; // Adjust path if needed

const ReorderScreen = () => {
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();
  const { setCart } = useContext(CartContext);

  useEffect(() => {
    const fetchOrders = async () => {
      const stored = await AsyncStorage.getItem('orders');
      if (stored) setOrders(JSON.parse(stored));
    };
    fetchOrders();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Past Orders</Text>
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
                  setCart(item.items); // Set cart to reordered items
                  navigation.navigate('CART'); // Navigate to CartScreen
                }}
              >
                <Text style={styles.reorderText}>Reorder</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default ReorderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#222',
    alignSelf: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 14,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
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
    marginBottom: 6,
  },
  reorderBtn: {
    backgroundColor: '#E96E6E',
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  reorderText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});