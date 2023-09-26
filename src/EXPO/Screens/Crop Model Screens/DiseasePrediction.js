import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity , Alert , ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import colors from '../../../Constants/colors';
import { useNavigation } from '@react-navigation/native';
import AxiosInstance from '../../../AxiosInstance';
import { FontAwesome } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';



const CropDiseasePredictionScreen = () => {

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState(null);
  
  const [crops, setCrops] = useState([
    {label : 'Rice' ,
     value: 'rice',
     icon: () => <FontAwesome name='user'/>
    },
    { label : 'Wheat' ,value: 'wheat' },
    { label : 'Maize' ,value: 'maize' },
    { label : 'Potato' , value: 'potato' },
  ]);
  const [open, setOpen] = useState(false);


  
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
    setSelectedImage(result.assets[0]);
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
      setSelectedImage(result.assets[0]);
    }
};


// send request to server
const handleSubmit = async () =>{

  const {uri , fileName , type} = selectedImage

  const formData = new FormData();

  formData.append('image', { uri,  fileName, type });
  formData.append('crop_name', JSON.stringify({selectedCrop}));

  console.log(formData)
  await AxiosInstance.post('/api/disease_predict' , formData , {
    headers: {
      'Content-Type': 'multipart/form-data', 
    }} )
  .then(res=>{
    console.log("res : " , res.data)
    navigation.navigate('DiseasePredResult' , {'diseaseName' : 'potato_earyl_blight'}  )
  })
  .catch((e)=>{
    console.log('eee ' , e);
    Alert('Error in uploading ' )
  })
}




  return (

    <View style={styles.container}>

  <ScrollView>


    {/* Instruction to use */}
    <View style={styles.instructionView}>

      <Text style={{fontWeight : 'bold' , marginVertical : 10}}>
        Follow these steps to predict crop disease:
      </Text>

      <View style = { styles.instructionBox}>
        <Text style={styles.instruction}> 1. Select an image of the affected crop leaf:</Text>
        <Text style={styles.instruction}> 2. Upload the image (make sure the image is clear)</Text>
        <Text style={styles.instruction}> 3. Get Results</Text>
      </View>

  </View>


  
          
      {/* Dropdown to select crop */}
      {/* <View style={styles.selectView}> */}

         <Text style={[styles.labelText , {marginVertical : 10}]}>Select an option : </Text> 

         <DropDownPicker
      open={open}
      value={selectedCrop}
      items={crops}
      setOpen={setOpen}
      setValue={setSelectedCrop}
      setItems={setCrops}
      placeholder="Select crop"
      placeholderStyle={{
        color: "grey",
        fontWeight: "bold"
      }}
    zIndex = {1000}

    />

       <Text style={styles.selectedValue}>Selected Crop: {selectedCrop}</Text>
      {/* </View>  */}




      {/* // Options to open camera or gallery */}

      {selectedCrop &&
      <View style={styles.imageSelectionView}>

        <Text style={ styles.labelText} > Select Diseased {selectedCrop} Image :   </Text>

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
      </View>
}




     {/* Display the selected image */}
      {selectedImage && (
        <View>
        <Image source={{ uri: selectedImage.uri }} style={styles.selectedImage} />
        </View>
      )}

{/* Button to predict */}
      <Button
      style = {styles.submitBtn}
     title="Predict Disease"
        onPress={ handleSubmit}
         disabled={!selectedImage || !selectedCrop} />
</ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal : 10,
    paddingBottom : 20
  },
  instructionView: {
borderBottomWidth : 0.5 ,
borderBottomColor : 'gray',
paddingBottom : 15 
  },

  instructionBox: {
    fontSize: 12,
    fontWeight : '400',
    backgroundColor : colors.light_green,
    padding : 5 ,
    borderRadius:5
  },
  instruction:{
    fontSize: 12,
    fontWeight: '400',
    marginVertical : 3 
  },

  labelText : { 
    fontWeight : 'bold',
    marginBottom : 5,
    textTransform:'capitalize',
    fontSize : 16,
    color:'blue',
    textAlign:'center',
    textDecorationLine :'underline'
  },

  
  
  selectView: {
    marginTop : 10,
    borderBottomWidth : 0.3 , 
    borderBottomColor : 'gray',
    paddingBottom : 10 ,
    alignItems: 'center',
  },
  dropdown :{
    zIndex : 1000,
  },
  selectedValue: {
    fontSize: 18,
    marginTop: 12,
    fontWeight : 'bold',
    textTransform:'capitalize',
    borderBottomColor : 'gray',
    paddingBottom : 10 ,
  },


  imageSelectionView:{
    marginTop : 10,
    borderBottomWidth : 0.3 , 
    borderTopWidth : 0.3 , 
    borderBottomColor : 'gray',
    paddingBottom : 10 ,
    paddingTop : 10 ,
  }
    ,
  
    imageOptions: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 16,
      marginTop : 18,
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
    submitBtn:{
    
    }
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