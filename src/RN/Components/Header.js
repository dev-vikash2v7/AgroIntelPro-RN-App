import React from 'react'
import { View, Text , StyleSheet  , Dimensions , TouchableOpacity, Image } from 'react-native'
import Entypo   from 'react-native-vector-icons/Entypo';
import PopupMenu from './PopupMenu';
import colors from '../../Constants/colors';

const { width} = Dimensions.get('window');

export default function Header() {
  return (
    <View style = {styles.header}> 

           <Image
        source={require('../../assets/icon.png')} // Replace with the path to your logo
        style={styles.logo}
      />

      <Text style={styles.title}>AgroAid</Text>

      <TouchableOpacity onPress={() => <PopupMenu/> }>
        <Entypo  name='dots-three-vertical' size={20} color={colors.text}/>
      </TouchableOpacity>

    </View>
  );
}




const styles = StyleSheet.create({
  header : {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor:colors.primary , 
    elevation: 4, // Android shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    height  : 80
  },

  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },

  title: {
    fontSize: 24,
    fontWeight : '600' ,
    color: colors.text, 
  },
  
})
