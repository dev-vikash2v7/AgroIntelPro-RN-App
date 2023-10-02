import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import { COLORS } from '../../../constants/theme';
import { WEATHER_API } from '../../../env';

const WeatherReport = () => {

  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForcastData] = useState([]);

  const [selectedTab, setSelectedTab] = useState('overview');
  const [days, setDays] = useState([]);

  const getNext7Days = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date(); // Get the current date
    const next7Days = [];

    for (let i = 0; i < 5; i++) {
      const date = new Date(today); // Create a new date object
      date.setDate(today.getDate() + i); // Add 'i' days to the current date

      const dayOfWeek = daysOfWeek[date.getDay()]; // Get the day of the week
      next7Days.push(dayOfWeek);
    }
    setDays(next7Days)

  };


  useEffect(() => {
    getNext7Days();
    getLocation();
  }, []);


  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {

        const locationData = await Location.getCurrentPositionAsync({});
        getWeatherData(locationData.coords.latitude, locationData.coords.longitude);
        getForcastData(locationData.coords.latitude, locationData.coords.longitude);
      }
    } catch (error) {
      Alert('Error getting location:');
      
    }
  };



  const getWeatherData = async (latitude, longitude) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API}`;

    try {
      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
      // console.log("response : " , response.data)
    } catch (error) {
      // console.error('Error fetching weather data:', error);
    }
  };

  const getForcastData = async (latitude, longitude) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API}`;

    try {
      const response = await axios.get(apiUrl);
      setForcastData(response.data.list.splice(0, 5));
    } catch (error) {
      // console.error('Error fetching weather data:', error);
    }
  };



  if (!forecastData || !weatherData) {
    return <Text style={{ paddingTop: 10, textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>Loading Live Weather Report...</Text>;
  }
  return (
    <View style={styles.container}>


      <Text style={styles.title}>
        Weather Type : <Text style={{ color: 'blue', fontWeight: 'bold' , textTransform:'capitalize'}}>{weatherData.weather[0].description}  </Text>
      </Text>

      <Text style={{ fontSize: 10 }}> Now </Text>

      <View style={styles.weatherText}>

        <View>
          <Text style={{ fontSize: 30, fontWeight: 500 }}>
            {/* 24°C */}
            {weatherData.main.temp}°C
          </Text>
          <Text style={{ fontSize: 12, fontWeight: 400 }}>
            {/* Feels like 24°C */}
            Feels Like {weatherData.main.feels_like}°C
          </Text>

          <Text style={{ fontSize: 20, fontWeight: 400 }}>
            {weatherData.name}  ,   {weatherData.sys.country}
          </Text>
        </View>

        <View style={{ marginTop: 0 }}>
          <Text style={{ fontSize: 15, fontWeight: 400 }}> Pressure : {weatherData.main.pressure} </Text>
          <Text style={{ fontSize: 15, fontWeight: 400 }}> Humidity : {weatherData.main.humidity} % </Text>
          <Text style={{ fontSize: 15, fontWeight: 400 }}> Wind :  {weatherData.wind.speed} m/s</Text>
        </View>

      </View>

      <View style={styles.forecast} >

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

          <TouchableOpacity onPress={() => setSelectedTab('overview')} >
            <Text style={[styles.tab, selectedTab == 'overview' && { fontWeight: 'bold', fontSize: 16, textDecorationLine: 'underline' }]}> Overview </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setSelectedTab('wind')} >
            <Text style={[styles.tab, selectedTab == 'wind' && { fontWeight: 'bold', fontSize: 16 }]}> Wind </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setSelectedTab('humidity')} >
            <Text style={[styles.tab, selectedTab == 'humidity' && { fontWeight: 'bold', fontSize: 16 }]}> Humidity </Text>
          </TouchableOpacity>

        </View>

        <View style={styles.nex5days} >

          {selectedTab == 'overview' ?

            forecastData.map((data, index) => (
              <View style={styles.day} key={index}>
                <Text style={{ fontSize: 10, fontWeight: '600' }}> {days[index]} </Text>
                <Text style={{ marginTop: 2, fontWeight: '500', fontSize: 9 }}> {data.weather[0].description} </Text>
                <View>
                  <Text style={{ fontSize: 9, fontWeight: '400', marginTop: 3 }}>  {data.main.temp_min}°C  / </Text>
                  <Text style={{ fontSize: 9, fontWeight: '400' }}> {data.main.temp_max}°C  </Text>
                </View>
              </View>
            ))

            :

            selectedTab == 'wind' ?

              forecastData.map((data, index) => (
                <View style={styles.day} key={index}>
                  <Text style={{ fontSize: 10, fontWeight: '600' }}> {days[index]} </Text>

                  <View style={{ marginTop: 1 }}>
                    <Text style={{ fontSize: 9, fontWeight: '500' }}>speed : {data.wind.speed} </Text>
                    <Text style={{ fontSize: 9, fontWeight: '500' }}>Degree :  {data.wind.deg} </Text>
                    <Text style={{ fontSize: 9, fontWeight: '500' }}>Gust : {data.wind.gust} </Text>
                  </View>

                </View>
              ))

              :

              forecastData.map((data, index) => (
                <View style={styles.day} key={index}>
                  <Text style={{ fontSize: 10, fontWeight: '600' }}> {days[index]} </Text>

                  <View style={{ justifyContent :'center' ,alignItems :'center' ,alignSelf :'center' , marginTop : -30 }}>
                    <Text style={{ fontSize: 14, fontWeight: '500' , textAlign :'center'}}>{data.main.humidity} %</Text>
                  </View>

                </View>
        )) 

          }

      </View>


    </View>

      

    </View >

  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingTop: 15
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  weatherText: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  forecast: {
    marginTop: 8,
    marginBottom: 20,
  },
  nex5days: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  day: {
    width: 60,
    height: 75,
    borderWidth: 0.5,
    borderColor: COLORS.primary,
    borderRadius: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.lightWhite,
    paddingVertical: 5
  },
  tab: {
    fontSize: 14,
    fontWeight: '400'
  }


});

export default WeatherReport;

//     "id": 300,
//     "main": "Drizzle"
//   }],
//   "wind": {"deg": 200, "speed": 7.2}}
