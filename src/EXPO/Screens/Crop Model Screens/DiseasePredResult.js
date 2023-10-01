import React,{useEffect , useState} from 'react';
import { View, Text, Image, ScrollView, StyleSheet  } from 'react-native';
import CropDiseaseData from '../../../../constants/crop_disease_data';

export default  DiseasePredResult = ({route}) => {
  // Sample data for a crop disease

  const { cropName ,diseaseName } = route.params 


  const[diseaseData , setDiseaseData] =  useState(null)

  useEffect(()=>{

console.log(cropName , diseaseName)

if( ! CropDiseaseData[cropName][diseaseName]){
  return 
}

setDiseaseData(CropDiseaseData[cropName][diseaseName])


  } , [])
  

  return (
    diseaseData ? 
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
    :
    <Text style = {{justifyContent :'center' , alignSelf:'center' , fontSize : 16  , color :'red' ,fontWeight :'bold'}}>Unable to predict disease </Text>
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
    marginBottom : 10

  },
});

