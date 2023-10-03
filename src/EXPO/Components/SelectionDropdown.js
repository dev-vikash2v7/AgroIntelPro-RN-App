import {  StyleSheet } from 'react-native'
import {Dropdown} from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';


export default  SelectionDropdown = ({data , value ,setValue , placeholder , searchText}) => {
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
        placeholder={placeholder}
        searchPlaceholder={searchText}
        value={value}
        onChange={item => {
            setValue(item.value);
        }} 
        // renderLeftIcon={() => (
        //     <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        //   )}
        />
  )
}


const styles = StyleSheet.create({

dropdown: {
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    fontWeight : 500
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 14,

  },
  selectedTextStyle: {
    fontSize: 14,
    fontWeight : 500

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