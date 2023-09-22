import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AxiosInstance from '../../../AxiosInstance';
import FloatInputWithRange from '../../Components/FloatInputWithRange';
import colors from '../../../Constants/colors';


  const CropRecommendationScreen = () => {

    const [N, setN] = useState('');
    const [P, setP] = useState('');
    const [K, setK] = useState('');
    const [humidity, setHumidity] = useState('');
    const [temp, setTemp] = useState('');
    const [ph, setPh] = useState('');
    const [rainfall, setRainfall] = useState('');
    const [predictedCrop, setPredictedCrop] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);


    const checkFormValidity = () => {
      if (
        N.trim() !== '' && 
        P.trim() !== '' && 
        ph.trim() !== '' &&
        humidity.trim() !== '' &&
        temp.trim() !== '' &&
        rainfall.trim() !== '' &&
        K.trim() !== '' 
        ) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };

    const handleSubmit = ()=>{

      if(isFormValid){

      const data = {
        'N' : N,
        'P' :  P,
        'K' :  K,
        'temperature' : temp ,
         'ph' : ph ,
         'rainfall' : rainfall,
         'humidity' : humidity
      }

      console.log(data)

      AxiosInstance.post('/api/crop_recommend' , data)
      .then(res=>{
        setPredictedCrop(res.data.best_crop)
      })
      .catch((e)=>{
        Alert('error')
        console.log(e)
      })
    }
    else{
      Alert('Please fill in all required fields.')
    }
    }
  

  return (
    <View style={styles.container}>

      {/* <Text style={styles.heading}>Enter Deatils To suggest Best Crop To grow</Text> */}

      <View style = {styles.featuresBox}>

        <Text style = {styles.featureText}>
       <Text style = {{fontWeight : '600'}}>
         NPK (Nitrogen, Phosphorus, Potassium) :
         </Text> 
         Represent the concentration of these nutrients in soil. 
       </Text>

        <Text style = {styles.featureText}>
       <Text style = {{fontWeight : '600'}}>Humidity:</Text> 
       Humidity refers to the amount of moisture or water vapor present in the air. 
       </Text>

       <Text style = {styles.featureText}>
       <Text style = {{fontWeight : '600'}}>Temperature (Temp):</Text> 
       Temperature indicates the degree of heat in the environment
       </Text>

       <Text style = {styles.featureText}>
       <Text style = {{fontWeight : '600'}}>pH (pH Level):</Text> 
       pH measures the acidity or alkalinity of soil or water.
       </Text>

       <Text style = {styles.featureText}>
       <Text style = {{fontWeight : '600'}}>Rainfall:</Text> 
       Rainfall is the amount of precipitation (rain) that occurs in a given area and time.
       </Text>

      </View>

    
      <FloatInputWithRange
        placeholder="Nitrogen (0-200)"
        value={N}
        label="Nitrogen(N) Level"
        minValue={0}
        maxValue={200}
        onChange={(newValue) => setN(newValue)}
      checkFormValidity = {checkFormValidity}

      />
      <FloatInputWithRange
        placeholder="Phosphorous (0-200)"
        value={P}
        label="Phosphorous(P) Level"
        minValue={0}
        maxValue={200}
        onChange={(newValue) => setP(newValue)}
      checkFormValidity = {checkFormValidity}

      />
      <FloatInputWithRange
        placeholder="Potassium (0-200)"
        value={N}
        label="Potassium(K) Level"
        minValue={0}
        maxValue={200}
        onChange={(newValue) => setK(newValue)}
      checkFormValidity = {checkFormValidity}
      />

      <FloatInputWithRange
        placeholder="Humidity (0-200)"
        value={humidity}
        label="Humidity Level"
        minValue={0}
        maxValue={200}
        onChange={(newValue) => setHumidity(newValue)}
      checkFormValidity = {checkFormValidity}

      />

      <FloatInputWithRange
        placeholder="Temperature (°C)"
        value={temp}
        label="Temperature Level"
        minValue={10}
        maxValue={60}
        onChange={(newValue) => setTemp(newValue)}
      checkFormValidity = {checkFormValidity}

      />

      <FloatInputWithRange
        placeholder="pH (0-14)"
        value={ph}
        label="PH Level"
        minValue={0}
        maxValue={14}
        onChange={(newValue) => setPh(newValue)}
      checkFormValidity = {checkFormValidity}

      />

      <FloatInputWithRange
        placeholder="Rainfall (mm)"
        value={rainfall}
        label="Rainfall Level"
        minValue={0}
        maxValue={200}
        onChange={(newValue) => setRainfall(newValue)}
      checkFormValidity = {checkFormValidity}

      />

      <Button 
      title="Predict Crop" 
      onPress={handleSubmit} 
      disabled={!isFormValid}
      checkFormValidity = {checkFormValidity}
      />

      {predictedCrop ? (
        <Text style={styles.result}>Recommended Crop: {predictedCrop}</Text>
      ) : null}


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
    marginTop:0 ,
    padding : 5,
    marginBottom : 7 
  },
  featureText :{
    fontSize :12 , 
    color : colors.text,
    fontWeight: '400',
    marginVertical : 2
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  
})


export default CropRecommendationScreen;