import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const WeatherRe = () => {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const locationData = await Location.getCurrentPositionAsync({});
        setLocation(locationData);
        getWeatherData(locationData.coords.latitude, locationData.coords.longitude);
      }
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const getWeatherData = async (latitude, longitude) => {
    const apiKey = 'YOUR_API_KEY'; // Replace with your weather API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  if (!location || !weatherData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.locationText}>
        {weatherData.name}, {weatherData.sys.country}
      </Text>
      <Text style={styles.weatherText}>
        {weatherData.weather[0].main}, {Math.round(weatherData.main.temp)}°C
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  weatherText: {
    fontSize: 18,
  },
});

export default Weather;
