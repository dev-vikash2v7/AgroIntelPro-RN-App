import React,{useEffect , useState} from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import icons from '../../../Constants/icons';

export default  DiseasePredResult = ({route}) => {
  // Sample data for a crop disease

  const {diseaseName } = route.params 


  const[diseaseData , setDiseaseData] =  useState({
    name: 'Example Disease', 
    image: icons.bg,
    description:
      'This is a sample description of the crop disease. It provides information about the symptoms and effects on crops.',
    cure: 'Apply treatment X and Y for a period of Z days.',
    fertilizerRecommendation: 'Use fertilizer type A and B for best results.',
  })

  
  

  return (
    <ScrollView style={styles.container}>


      {/* Disease Image */}
      <Image source={diseaseData.image} style={styles.image} />

      {/* Disease Name */}
      <Text style={styles.diseaseName}>{diseaseData.name}</Text>

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
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  diseaseName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  description: {
    fontSize: 16,
    marginTop: 8,
  },
});

