import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import AxiosInstance from '../../../AxiosInstance';
import FloatInputWithRange from '../../Components/FloatInputWithRange';
import colors from '../../../Constants/colors';


  const FertilizerRecommendation = () => {

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

      </View>

    <ScrollView>

      <FloatInputWithRange
        placeholder="Nitrogen Level"
        value={N}
        label="Nitrogen(N) (5 - 250)"
        minValue={0}
        maxValue={250}
        onChange={(newValue) => setN(newValue)}
      checkFormValidity = {checkFormValidity}

      />
      <FloatInputWithRange
        placeholder="Phosphorous Level"
        value={P}
        label="Phosphorous(P) (5-250)"
        minValue={0}
        maxValue={250}
        onChange={(newValue) => setP(newValue)}
      checkFormValidity = {checkFormValidity}

      />
      <FloatInputWithRange
        placeholder="Potassium Level"
        value={K}
        label="Potassium(K) (5-250)"
        minValue={5}
        maxValue={250}
        onChange={(newValue) => setK(newValue)}
      checkFormValidity = {checkFormValidity}
      />

      <FloatInputWithRange
        placeholder="Humidity Level"
        value={humidity}
        label="Humidity (10 - 100)"
        minValue={10}
        maxValue={250}
        onChange={(newValue) => setHumidity(newValue)}
      checkFormValidity = {checkFormValidity}

      />

      <FloatInputWithRange
        placeholder="Temperature (°C) "
        value={temp}
        label="Temperature (5°C - 60°C)"
        minValue={5}
        maxValue={60}
        onChange={(newValue) => setTemp(newValue)}
      checkFormValidity = {checkFormValidity}

      />

      <FloatInputWithRange
        placeholder="PH Level "
        value={ph}
        label="PH (0-14)"
        minValue={0}
        maxValue={14}
        onChange={(newValue) => setPh(newValue)}
      checkFormValidity = {checkFormValidity}

      />

      <FloatInputWithRange
        placeholder="Rainfall (mm)"
        value={rainfall}
        label="Rainfall (10mm - 300mm)"
        minValue={10}
        maxValue={350}
        onChange={(newValue) => setRainfall(newValue)}
      checkFormValidity = {checkFormValidity}

      />

      <Button 
      title="Predict Fertilizer" 
      onPress={handleSubmit} 
      disabled={!isFormValid}
style = {{marginTop : 5}}      
      />


      {predictedCrop ? (
        <Text style={styles.result}>Recommended Fertilizer : {predictedFertilizer}</Text>
      ) : null}
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


export default FertilizerRecommendation;