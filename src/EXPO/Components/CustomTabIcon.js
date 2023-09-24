import React from 'react';
import { Image, View } from 'react-native';
import icons from '../../Constants/icons';
import colors from '../../Constants/colors';

export default CustomTabIcon = ({ focused, iconName }) => {
    return (
      <View style ={{
backGroundColor : focused ? 'gray' : 'null',
// opcaity : 0.5
        } }>  
      <Image
        source={
          focused
            ?  iconName // Path to the selected icon
            : iconName // Path to the unselected icon
        }
        style={{
          width: 40, // Set the width as per your design
          height: 40, // Set the height as per your design
          // tintColor: focused ? 'blue' : 'gray', // Change the color when selected
        }}
      />
      </View>
    );
  };
  