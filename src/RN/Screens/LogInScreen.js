import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../Components/CustomButton';
import { setUser  } from '../Redux/Slices/AuthSlice';
import {db} from '../../config/firebaseConfig' 
import Ionicons   from 'react-native-vector-icons/Ionicons';
import { collection, query, where, getDocs } from "firebase/firestore";


const LogInScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');



  
  const checkCredentials =async  (user)=>{
    const q = query(collection(db, "Users"), where("email", "==", user.email));
    
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      console.log(doc.id, " => ", doc.data());
      const userData = doc.data();

      if(userData.password == user.password){
        dispatch(setUser(userData))
        navigation.navigate('HomeScreen')
      }
        setErrorMessage('Password is Incorrect ')
        return
    });
    setErrorMessage('Email not found');

};

  const handleLogin = () => {
    if (!email || !password) {
      setErrorMessage('Please enter both username and password');
      return;
    }
    checkCredentials({email,password})
  };


  return (
    <View style={styles.container}>

    <TouchableOpacity onPress = {()=> navigation.goBack() }   style = {{"top":40 , "position":'absolute', "left" : 20 }}>
    <Ionicons name = 'arrow-back' size = {20} />
    </TouchableOpacity>


      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
             autoCapitalize="none"
    placeholderTextColor =  'gray'

      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
    placeholderTextColor =  'gray'

      />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}

      <CustomButton
       bg = {'orange'} 
       title = {'Log In'}
        onClick = {handleLogin}
         color = {'#fff'} 
         />

        <Text style={styles.loginText}>
         Dont't have an Account ?
          <Text style={styles.loginLink} onPress={()=>navigation.navigate('SignUp')}>Create Here</Text>
          </Text>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color : '#000',

  },
  input: {
    width: '90%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 20,
    alignSelf:'center',
    color : '#000'
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
    fontWeight : "600"
  },
  loginText :{
    fontSize : 15,
    alignSelf : 'center',
    marginTop:10,
    color  :  'gray'

  },
  loginLink:{
    marginLeft : 4,
    textDecorationLine:'underline',
    color : 'blue'
  }
});

export default LogInScreen;
