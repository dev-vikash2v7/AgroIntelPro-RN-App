import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const FloatInputWithRange = ({ placeholder ,  label, value, minValue, maxValue, onChange , check }) => {

  const [isValid, setIsValid] = useState(true);

  // Regular expression to match floating-point numbers
  const floatRegex = /^-?\d*(\.\d*)?$/;

  const handleTextChange = (text) => {
    if (floatRegex.test(text)) {
      const floatValue = parseFloat(text);
      if (floatValue >= minValue && floatValue <= maxValue) {
        onChange(text); 
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } else {
      setIsValid(false);
    }    
  };

  return (
    <View>
      <Text>{label}:</Text>
      <TextInput
        placeholder={placeholder}
        style={ [styles.input ,  isValid ? styles.validInput : styles.invalidInput]}
        onChangeText={handleTextChange}
        value={value}
        keyboardType="numeric"
      />
      {!isValid && <Text style={styles.errorText}>Invalid input. Please enter a valid number.</Text>}
    </View>
  );
};

const styles = StyleSheet.create({

    input : {

    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
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
