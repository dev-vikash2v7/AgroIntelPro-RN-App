import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const CropDiseasePredictionScreen = () => {

  const [selectedImage, setSelectedImage] = useState(null);

  // Function to handle image selection from the gallery
  const handleGalleryPress = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        alert('Permission to access media library is required!');
        return;
      } 
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  console.log(result)

  if (!result.canceled) {
    setSelectedImage(result.assets[0].uri);
  }
};

  // Function to handle image capture from the camera
  const handleCameraPress = () => {
  };

  // Function to submit the selected image for disease prediction
  const handleSubmit = () => {
  };


  return (
    <View style={styles.container}>
    <Text style={{fontSize:20 , fontWeight:'600'}}>  Crop Disease Predicator </Text>

      <Text style={styles.instructions}>
        Follow these steps to predict crop disease:
      </Text>

      <Text style={styles.step}>
        1. Select an image of the affected crop:
      </Text>

      <View>

      </View>

      {/* Options to open camera or gallery */}
      <View style={styles.imageOptions}>
        <TouchableOpacity onPress={handleCameraPress}>
          <Text style={styles.optionText}>Open Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleGalleryPress}>
          <Text style={styles.optionText}>Open Gallery</Text>
        </TouchableOpacity>
      </View>

      {/* Display the selected image */}
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
      )}

      {/* Submit button */}
      <Button title="Submit" onPress={handleSubmit} disabled={!selectedImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  instructions: {
    fontSize: 15,
    marginTop : 10 ,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  step: {
    fontSize: 16,
    marginBottom: 8,
  },
  imageOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  optionText: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  selectedImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
  },
});

export default CropDiseasePredictionScreen;

/*
{"assets": [
  {"assetId": null,
   "base64": null, 
   "duration": null, 
   "exif": null, 
   "height": 1716,
    "rotation": null,
     "type": "image", 
     "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FAgriIntel-c23264c5-d3d3-450a-864c-056d16a02dc1/ImagePicker/0f57073d-db06-4b18-b090-3014ac80b04e.png",
      "width": 2288
    }
    ],
   "canceled": false, "cancelled": undefined}
*/