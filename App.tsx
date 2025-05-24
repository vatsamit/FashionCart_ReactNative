import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import HomeSreen from './src/screens/HomeSreen';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import CartScreen from './src/screens/CartScreen';
import { CartContext, CartProvider } from './src/context/CartContext';
import Account from './src/screens/Account';
import ReorderScreen from './src/screens/ReorderScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Home() {
  return (
    <View>
      <Text>Home </Text>
    </View>
  );
}

const MyHomeStack = () =>{
return(
  <Stack.Navigator 
  screenOptions={{
    headerShown: false,}}
    
    >

    <Stack.Screen name="HOME" component={HomeSreen} />
    <Stack.Screen name="PRODUCT_DETAILS" component={ProductDetailsScreen} />
    </Stack.Navigator>
)
}

const App = () => {
  return (
<CartProvider> 



    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false,  tabBarShowLabel: false ,tabBarActiveTintColor: '#E96E6E' }}
    
      >
        <Tab.Screen name="HOME_STACK" component={MyHomeStack} 
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Entypo name="home" size={size} color={color} />;
          },
        }} 
        />
        <Tab.Screen name="REORDER" component={ReorderScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <MaterialIcons name="reorder" size={size} color={color} />;
          },
        }}
        />
        <Tab.Screen name="CART" component={CartScreen} 
        options={{
          tabBarIcon: ({ color, size }) => {
            const { carts } = useContext(CartContext);
            return (

              <View>
              <MaterialCommunityIcons
                name="cart"
                size={size}
                color={color}
              />
              <View style={
               {
                position: 'absolute',
                right: -10,
                top: -10,
                backgroundColor: '#E96E6E',
                borderRadius: 10,
                width: 20,
                height: 20,
                justifyContent: 'center',
                alignItems: 'center',
                
                
               }
              }>
                <Text style={{ color: 'white', fontSize: 12,
                  fontWeight: '500'

                 }}
                 >{carts.length}</Text>
              </View>
              </View>
            );
          },
        }}
        />
        <Tab.Screen name="ACCOUNT" component={Account} 
        
         options={{
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome6 name="user" size={size} color={color} />;
          },
        }}/>
      </Tab.Navigator>
    </NavigationContainer>

</CartProvider>
  );
};

export default App;
