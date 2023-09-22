import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const App = () => {
  const [npk, setNpk] = useState('');
  const [humidity, setHumidity] = useState('');
  const [temp, setTemp] = useState('');
  const [ph, setPh] = useState('');
  const [rainfall, setRainfall] = useState('');
  const [predictedCrop, setPredictedCrop] = useState('');

  const CropRecommendationScreen = () => {
    
    const dummyPrediction = 'Tomatoes';

    // Update the state with the predicted crop
    setPredictedCrop(dummyPrediction);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Crop Prediction App</Text>

      <TextInput
        style={styles.input}
        placeholder="NPK (e.g., 10-20-10)"
        onChangeText={(text) => setNpk(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Humidity (%)"
        onChangeText={(text) => setHumidity(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Temperature (°C)"
        onChangeText={(text) => setTemp(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="pH"
        onChangeText={(text) => setPh(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Rainfall (mm)"
        onChangeText={(text) => setRainfall(text)}
      />

      <Button title="Predict Crop" onPress={predictCrop} />

      {predictedCrop ? (
        <Text style={styles.result}>Predicted Crop: {predictedCrop}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;



// NPK (Nitrogen, Phosphorus, Potassium): These are essential nutrients for plant growth. NPK values represent the concentration of these nutrients in soil or fertilizer. Proper NPK levels are critical for healthy plant development.
// Humidity: Humidity refers to the amount of moisture or water vapor present in the air. It can affect plant transpiration and overall environmental conditions.
// Temperature (Temp): Temperature indicates the degree of heat in the environment. It plays a significant role in determining plant growth and the development of pests and diseases.
// pH (pH Level): pH measures the acidity or alkalinity of soil or water. It influences nutrient availability and can affect plant health and nutrient uptake.
// Rainfall: Rainfall is the amount of precipitation (rain) that occurs in a given area and time. It contributes to soil moisture and can impact plant growth and agriculture.