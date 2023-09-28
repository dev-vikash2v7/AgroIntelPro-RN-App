import { View, StyleSheet } from 'react-native'
import React from 'react'
import {Dropdown} from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';


export default  SelectionDropdown = ({data , value ,setValue}) => {
  return (
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select crop type"
        searchPlaceholder="Search crop type..."
        value={value}
        onChange={item => {
            setValue(item.value);
        }} 
        renderLeftIcon={() => (
            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
          )}
        />
  )
}


const styles = StyleSheet.create({

dropdown: {
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
})