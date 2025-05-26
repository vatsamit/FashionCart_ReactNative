import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeSreen from './src/screens/HomeSreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import CartScreen from './src/screens/CartScreen';
import Account from './src/screens/Account';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';

import { CartContext, CartProvider } from './src/context/CartContext';
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import ReorderScreen from './src/screens/ReorderScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

const MyHomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HOME" component={HomeSreen} />
    <Stack.Screen name="PRODUCT_DETAILS" component={ProductDetailsScreen} />
  </Stack.Navigator>
);

// 🛒 This must be a React component
const CartIconWithBadge = ({ color, size }) => {
  const { carts } = useContext(CartContext);
  return (
    <View>
      <MaterialCommunityIcons name="cart" size={size} color={color} />
      {carts.length > 0 && (
        <View
          style={{
            position: 'absolute',
            right: -10,
            top: -10,
            backgroundColor: '#E96E6E',
            borderRadius: 10,
            width: 20,
            height: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 12,
              fontWeight: '500',
            }}
          >
            {carts.length}
          </Text>
        </View>
      )}
    </View>
  );
};

const AuthStackScreen = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="Signup" component={Signup} />
  </AuthStack.Navigator>
);

const MainApp = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#E96E6E',
          }}
        >
          <Tab.Screen
            name="HOME_STACK"
            component={MyHomeStack}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Entypo name="home" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="REORDER"
            component={ReorderScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="reorder" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="CART"
            component={CartScreen}
            options={{
              tabBarIcon: (props) => <CartIconWithBadge {...props} />,
            }}
          />
          <Tab.Screen
            name="ACCOUNT"
            component={Account}
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome6 name="user" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <AuthStackScreen />
      )}
    </NavigationContainer>
  );
};

const App = () => (
  <AuthProvider>
    <CartProvider>
      <MainApp />
    </CartProvider>
  </AuthProvider>
);

export default App;
