import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';

// ['rice', 'maize', 'chickpea', 'kidneybeans', 'pigeonpeas',
//        'mothbeans', 'mungbean', 'blackgram', 'lentil', 'pomegranate',
//        'banana', 'mango', 'grapes', 'watermelon', 'muskmelon', 'apple',
//        'orange', 'papaya', 'coconut', 'cotton', 'jute', 'coffee']

const FarmStore = () => {

  return (
    <View style={styles.container}>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  product:{
    padding : 5 , 
    width: '100%',
    backgroundColor :'#fff',
    borderBottomWidth : 0.5,
    borderBottomColor :'gray',
    padding : 10 ,
 
  },
  productImage: {
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 16,
  },
  productPrice: {
    fontSize: 18,
    marginBottom: 8,
  },
  productQuantity: {
    fontSize: 18,
    marginBottom: 8,
  },
  productCategory: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default FarmStore;
