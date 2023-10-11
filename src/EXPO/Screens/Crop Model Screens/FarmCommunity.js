import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity , TextInput } from 'react-native';
import { COLORS } from '../../../../constants/theme';
import { useSelector } from 'react-redux';
import WelcomeScreen from '../Auth Screens/AuthView';




const FarmersCommunity = () => {

  const user = useSelector(state => state.auth.user)



  const communityPosts = [
    {
      id: 1,
      user: 'Vikas Verma',
      postText:  'Just harvested my wheat crop today. Feeling great! Anyone in need of wheat? Contact me.',
      date: '20:10 - 11/10/23',
    },
    {
      id: 2,
      user: 'Raj Patil',
      postText: 'Looking for advice on pest control for my tomato plants.',
      date: '09:10 - 05/10/23',
    },
    {
      id: 3,
      user: 'Zeeshan Khan',
      postText: 'Looking for advice on pest control for my tomato plants.',
      date: '08:10 - 05/10/23',
    },
    {
      id: 4,
      user: 'Rohan Yadav',
      postText: 'Just harvested my wheat crop today. Feeling great! Anyone in need of wheat? Contact me.',
      date: '05:23 - 12/09/2023',
    },
    {
      id: 5,
      user: 'Vinit Dubey',
      postText: 'Just harvested my wheat crop today. Feeling great! Anyone in need of wheat? Contact me.',
      date: '17:34 - 11/09/2023',
    },
  ];

  const [posts , setPosts  ] = useState(communityPosts)


  const AddPost = () => {
    const [postText, setPostText] = useState('');
  
    function addPost(){

      const formattedTime = timeFormatter.format(now);

      // Create a formatter for the date (DD/MM/YY)
      const dateFormatter = new Intl.DateTimeFormat('en', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      });
      
      // Format the date as 'DD/MM/YY'
      const formattedDate = dateFormatter.format(now);
      
      // Combine the time and date in the desired format
      const formattedDateTime = `${formattedTime} - ${formattedDate}`;
            
      setPosts([  , { 
          id : posts.length  + 1,
          user : user.name , 
          postText : postText ,
          date : formattedDateTime
       } , ...posts] )
    }
  
  
  return (

    <View>
  <TextInput
          placeholder="Write your post here..."
          multiline
          numberOfLines={4}
          value={postText}
          onChangeText={setPostText}
          style={styles.textInput}
        />
  
  <TouchableOpacity onPress={addPost} style={styles.postButton}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
  
  </View>
  )
  }
  


  return (

    user ?
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Farmers' Community</Text>

<View style={styles.postView}>
      {posts.map((post) => (
        <View key={post.id} style={styles.postContainer}>
          <Text style={styles.userName}>{post.user}</Text>
          <Text style={styles.postText}>{post.postText}</Text>
          <Text style={styles.postDate}>{post.date}</Text>
        </View>
      ))}
</View>

<AddPost/>


    </ScrollView>
    :
    <WelcomeScreen/>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor : COLORS.background

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  postView : {
    marginBottom : 10
  },
  postContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postText: {
    fontSize: 16,
    marginBottom: 8,
  },
  postDate: {
    fontSize: 14,
    color: '#888',
  },

  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
    borderRadius : 20
  },
  postButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom : 40
  },

  postButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
 
});

export default FarmersCommunity;