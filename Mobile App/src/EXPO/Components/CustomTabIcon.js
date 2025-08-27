import React from 'react';
import { Image, View } from 'react-native';
import icons from '../../../constants/icons';
import {COLORS} from '../../../constants/theme';

export default CustomTabIcon = ({ focused, iconName }) => {
    return (
      <View style ={{
        width : 55 ,
        height : 50 , 
backgroundColor : focused ? COLORS.primary : '#fff',
borderRadius : 20 , 
alignItems:'center',
justifyContent:'center', 
elevation: 4,

        } }>  
      <Image
        source={iconName  }
        
        style={{
          width:  40, // Set the width as per your design
          height:  40, // Set the height as per your design
        }}
      />
      </View>
    );
  };
  