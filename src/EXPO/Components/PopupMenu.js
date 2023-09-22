import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MenuProvider , Menu , MenuTrigger , MenuOption , MenuOptions } from "react-native-popup-menu";
import {Entypo}   from  '@expo/vector-icons';
import colors from "../../Constants/colors";

const PopupMenu = () => {
 return (
    <MenuProvider style={styles.container}>

    <Menu>
      <MenuTrigger
        customStyles={{
          triggerWrapper: {
            right: 0,
            position:'abosulte',
          },

        }}
      >
            <Entypo  name='dots-three-vertical' size={20} color={colors.text} />

      </MenuTrigger>

      <MenuOptions  style = {styles.menu}>

        <MenuOption 
            onSelect={() => alert(`Save`)} 
            text="Save"
            customStyles={{
                optionWrapper: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                }}}
             />

        <MenuOption onSelect={() => alert(`Delete`)} text="Delete" />
      </MenuOptions>

    </Menu>
  </MenuProvider>
);
};


const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
},

menu : {
    // backgroundColor: colors.primary
}
});
 
export default PopupMenu;
