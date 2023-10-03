import React,{useEffect , useState} from 'react';
import { View, Text, Image, ScrollView, StyleSheet  } from 'react-native';
import CropDiseaseData from '../../../../constants/crop_disease_data';

export default  DiseasePredResult = ({route}) => {
  // Sample data for a crop disease

  const { diseaseData } = route.params 
  // const diseaseData = CropDiseaseData['potato']['Potato___Early_Blight']

 
  return (
    <ScrollView style={styles.container}>

      {/* Disease Name */}
      <Text style={styles.diseaseName}>{diseaseData.name}</Text>

      {/* Disease Image */}
      <Image source={diseaseData.image} style={styles.image} />

      {/* Description */}
      <Text style={styles.sectionTitle}>Description:</Text>
      <Text style={styles.description}>{diseaseData.description}</Text>

      {/* How to Cure */}
      <Text style={styles.sectionTitle}>How to Cure:</Text>
      <Text style={styles.description}>{diseaseData.cure}</Text>

      {/* Recommended Fertilizer */}
      <Text style={styles.sectionTitle}>Recommended Fertilizer:</Text>
      <Text style={styles.description}>{diseaseData.fertilizerRecommendation}</Text>
   
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical:8,
    paddingBottom:20
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginVertical: 14,
    alignSelf:'center',
    borderRadius:10,
    borderWidth:0.5,
    borderColor:'black' 

  },
  diseaseName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
    textDecorationLine:'underline'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginTop: 8,
    marginBottom : 12

  },
});

