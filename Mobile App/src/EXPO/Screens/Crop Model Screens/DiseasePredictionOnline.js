import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity , Alert , ScrollView  , ActivityIndicator} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {COLORS} from '../../../../constants/theme';
import { useNavigation } from '@react-navigation/native';
import SelectionDropdown from '../../Components/SelectionDropdown';
import axios from 'axios';
import { TF_SERVER_URL } from '../../../../env';
import icons from '../../../../constants/icons';
import CropDiseaseData from '../../../../constants/crop_disease_data';


const CropDiseasePredictionScreen = () => {

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const cropsData =  [
    {label : 'Rice' ,value: 'rice',},
    { label : 'Wheat' ,value: 'wheat' },
    { label : 'Potato' , value: 'potato' },
    { label : 'Corn' , value: 'corn' },
  ]


  const navigation = useNavigation()

  // Function to handle image selection from the gallery
  const handleGalleryPress = async () => {
    
    // get media permission
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        setErrorMessage('Permission to access media library is required!');
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
      setErrorMessage('Permission to access camera was denied');
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

  setIsLoading(true)

  const {uri } = selectedImage
  const name =  uri.split('/')[uri.split('/').length - 1]

  const formData = new FormData();
  
  formData.append('image', { uri,  type: 'image/jpeg',  name }  );
  formData.append('crop_name',selectedCrop);

  
 await axios.post( TF_SERVER_URL + '/api/disease_predict' , formData , {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept' :'application/json'
    },
  })
  .then(res=>{
    console.log("res : " , res.data)

    const diseaseName  = res.data.diseaseName

    if(diseaseName.includes("Healthy")) {
      setIsLoading(false)
      setErrorMessage('Congrats ! Your Crop is Healthy.')
      return ;
    }

    if(CropDiseaseData[selectedCrop] &&   CropDiseaseData[selectedCrop][diseaseName] ){
      setIsLoading(false)
      navigation.navigate('DiseasePredResult' , {diseaseData : CropDiseaseData[selectedCrop][diseaseName]}  )
    }
    else {
      setIsLoading(false)
      setErrorMessage('Sorry ! No Disease Found For This Crop.')
    }    
  })
  .catch((e)=>{
  setIsLoading(false)
    console.log('eee ' , e);
    setErrorMessage('Network Error ! Please Try Again.')
  })
  setIsLoading(false)
}




  return (

    <View style={styles.container}>

  <ScrollView>


    {/* Instruction to use */}
    <View style={styles.instructionView}>

      <Text style={{fontWeight : 'bold' , marginVertical : 10 , textDecorationLine:'underline'}}>
        Follow these steps to predict crop disease:
      </Text>

      <View style = { styles.instructionBox}>
        <Text style={styles.instruction}> 1. Select affected crop name </Text>
        <Text style={styles.instruction}> 1. Select an image of the affected crop leaf</Text>
        <Text style={styles.instruction}> 2. Upload the image (make sure the image is clear)</Text>
        <Text style={styles.instruction}> 3. Get Results</Text>
      </View>

  </View>


  
          
      {/* Dropdown to select crop */}
      <View style={styles.selectView}>

         <Text style={[styles.labelText , {marginVertical : 10}]}>Select Crop Type : </Text> 

         <View style={styles.dropdown}>
            <SelectionDropdown 
            data = {cropsData} 
            value={ selectedCrop} 
            setValue={ setSelectedCrop}
            placeholder ='Select Crop'
        searchText = 'search crop name..'
            />
        </View>

      </View> 




      {/* // Options to open camera or gallery */}

      {/* {selectedCrop && */}
      <View style={styles.imageSelectionView}>

        <Text style={ styles.labelText} > Select Diseased {selectedCrop} Image :   </Text>

      <View style={styles.imageOptions}>


    <TouchableOpacity   onPress={ handleCameraPress} style = {styles.component}  >   
      <View   style={styles.imgBox}>
        <Image 
        resizeMode="contain"
        source={  icons.camera1} 
        style = {styles.img}/>
      </View>
      <View style={styles.titleContainer}>
      <Text style={styles.title} numberOfLines={ 2} >Open Camera </Text>
      </View>
    </TouchableOpacity>


    <TouchableOpacity   onPress={ handleGalleryPress} style = {styles.component}  >   
      <View   style={styles.imgBox}>
        <Image 
        resizeMode="contain"
        source={  icons.gallery} 
        style = {styles.img}/>
      </View>
      <View style={styles.titleContainer}>
      <Text style={styles.title} numberOfLines={ 2} >Open Gallery </Text>
      </View>
    </TouchableOpacity>

     



      
      </View>

      </View>




     {/* Display the selected image */}
      {selectedImage && (
        <View>
       <Text style={styles.selectedValue}>Selected Crop: {selectedCrop}</Text>

        <Image source={{ uri: selectedImage.uri }} style={styles.selectedImage} />
        </View>
      )}

{/* Button to predict */}
{isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : 
      <Button
      style = {styles.submitBtn}
     title="Predict Disease"
        onPress={ handleSubmit}
         disabled={!selectedImage || !selectedCrop} />
}
{errorMessage &&
                        <Text style={styles.errorMessage}>{errorMessage}</Text>
                }
</ScrollView>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal : 10,
    paddingBottom : 20,
    backgroundColor :COLORS.background
  },
  instructionView: {
borderBottomWidth : 0.5 ,
borderBottomColor : 'gray',
paddingBottom : 15 
  },

  instructionBox: {
    fontSize: 12,
    fontWeight : '400',
    backgroundColor : COLORS.light_green,
    padding : 5 ,
    borderRadius:5
  },
  instruction:{
    fontSize: 12,
    fontWeight: '400',
    marginVertical : 1 ,
    fontFamily:'young_serif'
  },

  labelText : { 
    fontWeight : 'bold',
    marginBottom : 5,
    textTransform:'capitalize',
    fontSize : 16,
    color:'red',
    textAlign:'center',
    textDecorationLine :'underline'
  },

  dropdown :{
marginLeft : 5,
  },

  
  selectView: {
    paddingBottom : 10 ,
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
    marginTop : 2,
    borderBottomWidth : 0.3 , 
    borderBottomColor : 'gray',
    paddingBottom : 10 ,
    paddingTop : 5 ,
  }
    ,
  
    imageOptions: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 16,
      marginTop : 18,
    },
    
    selectedImage: {
      width: '100%',
      height: 300,
      resizeMode: 'contain',
      marginBottom: 20,
      marginTop : 12,
      alignSelf:'center',
      borderRadius:10,
      borderColor:'black',
      borderWidth:0.5
    },
    component : {
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      height: 100,
      borderRadius: 16,
      overflow: 'hidden',
      
      ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        },
        android: {
          elevation: 5,
          shadowOffset: { width: 1, height: 2 },
          shadowRadius: 4,
          shadowColor : 'blue',
  
  
        },
    })},
  
    imgBox : {
  backgroundColor : '#fff' , 
  width : 55 ,
  height :55 ,
  borderColor: 'orange',
  padding : 5  ,  
    },
  
    img : {
      flex: 1,
      width: undefined, // Let the width adjust to the parent (box)
      height: undefined,
    },
    titleContainer: {
      width: 100, // Adjust the width as needed,
      paddingHorizontal : 5
    },
  
    title : {
      flexWrap:'nowrap',
      fontSize : 12,
      textAlign : 'center',
      fontWeight : "500", 
      marginTop : 5,
      fontFamily : 'young_serif'
    },
    errorMessage: {
      marginTop : 5 ,
      color: 'red',
      marginBottom: 7,
      fontWeight : 'bold'
    },
});

export default CropDiseasePredictionScreen;

