import React  from 'react'
import AppNavigator from './src/EXPO/AppNavigator'
import { Provider } from 'react-redux'
import  ReduxStore  from './Redux/ReduxStore'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from './constants/theme'

const App = () => {
  
  return (
    <Provider store={ReduxStore}>
      <SafeAreaView style = {{flex : 1 , backgroundColor : COLORS.lightWhite}}> 
<AppNavigator/>    
</SafeAreaView>
</Provider>
  )
}

export default App