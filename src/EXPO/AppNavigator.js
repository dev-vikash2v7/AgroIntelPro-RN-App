import { useSelector } from 'react-redux';
import { Text ,View, StyleSheet ,Keyboard, KeyboardAvoidingView, Platform} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Header from './Components/Header';
import DiseasePredScreen from './Screens/Crop Model Screens/DiseasePrediction';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {COLORS} from '../../constants/theme';
import { useEffect } from 'react';
import { useState } from 'react';
import icons from '../../constants/icons';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';


import FertilizerRecommendation from './Screens/Crop Model Screens/FertilizerRecommend';
import LogInScreen from './Screens/Auth Screens/LogInScreen';
import SignUpScreen from './Screens/Auth Screens/SignUpScreen';
import CropRecommendation from './Screens/Crop Model Screens/CropRecommend';
import Home from './Tabs/HomeTab';
import ProfileScreen from './Tabs/ProfileTab';
import NewsScreen from './Tabs/NewsTab';
import CustomTabIcon from './Components/CustomTabIcon';
import MyFarm from './Screens/Crop Model Screens/MyFarm';
import FarmStore from './Screens/Crop Model Screens/FarmStore';
import FarmCommunity from './Screens/Crop Model Screens/FarmCommunity';
import DiseasePredResult from './Screens/Crop Model Screens/DiseasePredResult';
import WelcomeScreen from './Screens/Auth Screens/WelcomeScreen';
import FertilizerResult from './Screens/Crop Model Screens/FertilizerResult';
import RecommendCropResult from './Screens/Crop Model Screens/RecommendCropResult';
import EditProfileScreen from './Screens/ProfileScreens/EditProfileScreen';
import PrivacySecurityScreen from './Screens/ProfileScreens/PrivacyScreen';
import SplashScreen from './Screens/SplashScreen';
import { setUser } from '../../Redux/Slices/AuthSlice';
import AsyncStorage from '@react-native-community/async-storage';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator();


export default function AppNavigator() {
  
  const user = useSelector(state => state.auth.user)
  const [isUser , setIsUser] = useState(false)
  const [navigation , setNavigation] = useState('HomeScreen')
  const dispatch = useDispatch()  
  

  // const toastConfig = {
  //   success: ({type ,  text1, text2 ,  ...rest }) => (

  //     <View style={styles.toast}>
  //               {console.log( "ssssssssssssss : " , text1 , '------------ ' , rest)}


  //       <Text style={styles.toastText}>{text1}</Text>
  //     </View>
  //   ),

  //   failure: ({ text1, ...rest }) => (
  //     <View style={styles.toast }>
  //       {console.log(text1 , rest)}
  //       <Text style={styles.toastText}>{text1}</Text>
  //     </View>
  //   ),

  //   error: ({ text1, ...rest }) => (
  //     <View style={styles.toast }>
  //       {console.log( "errorroror " , text1 , '------------ ' , rest)}
  //       <Text style={styles.toastText}>{text1}</Text>
  //     </View>
  //   ),
  // };

  

  useEffect(()=>{
      setIsUser( user ? true : false)
  }, [user])

 
  useEffect(() => {
    
      AsyncStorage.getItem('user').then((user) =>
      {
        console.log(user);
        if(user) {
            dispatch(setUser(JSON.parse(user)))
        }
        setNavigation(user === null ? 'WelcomeScreen' : 'HomeScreen' )
      }
      );
  }, []);



  function StackNavigator() {
    return (
      <Stack.Navigator     
        initialRouteName={navigation}
        screenOptions={ {
            headerStyle: {
              backgroundColor: '#307ecc', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color

            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
              fontSize: 15, 
            },
            
        }}
        > 

     

      <Stack.Screen 
       name='HomeScreen' 
       component={Home} 
       options={{  headerShown : false}}
         />
 
       <Stack.Screen 
       name='DiseasePredScreen' 
       component={DiseasePredScreen} 
       options={{
        title : 'Crop Disease Prediction'
       }}
        />
      

       <Stack.Screen 
       name='CropRecScreen' 
       component={CropRecommendation} 
       options={{
        title : 'Best Crop Recommendation'
       }}
        />
 
       <Stack.Screen 
       name='FertilizerRecScreen' 
       component={FertilizerRecommendation} 
       options={{
        title : 'Best Fertilizer Recommendation',
       }}/>


       <Stack.Screen 
       name='MyFarm' 
       component={isUser ?  MyFarm : WelcomeScreen} 
       options={{
        title : 'Your Farm',
       }}/>


       <Stack.Screen 
       name='FarmStore' 
       component={ FarmStore} 
       options={{
        title : 'Farmers Store',
       }}/>


       <Stack.Screen 
       name='FarmCommunity' 
       component={isUser ? FarmCommunity : WelcomeScreen} 
       options={{
        title : 'Community of Farmers',
       }}/>


       <Stack.Screen 
       name='DiseasePredResult'  
       component={DiseasePredResult} 
       options={{
        title : 'Disease Details',
       }}/>
 

       <Stack.Screen 
       name='SignUp' 
       component={SignUpScreen } 
       options={{
        title: 'Register', //Set Header Title
      }}
     />
     
        <Stack.Screen 
       name='LogIn' 
       component={LogInScreen } 
       options={{headerShown: false}}
        />

        <Stack.Screen 
       name='WelcomeScreen' 
       component={WelcomeScreen } 
       options={{headerShown: false}}
        />

        <Stack.Screen 
       name='FertilizerResult' 
       component={FertilizerResult} 
       options={{
        title : 'Best Fertlizer ',
       }}
        />

        <Stack.Screen 
       name='RecommendCropResult' 
       component={RecommendCropResult} 
       options={{
        title : 'Recommend Crop To Use ',
       }}
        />

      <Stack.Screen 
      name="EditProfile" 
      component={EditProfileScreen} 
      options={{
        title : 'Edit Profile',
       }}
      />

      <Stack.Screen 
      name="Privacy" 
      component={PrivacySecurityScreen} 
      options={{
        title : 'Privacy & Security',
       }}
      />

    </Stack.Navigator>
 
    );
  }


  function TabNavigator() {
   
  
    return (
      
      <Tab.Navigator 
      screenOptions={{
        tabBarHideOnKeyboard:true,
        header: () => <Header />,
        
        tabBarStyle:  
        {
          "display": "flex",
          "height" : 80 ,
          "alignItems" : 'center',
          "marginBottom" : 4,
        },
      }}>

    
      <Tab.Screen
        name="Home"
        component={StackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon iconName={icons.home}  focused={focused} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
              Home
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon iconName={icons.news} focused={focused} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
              Top News
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon iconName={icons.user} focused={focused} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
              Profile
            </Text>
          ),
        }}
      />
    
    </Tab.Navigator>  
    );
  }



  return (

<NavigationContainer>
<TabNavigator/>
<Toast />

</NavigationContainer>

  );
}

const styles = StyleSheet.create({
  tabLabel: {
    color: 'black', // Set your desired text color
    fontSize: 12, // Set your desired font size
    fontWeight: 'bold', // Set font weight if needed
    marginBottom : 4
  },
  tabLabelFocused: {
    color: COLORS.primary, // Set the text color for the focused tab
  },
  toast:{
 justifyContent :'center' ,
 alignItems:'center' ,
 width:  100 ,
 height : 80 ,
 padding: 1,
 backgroundColor : 'lightgreen',
 alignSelf:'center'
  },
  toastText : {
    fontSize : 16 , 
    // fontWeight:'bold'
  }
});
