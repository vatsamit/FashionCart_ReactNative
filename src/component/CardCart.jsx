import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'


const imageurl = "https://res.cloudinary.com/dlc5c1ycl/image/upload/v1710567612/vy2q98s8ucsywwxjx2cf.png";
const CardCart = ({item ,deleteItemFromCart}) => {
  return (
    <View style={styles.container}>
        <Image source={{uri:item.image}} style={styles.coverImage}/>

        <View style={styles.cardContent}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
             <View style={styles.circleSizeContainer}>
              <View style={[styles.circle ,{backgroundColor:item.color}]}/>
              <View style={styles.sizeCircle}>
                <Text style={styles.sizeText}>{item.size}</Text>
              </View>
            </View>
   </View>
       <TouchableOpacity
       onPress={() => deleteItemFromCart(item)}>
          <FontAwesome6 name='trash' size={22} color={'#E96E6E'}/>
        
        </TouchableOpacity> 
   

    </View>
  )
}

export default CardCart;

const styles = StyleSheet.create({
    container: {
      marginVertical: 10,
      flexDirection: 'row',  
    },
    coverImage:{
        width:'25%',
        height:125,
        borderRadius:20
    },
    cardContent:{
       flex:1,
       marginHorizontal:10,
    },
    title:{
        fontSize:20,
        color:'#444444',
        fontWeight:'500',
    },
    price:{
       marginVertical:10,
        color:'#797979',
        fontSize:18,
    },
    circle:{
        height: 32,
        width: 32,
        borderRadius: 16,
        backgroundColor:"#7094C1"
    },
    circleSizeContainer:{
        flexDirection:'row',
       
    } ,
    sizeCircle:{
     backgroundColor:"white",
        height: 32,
        width: 32,
        borderRadius: 16,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:10,
        
    },
    sizeText:{
        fontSize:18,
        fontWeight:'500',
    }
})