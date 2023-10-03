import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,  
  Image,
  Dimensions,
  ImageBackground
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import {useDispatch }  from 'react-redux'
import { collection,addDoc} from "firebase/firestore";

import { db } from '../../../../firebase_config'; 
import { setUser } from '../../../../Redux/Slices/AuthSlice';
import CustomButton from '../../Components/CustomButton';

import Toast from 'react-native-toast-message';
import images from '../../../../constants/images';

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
        // console.error("Error adding document: ", e);
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
      <ImageBackground  
      source={ images.bg} 
      style = { styles.bgImage}>
    

      <Image source={icons.logo} style = {styles.logo}/>
 


      <View style ={styles.inputView}>


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

      </View>


      <CustomButton
       bg = {'orange'} 
       title = {'Sign Up'}
        onClick = {handleSignup}
         color = {'#fff'} 
         />

{/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}

         <Text style={styles.loginText}>
         Already have an Account ?
          <Text style={styles.loginLink} onPress={()=>navigation.navigate('LogIn')}>Login Here</Text>
          </Text>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage:{
    flex: 1,
    alignItems: 'center',
 width : Dimensions.get('screen').width ,
 height:Dimensions.get('screen').height,
 flex: 1,
    resizeMode: 'cover'
},
logo:{
width : 60 ,
height : 60 ,
alignItems : 'center',
marginTop : 15 ,
    resizeMode: 'cover',
},

 inputView : {
  width: '90%',
 },

  input: {
    width : '100%',
    height: 50,
    borderColor: 'green',
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 20,
    alignSelf:'center',
    color : '#000',
    fontWeight : '500',
    fontSize : 16
  },
  errorMessage: {
    marginTop : 5 ,
    color: 'red',
    marginBottom: 7,
    fontWeight : 'bold'
  },
  loginText :{
    fontSize : 15,
    alignSelf : 'center',
    marginTop:15,
    color  :  '#000',
    fontWeight : '500'

  },
  loginLink:{
    marginLeft : 4,
    textDecorationLine:'underline',
    color : 'blue',
  }
});

export default SignUpScreen;
