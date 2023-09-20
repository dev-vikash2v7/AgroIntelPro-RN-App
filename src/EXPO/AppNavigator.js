import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './Screens/HomeScreen';
import Header from './Components/Header';
<<<<<<< HEAD
=======
import DiseasePrediction from './Screens/Disease Prediction Screens/DiseasePrediction';
import CropRecommendation from './Screens/CropRecommendation';
import FertilizerRecommendation from './Screens/FertilizerRecommendation';
import { Button } from 'react-native';
>>>>>>> origin/main

import DiseasePredScreen from './Screens/Crop Model Screens/DiseasePrediction';
import CropRecScreen from './Screens/Crop Model Screens/CropRecommendation';
import FertilizerRecScreen from './Screens/Crop Model Screens/FertilizerRecommendation';

import LogInScreen from './Screens/Auth Screens/LogInScreen';
import SignUpScreen from './Screens/Auth Screens/SignUpScreen';


const Stack = createNativeStackNavigator()

export default function AppNavigator() {


  return (
    <NavigationContainer >
      
   <Stack.Navigator     initialRouteName='HomeScreen'>

      <Stack.Screen 
      name='HomeScreen' 
      component={HomeScreen} 
      options={{header: () => <Header />, }} />

      <Stack.Screen 
      name='DiseasePredScreen' 
      component={DiseasePrediction} 
      options={{ 

        header: () => <Header />,

      
    
         }} />

      <Stack.Screen 
      name='CropRecScreen' 
      component={CropRecommendation} 
      options={{header: () => <Header />, }} />

      <Stack.Screen 
      name='FertilizerRecScreen' 
      component={FertilizerRecommendation} 
      options={{header: () => <Header />, }} />

      <Stack.Screen 
      name='SignUp' 
      component={SignUpScreen} 
      options={{header: () => <Header />, }} />
       
       <Stack.Screen 
      name='LogIn' 
      component={LogInScreen} 
      options={{header: () => <Header />, }} />
      
   </Stack.Navigator>

      
      </NavigationContainer>

    
  );
}