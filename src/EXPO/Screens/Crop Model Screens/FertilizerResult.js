import React from 'react';
import { View, Text, Image, StyleSheet, Linking ,ScrollView  , Button} from 'react-native';

import fertilizers_data from '../../../../constants/fertilizers_data';
import { COLORS } from '../../../../constants/theme';

const FertilizerResult = ({route}) => {

  const { name, image, description, benefits, NPK, buyLink } = route.params;

  const openBuyLink = () => {
    Linking.openURL(buyLink);
  };

  return (
    <ScrollView  style={styles.container}>
    <View style = {{ paddingBottom : 30}}>

    <Image source={image } style={styles.image} />
    <Text style={styles.name}>{name}</Text>

    <Text style={styles.description}>{description}</Text>

    <View style={styles.detailsContainer}>

      <Text style={styles.detailLabel}>Nutrients:</Text>
      <Text style={styles.detailText}>{NPK}</Text>
    </View>

    <View style={styles.detailsContainer}>
      <Text style={styles.detailLabel}>Benefits:</Text>
      <Text style={styles.detailText}>{benefits}</Text>
    </View>

      
      <Button  style={styles.buyLink} onPress={openBuyLink} title='Buy Now'/>

  </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf :'center'
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    textTransform :'capitalize'
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
  buyLink:{
    marginVertical : 5,
    fontWeight : '600' ,
    fontSize : 14,
    backgroundColor : COLORS.light_green,
    width : 60 , 
    height :40
  }

});

export default FertilizerResult;
