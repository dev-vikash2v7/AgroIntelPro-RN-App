import React from 'react';
import { Image } from 'react-native';
import icons from '../../Constants/icons';
import colors from '../../Constants/colors';

export default CustomTabIcon = ({ focused, iconName }) => {
    return (
      <Image
        source={
          focused
            ?  iconName // Path to the selected icon
            : iconName // Path to the unselected icon
        }
        style={{
          width: 30, // Set the width as per your design
          height: 30, // Set the height as per your design
          // tintColor: focused ? 'blue' : 'gray', // Change the color when selected
        }}
      />
    );
  };
  