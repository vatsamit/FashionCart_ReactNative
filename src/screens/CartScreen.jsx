import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal } from 'react-native';
import React, { useContext } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../component/Header';
import CardCart from '../component/CardCart';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext'; // <-- Add this import
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = () => {
  const { carts, deleteItemFromCart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext); // <-- Get user from context
  const navigation = useNavigation();
  const [showSuccess, setShowSuccess] = React.useState(false);

  const totalPrice = carts.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  const handleCheckout = async () => {
    setTimeout(async () => {
      setShowSuccess(true);
      await saveOrder(carts, totalPrice);
      // clearCart(); // clear cart after saving order
    }, 1500);
  };

  // Save orders with user-specific key
  const saveOrder = async () => {
    const order = {
      id: Date.now().toString(),
      items: carts,
      date: new Date().toISOString(),
      total: totalPrice,
    };
    const userId = user?.email; // Use email as unique key
    const existing = await AsyncStorage.getItem(`orders_${userId}`);
    let orders = existing ? JSON.parse(existing) : [];
    orders.unshift(order);
    await AsyncStorage.setItem(`orders_${userId}`, JSON.stringify(orders));
  };

  return (
    <LinearGradient colors={['#FDF0F3', '#FFFBFC']} style={styles.container}>
      <View style={styles.headerContainer}>
        <Header isCart={true} />
      </View>

      <FlatList
        data={carts}
        renderItem={({ item }) => (
          <CardCart item={item} deleteItemFromCart={deleteItemFromCart} />
        )}
        keyExtractor={(item, idx) => item.id?.toString() || idx.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Your cart is empty.</Text>
        }
        ListFooterComponent={
          carts.length > 0 && (
            <>
              <View style={styles.priceContainer}>
                <View style={styles.priceAndTitle}>
                  <Text style={styles.text}>Total:</Text>
                  <Text style={styles.text}>${totalPrice.toFixed(2)}</Text>
                </View>
                <View style={styles.priceAndTitle}>
                  <Text style={styles.text}>Shipping:</Text>
                  <Text style={styles.text}>$0.00</Text>
                </View>
              </View>
              <View style={styles.divider} />
              <View style={styles.priceAndTitle}>
                <Text style={styles.grandTotalLabel}>Grand Total:</Text>
                <Text style={styles.grandTotalValue}>${totalPrice.toFixed(2)}</Text>
              </View>
            </>
          )
        }
      />

      {carts.length > 0 && (
        <TouchableOpacity style={styles.checkoutContainer} onPress={handleCheckout}>
          <Text style={styles.buttonText}>Checkout</Text>
        </TouchableOpacity>
      )}

      <Modal
        visible={showSuccess}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSuccess(false)}
      >
        <View style={styles.modalBg}>
          <View style={styles.modalBox}>
            <Text style={styles.successTitle}>Success!</Text>
            <Text style={styles.successMsg}>
              Your order has been placed successfully!{'\n'}
              Payment of ${totalPrice.toFixed(2)} Successful!{'\n'}
              Thank you for your purchase.
            </Text>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => {
                setShowSuccess(false);
                clearCart();
                navigation.navigate("HOME_STACK", { screen: "HOME" });
              }}
            >
              <Text style={styles.modalBtnText}>Go to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 20,
    paddingTop: 25,

  },
  container: {
    flex: 1,
    padding: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: '#E96E6E',
    fontSize: 18,
    marginTop: 60,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  priceContainer: {
    marginTop: 30,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 18,
    paddingVertical: 18,
    paddingHorizontal: 18,
    shadowColor: '#E96E6E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  priceAndTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  divider: {
    borderWidth: 0.5,
    borderColor: "#E96E6E",
    marginVertical: 12,
    marginHorizontal: 18,
  },
  text: {
    color: "#757575",
    fontSize: 18,
    fontWeight: '500',
  },
  grandTotalLabel: {
    color: "#E96E6E",
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  grandTotalValue: {
    color: "#222",
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
  checkoutContainer: {
    backgroundColor: '#E96E6E',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginHorizontal: 30,
    marginTop: 10,
    marginBottom: 30,
    shadowColor: '#E96E6E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 32,
    alignItems: 'center',
    width: 320,
    shadowColor: '#E96E6E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E96E6E',
    marginBottom: 12,
  },
  successMsg: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  modalBtn: {
    backgroundColor: '#E96E6E',
    paddingVertical: 12,
    paddingHorizontal: 36,
    borderRadius: 10,
  },
  modalBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
});