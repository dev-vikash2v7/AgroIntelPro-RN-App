import React , {useState , useEffect } from 'react';
import { View  , StyleSheet   ,Text , TouchableOpacity, Image  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Home from './Tabs/Home';
import Profile from './Tabs/Profile';
import colors from '../../Constants/colors';
import icons from '../../Constants/icons';

export default function  HomeScreen() {
  const [selectedTab , setSelectedTab] =  useState('Home')

  return (
    <View style={styles.container}>

    { 
    selectedTab == 'Profile' ? <Profile/> :
    selectedTab == 'Community' ? <Community/> :
     <Home/>
      }
        <View style={styles.bottomView }>

            <TouchableOpacity  style={styles.bottomTab}      onPress={() => {    setSelectedTab('Home');  }} >
              <Image source={ icons.home} style={styles.icon }  resizeMode='cover'/>
              </TouchableOpacity>

            <TouchableOpacity  style={styles.bottomTab}  onPress={() => {    setSelectedTab('Community');  }}>
              <Image source={ icons.community} style={styles.icon } resizeMode='cover' />
            </TouchableOpacity>

            <TouchableOpacity  style={styles.bottomTab}  onPress={() => {    setSelectedTab('Profile');  }}>
              <Image source={ icons.user} style={styles.icon }  resizeMode='cover'/>
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
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor:colors.primary
  },
  bottomTab : {
      width: '20%',
    height: '100%',
    alignItems: 'center',
    marginTop : 20
  },
  icon : {
    width : 40 , 
    height : 40 
  }
});

