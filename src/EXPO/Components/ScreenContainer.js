import React from 'react';
import { View, StyleSheet } from 'react-native';

const ScreenContainer = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue', // Set your desired background color
  },
});

export default ScreenContainer;
