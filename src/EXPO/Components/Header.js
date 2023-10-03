import React,{useState} from 'react'
import { View, Text , StyleSheet  , Dimensions , TouchableOpacity, Image } from 'react-native'

import {COLORS} from '../../../constants/theme';
import icons from '../../../constants/icons';
import { Avatar} from 'react-native-paper';

const { width} = Dimensions.get('window');


export default function Header() {

  return (
    <View style = {styles.container}> 

    <View style = {styles.header}>

      <View style = {{flexDirection:'row' , alignItems :'center' , justifyContent:'center'}}>

<View style = {{width : 60 , height : 60 , backgroundColor : COLORS.lightWhite , borderRadius : 50 , marginRight : 10}}>
           <Image
        source={icons.logo} 
        style={styles.logo}
        size={ 50}
      />
      </View>

      <Text style={styles.title} >AgroIntel Pro</Text>

      </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
container :{
  width : width
},
  header : {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop : 10 ,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor:COLORS.primary , 
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },            
    shadowOpacity: 0.2,
  },

  logo: {
    resizeMode :'cover' ,
    width: 60,
    height: 60,
    marginRight: 10,
    alignItems:'center',
    justifyContent :'center',
  },

  title: {
    fontSize: 25,
    fontWeight : '600' ,
    color: COLORS.text, 
  },
  
})
