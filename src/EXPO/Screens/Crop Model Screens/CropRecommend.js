import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import AxiosInstance from '../../../AxiosInstance';
import FloatInputWithRange from '../../Components/FloatInputWithRange';
import colors from '../../../Constants/colors';

import CropDataArr from '../../../Constants/CropData';

import {Constants} from "expo-constants";



  const CropRecommendationScreen = () => {



    const [N, setN] = useState('');
    const [P, setP] = useState('');
    const [K, setK] = useState('');
    const [humidity, setHumidity] = useState('');
    const [temp, setTemp] = useState('');
    const [ph, setPh] = useState('');
    const [rainfall, setRainfall] = useState('');
    
    const [cropData, setCropData] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    


    const checkFormValidity = () => {
      if (
        N.trim() !== '' && 
        P.trim() !== '' && 
        K.trim() !== '' &&
        ph.trim() !== '' &&
        humidity.trim() !== '' &&
        temp.trim() !== '' &&
        rainfall.trim() !== '' 
        ) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };

    const handleSubmit =  ()=>{

      if(isFormValid){

        setIsLoading(true)

      const data = {
        'N' : parseFloat(N),
        'P' : parseFloat(P),
        'K' : parseFloat(K),
        'temperature' : parseFloat(temp) ,
        'humidity' : parseFloat(humidity),
         'ph' : parseFloat(ph) ,
         'rainfall' : parseFloat(rainfall),
      }


      AxiosInstance.post('/api/crop_recommend' , data)
      .then((res)=>{
        console.log('resss , ' , res.data)

        CropDataArr.forEach((crop_obj)=>{
          if(crop_obj.name == 'rice'){
            setCropData(crop_obj);
            return;
          }
        })
      })
      .catch((e)=>{
        Alert('error')
        console.log("eeeeeeeeeeeeeee" , e)
      })

      setIsLoading(false)

    }
    else{
      Alert('Please fill in all required fields.')
    }
    }

    useEffect(()=>{
      checkFormValidity()
    },[N,P,K,humidity,temp , rainfall ,ph])
  

  return (
    <View style={styles.container}>

      <Text style={styles.heading}>Enter Deatils To Suggest Best Crop :</Text>

      {/* <View style = {styles.featuresBox}>

        <Text style = {styles.featureText}>
       <Text style = {styles.feature}>
         NPK(Nitrogen, Phosphorus, Potassium) :
         </Text> 
         Represent the concentration of these nutrients in soil. 
       </Text>

        <Text style = {styles.featureText}>
       <Text style = {styles.feature}>Humidity : </Text> 
       Humidity refers to the amount of moisture or water vapor present in the air. 
       </Text>

       <Text style = {styles.featureText}>
       <Text style = {styles.feature}>Temperature : </Text> 
       Temperature indicates the degree of heat in the environment
       </Text>

       <Text style = {styles.featureText}>
       <Text style = {styles.feature}>PH Level : </Text> 
       PH measures the acidity or alkalinity of soil or water.
       </Text>

       <Text style = {styles.featureText}>
       <Text style = {styles.feature}>Rainfall: </Text> 
       Rainfall is the amount of precipitation (rain) that occurs in a given area and time.
       </Text>
      </View> */}

    <ScrollView>

      <FloatInputWithRange
        placeholder="Nitrogen Level"
        value={N}
        label="Nitrogen(N) (5 - 250)"
        minValue={0}
        maxValue={250}
        onChange={(newValue) => setN(newValue)}

      />
      <FloatInputWithRange
        placeholder="Phosphorous Level"
        value={P}
        label="Phosphorous(P) (5-250)"
        minValue={0}
        maxValue={250}
        onChange={(newValue) => setP(newValue)}

      />
      <FloatInputWithRange
        placeholder="Potassium Level"
        value={K}
        label="Potassium(K) (5-250)"
        minValue={5}
        maxValue={250}
        onChange={(newValue) => setK(newValue)}
      />

      <FloatInputWithRange
        placeholder="Humidity Level"
        value={humidity}
        label="Humidity (10 - 100)"
        minValue={10}
        maxValue={250}
        onChange={(newValue) => setHumidity(newValue)}

      />

      <FloatInputWithRange
        placeholder="Temperature (°C) "
        value={temp}
        label="Temperature (5°C - 60°C)"
        minValue={5}
        maxValue={60}
        onChange={(newValue) => setTemp(newValue)}

      />

      <FloatInputWithRange
        placeholder="PH Level "
        value={ph}
        label="PH (0-14)"
        minValue={0}
        maxValue={14}
        onChange={(newValue) => setPh(newValue)}

      />

      <FloatInputWithRange
        placeholder="Rainfall (mm)"
        value={rainfall}
        label="Rainfall (10mm - 300mm)"
        minValue={10}
        maxValue={350}
        onChange={(newValue) => setRainfall(newValue)}

      />

      <Button 
      title="Predict Crop" 
      onPress={handleSubmit} 
      disabled={!isFormValid}
style = {{marginTop : 20}}      
      />

      {
        isLoading &&
        <ActivityIndicator size="large" color="#007BFF" />
      }
      {cropData && (
        <View style = {styles.cropView}>

            <Text style={styles.crop_text}>Recommended Crop: {cropData.best_crop}</Text>

            <Image source={ cropData.crop_img  } style ={ styles.crop_img} resizeMode = 'cover'/>
            
            <Text> Description : {cropData.describe} </Text>
            <Text> Best Weather and Soil : {cropData.condition} </Text>
            <Text> Harvesting Cycle : {cropData.duration} </Text>

        </View>

      ) }
</ScrollView>


    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  featuresBox :{
    borderWidth : 1 , 
    borderRadius : 10 ,
    height : 'max-content',
    marginTop:-10 ,
    padding : 5,
    marginBottom : 7 
  },
  feature:{
    fontWeight: '600',
  },
  featureText :{
    fontSize :12 , 
    color : colors.text,
    fontWeight: '400',
    marginVertical : 1
  },
  heading: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    textDecorationLine : 'underline'
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },


  crop_img:{
    width:100,
    height : 100 ,

  }
  
})


export default CropRecommendationScreen;