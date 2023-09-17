import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import ImageUpload from '../../Components/ImageUpload';
import { useNavigation } from '@react-navigation/native';
import AxiosInstance from '../../../AxiosInstance';

const DiseasePrediction = () => {

  
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [predictionResult, setPredictionResult] = useState('');

  // Function to handle image selection and prediction
  const handleImageSelection = async () => {
    // Implement image selection logic here
    // Perform the disease prediction based on the selected image
    // Update the predictionResult state with the result
  };



  return (
    <View style={styles.container}>

<Button
      title="Back"
      onPress={() => {
        // Go back to the previous screen
        navigation.goBack();
      }}
      
    />
      {/* Image input section */}
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <Text>No image selected</Text>
      )}

      {/* Button to select an image */}
      <Button title="Select Image" onPress={handleImageSelection} />

      {/* Display prediction result */}
      {predictionResult && <Text>{predictionResult}</Text>}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
});

export default DiseasePrediction;
