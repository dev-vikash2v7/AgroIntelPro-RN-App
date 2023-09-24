import React from 'react';
import { Image, View } from 'react-native';
import icons from '../../Constants/icons';
import colors from '../../Constants/colors';

export default CustomTabIcon = ({ focused, iconName }) => {
    return (
      <View style ={{
        width : 55 ,
        height : 50 , 
backgroundColor : focused ? colors.light_green : 'null',
opcaity : 0.5,
borderRadius : 5 , 
alignItems:'center',
justifyContent:'center'
        } }>  
      <Image
        source={iconName  }
        
        style={{
          width: 40, // Set the width as per your design
          height: 40, // Set the height as per your design
        }}
      />
      </View>
    );
  };
  