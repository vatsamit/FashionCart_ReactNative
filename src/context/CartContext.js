import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {


  const [carts, setCarts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    loadCartItems();
  },[]);


  const loadCartItems = async () =>{
    let carts = await AsyncStorage.getItem("carts");
     carts = carts ? JSON.parse(carts) : [];
     setCarts(carts);
      totalSum(carts);
  }

  // Function to add an item to the cart
  const addToCart = async (item) => {
    const itemExist = carts.findIndex((cart) => cart.id === item.id);
    if (itemExist === -1) {
    
      const newCardItems = [...carts, item];
      await AsyncStorage.setItem("carts" ,JSON.stringify(newCardItems))
      setCarts(newCardItems);
      totalSum(newCardItems);
    }
  };

  const totalSum = (carts) =>{
    const total = carts.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(total);
  }

  const deleteItemFromCart = async (item) => {
    const newItems = carts.filter((cart)=>
      cart.id !== item.id
    );
     await AsyncStorage.setItem("carts",JSON.stringify(newItems));
    setCarts(newItems);
    totalSum(newItems);
  
  }


  const clearCart = async () => {
  await AsyncStorage.setItem("carts", JSON.stringify([]));
  setCarts([]);
  setTotalPrice(0);
};

  const value = {
    carts,
    addToCart,
    totalPrice,
    deleteItemFromCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};