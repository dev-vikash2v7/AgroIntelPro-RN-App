import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet ,Button } from 'react-native';
import icons from '../../../Constants/icons';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../Components/CustomButton';
import { useSelector } from 'react-redux';


const WelcomeScreen = () => {

  const user = useSelector(state => state.auth.user)

  const navigation = useNavigation()


  useEffect(()=>{
      if(user){
      navigation.navigate('HomeScreen')
      }
  } , [])

  return (
    
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={icons.logo}
        style={styles.logo}
      />

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
        <Text
      style=  {{marginTop : 5 , fontSize : 16, color : 'red' , textDecorationLine :'underline', fontWeight : '500'}}
        > 
        Continue as Guest
         </Text>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
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
