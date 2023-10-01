import  React,{useEffect, useState }  from 'react'
import { View  , StyleSheet   , TouchableOpacity, Image , Text , FlatList} from 'react-native'
import WeatherReport from '../Components/WeatherReport'
import {  useNavigation} from '@react-navigation/native'
import {COLORS} from '../../../constants/theme'
import icons from '../../../constants/icons'

const Home = () => {
  const navigation = useNavigation()

  const data = [
    {
      id : 1 ,
      name : 'Disease Predicator',
      loc : icons.camera,
      link : 'DiseasePredScreen'
    },
    {


      id : 2 ,

      name : 'Crop Recommendation',
      loc : icons.plant,
      link : 'CropRecScreen'

    },
    {
      id : 3 ,
      name : 'Fertilizer Recommendation',
      loc : icons.fertilizer,
      link : 'FertilizerRecScreen'
    },
    {
      id : 4 ,
      name : 'My Farm',
      loc : icons.intelligent,
      link : 'MyFarm'
    },
    {
      id : 5 ,
      name : 'Farm Store',
      loc : icons.bag,
      link : 'FarmStore'
    },
    {
      id : 6 ,
      name : 'Farm Community',
      loc : icons.community,
      link : 'FarmCommunity'
    },
  ]


  return (
    <View style={styles.container}>

    <WeatherReport/>

    <View style = {styles.funtionsTab}>


  <FlatList  
    data={data}
    numColumns={ 3}
    keyExtractor={(item) => item.id}
    renderItem={ ({item}) =>

    <View style = {styles.component}  key={item.id}>

    <TouchableOpacity   onPress={ () =>navigation.navigate(item.link)} style = {styles.imgBox}>
      <Image 
          resizeMode="contain"
          source={  item.loc } 
          style = {styles.img}/>
    </TouchableOpacity>

    <View style={styles.titleContainer}>
    <Text style={styles.title} numberOfLines={ 2} >{item.name} </Text>
    </View>

    </View>
     }
  />




  </View>

    </View>
  )
}


const styles = StyleSheet.create({
  container : {
    flex:1
  },
  funtionsTab:{
    marginTop : 15 , 
    paddingRight : 15,
  },


  component : {
    flex : 1 ,
    width : 90 ,
     height : 130 ,
justifyContent : 'center',
alignContent : 'center',
marginHorizontal: 15 ,  
marginBottom : 10 ,

  
  },

  imgBox : {
backgroundColor : COLORS.primary , 
width : 100 ,
height :90 ,
borderWidth: 0.4,
    borderColor: 'orange',
    padding : 5  ,

    borderRadius: 10,
    elevation: 3, // Box shadow (for Android)
    shadowColor: 'rgba(0, 0, 0, 0.1)', // Box shadow (for iOS)
    shadowOffset: { width: 0, height: 2 }, // Box shadow (for iOS)
    shadowOpacity: 1, // Box shadow (for iOS)
    shadowRadius: 4, // Box shadow (for iOS)
  },

  img : {
    flex: 1,
    width: undefined, // Let the width adjust to the parent (box)
    height: undefined,
  },
  titleContainer: {
    width: 100, // Adjust the width as needed
  },

  title : {
    flexWrap:'nowrap',
    fontSize : 12,
    textAlign : 'center',
    fontWeight : "500", 
    marginTop : 5,
  }
  
    
})
export default Home