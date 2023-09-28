import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const MyFarm = () => {
  const [farmName, setFarmName] = useState('');
  const [cropName, setCropName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    console.log('Farm Name:', farmName);
    console.log('Crop Name:', cropName);
    console.log('Location:', location);
    console.log('Description:', description);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Upload Farm and Crop Details</Text>
      <TextInput
        label="Farm Name"
        value={farmName}
        onChangeText={(text) => setFarmName(text)}
        style={styles.input}
      />
      <TextInput
        label="Crop Name"
        value={cropName}
        onChangeText={(text) => setCropName(text)}
        style={styles.input}
      />
      <TextInput
        label="Location"
        value={location}
        onChangeText={(text) => setLocation(text)}
        style={styles.input}
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
        multiline
        numberOfLines={4}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Upload
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default MyFarm;
