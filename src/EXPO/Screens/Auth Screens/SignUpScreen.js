import { View, Text, Image, Pressable, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../../../constants/theme';

import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../../Components/Button';
import AsyncStorage from '@react-native-community/async-storage';

import { useNavigation } from '@react-navigation/native';
import {useDispatch }  from 'react-redux'
import { collection,addDoc} from "firebase/firestore";

import { db } from '../../../../firebase_config'; 
import { setUser } from '../../../../Redux/Slices/AuthSlice';
import images from '../../../../constants/images';
import Toast from 'react-native-toast-message';
import { ActivityIndicator } from 'react-native-paper';


const Signup = ({navigation}) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmit , setIsSubmit] = useState(false)

    // const navigation = useNavigation();
    const dispatch = useDispatch();

    const  registerUser = async ( data  )=>{
        setIsSubmit(true)
      
           try{
           const docRef =  await addDoc(collection(db, "Users"), data);
            // console.log("Document written with ID: ", docRef.id);
            dispatch(setUser(data))
            AsyncStorage.setItem('user', JSON.stringify(data));
            navigation.navigate('MainTabs');
          }
          catch (e) {
              Toast.show({ type : 'error' , text1 : 'Signup Failed' ,text2 :  'Please check your credentials and try again.' })
            }
          setIsSubmit(false)
      }
      
      
        const handleSignup = () => {
          if (!name || !email || !password || !confirmPassword) {
            Toast.show({ type : 'error' , text1 : 'Signup Failed' ,text2 :  'Enter  all details'})
            setErrorMessage('Please fill in all fields');
            return;
          }
      
          if (password !== confirmPassword) {
            Toast.show({ type : 'error' , text1 : 'Signup Failed' ,text2 :  'Password do not match.'})
            setErrorMessage('Passwords do not match');
            return;
          }
          registerUser({name, email, password})
        };
      
        
      
  
    return (
        <ScrollView style={styles.container}>

            <View style={{ flex: 1, marginHorizontal: 22 }}>

                <View style={  { marginTop: 5 , marginBottom : 10 }}>

                    <View style = {{alignItems:'center' , flexDirection:'row',justifyContent :'space-between'}}>

                    <Text style={{

                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: COLORS.black
                    }}>
                        Create Account
                    </Text>

                    < TouchableOpacity style= {{marginLeft : 10 ,position :'relative' , right : 0}} onPress={()=>navigation.navigate('MainTabs')}>
                        <Text style={{color:COLORS.secondary, fontWeight : 'bold' , textDecorationLine:'underline' }} >{'Continue as a Guest->'}</Text>
                        </TouchableOpacity>


                    </View>

                    <Text style={{
                        fontSize: 16,
                        color: COLORS.black
                    }}>Connect with your friend today!</Text>
                </View>


                      {/* Name Input */}
                <View style={ styles.inputBox}>

                    <Text style={styles.label_text}>Your Name</Text>

                    <View style={styles.input_view}>
                        <TextInput
                            placeholder='Enter your name.'
                            placeholderTextColor={COLORS.black}
                            style={{
                                width: "100%"
                            }}
                            onChangeText={text => setName(text)}
                            value={name}
                        />
                    </View>
                </View>


                <View style={ styles.inputBox}>
                    <Text style={styles.label_text}>Email address</Text>

                    <View style={styles.input_view}>
                        <TextInput
                            placeholder='Enter your email address'
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            style={{
                                width: "100%"
                            }}
                            onChangeText={text => setEmail(text)}
                            value={email}
                        />
                    </View>
                </View>

                

                <View style={ styles.inputBox}>
                    <Text style={styles.label_text}>Password</Text>

                    <View style={styles.input_view}>
                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            onChangeText={text => setPassword(text)}
                            value={password}
                            style={{
                                width: "100%"
                            }}
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

                <View style={styles.inputBox}>
                    <Text style={styles.label_text}>Confirm Password</Text>

                    <View style={styles.input_view}>
                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            onChangeText={text => setConfirmPassword(text)}
                            value={confirmPassword}
                            style={{
                                width: "100%"
                            }}
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

                    <Text>I aggree to the terms and conditions</Text>
                </View>

                {errorMessage &&
        <Text style={styles.errorMessage}>{errorMessage}</Text>
       }

      </View>

      {isSubmit ? 
 <ActivityIndicator size={30} color={COLORS.secondary} style ={{marginTop : 10}}/>
:

                <Button
                    title="Sign Up"
                    filled
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                        marginHorizontal : 20
                    }}
                    onPress = {handleSignup}
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
                    <Text style={{ fontSize: 14 }}>Or Sign up with</Text>
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

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Already have an account</Text>
                    <Pressable
                        onPress={() => navigation.navigate("LogIn")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.secondary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Login</Text>
                    </Pressable>
            </View>
            
        </ScrollView>
    )
}

export default Signup;



const styles = StyleSheet.create({
  container:{
      flex: 1,
       backgroundColor: COLORS.white 
    },
label_text:{
  fontSize: 16,
  fontWeight: '400',
  marginVertical: 5
}
    ,

logo:{
width : 60 ,
height : 60 ,
alignItems : 'center',
marginTop : 15 ,
    resizeMode: 'cover',
},


  inputBox: {
     marginBottom: 8 
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
  input_view :{
    width: "100%",
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 22
}
});

