import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useContext, useState} from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Header from '../component/Header'
import { useNavigation, useRoute } from '@react-navigation/native'
import { CartContext } from '../context/CartContext'

const sizes =['S','M','L','XL']
const colors = ['#91A1B0', '#B11D1D','#1F44A3',
    '#9F632A' ,'#1D752B','#000000'
]
const ProductDetailsScreen = () => {
    const navigation =useNavigation();
    const { addToCart } = useContext(CartContext);
    const route = useRoute();
    const item =route.params.item;   
    const[selectedSize, setSelectedSize] = useState(null);
    const[selectedColor, setSelectedColor] = useState(null);
    const handleAddToCart = (item) => {
        item.size = selectedSize;
        item.color = selectedColor;
        addToCart(item)
         navigation.navigate("CART")
       
    };

  return (
     <LinearGradient colors={['#FDF0F3', '#FFFBFC']} 
        style={styles.container}>
            <View style = {styles.headerContainer}>
            <Header/>
            </View>
            <Image source={{uri:item.image}}
            style={styles.coverImage}
            />
            <View style ={styles.contentContainer}>
               <Text style = {styles.title}>{item.title}</Text>
                <Text style = {[styles.title,styles.price]}>${item.price}</Text> 
            </View>
            {/* size container */}

            <Text style = {[styles.title,styles.sizeText]}> Size</Text>
                <View style = {styles.sizeContainer}>

                  {
                    sizes.map((size,index)=>{
                        return(
                            <TouchableOpacity
                            key={index}
                            onPress={() => setSelectedSize(size)} style={styles.sizeValueContainer}>
                                <Text style={[styles.sizeValue,selectedSize==size &&{color:"#E55B58"}]}>{size}</Text>
                            </TouchableOpacity>
                        )
                    })
                  }  
                </View>
            <Text style={[styles.title,styles.colorText]}>Colors</Text>
            <View style={styles.colorContainer}>
                {
                   colors.map((color ,index)=>{
                    return(
                        <TouchableOpacity
                        key={index}
                        onPress={() => setSelectedColor(color)}
                        style={[styles.circleBorder ,selectedColor===color && {borderColor: color ,borderWidth: 2}]}>
                            <View style={[styles.circle,{backgroundColor:color}]}/>
                        </TouchableOpacity>
                    );
                })}
            </View>
            {/* button containert */}
            <TouchableOpacity style={styles.button}
            onPress={() => {
                handleAddToCart(item) ;
               
            }}
            >
                <Text style={styles.buttonText}>Add To Cart</Text>
            </TouchableOpacity>
        </LinearGradient>
  )
}

export default ProductDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    headerContainer:{
        padding: 20,
    },

    coverImage: {
        height: 420,
         width: "100%",
        borderRadius: 20,
        marginVertical: 10,
        marginLeft: 10,
        position:"relative"

    },
    contentContainer:{
       flexDirection: "row",
       justifyContent: "space-between",
       marginHorizontal: 20,
       marginVertical: 20,
    },
    title:{
        fontSize: 20,
        fontWeight: "bold",
        color: "#444444",
      fontWeight: "500",
    },
    price:{
      
        color: "#4D4C4C",
      
    },
    sizeText:{
        marginHorizontal: 20,
        
    },
    sizeContainer:{
        flexDirection: "row",
        marginHorizontal: 20,
       
    },
    sizeValueContainer:{
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor:"#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    }
    ,
    sizeValue:{
        fontSize:18,
        fontWeight: "600",

    },
    colorText:{
        marginHorizontal: 20,
        marginTop: 10,
    },
    colorContainer:{
        flexDirection: "row",
        marginHorizontal: 20,
        marginTop: 10,
      
    },
    circle:{
        height: 36,
        width: 36,
        borderRadius: 20,
        
       
    },
    circleBorder:{
        height: 48,
        width: 48,
        borderRadius: 24,
      
         marginHorizontal: 5,
        alignItems: "center",
        justifyContent: "center",
      
    },
    button:{
        height: 56,
        width: "90%",
        backgroundColor: "#E55B58",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
        marginLeft: 20,
    },
    buttonText:{
        fontSize: 20,
        fontWeight: "600",
        color: "#FFFFFF",
    },

})