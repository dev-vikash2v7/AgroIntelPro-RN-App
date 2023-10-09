import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet ,Button, TouchableOpacity ,ImageBackground, Dimensions  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../Components/CustomButton';
import images from '../../../../constants/images';
import { COLORS } from '../../../../constants/theme';
import icons from '../../../../constants/icons';
// import { Avatar } from 'react-native-paper';

const WelcomeScreen = () => {


const navigation = useNavigation();

  return (
   
    <View style={styles.container}>
      
      <Image
        source={icons.logo}
        style={styles.logo}
      /> 

      <Text style={styles.appName}>AgroIntel Pro</Text>

      <Text style={styles.slogan}>Grow More , Worry Less !</Text>

      {/* Authentication Buttons */}

      <View style = {{width : '100%' , alignItems :'center',justifyContent :'center'}}>
    
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
      bg = {COLORS.secondary} 
      color  = 'white'
        title="Register"
        onClick={()=> navigation.navigate('SignUp')}
        style={styles.button}
      />

</View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor : COLORS.background
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode :'cover'
  },
  appName: {
    fontSize: 40,
    // fontWeight: 'bold',
    marginBottom: 10,
    fontFamily:'lora_bold'
  },

  slogan: {
    fontSize: 16,
    marginBottom: 30,
    fontFamily:'lora_bold'

  },



});

export default WelcomeScreen;
