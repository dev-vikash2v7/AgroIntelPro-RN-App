import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import HomeScreen from './Screens/HomeScreen';
import Header from './Components/Header';

import DiseasePredScreen from './Screens/Crop Model Screens/DiseasePrediction';
import CropRecommendation from './Screens/Crop Model Screens/CropRecommendation';
import FertilizerRecommendation from './Screens/Crop Model Screens/FertilizerRecommendation';

import LogInScreen from './Screens/Auth Screens/LogInScreen';
import SignUpScreen from './Screens/Auth Screens/SignUpScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './Tabs/Home';
import ProfileScreen from './Tabs/Profile';
import NewsScreen from './Tabs/NewsList';
import CustomTabIcon from './Components/CustomTabIcon';
import icons from '../Constants/icons';

   
export default function AppNavigator() {
  
  const Stack = createNativeStackNavigator()
  const Tab = createBottomTabNavigator();

  

  function StackNavigator() {
    return (
      <Stack.Navigator     
        initialRouteName='HomeScreen'
        screenOptions={ {
          headerTitleStyle: {
              fontSize: 15, 
            },
        }}
        > 

      <Stack.Screen 
       name='HomeScreen' 
       component={Home} 
       options={{  header : () => null }}
         />
 
       <Stack.Screen 
       name='DiseasePredScreen' 
       component={DiseasePredScreen} 
       options={{
        headerTitle : 'Crop Disease Prediction'
       }}
        />
 
       <Stack.Screen 
       name='CropRecScreen' 
       component={CropRecommendation} 
       options={{
        headerTitle : 'Best Crop Recommendation'
       }}
        />
 
       <Stack.Screen 
       name='FertilizerRecScreen' 
       component={FertilizerRecommendation} 
       options={{
        headerTitle : 'Best Fertilizer Recommendation',
       
       }}
       />
 
       <Stack.Screen 
       name='SignUp' 
       component={SignUpScreen} 
     />
        
        <Stack.Screen 
       name='LogIn' 
       component={LogInScreen} 
        />
       
    </Stack.Navigator>
 
    );
  }


  function TabNavigator() {
    return (
      <Tab.Navigator 
      screenOptions={{
            header: () => <Header />,

          tabBarStyle:  [
            {
              "display": "flex",
              "height" : 60 ,
            },
            ],
        }}>

      <Tab.Screen
        name="Home"
        component={StackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon iconName={icons.home}  focused={focused} />
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
          tabBarLabel: 'Top News'
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon iconName={icons.user} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  


    );
  }



  return (

<NavigationContainer>
<TabNavigator/>
</NavigationContainer>

  );
}