import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity , Alert , Picker} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import colors from '../../../Constants/colors';
import { useNavigation } from '@react-navigation/native';


const CropDiseasePredictionScreen = () => {

  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation()

  // Function to handle image selection from the gallery
  const handleGalleryPress = async () => {
    
    // get media permission
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert('Permission to access media library is required!');
        return;
      } 
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });


  if (!result.canceled) {
    setSelectedImage(result.assets[0].uri);
  }
};



  // Function to handle image capture from the camera
  const handleCameraPress = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert('Permission to access camera was denied');
      return
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  
};







  return (
    <View style={styles.container}>

      <Text style={styles.instructions}>
        Follow these steps to predict crop disease:
      </Text>


    
    <View style = {{width : '100%' , padding : 5 , backgroundColor:colors.light_green }}>
      <Text style={styles.step}> 1. Select an image of the affected crop leaf:</Text>
      <Text style={styles.step}> 2. Upload the image (make sure the image is clear)</Text>
      <Text style={styles.step}> 3. Get Results</Text>
      </View>


      <View style={styles.selectView}>
        <Text style={styles.label}>Select your diseased crop:</Text>
        <Picker
          selectedValue={selectedValue}
          style={styles.dropdown}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Option 1" value="option1" />
          <Picker.Item label="Option 2" value="option2" />
          <Picker.Item label="Option 3" value="option3" />
          <Picker.Item label="Option 4" value="option4" />
        </Picker>

        <Text style={styles.selectedValue}>Selected Value: {selectedValue}</Text>
    </View>







      {/* Options to open camera or gallery */}
      <View style={styles.imageOptions}>

      <View style = {{alignItems :'center' }}>
            <TouchableOpacity onPress={handleCameraPress}>
                <FontAwesome name="camera" size={34} color="blue" />
            </TouchableOpacity>
          <Text style={styles.optionText}>Open Camera</Text>
      </View> 

        <View style = {{alignItems :'center'}}>
          <TouchableOpacity onPress={handleGalleryPress}>
            <FontAwesome name="photo" size={34} color="blue" />
          </TouchableOpacity>
            <Text style={styles.optionText}>Open Gallery</Text>
        </View>


      </View>

      {/* Display the selected image */}
      {selectedImage && (
        <View>
        <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        </View>
      )}

      <Button title="Submit" onPress={()=>navigation.navigate('SignUp')} disabled={!selectedImage} />




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
    fontWeight: 'bold',
    marginBottom: 16,
  },
  step: {
    fontSize: 12,
    marginBottom: 5,
    fontWeight : '400'
  },
  imageOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    marginTop : 20,
  },
  optionText: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine:'underline'

  },
  selectedImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
    marginTop : 12
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