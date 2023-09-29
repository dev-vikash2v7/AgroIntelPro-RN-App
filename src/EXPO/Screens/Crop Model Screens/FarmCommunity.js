import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

const FarmersCommunity = () => {
  const communityPosts = [
    {
      id: 1,
      user: 'Rahul Gandhi',
      postText:
        'Just harvested my wheat crop today. Feeling great! Anyone in need of wheat? Contact me.',
      date: '2 hours ago',
    },
    {
      id: 2,
      user: 'Narendra Modi',
      postText: 'Looking for advice on pest control for my tomato plants.',
      date: '4 hours ago',
    },
    {
      id: 3,
      user: 'Mamata Banerjee ',
      postText: 'HAMBA HAMDA RAMBA RAMBA TAMBA TAMBA',
      date: 'Yesterday',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Farmers' Community</Text>

<View style={styles.postView}>
      {communityPosts.map((post) => (
        <View key={post.id} style={styles.postContainer}>
          <Text style={styles.userName}>{post.user}</Text>
          <Text style={styles.postText}>{post.postText}</Text>
          <Text style={styles.postDate}>{post.date}</Text>
        </View>
      ))}
</View>

      
<TextInput
        placeholder="Write your post here..."
        multiline
        numberOfLines={4}
        value={postText}
        onChangeText={setPostText}
        style={styles.textInput}
      />

        <Button style={styles.newPostButton}   onPress={() => {}} title='Create New Post'/>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  newPostButton: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newPostButton: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newPostButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default FarmersCommunity;