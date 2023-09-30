import React,{useState} from 'react'
import { View, Text  , StyleSheet , TouchableOpacity  ,FlatList, ScrollView } from 'react-native'
import {FontAwesome, MaterialIcons ,MaterialCommunityIcons , Entypo} from  '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { useSelector , useDispatch} from 'react-redux'
import {COLORS} from '../../../constants/theme';
import { removeUser } from '../../../Redux/Slices/AuthSlice'
import WelcomeScreen from '../Screens/App Screens/WelcomeScreen';
import icons from '../../../constants/icons';
import { Avatar} from 'react-native-paper';

export default function Profile(){

  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()
  const nav = useNavigation();

const tabData  = [
{
  id : 1 ,
  title : 'Edit Profile' ,
  describe : 'Add or modify name , mobile number ,email',
  icon :()=> <MaterialCommunityIcons name="account-edit-outline" size={30} color="black" />,
  onClick : ()=>{}
},


{
  id : 2 ,
  title : 'Saved Address' ,
  describe : 'Modify address of your farm or home where you want your shoped products to be delivered',
  icon :()=>  <MaterialIcons name="edit-location" size={30} color="black" />,
  onClick : ()=>{}
},



{
  id : 3 ,
  title : 'Security & Privacy' ,
  describe : 'Change account password , payment method',
  icon : ()=><MaterialIcons name="security" size={30} color="black" />,
  onClick : ()=>{}
},
{
  id : 4 ,
  title : 'Manage Notifications' ,
  describe : 'Manage how you want to receive important updates',
  icon : ()=><MaterialIcons name="notifications-none" size={30} color="black" />,
  onClick : ()=>{}
},
{
  id : 5 ,
  title : 'Change Language' ,
  describe : 'Change Language of app',
  icon : ()=><Entypo name="language" size={30} color="black" />,
  onClick : ()=>{}
},
{
  id : 6 ,
  title : 'Logout' ,
  describe : '',
  icon : ()=> <MaterialCommunityIcons name="logout" size={30} color="red" />,
  onClick : ()=>{
    dispatch(removeUser());
    nav.navigate('WelcomeScreen')
  }
},

]

  return (
    user ? 
    <ScrollView>
    <View style={styles.container}>

    <View style = {styles.userView}>
      {user.image ? 
    <FontAwesome name =  'user-circle-o'   size = {50} />
    :
    <Avatar.Image
    style={styles.avatar}
    source={icons.logo}
  />
    }

    <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email} </Text>
    </View>


    <View style = {styles.tabView}>



    <FlatList  
    data={tabData}
    keyExtractor={(item) => item.id}

    renderItem={ ({item,index}) =>
  (  
  <TouchableOpacity style={styles.tab} onPress={() => item.onClick()}>

    <View style = {{flexDirection:'row'}}>

    {item.icon()}

      <View style ={styles.titleView} >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.describe}>{item.describe}</Text>
      </View>
    </View>


    <MaterialIcons name="navigate-next" size={34} color="black" />

  </TouchableOpacity>
)

     }
  />

      
    </View>
    
    </View>
    </ScrollView>
    :
    // <AuthPrompt onClose = {'WelcomeScreen'} />
    // nav.navigate('WelcomeScreen')

    <WelcomeScreen/>
  )
}

const styles = StyleSheet.create({
  container : {
    flex:1,
    marginBottom : 20,
    paddingHorizontal : 10 
  },
  userView : {
marginTop : 20 , 
justifyContent : 'center' ,
alignItems : 'center',
marginBottom : 30 ,
  },
  name: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '400',
    textTransform : 'capitalize',
    color: COLORS.text,
  },
email :{
  fontSize: 20,
    fontWeight: '400',
    color:COLORS.text,
},

tabView:{
    marginBottom : 10 , 
    backgroundColor : COLORS.light_green,
    paddingVertical : 10,
    borderRadius : 5 ,
    justifyContent : 'center' ,
    alignItems : 'center',
    marginHorizontal : 10,
    paddingHorizontal : 10 

},

  tab: {
    marginTop: 10,
    height: 60,
    borderBottomWidth: 0.3,
    borderBottomColor: 'black',
    justifyContent: 'center',
    flexDirection:'row',
    justifyContent : 'space-between',
    alignItems : 'center'
  },

  titleView:{
    marginLeft : 10 ,
    flexDirection :'column' ,
      width : "75%"
    },

  title :{
    fontSize : 15 ,
    fontWeight : '600' ,
  },
  describe : {
    fontSize : 10 ,
    fontWeight : '400' ,
    
  }
  ,
  avatar: {
    margin: 8,
  },



})