import React, { useState    } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,Pressable
} from 'react-native';


import Checkbox from "expo-checkbox"
import { useDispatch } from 'react-redux';
import { useNavigation , StackActions } from '@react-navigation/native';
import { db } from '../../../../firebase_config'; 
import { collection, query, where, getDocs } from "firebase/firestore";
import { ActivityIndicator } from 'react-native-paper'; 
import Toast from 'react-native-toast-message';
import { COLORS } from '../../../../constants/theme';

// import images from '../../../../constants/images';
import { setUser } from '../../../../Redux/Slices/AuthSlice';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Button from '../../Components/Button';


export default LogInScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false); 
  const [isSubmit , setIsSubmit] = useState(false)
  
  const checkCredentials =async  (user)=>{

    try{
    setIsSubmit(true)


    const q = query(collection(db, "Users"), where("email", "==", user.email));

    const querySnapshot = await getDocs(q);

    let email_found = false ;

    querySnapshot.forEach((doc) => {

        const userData = doc.data();
        
        email_found = true
        
        console.log({...userData  , id: doc.id })



      if(userData.password == user.password){

        dispatch(setUser({...userData  , id: doc.id }))
        setEmail('')
        setPassword('')
        setIsSubmit(false)

        navigation.dispatch(StackActions.replace(('MainTabs')))
        
      }
      else{
          setErrorMessage('Password is Incorrect')
      }

    });

    if(!email_found){
        setErrorMessage('Email not found');
    }
}
catch(e){
    Toast.show({ type : 'error' , text1 : 'Login Failed' ,text2 :  'Please Check Your Internet Connect and Try Again.' })
}
    setIsSubmit(false)
};

  const handleLogin = () => {
    if (!email || !password) {
      setErrorMessage('Please enter both username and password');
      return;
    }
    checkCredentials({email,password})
  };



  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>

                <View style={{ marginVertical: 22 }}>

                    <Text style={{ 
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: COLORS.black
                    }}>
                        Hi Welcome Back ! 👋

                  
                        </Text>

                    <Text style={{
                        fontSize: 16,
                        color: COLORS.black
                    }}>Hello again you have been missed!
                    
                    </Text>
                </View>

                

               <View style={{ marginBottom: 12 }}>
                    <Text style={styles.text_label}>Email address</Text>

                    <View style={styles.input_box}>
          <FontAwesome name="envelope-o" color={COLORS.black} size={16} />

                        <TextInput
                            placeholder='Enter your email address'
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            style={styles.input}
                            onChangeText={text => setEmail(text)}
                            value={email}
                            autoCapitalize="none"
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={styles.text_label}>Password</Text>

                    <View style={styles.input_box}>

                    <FontAwesome name="key" color={COLORS.black} size={16} />

                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            style={styles.input}
                            onChangeText={text => setPassword(text)}
                            value={password}
                        />

                       <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.black} />
                                )
                            }
                        </TouchableOpacity> 


                    </View>
                </View>

  

                <View style={{
                    flexDirection: 'row',
                    marginVertical: 6
                }}>
                    <Checkbox
                        style={{ marginRight: 8 }}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? COLORS.secondary : undefined}
                    />

                    <Text>Remenber Me</Text>
                </View>

                 {errorMessage &&
                        <Text style={styles.errorMessage}>{errorMessage}</Text>
                }
                    

                {isSubmit ? 
 <ActivityIndicator size={30} color={COLORS.secondary} style ={{marginTop : 10}}/>
:
                <Button
                    title="Login"
                    filled
                    style={{ 
                        marginTop: 18,
                        marginBottom: 4,
                    }}
                    onPress = {handleLogin}
                />
                }

                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                    <Text style={{ fontSize: 14 }}>Or Login with</Text>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require("../assets/facebook.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text>Facebook</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require("../assets/google.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text>Google</Text>
                    </TouchableOpacity>
                </View> 



                <View style = {{justifyContent:'center' , alignItems:'center'}}>
                    <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Don't have an account ? </Text>

                    <Pressable
                        onPress={() => navigation.navigate("SignUp")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.secondary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Register</Text>
                    </Pressable>
                    </View>

                <TouchableOpacity  onPress={()=>navigation.navigate('MainTabs')}>
                        <Text style={{color:COLORS.secondary, fontWeight : 'bold' , textDecorationLine:'underline' }} >{'Continue as a Guest->'}</Text>
                        </TouchableOpacity>
                </View>
               



            </View> 


        </View>


  )
};






const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    padding : 20,
    backgroundColor : COLORS.background
},


  input: {
    width : '100%',
    marginLeft : 5
  },
  errorMessage: {
    marginTop : 5 ,
    color: 'red',
    marginBottom: 7,
    fontWeight : 'bold'
  },
  loginText :{
    fontSize : 15,
    alignSelf : 'center',
    marginTop:15,
    color  :  '#000',
    fontWeight : '500'

  },
  loginLink:{
    marginLeft : 4,
    textDecorationLine:'underline',
    color : 'blue',
  },
  text_label:{
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 8
},
input_box:{
    width: "100%",
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 22,
    flexDirection:'row'
}

});

