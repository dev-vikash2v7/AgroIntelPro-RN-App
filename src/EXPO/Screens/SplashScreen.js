import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image
} from 'react-native';
import { useDispatch } from 'react-redux';

import AsyncStorage from '@react-native-community/async-storage';
import images from '../../../constants/images';
import icons from '../../../constants/icons';
import { setUser } from '../../../Redux/Slices/AuthSlice';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      AsyncStorage.getItem('user').then((user) =>
      {

        console.log(user);
        if(user) {
            dispatch(setUser(JSON.parse(user)))
        }
          navigation.navigate(
            user === null ? 'WelcomeScreen' : 'HomeScreen'
              )
      }
      );
    }, 50000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={icons.logo}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#307ecc',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});