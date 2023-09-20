import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './Screens/HomeScreen';
import Header from './Components/Header';

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
      component={DiseasePredScreen} 
      options={{header: () => <Header />, }} />

      <Stack.Screen 
      name='CropRecScreen' 
      component={CropRecScreen} 
      options={{header: () => <Header />, }} />

      <Stack.Screen 
      name='FertilizerRecScreen' 
      component={FertilizerRecScreen} 
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