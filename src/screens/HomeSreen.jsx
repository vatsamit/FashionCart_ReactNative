import { View, Text, StyleSheet, TextInput, FlatList, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../component/Header';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Category from '../component/Category';
import ProductCard from '../component/ProductCard';
import data from '../data/data.json';
import { Animated } from 'react-native';

const Categories = ['Trending Now', 'All', 'New', 'Men', 'Women']

const HomeSreen = () => {
  const [products, setProducts] = useState(data.products);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleLiked = (item) => {
    const newProducts = products.map((prod) => {
      if (prod.id === item.id) {
        return {
          ...prod,
          isLiked: true,
        }
      }
      return prod;
    })
    setProducts(newProducts);
  };

  // Show popup when category is pressed
  const handleCategoryPress = () => {
    setShowComingSoon(true);
  };

  // Filter products based on search text
  const filteredProducts = products.filter(item =>
    (item.title || '').toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <LinearGradient colors={['#FDF0F3', '#FFFBFC']} style={styles.container}>
      <Header />
      <FlatList
        numColumns={2}
        ListHeaderComponent={
          <>
            <Text style={styles.matchText}>Match Your Style</Text>
            {/* input container */}
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Fontisto name="search" size={26} color="#C0C0C0" />
              </View>
              <TextInput
                style={styles.textInput}
                placeholder='Search'
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
            {/* Category Container */}
            <FlatList
              data={Categories}
              renderItem={({ item }) => (
                <Category
                  item={item}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  onPress={handleCategoryPress}
                />
              )}
              keyExtractor={(items) => items}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </>
        }
        data={filteredProducts}
        renderItem={({ item, index }) => (
          <ProductCard item={item} handleLiked={handleLiked} />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingBottom: 150,
        }}
      />

      {/* Coming Soon Popup */}
      <Modal
        visible={showComingSoon}
        transparent
        animationType="fade"
        onRequestClose={() => setShowComingSoon(false)}
      >
        <View style={styles.modalBg}>
          <View style={styles.modalBox}>
            <Icon name="clock-o" size={48} color="#E96E6E" style={{ marginBottom: 16 }} />
            <Text style={styles.modalTitle}>Coming Soon</Text>
            <Text style={styles.modalMsg}>This category is coming soon!</Text>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => setShowComingSoon(false)}
            >
              <Text style={styles.modalBtnText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  )
}

export default HomeSreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  matchText: {
    fontSize: 28,
    color: '#000000',
    marginTop: 25,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20,
  },
  iconContainer: {
    marginHorizontal: 15,
  },
  textInput: {
    flex: 1,
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 32,
    alignItems: 'center',
    width: 300,
    shadowColor: '#E96E6E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E96E6E',
    marginBottom: 8,
  },
  modalMsg: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 18,
  },
  modalBtn: {
    backgroundColor: '#E96E6E',
    paddingVertical: 10,
    paddingHorizontal: 36,
    borderRadius: 10,
  },
  modalBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
});