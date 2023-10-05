import  React,{useEffect, useState }  from 'react'
import { View  , StyleSheet   , TouchableOpacity, Image , Text , FlatList , ScrollView, Dimensions, Platform} from 'react-native'
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

      name : 'Crop Recommend',
      loc : icons.plant,
      link : 'CropRecScreen'

    },
    {
      id : 3 ,
      name : 'Fertilizer Recommend',
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
    <ScrollView style={styles.container}>

    <WeatherReport/>

    <View style = {styles.funtionsTab}>


<View style = {styles.row}>
  {data.slice(0,3).map( (item) => (

    <TouchableOpacity   onPress={ () =>navigation.navigate(item.link)} style = {styles.component} id={item.id}>

    <View   style={styles.imgBox}>

      <Image 
          resizeMode="contain"
          source={  item.loc } 
          style = {styles.img}/>

     </View>

    <View style={styles.titleContainer}>

    <Text style={styles.title} numberOfLines={ 2} >{item.name} </Text>
    </View>

    </TouchableOpacity>
  )  )  
     }
     </View>


     <View style = {styles.row}>
     {data.slice(3,6).map( (item) => (

      <TouchableOpacity   onPress={ () =>navigation.navigate(item.link)} style = {styles.component} id={item.id}>

<View   style={styles.imgBox}>

  <Image 
      resizeMode="contain"
      source={  item.loc } 
      style = {styles.img}/>

 </View>

<View style={styles.titleContainer}>

<Text style={styles.title} numberOfLines={ 2} >{item.name} </Text>
</View>

</TouchableOpacity>
)  )  
 }
 </View>


  </View>

    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container : {
    backgroundColor :COLORS.background
  },
  funtionsTab:{
    marginTop : 30 , 
  },
  row : {
    flexDirection:'row',
    alignItems:'center',
    justifyContent :'space-between',
    marginBottom : 26 , 
    paddingHorizontal: 15,

  }, 

  component : {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    borderRadius: 16,
    overflow: 'hidden',
    

    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
        shadowOffset: { width: 1, height: 2 },            
      },
  })},

  imgBox : {
backgroundColor : COLORS.primary , 
width : 50 ,
height :50 ,
borderWidth: 0.4,
    borderColor: 'orange',
    padding : 5  ,
    borderRadius: 50,
        elevation: 4,

  },

  img : {
    flex: 1,
    width: undefined, // Let the width adjust to the parent (box)
    height: undefined,
  },
  titleContainer: {
    width: 100, // Adjust the width as needed,
    paddingHorizontal : 3
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