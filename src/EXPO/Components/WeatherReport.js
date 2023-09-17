import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import colors from '../../colors';
// import { getLocation } from '../Permissions';



const WeatherReport = () => {
  
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [forcastData, setForcastData] = useState(null);

  // useEffect(() => {
  //   getLocation();
  // }, []);


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
      console.log("response : " , response.data)
      // response :  {"base": "stations", "clouds": {"all": 100}, "cod": 200, "coord": {"lat": 23.252, "lon": 77.4992}, "dt": 1694880629, "id": 1275841, "main": {"feels_like": 296.37, "humidity": 100, "pressure": 1001, "temp": 295.47, "temp_max": 295.47, "temp_min": 295.47}, "name": "Bhopal", "sys": {"country": "IN", "id": 9063, "sunrise": 1694824602, "sunset": 1694868824, "type": 1}, "timezone": 19800, "visibility": 1500, "weather": [{"description": "light intensity drizzle", "icon": "09n", "id": 300, "main": "Drizzle"}], "wind": {"deg": 200, "speed": 7.2}}
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
      console.log("response : " , response.data.list)
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };






  // if (!location || !weatherData) {
  //   return <Text>Loading...</Text>;
  // }
  return (
    <View style={styles.container}>

      <Text style={ styles.title}> Weather </Text>

      <Text style = {{fontSize : 10}}> Now </Text>

      <View style={styles.weatherText}>

      <View>
        <Text style = {{fontSize : 30 , fontWeight : 500 }}> 
          24°C
        </Text>
        <Text style = {{fontSize : 10 , fontWeight : 300 }}> 
           Feels like 24°C
        </Text>

        <Text style = {{fontSize : 20 , fontWeight : 400 }}> 
           Bhopal , IN
        </Text>
      </View>

      <View>
        <Text style={{ fontSize : 20 , fontWeight : 500}}> Mostly Cloudy </Text>
        <Text style={{ fontSize : 15 , fontWeight : 400}}> Precip : 20%  </Text>
        <Text style={{ fontSize : 15 , fontWeight : 400}}> Humidity : 100% </Text>
        <Text style={{ fontSize : 15 , fontWeight : 400}}> Wind :  8 km/h </Text>
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
    marginTop : 10 ,
    height : "34%",
    paddingHorizontal : 15 ,
    borderBottomWidth : 1 , 
    borderBottomColor : 'gray'
  },
  title : {
    fontSize:20 , 
    fontWeight : "600",
    marginBottom : 10 , 
  }, 
  weatherText: {
    flexDirection : 'row' ,
    justifyContent : 'space-between'
  },
  forecast:{
    marginTop : 10 , 
    flexDirection : 'row',
    justifyContent : 'space-between'
  },
  day :{
    width : 60 ,
    height : 70, 
    borderWidth:1 ,
    borderColor : colors.text, 
    borderRadius : 5 ,
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : '#ffffff',
    padding : 5
  }


});

export default WeatherReport;