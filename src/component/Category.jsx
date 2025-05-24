import { StyleSheet, Text, View ,TouchableOpacity } from 'react-native'
import React from 'react'

const Category = ({item ,selectedCategory,setSelectedCategory}) => {
  return (
    <TouchableOpacity onPress={() => setSelectedCategory(item)}>
      <Text style={[styles.categoryText,
      selectedCategory === item && {
        color: '#FFFFFF',
        backgroundColor: '#E96E6E',
      }

      ]}>{item}</Text>
    </TouchableOpacity>
  )
}

export default Category

const styles = StyleSheet.create({
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#938F8F',
    backgroundColor: '#DFDCDC',
    borderRadius: 16,
    textAlign: 'center',
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
})