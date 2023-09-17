import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './Screens/HomeScreen';
import Header from './Components/Header';
// import LogInScreen from './Screens/LogInScreen';
// import SignUpScreen from './Screens/SignUpScreen';

const Stack = createNativeStackNavigator()

export default function AppNavigator() {


  return (
    <NavigationContainer >
      
   <Stack.Navigator     initialRouteName='HomeScreen'>

      <Stack.Screen 
      name='HomeScreen' 
      component={HomeScreen} 
      options={{
            header: () => <Header />,
          }}
       />



      
      {/* <Stack.Screen 
      name='SignUp' 
      component={SignUpScreen} 
       options={{headerShown: false}}
       /> 
       
       <Stack.Screen 
      name='LogIn' 
      component={LogInScreen} 
       options={{headerShown: false}}
       /> */}
       
    

   </Stack.Navigator>
      
      </NavigationContainer>
  );
}