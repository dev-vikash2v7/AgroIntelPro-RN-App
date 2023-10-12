import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import {COLORS} from '../../../../constants/theme'
import { useDispatch, useSelector } from 'react-redux';
import WelcomeScreen from '../Auth Screens/AuthView';
import { addDoc, collection, doc } from 'firebase/firestore';
import { db } from '../../../../firebase_config';
import { addFarm } from '../../../../Redux/Slices/AuthSlice';


const MyFarm = () => {

  const [farmDetails, setFarmDetails] = useState(null);

  const user = useSelector(state => state.auth.user)
 
  useEffect(()=>{
    if(user && user.farmDetails){
      setFarmDetails(user.farmDetails)
    }
  }, [])


  function ShowFarmDetails(){

    return(
      <View style={styles.farmDetailsContainer}>
      <Text style={styles.farmName}>{farmDetails.farmName}</Text>
      <Text style={styles.location}>Location : {farmDetails.location}</Text>
      <Text style={styles.crops}>Crop : {farmDetails.cropName}</Text>
      <Text style={styles.farmSize}>Size : {farmDetails.farmSize}</Text>
      <Text style={styles.description}>Description : {farmDetails.description}</Text>
    </View>
    ) 
  }

  function AddFarm(){

    const [farmName, setFarmName] = useState('');
    const [cropName, setCropName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');  
    const [farmSize, setFarmSize] = useState('');  
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch()


    const handleSubmit = async()=>{

      try{
      const userDocRef = doc(collection(db, 'Users'), user.id);
      
      const data = {
        farmName , cropName  , location , description , farmSize
      }
      const orderRef = await addDoc(collection(userDocRef , 'Farm')  , data);
        // console.log('Order added with ID: ', orderRef.id)
        setFarmDetails(data)
        dispatch(addFarm(data))
      }
      catch (error) {
        console.error('Error adding order document: ', error);
        setErrorMessage('Network connection is weak. ')
    }
  }
    
    return(
      
      <ScrollView contentContainerStyle={styles.addFarmContainer}>
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
        label="Farm Size"
        value={farmSize}
        onChangeText={(text) => setFarmSize(text)}
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

      {errorMessage &&
        <Text style={styles.errorMessage}>{errorMessage}</Text>
       }
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
  addFarmContainer: {
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


  
  farmDetailsContainer: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 20,
  },
  farmImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
 
  farmName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign:'center',
  },
  location: {
    fontSize: 20,
    fontWeight: '500',
    marginVertical : 5

  },
  crops: {
    fontSize: 20,
    fontWeight: '500',
    marginVertical : 5


  },
  farmSize: {
    fontSize: 20,
    fontWeight: '500',
    marginVertical : 5


  },
  description:{
    fontSize: 18,
    marginBottom: 5,
    fontWeight: '500',
    marginVertical : 5


  },
  errorMessage: {
    marginTop : 5 ,
    color: 'red',
    marginBottom: 7,
    fontWeight : 'bold'
  },
});

export default MyFarm;
