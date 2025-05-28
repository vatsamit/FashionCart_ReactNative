import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

const menuItems = [
  { label: 'Home', screen: 'HOME_STACK' },
  { label: 'Reorder', screen: 'REORDER' },
  { label: 'Cart', screen: 'CART' },
  { label: 'Account', screen: 'ACCOUNT' },
];

const Header = ({ isCart }) => {
  const navigation = useNavigation();
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuPress = (screen) => {
    setShowMenu(false);
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => isCart ? navigation.navigate('HOME_STACK') : setShowMenu(true)}
        style={styles.appContainer}
      >
        {isCart ? (
          <Ionicons name='chevron-back' size={24} color='#E96E6E' />
        ) : (
          <Image source={require('../assets/apps.png')} style={styles.app} />
        )}
      </TouchableOpacity>

      {isCart && <Text style={styles.myCart}>My Cart</Text>}

      <TouchableOpacity onPress={() => navigation.navigate('ACCOUNT')}>
        <Image source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} style={styles.dp} />
      </TouchableOpacity>

      {/* Modal Menu */}
      <Modal
        visible={showMenu}
        transparent
        animationType="fade"
        onRequestClose={() => setShowMenu(false)}
      >
        <TouchableOpacity style={styles.modalBg} activeOpacity={1} onPress={() => setShowMenu(false)}>
          <View style={styles.menuBox}>
            {menuItems.map(item => (
              <TouchableOpacity
                key={item.label}
                style={styles.menuItem}
                onPress={() => handleMenuPress(item.screen)}
              >
                <Text style={styles.menuText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appContainer: {
    backgroundColor: '#FFFFFF',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  app: {
    width: 28,
    height: 28,
  },
  dp: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  myCart: {
    fontSize: 28,
    color: 'black'
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  menuBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 60,
    marginLeft: 20,
    paddingVertical: 8,
    paddingHorizontal: 18,
    elevation: 8,
    shadowColor: '#E96E6E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  menuText: {
    fontSize: 18,
    color: '#E96E6E',
    fontWeight: 'bold',
  },
});