import { Text , StyleSheet} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Header from './Components/Header';

import DiseasePredScreen from './Screens/Crop Model Screens/DiseasePrediction';
import CropRecommendation from './Screens/Crop Model Screens/CropRecommend';
import FertilizerRecommendation from './Screens/Crop Model Screens/FertilizerRecommend';

import LogInScreen from './Screens/Auth Screens/LogInScreen';
import SignUpScreen from './Screens/Auth Screens/SignUpScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './Tabs/Home';
import ProfileScreen from './Tabs/Profile';
import NewsScreen from './Tabs/NewsList';
import CustomTabIcon from './Components/CustomTabIcon';
import icons from '../Constants/icons';
import MyFarm from './Screens/Crop Model Screens/MyFarm';
import FarmStore from './Screens/Crop Model Screens/FarmStore';
import FarmCommunity from './Screens/Crop Model Screens/FarmCommunity';
   
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
       }}/>


       <Stack.Screen 
       name='MyFarm' 
       component={MyFarm} 
       options={{
        headerTitle : 'Your Farm',
       }}/>


       <Stack.Screen 
       name='FarmStore' 
       component={FarmStore} 
       options={{
        headerTitle : 'Farmers Store',
       }}/>


       <Stack.Screen 
       name='FarmCommunity' 
       component={FarmCommunity} 
       options={{
        headerTitle : 'Community of Farmers',
       }}/>
 

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

          tabBarStyle:  
            {
              "display": "flex",
              "height" : 80 ,
              "alignItems" : 'center',
              "marginBottom" : 4
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
    color: 'blue', // Set the text color for the focused tab
  },
});
