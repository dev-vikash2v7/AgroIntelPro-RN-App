import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import {COLORS} from '../../../constants/theme';



const WeatherReport = () => {
  
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [forcastData, setForcastData] = useState(null);

  const [selectedTab, setSelectedTab] = useState('Temperature');




  useEffect(() => {
    getLocation();
  }, []);


  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {

        const locationData = await Location.getCurrentPositionAsync({});
        setLocation(locationData);

        // console.log("locationData : " , locationData)
        // locationData :  {"coords": {"accuracy": 20, "altitude": 440.6000061035156, "altitudeAccuracy": 1.7190128564834595, "heading": 0, "latitude": 23.2520254, "longitude": 77.4992431, "speed": 0}, "mocked": false, "timestamp": 1694880620954}

        getWeatherData(locationData.coords.latitude, locationData.coords.longitude);
        getForcastData(locationData.coords.latitude, locationData.coords.longitude);
      }
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  

  const getWeatherData = async (latitude, longitude) => {
    const apiKey = '29c4f65a50394abafbd9a1c707e67d9f'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    // https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}

    try {
      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
      // console.log("response : " , response.data)
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };


  const getForcastData = async (latitude, longitude) => {
    const apiKey = '29c4f65a50394abafbd9a1c707e67d9f'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      setForcastData(response.data.list);
      // console.log("response : " , response.data.list)
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };



  if (!location || !weatherData) {
    return <Text style = {{paddingTop : 10 , textAlign :'center', fontSize : 16 , fontWeight : 'bold'}}>Loading Live Weather Report...</Text>;
  }
  return (
    <View style={styles.container}>


      <Text style={ styles.title}> 
      Weather Type : <Text style = {{color :'blue' , fontWeight :'bold' }}>Mostly Cloudy  </Text> 
      </Text>

      <Text style = {{fontSize : 10}}> Now </Text>

      <View style={styles.weatherText}>

      <View>
        <Text style = {{fontSize : 30 , fontWeight : 500 }}> 
          {/* 24°C */}
          {weatherData.main.temp}
        </Text>
        <Text style = {{fontSize : 12 , fontWeight : 400 }}> 
           {/* Feels like 24°C */}
        Feels Like {weatherData.main.feels_like}
        </Text>

        <Text style = {{fontSize : 20 , fontWeight : 400 }}> 
        {weatherData.name}  ,   {weatherData.sys.country} 
        </Text>
      </View>

      <View style = {{marginTop : 0}}>
        {/* <Text style={{ fontSize : 15 , fontWeight : 400}}> Precip : 20%  </Text>
        <Text style={{ fontSize : 15 , fontWeight : 400}}> Humidity : 100% </Text>
        <Text style={{ fontSize : 15 , fontWeight : 400}}> Wind :  8 km/h </Text>  */}
        <Text style={{ fontSize : 15 , fontWeight : 400}}> Precip : {weatherData.main.humidity}  </Text>
        <Text style={{ fontSize : 15 , fontWeight : 400}}> Humidity : {weatherData.main.humidity} </Text>
        <Text style={{ fontSize : 15 , fontWeight : 400}}> Wind :  {weatherData.wind.speed} m/s</Text>
      </View>

      </View>

      <View style={styles.forecast} >

      {Array.from({ length: 5 }, (_, index) => (
          <View style = {styles.day} key={index}>
              <Text style = {{fontSize : 12 , fontWeight : '600' , justifyContent : 'center'}}> Thu </Text>
              <Text style = {{fontSize : 10 , fontWeight : '500' , justifyContent : 'center'}}> 27/23 </Text>
          </View>)
      )}


      </View>

      

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal : 15 ,
    borderBottomWidth : 1 , 
    borderBottomColor : 'gray', 
    paddingTop : 15
  },
  title : {
    fontSize:20 , 
    fontWeight : "600",
  }, 
  weatherText: {
    flexDirection : 'row' ,
    justifyContent : 'space-between'
  },
  forecast:{
    marginTop : 8,
    marginBottom : 20 , 
    flexDirection : 'row',
    justifyContent : 'space-between'
  },
  day :{
    width : 50 ,
    height : 60, 
    borderWidth:1 ,
    borderColor : COLORS.text, 
    borderRadius : 5 ,
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : '#ffffff',
    padding : 5
  }


});

export default WeatherReport;
  
//     "id": 300, 
//     "main": "Drizzle"
//   }], 
//   "wind": {"deg": 200, "speed": 7.2}}
