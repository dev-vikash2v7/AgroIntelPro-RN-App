import React from 'react'
import { View, Text , StyleSheet  , Dimensions , TouchableOpacity, Image } from 'react-native'
import {Entypo}   from  '@expo/vector-icons';
import PopupMenu from './PopupMenu';
import colors from '../../Constants/colors';
import icons from '../../Constants/icons';

const { width} = Dimensions.get('window');

export default function Header() {
  return (
    <View style = {styles.container}> 

    <View style = {{ height : 30  , backgroundColor : 'green' , width : '100%'}}/> 

    <View style = {styles.header}>
      <View style = {{flexDirection:'row' , alignItems :'center'}}>
           <Image
        source={icons.logo} 
        style={styles.logo}
      />

      <Text style={styles.title}>AgroIntel Pro</Text>

      </View>

      <TouchableOpacity onPress={() => <PopupMenu/> }>
        <Entypo  name='dots-three-vertical' size={20} color={colors.text}/>
      </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
container :{
  height  : 100,
  width : width
},
  header : {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop : 10 ,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor:colors.primary , 
    elevation: 4, // Android shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    // height : 90
  },

  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },

  title: {
    fontSize: 20,
    fontWeight : '500' ,
    color: colors.text, 
  },
  
})
