import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet ,Keyboard} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';


const SearchBar = ({ onSearch }) => {

    const [searchText, setSearchText] = useState('');

    useEffect(()=>{
        onSearch(searchText);
    }, [searchText]);


    return (
      <View style={styles.container}>

        <TouchableOpacity  style={styles.iconContainer}>
          <Ionicons name="search" size={20} color="black" />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Search products ..."
          onChangeText={text => setSearchText(text)}
          value={searchText}
          placeholderTextColor={ '#000'}
        />

        <TouchableOpacity onPress={()=>  setSearchText('') } style={ [styles.iconContainer , {display: searchText ? 'block' : 'none'} ]}>
          <Entypo name="cross" size={24} color="black" />
        </TouchableOpacity>


      </View>
    );
  
  }
  
  export default SearchBar ;


  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#e0e0e0',
      borderRadius: 8,
      paddingHorizontal: 10,
      marginHorizontal: 10,
      marginTop: 10,
    },
    input: {
        color : '#000' ,
      flex: 1,
      paddingVertical: 10,
    },
    iconContainer: {
      padding: 10,
    },
  });