import  React,{useEffect, useState }  from 'react'
import { View  , StyleSheet   , Dimensions} from 'react-native'
import PhotoUploader from '../../Components/PhotoUploader'

const Home = () => {
 
  return (
    <View style={styles.container}>

    <PhotoUploader/>

    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex:1
  },
    
})
export default Home