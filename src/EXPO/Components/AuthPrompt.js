import {
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  View,
} from 'react-native';
import React, {  useState } from 'react';
import {Entypo} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';


const AuthPrompt = () => {

  const nav = useNavigation();
  const [modelVisible , setModelVisible] = useState(  true );


  return (
    <Modal visible={modelVisible} transparent>
      <View style={styles.modalView}>

        <View style={styles.modalMain}>
  
          <TouchableOpacity 
          style={styles.btn}
          onPress={() => {setModelVisible(false) ;nav.navigate('LogIn')}}>
            <Text style={styles.btnText}>{"Log In"}</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={[styles.btn , {marginTop:15}]}
            onPress={() => { setModelVisible(false) ;nav.navigate('SignUp')}}>
            <Text style={styles.btnText}>{"Create Account"}</Text>
          </TouchableOpacity>

        </View>

      </View>

       <TouchableOpacity style={styles.crossBtn} onPress={() => {setModelVisible(false) ; nav.navigate('HomeScreen')}}>
          <Entypo name ='circle-with-cross' size = {25} color = '#000'/>
        </TouchableOpacity>

    </Modal>
  );
};

export default AuthPrompt

const styles = StyleSheet.create({
  modalView: {
    width: Dimensions.get('window').width ,
    height: Dimensions.get('window').height ,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent : 'center' ,
    alignItems : 'center',
    position:'absolute' ,
    top :0 
  },
   modalMain: {
    width:'90%',
    height: 200,
    backgroundColor: '#fff',
    borderRadius : 10,
    paddingVertical :  20 ,
    paddingHorizontal : 5
  },
  btn: {
    width: '90%',
    height: 50,
    backgroundColor : 'orange',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    alignItems :'center',
  },
  btnText: { 
    color: "#fff",
     fontSize: 18, 
     fontWeight: '500' 
     },

     crossBtn:{
       position : 'absolute' ,
       top : 200 ,
       right : 8
     },

});
