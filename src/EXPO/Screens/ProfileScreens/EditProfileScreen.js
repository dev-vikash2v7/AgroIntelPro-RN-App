import React, {useDeferredValue, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Modal
} from 'react-native';

import {ActivityIndicator, useTheme} from 'react-native-paper';

import ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons as Icon  , FontAwesome } from '@expo/vector-icons';
import { doc, updateDoc , collection } from "firebase/firestore";

import {   useDispatch, useSelector} from 'react-redux'
import { setUser } from '../../../../Redux/Slices/AuthSlice';
import icons from '../../../../constants/icons';
import { db } from '../../../../firebase_config';
import { useNavigation } from '@react-navigation/native';

const EditProfileScreen = () => {

  const user= useSelector(state => state.auth.user);

  const [image, setImage] = useState('https://api.adorable.io/avatars/80/abott@adorable.png');
  const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [address, setAddress] = useState(user.address);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmit , setIsSubmit] = useState(false)

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
    
  const {colors} = useTheme();

  const navigation = useNavigation()
  const dispatch = useDispatch();


  const handleSubmit =async () => {

    setIsSubmit(true)
    const userDocRef = doc(db, 'Users', user.id);

    console.log(userDocRef)

  await  updateDoc(userDocRef, {name,email,address})
  .then(() => {
    console.log('Document updated successfully');
  })
  .catch((error) => {
    console.error('Error updating document: ', error);
    setIsSubmit(false)

  });

  setIsSubmit(false)

  };





  const takePhotoFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      setErrorMessage('Permission to access camera was denied');
      return
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      setImage(result.assets[0]);

    }
  }


  const choosePhotoFromLibrary =async () => {
    
    // get media permission
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        setErrorMessage('Permission to access media library is required!');
        return;
      } 
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });


  if (!result.canceled) {
    setImage(result.assets[0]);
  }
  }



 const renderInner = () => (

  <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}

      >
    <View style={styles.modalContainer}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => setModalVisible(false)}
        >
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>

    </View>
    </Modal>
  );




  return (
    <View style={styles.container}>

        <View style={{alignItems: 'center' , marginTop : 5}}>


          <TouchableOpacity onPress={toggleModal}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={icons.farmer}
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 15}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
              
            </View>

          </TouchableOpacity>

          <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
            {user.name}
          </Text>


        </View>

      <View style={styles.actionBox}>

        <View style={styles.action}>

          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={(t)=>setName(t)}
            value={name}
          />
        </View> 


        
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={(t)=>setEmail(t)}
            value={email}
          />
        </View>


      
         <View style={styles.action}>
          <Icon name="map-marker-outline" color={colors.text} size={20} />
          <TextInput
            placeholder="Address"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={(t)=>setAddress(t)}
            value={address}
          />
        </View> 

    </View>

{isSubmit ?
 <ActivityIndicator color='orange' size={30}/> 
 :
        <TouchableOpacity style={styles.commandButton} onPress={handleSubmit}>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
        }

        {isModalVisible &&
          renderInner()
        }

    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
 
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  actionBox:{
    paddingLeft : 20,

  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    alignItems:'center',
    justifyContent:'center'
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',

    padding: 20,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
});