import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,  
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import {useDispatch }  from 'react-redux'
import { collection,addDoc} from "firebase/firestore";
import {Ionicons}   from '@expo/vector-icons';

import { db } from '../../firebase_config'; 
import { setUser } from '../../../Redux/Slices/AuthSlice';
import CustomButton from '../../Components/CustomButton';

import Toast from 'react-native-toast-message';


const SignUpScreen = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation();
  const dispatch = useDispatch()

  const showToast = (type , text1 , text2) => {
    Toast.show({
      type ,
       text1 ,
        text2
    });
  }



 const  registerUser = async ( data  )=>{
     try{
     const docRef =  await addDoc(collection(db, "Users"), data);
      // console.log("Document written with ID: ", docRef.id);
      dispatch(setUser(data))
      showToast('success' , 'Welcome to AgroIntel Pro' , 'Grow More Worry Less')
      navigation.navigate('LogIn');
    }
    catch (e) {
        console.error("Error adding document: ", e);
      showToast('failure' , 'Signup Failed' , 'Enter valid details')
        setErrorMessage('Please check your credentials and try again.');
      }
}


  const handleSignup = () => {
    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    registerUser({name, email, password})
  };

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress = {()=> navigation.goBack() }   style = {{"top":30 , "position":'absolute', "left" : 30 }}>
    <Ionicons name = 'arrow-back' size = {30} />
    </TouchableOpacity> */}

      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={text => setName(text)}
        value={name}
    placeholderTextColor =  'gray'

      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
    placeholderTextColor =  'gray'

      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
        autoCapitalize="none"
    placeholderTextColor =  'gray'

      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        onChangeText={text => setConfirmPassword(text)}
        value={confirmPassword}
        secureTextEntry
        autoCapitalize="none"
    placeholderTextColor =  'gray'

      />
      {errorMessage &&
        <Text style={styles.errorMessage}>{errorMessage}</Text>
       }

      <CustomButton
       bg = {'orange'} 
       title = {'Sign Up'}
        onClick = {handleSignup}
         color = {'#fff'} 
         />

<Toast ref={(ref) => Toast.setRef(ref)} />

         <Text style={styles.loginText}>
         Already have an Account ?
          <Text style={styles.loginLink} onPress={()=>navigation.navigate('LogIn')}>Click Here</Text>
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
    marginBottom: 10,
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

export default SignUpScreen;
