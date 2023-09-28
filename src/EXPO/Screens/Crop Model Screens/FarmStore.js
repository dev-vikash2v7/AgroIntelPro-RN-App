import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const FarmStore = ({ route }) => {
  const { product } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <Text style={styles.productPrice}>Price: ${product.price}</Text>
      <Text style={styles.productQuantity}>Available Quantity: {product.quantity}</Text>
      <Text style={styles.productCategory}>Category: {product.category}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
