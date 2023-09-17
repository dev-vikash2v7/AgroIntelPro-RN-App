import React,{useState} from 'react'
import { View, Text  , StyleSheet , TouchableOpacity   } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {useDispatch, useSelector} from 'react-redux'

export default function Profile(){

  const user = useSelector( state => state.auth.user)
  const nav = useNavigation();
  const [modelVisible , setModelVisible] = useState(  true );
const dispatch = useDispatch();



  return (
    user ? 
    <View style={styles.container}>

    
    <View>
    <FontAwesome name =  'user-circle-o'   size = {50} style = {styles.profileIcon} />
    <Text style={styles.name}>{user.name}</Text>
      <Text style={[styles.name, {fontSize: 16, marginTop: 0}]}>{user.email} </Text>
</View>



    <View style = {{marginTop: 5 , marginBottom : 10}}>
      <TouchableOpacity style={styles.tab}>
        <Text style={styles.txt}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tab}
        onPress={() => {
          
        }}>
        <Text style={styles.txt}>Orders</Text>
      </TouchableOpacity>

      <TouchableOpacity   style={styles.tab}>
        <Text style={styles.txt}>Address</Text>
      </TouchableOpacity>

      <TouchableOpacity   style={styles.tab}>
        <Text style={styles.txt}>Payment Methods</Text>
      </TouchableOpacity>

      <TouchableOpacity
          style={styles.tab}
        onPress={() => {
          dispatch(removeUser())
          nav.navigate('Main')
        }}>
        <Text style={styles.txt}>Log out</Text>
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
  profileIcon : {
    alignSelf : 'center' ,
     marginTop : 20,
     color : '#0786DAFD'
  },
  name: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  tab: {
    width: '90%',
    marginTop: 10,
    height: 50,
    borderBottomWidth: 0.3,
    alignSelf: 'center',
    borderBottomColor: '#DBDBDB',
    paddingLeft: 20,
    justifyContent: 'center',
  },
  txt: {
    color: '#000',
  },
})