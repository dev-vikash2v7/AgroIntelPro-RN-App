import React from 'react';
import {View, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';


import { StackActions, useNavigation } from '@react-navigation/native';
import {   useDispatch, useSelector} from 'react-redux'
import {COLORS} from '../../../constants/theme';
import { removeUser } from '../../../Redux/Slices/AuthSlice';
import CustomButton from '../Components/CustomButton';

import { MaterialCommunityIcons as Icon, Ionicons } from '@expo/vector-icons';
import icons from '../../../constants/icons';
import WelcomeScreen from '../Screens/Auth Screens/AuthView';



const ProfileScreen = () => {

  const nav = useNavigation();
  const user= useSelector(state => state.auth.user);
  const dispatch = useDispatch()  
  
  

  const myCustomShare = async() => {

    // const shareOptions = {
    //   // message: 'Order your next meal from FoodFinder App. I\'ve already ordered more than 10 meals on it.',
    //   url: icons.appLogo,
    //   // urls: [files.image1, files.image2]
    // }
    // try {
    //   await Share.shareAsync(shareOptions);
    // } catch (error) {
    //   console.error('Sharing failed:', error);
    // }
  };

  return (
    !user ? 
    <WelcomeScreen/>
        :
    <ScrollView style={styles.container}>

      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image 
            source={icons.farmer}
            size={80}
          />

          <View style={{marginLeft: 20}}>

            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>
            {user.name}
            </Title>

            <Caption style={styles.caption}>
            {user.email}
            </Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}> {user.address}</Text>
        </View>
      
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}> {user.email}</Text>
        </View>

      </View>


      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>₹0</Title>
            <Caption>Wallet</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>0</Title>
            <Caption>Orders</Caption>
          </View>
      </View>




      <View style={styles.menuWrapper}>

        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="heart-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Your Favorites</Text>
          </View>
        </TouchableRipple>


        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Payment</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={myCustomShare}>
          <View style={styles.menuItem}>
            <Icon name="share-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Tell Your Friends</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Ionicons name="settings-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
      </View> 

        <CustomButton
          title={ 'Logout'}
          bg = {COLORS.error}
          onClick={()=>{
            dispatch(removeUser());
            nav.navigate('Welcome')

            nav.dispatch(StackActions.replace(('LogIn')))

          }}
        />

    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});