import React,{useState} from 'react'
import { View, Text , StyleSheet  , Dimensions , TouchableOpacity, Image } from 'react-native'
import {COLORS , SIZES} from '../../../constants/theme';
import icons from '../../../constants/icons';
import { Ionicons } from '@expo/vector-icons';
const { width} = Dimensions.get('window');

export default function Header() {


  return (
    <View style = {styles.container}> 

    {/* <View style = {styles.header}> */}


      <View style = { styles.logoBox}>
           <Image
        source={icons.logo} 
        style={styles.logo}
      />
      </View>

      <Text style={styles.title} >AgroIntel Pro</Text>

    {/* </View> */}

{/* <TouchableOpacity onPress={ () => {}}>
    <Ionicons/>
    </TouchableOpacity> */}


    </View>
  );
}

const styles = StyleSheet.create({
container :{
  backgroundColor:COLORS.primary , 
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 16,
  paddingVertical : 10,
  elevation: 4,
  shadowColor : 'blue'
},

  logoBox : {
    width : 55 ,
    height :55 ,
    backgroundColor : 'white' ,
     borderRadius : 50 ,
     marginRight : 10 ,
    elevation : 4 ,
    marginRight: 10,
  shadowColor : 'black'

  },

  logo: {
    resizeMode :'contain' ,
    width: 50,
    height : 50 ,
    justifyContent :'center',
    alignItems:'center',
  },

  title: {
    fontSize: SIZES.large,
    color: COLORS.text, 
    fontFamily : 'lora_bold',
  },
  
})
