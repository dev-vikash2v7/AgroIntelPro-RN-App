import React  from 'react'
import AppNavigator from './src/EXPO/AppNavigator'
import { Provider } from 'react-redux'
import  ReduxStore  from './src/Redux/ReduxStore'

const App = () => {
  
  return (

    <Provider store={ReduxStore}>
<AppNavigator/>    
</Provider>
  )
}

export default App