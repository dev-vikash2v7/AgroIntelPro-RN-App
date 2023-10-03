import React,{useState , useEffect}  from 'react'
import AppNavigator from './src/EXPO/AppNavigator'
import { Provider } from 'react-redux'
import  ReduxStore  from './Redux/ReduxStore'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from './constants/theme'
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import icons from './constants/icons'
import images from './constants/images'


const App = () => {

  SplashScreen.preventAutoHideAsync()




  async function preloadImagesAsync() {
    const imagePromises = [
     icons ,
     images
    ];
  
    try {
      await Promise.all(imagePromises);
    } catch (error) {
      console.warn('Image preload error:', error);
    }
  }



  useEffect(() => {
    // Preload images
    preloadImagesAsync().then(() => {
      SplashScreen.hideAsync(); // Hide the splash screen when images are loaded
    });
  }, []);


  
  return (
    <Provider store={ReduxStore}>
      <SafeAreaView style = {{flex : 1 , backgroundColor : COLORS.lightWhite}} > 
<AppNavigator/>    
  
</SafeAreaView>
</Provider>
  )
}

export default App