import  React,{useEffect, useState }  from 'react'
import { View  , StyleSheet   , TouchableOpacity, Image , Text , FlatList} from 'react-native'
import WeatherReport from '../Components/WeatherReport'
import {  useNavigation} from '@react-navigation/native'
import {COLORS} from '../../../constants/theme'
import icons from '../../../constants/icons'

const Home = () => {
  const navigation = useNavigation()
  // const dispatch = useDispatch();

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

    <Text style={styles.title} numberOfLines={2}>{item.name} </Text>
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
    marginTop : 20 , 
    justifyContent : 'space-between',
    alignItems:'center',
  },


  component : {
    width : 100 ,
     height : 140 ,
justifyContent : 'center',
alignContent : 'center',
marginHorizontal: 10 ,  
marginBottom : 20 ,
  },

  imgBox : {
backgroundColor : COLORS.primary , 
width : 100 ,
height :100 ,
borderRadius : 4 ,
borderWidth: 1,
    borderColor: 'black',
    padding : 5 
  },

  img : {
    flex: 1,
    width: undefined, // Let the width adjust to the parent (box)
    height: undefined,
  },

  title : {
    fontSize : 14,
    maxWidth: '100%', // Set the maximum width for the text
    overflow: 'hidden',
    textAlign : 'center',
    fontWeight : "500", 
    marginTop : 5
  }
  
    
})
export default Home