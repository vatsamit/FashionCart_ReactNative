import { StyleSheet, Text, View,TouchableOpacity, FlatList } from 'react-native'
import React, { useContext } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Header from '../component/Header'
import CardCart from '../component/CardCart'
import { CartContext } from '../context/CartContext'
import { useNavigation } from '@react-navigation/native'

const CartScreen = () => {
    const { carts ,totalPrice,deleteItemFromCart,clearCart} = useContext(CartContext);

    const navigation = useNavigation();

    const handleCheckout = () => {
        // Simulate payment processing
        setTimeout(() => {
          alert(`Your order has been placed successfully!\nPayment of $${totalPrice} Successful!\nThank you for your purchase.`);
          
        }, 1500);
        clearCart(); 
        navigation.navigate("HOME_STACK" ,{screen:"HOME"}); // Navigate to Home after checkout
      };
  return (
     <LinearGradient colors={['#FDF0F3', '#FFFBFC']} 
            style={styles.container}>

                <View style ={styles.headerContainer}>
                       <Header isCart={true}/>
                </View>
             
               
<FlatList data={carts}
ListHeaderComponent={
    <>
     
    </>
}

renderItem={({item})=>(<CardCart item={item} deleteItemFromCart={deleteItemFromCart}/>

)} 
ListFooterComponent={
    <>
     <View style={styles.priceContainer}>
            <View style={styles.priceAndTitle}>
            <Text style={styles.text}>Total:</Text>
             <Text style={styles.text}>${totalPrice}</Text>
                 </View>
               <View style={styles.priceAndTitle}>
                <Text style={StyleSheet.text}>Shipping:</Text>
                 <Text style={styles.text}>$0.0</Text>
               </View>
              </View>
              
              <View style={styles.divider}/>
               <View style={styles.priceAndTitle}>
                <Text style={StyleSheet.text}>Grand Total:</Text>
                 <Text style={[styles.text ,{color:"black",fontWeight:"700"}]}>${totalPrice}

                 </Text>
               </View>
    </>
}
showsVerticalScrollIndicator={false}
contentContainerStyle={{
    paddingBottom: 100
    }}
/>

               
               <TouchableOpacity style={styles.checkoutContainer} onPress={handleCheckout}>
  <Text style={styles.buttonText}>Checkout</Text>
</TouchableOpacity>
        
    </LinearGradient>
  )
}

export default CartScreen

const styles = StyleSheet.create({
    headerContainer: {
        marginBottom: 20,
    },

    container: {
        flex: 1,
        padding: 15,
    },

    priceContainer:{
        marginTop: 40,
       
    },
    priceAndTitle:{
       flexDirection:'row', 
       justifyContent:'space-between',
       marginHorizontal:20,
       marginVertical:10,
    },
    divider:{
        
        borderWidth: 1,
        borderColor:"#C0C0C0",
        marginVertical: 10,
    },

    text:{
        color:"#757575",
        fontSize:18,
    },
    checkoutContainer: {
        backgroundColor: '#E96E6E',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
})