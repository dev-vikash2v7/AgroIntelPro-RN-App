import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, ScrollView ,Image, ActivityIndicator } from 'react-native';
import AxiosInstance from '../../../../AxiosInstance';
import FloatInputWithRange from '../../Components/FloatInputWithRange';
import {COLORS} from '../../../../constants/theme';
import fertilizers_data from '../../../../constants/fertilizers_data';
import SelectionDropdown from '../../Components/SelectionDropdown';
import { useNavigation } from '@react-navigation/native';
import ErrorPopup from '../../Components/ErrorPopup'
import axios from 'axios';

 export default FertilizerRecommendScreen = () => {

    const [N, setN] = useState('');
    const [P, setP] = useState('');
    const [K, setK] = useState('');
    const [humidity, setHumidity] = useState('');
    const [temp, setTemp] = useState('');
    const [moisture, setMoisture] = useState('');
    const [selectedSoil, setSelectedSoil] = useState('');
    const [selectedCrop, setSelectedCrop] = useState('');

    const [isFormValid, setIsFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');


  const nav = useNavigation()
  

    const soilTypeData  = [
      {label : 'Sandy' ,value: 'Sandy', },
      { label : 'Loamy' ,value: 'Loamy' },
      { label : 'Black' ,value: 'Black' },
      { label : 'Red' , value: 'Red' },
      { label : 'Clayey' , value: 'Clayey' },
    ]

    const cropTypeData = [
      {label : 'Maize' ,value: 'Maize', },
      { label : 'Sugarcane' ,value: 'Sugarcane' },
      { label : 'Cotton' ,value: 'Cotton' },
      { label : 'Tobacco' , value: 'Tobacco' },
      { label : 'Paddy' , value: 'Paddy' },
      { label : 'Barley' , value: 'Barley' },
      { label : 'Wheat' , value: 'Wheat' },
      { label : 'Oil seeds' , value: 'Oil seeds' },
      { label : 'Pulses' , value: 'Pulses' },
      { label : 'Ground Nuts' , value: 'Ground Nuts' },
    ]

    
    const checkFormValidity = () => {
      if (
        N.trim() !== '' && 
        P.trim() !== '' && 
        K.trim() !== '' &&
        moisture.trim() !== '' &&
        humidity.trim() !== '' &&
        temp.trim() !== '' &&
        selectedCrop.trim() !== '' &&
        selectedSoil.trim() !== '' 
        ) {
        setIsFormValid(true);
      } else {  
        setIsFormValid(false);
      }
    };

    const handleSubmit = async ()=>{

      if(isFormValid){
        setIsLoading(true)

      const data = {
        'N' : parseFloat(N),
        'P' : parseFloat(P),
        'K' : parseFloat(K),
        'temperature' : parseFloat(temp) ,
        'humidity' : parseFloat(humidity),
         'moisture' : parseFloat(moisture) ,
         'soil_type' : selectedSoil,
         'crop_type' : selectedCrop,
      }

    await  AxiosInstance.post('/api/fertilizer_recommend' , data  )
      .then((res)=>{

        fertilizers_data.forEach((ferti_obj)=>{
          if(ferti_obj.name.toLowerCase() == res.data.fertilizer_name.toLowerCase()) {
            nav.navigate('FertilizerResult' , ferti_obj)
            return;
          }
        })
      })
      .catch((e)=>{
        setIsLoading(false)
        setErrorMessage('Network Error ! Please Try Again')
      })
      setIsLoading(false)
    }
    else{
      setErrorMessage('Please fill all required fields.')
    }

  }

    useEffect(()=>{
      checkFormValidity()
    },[N,P,K,humidity,temp ,moisture , selectedSoil ,selectedCrop ])
  

  return (
    <ScrollView style={styles.container}>


    <Text style={styles.heading}>Enter Details To Suggest Best Fertilizer :</Text>

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
<Text style = {styles.feature}>Moisture : </Text> 
Soil moisture is a measure of soil health, the water content present in a certain area of the ground.
</Text>


</View>



        <View style = {styles.input_form}>

        <View style={styles.dropdown}>
            <SelectionDropdown 
            data = {cropTypeData} 
            value={ selectedCrop} 
            setValue={ setSelectedCrop}
            placeholder ='Select Crop Type'
        searchText = 'search crop type..'
            />
        </View>

        <View style={styles.dropdown}>

        <SelectionDropdown 
        data = {soilTypeData} 
        value={ selectedSoil}  
        setValue={ setSelectedSoil}
        placeholder ='Select Soil Type'
        searchText = 'search soil type..'/>

        </View>

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
          placeholder="Moisture Level "
          value={moisture}
          label="Moisture (20-80)"
          minValue={20}
          maxValue={80}
          onChange={(newValue) => setMoisture(newValue)}
        />


            {
              isLoading ?
              <ActivityIndicator size="large" color="#007BFF"  style={{marginTop : 5, alignSelf :'center' , justifyContent :'center'}}/>
              :     
        <Button 
        title="Predict Fertilizer" 
        onPress={handleSubmit} 
        disabled={!isFormValid}
        style = {{marginTop : 10}}
        />
            }
          
            {errorMessage &&
              <ErrorPopup message={errorMessage} onClose={()=>setErrorMessage('')} />
            }
      </View>
        


    
    </ScrollView>
    )

}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom  : 40,
  },
  featuresBox :{
    borderWidth : 1 , 
    borderRadius : 10 ,
    height : 'max-content',
    marginTop: 10 ,
    padding : 5,
  },
  feature:{
    fontWeight: '600',
  },
  featureText :{
    fontSize :12 , 
    color : COLORS.text,
    fontWeight: '400',
    marginVertical : 1
  },
  input_form : {
marginBottom : 30,
paddingBottom : 20
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



  dropdown: {
    marginTop: 8,
    marginBottom:10,
    width :'100%'
  },
 
  
})