import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../../constants/theme';
import Button from '../../Components/Button';

const Welcome = () => {

    const navigation = useNavigation()
    
    return (
        <LinearGradient
            style={{
                flex: 1,
                paddingVertical : 10
            }}
            colors={[COLORS.secondary, COLORS.secondary1]}
        >
            <View style={{ flex: 1 }}>

            <View style={{justifyContent:'center' , alignItems:'center'}}> 

                <Text   style= {{fontSize: 25,
                        fontWeight: 600,
                        color: COLORS.white}} > Welcome To</Text>

                  <Text style= {{
                    fontSize: 35,
                        fontWeight: 800,
                        color: COLORS.highlight,
                        fontFamily :'lora_bold'
                        }}>AgroIntel Pro</Text>

                  <Text style= {{
                        fontSize: 15,
                        fontWeight: 400,
                        color: COLORS.white,
                        fontFamily :'lora_bold',
                
                        }}> Grow More ! Worry Less  </Text>
            </View>

                <View style = {{ position: "absolute",
                            top: 60}}>
                    <Image
                        source={require("../assets/hero1.jpg")}
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 20,
                            position: "absolute",
                            top: 10,
                            transform: [
                                { translateX: 20 },
                                { translateY: 50 },
                                { rotate: "-15deg" }
                            ]
                        }}
                    />

                    <Image
                        source={require("../assets/hero3.jpg")}
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 20,
                            position: "absolute",
                            top: 10,
                            left: 130,
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: "-5deg" }
                            ]
                        }}
                    />

                    <Image
                        source={require("../assets/hero3.jpg")}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 20,
                            position: "absolute",
                            top: 130,
                            left: -30,
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: "15deg" }
                            ]
                        }}
                    />

                    <Image
                        source={require("../assets/hero2.jpg")}
                        style={{
                            height: 120,
                            width: 120,
                            borderRadius: 20,
                            position: "absolute",
                            top: 120,
                            left: 130,
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: "-15deg" }
                            ]
                        }}
                    />
                </View>

                {/* content  */}

                <View style={{
                    paddingHorizontal: 22,
                    position: "absolute",
                    top: 350,
                    width: "100%"
                }}>
                    <Text style={{
                        fontSize: 50,
                        fontWeight: 800,
                        color: COLORS.white
                    }}>Let's Get</Text>

                    <Text style={{
                        fontSize: 46,
                        fontWeight: 800,
                        color: COLORS.white
                    }}>Started</Text>

                    <View style={{ marginVertical: 22   , flexDirection:'column'}}>

                        <Text style={{
                            fontSize: 16,
                            color: COLORS.white,
                            marginVertical: 4
                        }}>Get an AI Assistent Support for your farm.</Text>

                        <Text style={{
                            fontSize: 16,
                            color: COLORS.white,
                        }}>Predict Disease , Best Crop and Fertilizers for your Crop.</Text>
                    </View>

                    <Button
                        title="Join Now"
                        onPress={() => navigation.navigate("SignUp")}
                        style={{
                            marginTop: 22,
                            width: "100%"
                        }}
                    />

                    <View style={{
                        flexDirection: "row",
                        marginTop: 12,
                        justifyContent: "center"
                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.white
                        }}>Already have an account ?</Text>

                        <Pressable
                            onPress={() => navigation.navigate("LogIn")}
                            style = {{backgroundColor : 'white' , borderRadius :20 , marginLeft:4 , width : 50 , justifyContent:'center' , alignItems:'center'}}
                        >
                            <Text style={{
                                fontSize: 16,
                                color: COLORS.highlight,
                                fontWeight: 800,
                            }}>Login</Text>
                        </Pressable>

                    </View>
                </View>
            </View>
        </LinearGradient>
    )
}

export default Welcome