import React,{useState , useEffect}  from 'react'
import AppNavigator from './src/EXPO/AppNavigator'
import { Provider } from 'react-redux'
import  ReduxStore  from './Redux/ReduxStore'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from './constants/theme'
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';


const App = () => {

  
  return (
    <Provider store={ReduxStore}>
      <SafeAreaView style = {{flex : 1 , backgroundColor : COLORS.lightWhite}} > 
<AppNavigator/>    
  
</SafeAreaView>
</Provider>
  )
}

export default App