import React,{useState} from 'react'
import { View, Text  , StyleSheet , TouchableOpacity   } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {FontAwesome, MaterialIcons} from  '@expo/vector-icons'
import {useDispatch, useSelector} from 'react-redux'


import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../Constants/colors';

export default function Profile(){

  const user = useSelector( state => state.auth.user)
  const nav = useNavigation();
const dispatch = useDispatch();


  return (
    user ? 
    <View style={styles.container}>

    
    <View style = {styles.userView}>
    <FontAwesome name =  'user-circle-o'   size = {50} />
    <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email} </Text>
    </View>


    <View style = {styles.tabView}>

      <TouchableOpacity style={styles.tab}>

        <View style = {{flexDirection:'row'}}>
        <MaterialCommunityIcons name="account-edit" size={24} color="black" />
        <Text style={styles.txt}>Edit Profile</Text>
        </View>

        <MaterialIcons name="navigate-next" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab}>
        <View>
        <MaterialCommunityIcons name="account-edit" size={24} color="black" />
        <Text style={styles.txt}>Saved Address</Text>
        </View>
        <MaterialIcons name="navigate-next" size={24} color="black" />
      </TouchableOpacity>

      
     

    </View>
    


    </View>
    :
    
    <AuthPrompt onClose = {()=>nav.navigate('HomeScreen')} />
  )
}

const styles = StyleSheet.create({
  container : {
    flex:1
  },
  userView : {
marginTop : 20 , 
justifyContent : 'center' ,
alignItems : 'center',
marginBottom : 30 ,
  },
  name: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '400',
    textTransform : 'capitalize',
    color: colors.text,
  },
email :{
  fontSize: 20,
    fontWeight: '400',
    color:colors.text,
},
tabView:{
  marginTop: 5 , 
    marginBottom : 10 , 
    backgroundColor : colors.light_green,
    paddingVertical : 10,
    paddingHorizontal : 5
},

  tab: {
    width: '100%',
    marginTop: 10,
    height: 80,
    borderBottomWidth: 0.3,
    alignSelf: 'center',
    borderBottomColor: '#DBDBDB',
    paddingLeft: 20,
    justifyContent: 'center',
    flexDirection:'row',
justifyContent : 'space-between'

  },

})