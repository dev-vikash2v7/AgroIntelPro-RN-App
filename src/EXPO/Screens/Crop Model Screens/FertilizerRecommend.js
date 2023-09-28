import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, ScrollView ,Image, ActivityIndicator } from 'react-native';
import AxiosInstance from '../../../AxiosInstance';
import FloatInputWithRange from '../../Components/FloatInputWithRange';
import colors from '../../../Constants/colors';
import fertilizers_data from '../../../Constants/fertilizers_data';
import SelectionDropdown from '../../Components/SelectionDropdown';

 export default FertilizerRecommendScreen = () => {

    const [N, setN] = useState('');
    const [P, setP] = useState('');
    const [K, setK] = useState('');
    const [humidity, setHumidity] = useState('');
    const [temp, setTemp] = useState('');
    const [moisture, setMoisture] = useState('');
    const [selectedSoil, setSelectedSoil] = useState('');
    const [selectedCrop, setSelectedCrop] = useState('');

    const [fertilizerData, setFertilizerData] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);


    const [soilTypeData ,setSoilTypeData ]  = useState([
      {label : 'Sandy' ,value: 'Sandy', },
      { label : 'Loamy' ,value: 'Loamy' },
      { label : 'Black' ,value: 'Black' },
      { label : 'Red' , value: 'Red' },
      { label : 'Clayey' , value: 'Clayey' },
    ])

    const [cropTypeData , setCropTypeData] =useState( [
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
    ])

    
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
         'soil_type' : soil_type,
         'crop_type' : crop_type,
      }

    await  AxiosInstance.post('/api/fertilizer_recommend' , data)
      .then((res)=>{
        console.log('resss ::::: ' , res.data)
'ABC'.toLowerCase
        fertilizers_data.forEach((ferti_obj)=>{
          if(ferti_obj.name.toLowerCase() == 'Urea'.toLowerCase()) {
            setFertilizerData(ferti_obj);
            return;
          }
        })
      })
      .catch((e)=>{
        Alert('error')
       setIsLoading(false)

        console.log("eeeeeeeeeeeeeee" , e)
      })
      setIsLoading(false)
    }
    else{
      Alert('Please fill in all required fields.')
      setIsLoading(false)
    }

  }

    useEffect(()=>{
      checkFormValidity()
    },[N,P,K,humidity,temp , selectedSoil ,selectedCrop])
  

  return (
    <ScrollView>


    {/* <Text style={styles.heading}>Enter Deatils To Suggest Best Fertilizer :</Text> */}


      <View style={styles.container}>

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
          label="PH (0-100)"
          minValue={0}
          maxValue={100}
          onChange={(newValue) => setMoisture(newValue)}
        />


<SelectionDropdown data = {cropTypeData} value={ selectedCrop}  setValue={ setSelectedCrop}/>
<SelectionDropdown data = {soilTypeData} value={ selectedSoil}  setValue={ setSelectedSoil}/>
        
        

        <Button 
        title="Submit Deatils" 
        onPress={handleSubmit} 
        disabled={!isFormValid}
  style = {{marginTop : 20}}      
        />

            {
              isLoading &&
              <ActivityIndicator size="large" color="#007BFF" />
            }
            {fertilizerData && (
              <View style = {styles.cropView}>

                  <Text style={styles.crop_text}>Recommended fertilizer : {fertilizerData.name}</Text>

                  <Image source={ fertilizerData.ferti_img  } style ={ styles.crop_img} resizeMode = 'cover'/>
                  
                  <View style ={{}}>
                  <Text style={styles.crop_describe}> Description : {fertilizerData.describe} </Text>
                  <Text style={styles.crop_describe}> Best Weather and Soil : {fertilizerData.condition} </Text>
                </View>

              </View>

            ) }

    </View>
    
    </ScrollView>
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

cropView : {
  justifyContent :'center' ,
  alignItems :'center',
  marginTop : 8
},
crop_text:{
  textAlign:'center',
  fontSize:14 ,
  fontWeight : '600',
  paddingBottom : 6 ,
  textTransform:'capitalize'
}
  ,
  crop_img:{
    width:300,
    height : 200 ,
    borderRadius :10,
    marginBottom : 10
  }
  ,
  crop_describe:{
    fontSize : 12 , 
    fontWeight : '500' ,
    padding:2
  },


  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
})