import { useState , useEffect } from 'react';
import { Text ,View, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Header from './Components/Header';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import {COLORS} from '../../constants/theme';
import icons from '../../constants/icons';
import Toast from 'react-native-toast-message';

import { useDispatch } from 'react-redux';



import ProfileScreen from './Tabs/ProfileTab';

import DiseasePredictionOnline from './Screens/Crop Model Screens/DiseasePredictionOnline';
import DiseasePredictionOffline from './Screens/Crop Model Screens/DiseasePredictionOffline';

import FertilizerRecommendation from './Screens/Crop Model Screens/FertilizerRecommend';
import LogInScreen from './Screens/Auth Screens/LogInScreen';
import SignUpScreen from './Screens/Auth Screens/SignUpScreen';
import CropRecommendation from './Screens/Crop Model Screens/CropRecommend';
import Home from './Tabs/HomeTab';
import NewsScreen from './Tabs/NewsTab';
import CustomTabIcon from './Components/CustomTabIcon';
import MyFarm from './Screens/Crop Model Screens/MyFarm';
import FarmStore from './Screens/Crop Model Screens/FarmStore';
import FarmCommunity from './Screens/Crop Model Screens/FarmCommunity';
import DiseasePredResult from './Screens/Crop Model Screens/DiseasePredResult';
import FertilizerResult from './Screens/Crop Model Screens/FertilizerResult';
import RecommendCropResult from './Screens/Crop Model Screens/RecommendCropResult';
import EditProfileScreen from './Screens/ProfileScreens/EditProfileScreen';
import PrivacySecurityScreen from './Screens/ProfileScreens/PrivacyScreen';
import { setUser } from '../../Redux/Slices/AuthSlice';

import WelcomeScreen from './Screens/Auth Screens/WelcomeScreen';
import ForgotPwdScreen from './Screens/Auth Screens/ForgotPwdScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator();


export default function AppNavigator() {
  
  const [isUser , setIsUser] = useState(false)
  const dispatch = useDispatch()  
  

  useEffect(()=>{
  AsyncStorage.getItem('user')
  .then(user =>{
            setIsUser(true);
            dispatch(setUser(JSON.parse(user)))
  })
      setIsUser( false)
  }, [])


 


  function HomeStackNavigator() {
    return (
      <Stack.Navigator     
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
       name='DiseasePredOnline' 
       component={DiseasePredictionOnline} 
       options={{
        title : 'Crop Disease Prediction'
       }}
        />

       <Stack.Screen 
       name='DiseasePredOffline' 
       component={DiseasePredictionOffline} 
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
       component={ MyFarm } 
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
       component={FarmCommunity } 
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

      

    </Stack.Navigator>
 
    );
  }


  function AuthStack() {
    return (
      <Stack.Navigator  initialRouteName='Welcome'> 

      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{headerShown:false}} 
      />
      
      <Stack.Screen 
       name='SignUp' 
       component={SignUpScreen } 
       options={{headerShown:false}} 

     />
     
      <Stack.Screen 
      name = 'ForgotPwdScreen'
       component={ForgotPwdScreen} 
       options={{headerShown:false}} 

       />

        <Stack.Screen 
       name='LogIn' 
       component={ LogInScreen } 
       options={{headerShown: false}}
        />
        </Stack.Navigator>
        )
    }

  function ProfileStack() {
    return (
      <Stack.Navigator initialRouteName='ProfileScreen'>

        <Stack.Screen 
       name='ProfileScreen' 
       component={ProfileScreen } 
       options={{headerShown :false}}
     />

       

        <Stack.Screen 
      name="EditProfileScreen" 
      component={EditProfileScreen} 
      options={{
        title : 'Edit Account',
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
        component={HomeStackNavigator}
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
        component={ ProfileStack }
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

<NavigationContainer >

<Stack.Navigator  initialRouteName={isUser ?  'MainTabs' : 'Auth' }>

      <Stack.Screen
        name="Auth"
        component={AuthStack}
        options={{ headerShown: false }} 
      />

      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
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
