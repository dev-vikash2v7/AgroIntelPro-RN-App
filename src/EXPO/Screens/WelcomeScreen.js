import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import icons from '../../Constants/icons';
import { useNavigation } from '@react-navigation/native';


const WelcomeScreen = ({ navigation }) => {
  const navigation = useNavigation()


  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={icons.logo}
        style={styles.logo}
      />

      <Text style={styles.appName}>AgroIntel Pro</Text>

      <Text style={styles.slogan}>Grow More , Worry Less !</Text>

      {/* Authentication Buttons */}
      <Button
        title="Login"
        onPress={()=> navigation.navigate('LogIn')}
        buttonStyle={styles.button}
      />
      <Button
        title="Register"
        onPress={()=> navigation.navigate('SignUp')}
        buttonStyle={[styles.button, { backgroundColor: 'gray' }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  slogan: {
    fontSize: 16,
    marginBottom: 30,
  },
  button: {
    width: 200,
    backgroundColor: 'blue',
    marginTop: 10,
  },
});

export default WelcomeScreen;
