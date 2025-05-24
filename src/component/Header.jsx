import { View, Text, Image ,StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
const Header = ({ isCart }) => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
        <TouchableOpacity
        onPress={() => navigation.navigate('HOME_STACK')}
        style = {styles.appContainer}>
            {
                isCart ? <Ionicons name='chevron-back' size={24 } color='#E96E6E' /> :   <Image source={require('../assets/apps.png')} style={styles.app} />
            }
     
        </TouchableOpacity>

        {
            isCart &&  <Text style = {styles.myCart}>My Cart</Text>
        }
        

         <Image source={require('../assets/dp.png')} style={styles.dp} />
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
    myCart :{
        fontSize:28,
        color:'black'
    }
})