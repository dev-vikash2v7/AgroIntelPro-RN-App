import React,{useState , useEffect}  from 'react'
import AppNavigator from './src/EXPO/AppNavigator'
import { Provider } from 'react-redux'
import  ReduxStore  from './Redux/ReduxStore'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from './constants/theme'
import * as SplashScreen from 'expo-splash-screen';
import icons from './constants/icons'
import images from './constants/images'
import * as Font from 'expo-font';

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
    preloadImagesAsync().then( async() => {

      await Font.loadAsync({
        "lora": require('./assets/fonts/Lora/Lora-VariableFont_wght.ttf')  ,
        "pt_serif" : require('./assets/fonts/PT_Serif/PTSerif-Regular.ttf' ),
        "young_serif" : require('./assets/fonts/Young_Serif/YoungSerif-Regular.ttf')
      });
      SplashScreen.hideAsync();
  }) } , [] );


  
  return (
      <SafeAreaView style = {{flex : 1 }} > 
    <Provider store={ReduxStore}>
<AppNavigator/>    
  
</Provider>
</SafeAreaView>
  )
}

export default App