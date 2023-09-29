import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList } from 'react-native';

const FarmStore = ({ route }) => {
  const { products } = route.params;

  return (
    <ScrollView style={styles.container}>

      <FlatList 
      data={products}
      keyExtractor={({item}) => item.id}
      renderItem={({item,index}) =>{
<View style={styles.product}>
        <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <Text style={styles.productPrice}>Price: ${item.price}</Text>
      <Text style={styles.productQuantity}>Available Quantity: {item.quantity}</Text>
      <Text style={styles.productCategory}>Category: {item.category}</Text>
      </View>
      }}
      />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  product:{
    padding : 5 , 
    // marginBottom:5
  },
  productImage: {
    width: '100%',
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
