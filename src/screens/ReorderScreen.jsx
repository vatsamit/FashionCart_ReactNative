import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';

const dummyOrders = [
  {
    id: '1',
    title: 'Red T-Shirt',
    date: '2024-05-01',
    price: 299,
    image: 'https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&w=100',
  },
  {
    id: '2',
    title: 'Blue Jeans',
    date: '2024-04-15',
    price: 799,
    image: 'https://res.cloudinary.com/dlc5c1ycl/image/upload/v1710567612/qichw3wrcioebkvzudib.png',
  },
];

const ReorderScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Past Orders</Text>
      <FlatList
        data={dummyOrders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.date}>Ordered on: {item.date}</Text>
              <Text style={styles.price}>₹{item.price}</Text>
              <TouchableOpacity style={styles.reorderBtn}>
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