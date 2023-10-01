import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet ,Button, TouchableOpacity ,ImageBackground, Dimensions  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../Components/CustomButton';
import images from '../../../../constants/images';
// import { Avatar } from 'react-native-paper';

const WelcomeScreen = () => {


  const navigation = useNavigation()


  return (
   
    <View style={styles.container}>
      
      <Image
        source={images.splash}
        style={styles.logo}
      /> 
{/* 
      <Text style={styles.appName}>AgroIntel Pro</Text>

      <Text style={styles.slogan}>Grow More , Worry Less !</Text>

      {/* Authentication Buttons */}

      <View style = {{width : '100%' ,  borderBottomWidth : 0.5 , borderBottomColor : 'gray' , paddingBottom : 10 , alignItems :'center',justifyContent :'center'}}>
    
      <CustomButton 
      bg = 'blue' 
      color  = 'white'
        title="Login"
        onClick={()=> navigation.navigate('LogIn')}
        style={styles.button}
      />

      <Text style = 
      {{fontWeight : '600' , 
      fontSize : 16 , 
      textAlign : 'center' ,
       marginVertical : 6
       }}> OR </Text>


<CustomButton 
      bg = 'gray' 
      color  = 'white'
        title="Register"
        onClick={()=> navigation.navigate('SignUp')}
        style={styles.button}
      />

</View>

<TouchableOpacity onPress={ ()=>navigation.navigate('HomeScreen')}>
        <Text
      style=  {{marginTop : 5 , fontSize : 16, color : 'red' , textDecorationLine :'underline', fontWeight : '500'}}
        > 
        Continue as Guest
         </Text>
         </TouchableOpacity>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor : '#ffffff'
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode :'cover'
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  slogan: {
    fontSize: 16,
    marginBottom: 30,
  },



});

export default WelcomeScreen;
