import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const PopupMenu = () => {
  const [isVisible, setIsVisible] = useState(false);

  const showMenu = () => {
    setIsVisible(true);
  };

  const hideMenu = () => {
    setIsVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={showMenu}>
        <Text>Show Menu</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={isVisible}
        onRequestClose={hideMenu}
      >
        <View style={styles.modalContainer}>

          <TouchableOpacity onPress={hideMenu}>
            <Text>Setting</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={hideMenu}>
            <Text>About Us</Text>
          </TouchableOpacity>

        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default PopupMenu;
