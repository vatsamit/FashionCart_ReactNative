
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native'
import React ,{useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../component/Header';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Category from '../component/Category';
import ProductCard from '../component/ProductCard';
import data from '../data/data.json'; 


const Categories= ['Trending Now' ,'All' , 'New' ,'Men' ,'Women']

const HomeSreen = () => {
    const [products ,setProducts]=useState(data.products)
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isLiked, setIsLiked] = useState(false);

    const handleLiked = (item)=>{
        const newProducts = products.map((prod)=>{
            if(prod.id === item.id){
                return{
                    ...prod,
                    isLiked:true,
                }
            }
            return prod;
        })
        setProducts(newProducts);
    }
  return (
    <LinearGradient colors={['#FDF0F3', '#FFFBFC']} 
    style={styles.container}>
   <Header/>
  
  {/* Product List */}
   
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
    
    <TextInput style={styles.textInput} placeholder='Search'/>

   </View>
         {/* Category Container */}
   <FlatList 
   data={Categories}
  renderItem={({ item }) => (
    <Category
      item={item}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
    />
  )}
   
   keyExtractor={(items)=>items}
    horizontal={true}
    showsHorizontalScrollIndicator={false}
   />
        </>
    }
    data={products} 
    renderItem={({item ,index}) => (
        <ProductCard item={item} 
        handleLiked={handleLiked} />
    )} 
    showsVerticalScrollIndicator={false}
    keyExtractor={(item)=>item.id}
    contentContainerStyle={{    
        paddingBottom: 150,
        
    }}
    />
    

    
</LinearGradient>
  )
}

export default HomeSreen;

const styles = StyleSheet.create({
  container: {

    padding: 20,
  },
    matchText: {
        fontSize: 28,
        color: '#000000',
        marginTop: 25,
    },
    inputContainer: {
       backgroundColor: '#FFFFFF',
       height:48,
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
});