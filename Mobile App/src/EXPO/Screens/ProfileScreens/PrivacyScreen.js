
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const PrivacySecurityScreen = () => {
  const handleChangePassword = () => {
    // Implement the logic to change the user's password
  };

  const handleDeleteAccount = () => {
    // Implement the logic to delete the user's account
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Privacy and Security Settings</Text>

      <Button
        title="Change Password"
        onPress={handleChangePassword}
        style={styles.button}
      />

      <Button
        title="Delete Account"
        onPress={handleDeleteAccount}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
  },
});

export default PrivacySecurityScreen;
