import React from 'react';
import { View, Text, Image, StyleSheet, Linking ,ScrollView } from 'react-native';

import fertilizers_data from '../../../../constants/fertilizers_data';

const FertilizerResult = () => {

  const { name, image, description, benefits, npkValues, buyLink } = fertilizers_data[0];

  const openBuyLink = () => {
    Linking.openURL(buyLink);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

    <Image source={{ uri: image }} style={styles.image} />
    <Text style={styles.name}>{name}</Text>

    <Text style={styles.description}>{description}</Text>

    <View style={styles.detailsContainer}>

      <Text style={styles.detailLabel}>Nutrients:</Text>
      <Text style={styles.detailText}>{npkValues}</Text>
    </View>

    <View style={styles.detailsContainer}>
      <Text style={styles.detailLabel}>benefits:</Text>
      <Text style={styles.detailText}>{benefits}</Text>
    </View>

      
    <View style={styles.buyLink}>
      <Text style={styles.buyLink} onPress={openBuyLink}>Buy Now</Text>
    </View>

  </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  detailText: {
    fontSize: 16,
  },

});

export default FertilizerResult;
