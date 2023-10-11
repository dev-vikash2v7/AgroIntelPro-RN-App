import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import {COLORS} from '../../../../constants/theme'
import { useSelector } from 'react-redux';
import WelcomeScreen from '../Auth Screens/AuthView';


const MyFarm = () => {
  const [farmName, setFarmName] = useState('');
  const [cropName, setCropName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const [farmDetails, setFarmDetails] = useState(null);

  const user = useSelector(state => state.auth.user)

  const handleSubmit = () => {
    console.log('Farm Name:', farmName);
    console.log('Crop Name:', cropName);
    console.log('Location:', location);
    console.log('Description:', description);
  };

  useEffect(()=>{
    if(user && user.farmDetails){
      setFarmDetails(user.farmDetails)
    }

  }, [])


  function ShowFarmDetails(){

    return(

      <View style={styles.container}>
      <Image source={farmerData.farmImage} style={styles.farmImage} />
      <Text style={styles.name}>{farmerData.name}</Text>
      <Text style={styles.farmName}>{farmerData.farmName}</Text>
      <Text style={styles.location}>{farmerData.location}</Text>
      <Text style={styles.crops}>{farmerData.crops}</Text>
      <Text style={styles.farmSize}>{farmerData.farmSize}</Text>
    </View>
    )
   
    
  }

  function AddFarm(){

    const handleSubmit = ()=>{
      const userRef = firestore().collection('users').doc(userId);

      // Reference to the "orders" subcollection
      const ordersCollectionRef = userRef.collection('orders');
      
      // Add the order document with auto-generated document ID
      ordersCollectionRef.add(orderData)
        .then((docRef) => {
          console.log('Order document added with ID: ', docRef.id);
        })
        .catch((error) => {
          console.error('Error adding order document: ', error);
        });
    }

    return(

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
    )

  }



  return (
    user ? 

    farmDetails ? 

    <ShowFarmDetails/>

    :
<AddFarm/>

   

    : 
    <WelcomeScreen/>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor : COLORS.background
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
  
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  farmImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  farmName: {
    fontSize: 18,
  },
  location: {
    fontSize: 16,
  },
  crops: {
    fontSize: 16,
  },
  farmSize: {
    fontSize: 16,
  },
});

export default MyFarm;
