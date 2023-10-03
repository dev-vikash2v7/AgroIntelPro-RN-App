import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,

  StyleSheet,
  
  Dimensions,
  ImageBackground,
  Image
} from 'react-native';


import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../../../firebase_config'; 
import { collection, query, where, getDocs } from "firebase/firestore";
import CustomButton from '../../Components/CustomButton';
import { setUser } from '../../../../Redux/Slices/AuthSlice';
import images from '../../../../constants/images';


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
    <ImageBackground  
    source={ images.bg} 
    style = { styles.bgImage}>

  

    <Image source={icons.logo} style = {styles.logo}/>



    <View style ={styles.inputView}>



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

  
    {errorMessage &&
      <Text style={styles.errorMessage}>{errorMessage}</Text>
     }

    </View>


    <CustomButton
     bg = {'orange'} 
     title = {'LogIn'}
      onClick = {handleLogin}
       color = {'#fff'} 
       />


{/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}

       <Text style={styles.loginText}>
       Dont't Have an Account ?
        <Text style={styles.loginLink} onPress={()=>navigation.navigate('SignUp')}>Create Here</Text>
        </Text>

  </ImageBackground>


  )
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

export default LogInScreen;
