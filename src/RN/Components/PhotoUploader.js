import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';


import ImagePicker from 'react-native-image-picker';
import { check, request, PERMISSIONS } from 'react-native-permissions';


const PhotoUploader = () => {
    const [selectedImage, setSelectedImage] = useState(null);


// function to handle uploading
    function uploadImage(){
  
      const serverUrl = 'http://127.0.0.1/predict/potato'; // Replace with your server's endpoint

      axios
        .post(serverUrl, selectedImage, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          // Handle the response from the server
          console.log('Image uploaded successfully!', response.data);
        })
        .catch((error) => {
          // Handle errors
          console.error('Error uploading image:', error);
        });
  }
  
  
  
    // Function to handle image selection
    const handleImageSelect = () => {

      // console.log("Android  " , PERMISSIONS.ANDROID)
      // console.log("IOS  " , PERMISSIONS.IOS)
      // "READ_MEDIA_IMAGES": "android.permission.READ_MEDIA_IMAGES"/

      check(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES )
        .then((result) => {
          console.log('result : ', result)
          if (result === 'granted') {
            showImagePicker();
          } else {
            request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES).then((permissionResult) => {
              console.log('premission res : ' ,permissionResult)
              if (permissionResult === 'granted') {
                showImagePicker();
              }
            });
          }
        })
        .catch((error) => console.error('Permission check error:', error));
    };
  
    // Function to open the image picker
    const showImagePicker = () => {
      const options = {
        title: 'Select Photo',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
  
      ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) {
          console.log('Image picker canceled');
        } else if (response.error) {
          console.error('Image picker error:', response.error);
        } else {
          const { uri } = response;
          console.log('res : ' , response )
          console.log(uri)
          setSelectedImage(uri);
        }
      });
    };



  
    return (
      <View style={styles.container}>

          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleImageSelect}
          >
            <Text style={styles.uploadText}>Upload Disease Crop Leaf Imge</Text>
          </TouchableOpacity>

        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.image} />
        )}

        <Button title='Check Disease Type' onPress={uploadImage} disabled = {selectedImage ? false : true }/>

      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      // justifyContent: 'center',
    },
    image: {
      width: 200,
      height: 200,
      resizeMode: 'cover',
    },
    uploadButton: {
      backgroundColor: '#4CAF50',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    uploadText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });
  
  export default PhotoUploader
  