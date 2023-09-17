import React, { useState } from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log('result image picker : ' , result , result.uri)

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>

      <Button title="Pick an image from camera roll" onPress={pickImage} />

      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      )}
      
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
    marginTop: 20,
  },
});

export default ImageUpload;
