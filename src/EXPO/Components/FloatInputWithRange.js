import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const FloatInputWithRange = ({ placeholder ,  label, value, minValue, maxValue, onChange  }) => {

  const [isValid, setIsValid] = useState(true);

  // Regular expression to match floating-point numbers
  const floatRegex = /^-?\d*(\.\d*)?$/;

  const handleTextChange = (text) => {
    if (floatRegex.test(text)) {
      const floatValue = parseFloat(text);
      if (floatValue >= minValue && floatValue <= maxValue) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } else {
      setIsValid(false);
    }
    onChange(text);
  };

  return (
    <>
    <View style={styles.container}>
      <Text>{label}:</Text>
      <TextInput
        placeholder={placeholder}
        style={ [styles.input ,  isValid ? styles.validInput : styles.invalidInput]}
        onChangeText={handleTextChange}
        value={value}
        keyboardType="numeric"
      />
    </View>
      {!isValid && <Text style={styles.errorText}>Invalid input. Please enter a valid number.</Text>}
    </>
  );
};

const styles = StyleSheet.create({

  container :{
      flexDirection : 'row' ,
      alignItems : 'center',
  },

    input : {
    borderBottomWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    marginLeft : 10 
    },

  validInput: {
    borderColor: 'green',
  },
  invalidInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
});

export default FloatInputWithRange;
