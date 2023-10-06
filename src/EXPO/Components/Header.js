import React,{useState} from 'react'
import { View, Text , StyleSheet  , Dimensions , TouchableOpacity, Image } from 'react-native'
import {COLORS , SIZES} from '../../../constants/theme';
import icons from '../../../constants/icons';
import { Ionicons } from '@expo/vector-icons';
const { width} = Dimensions.get('window');

export default function Header() {


  return (
    <View style = {styles.container}> 

    <View style = {styles.header}>


      <View style = { styles.logoBox}>
           <Image
        source={icons.logo} 
        style={styles.logo}
      />
      </View>

      <Text style={styles.title} >AgroIntel Pro</Text>

    </View>

<TouchableOpacity onPress={ () => {}}>
    <Ionicons/>
    </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
container :{
  display:'flex'
},
  header : {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: '',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor:COLORS.primary , 
    // elevation: 4,
  },

  logoBox : {
    width : 55 ,
     height : 55 , 
    backgroundColor : COLORS.lightWhite ,
     borderRadius : 50 ,
     marginRight : 10 ,
    elevation : 4 },

  logo: {
    resizeMode :'cover' ,
    width: 50,
    height: 50,
    marginRight: 10,
    justifyContent :'center',
    alignItems:'center'
  },

  title: {
    fontSize: SIZES.large,
    color: COLORS.text, 
    fontFamily : 'young_serif',
    fontWeight : 'bold'
  },
  
})
