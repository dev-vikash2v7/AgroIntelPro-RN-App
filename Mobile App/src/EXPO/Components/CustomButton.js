import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
  } from 'react-native';
  import React from 'react';
  
  const CustomButton = ({bg, title, onClick, color , marginBottom}) => {
    return (
      <TouchableOpacity
        style={[styles.btn, {backgroundColor: bg , marginBottom }]}
        onPress={() => {
          onClick();
        }}>
        <Text style={{color: color, fontSize: 18, fontWeight: '500'}}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };
  
  
  export default CustomButton;
  const styles = StyleSheet.create({
    btn: {
      width: Dimensions.get('window').width - 40,
      height: 53,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 10,
      borderRadius: 10,
      elevation:4
    },
  });