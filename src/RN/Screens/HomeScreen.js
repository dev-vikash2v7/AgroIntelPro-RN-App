import React , {useState , useEffect } from 'react';
import { View  , StyleSheet   ,Text , TouchableOpacity  } from 'react-native';
import Ionicons   from 'react-native-vector-icons/Ionicons';
import Home from './Tabs/Home';
import Profile from './Tabs/Profile';

export default function  HomeScreen() {
  const [selectedTab , setSelectedTab] =  useState('Home')

  return (
    <View style={styles.container}>

    { 
    selectedTab == 'Profile' ? <Profile/> :
     <Home/>
      }
      
        <View style={[styles.bottomView ]}>

            <TouchableOpacity  style={styles.bottomTab}      onPress={() => {    setSelectedTab('Home');  }} >
              <Ionicons name={selectedTab == 'Home' ? 'home': "home-outline"} size={20} style={styles.icon } />
              </TouchableOpacity>

            <TouchableOpacity  style={styles.bottomTab}  onPress={() => {    setSelectedTab('Profile');  }}>
                <Ionicons name={selectedTab == 'Profile' ? 'person': "person-outline"}  size={20}  style={styles.icon} />
            </TouchableOpacity>

        </View> 

    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flex:1
  },
  bottomView:{
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor:'#fffaaa'
  },
  bottomTab : {
      width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',

  },
  icon : {
    color : '#000'

  }
});

