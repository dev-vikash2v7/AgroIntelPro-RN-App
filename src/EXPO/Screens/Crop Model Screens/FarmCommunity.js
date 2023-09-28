import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const FarmersCommunity = () => {
  const communityPosts = [
    {
      id: 1,
      user: 'John Doe',
      postText:
        'Just harvested my wheat crop today. Feeling great! Anyone in need of wheat? Contact me.',
      date: '2 hours ago',
    },
    {
      id: 2,
      user: 'Jane Smith',
      postText: 'Looking for advice on pest control for my tomato plants.',
      date: 'Yesterday',
    },
    // Add more posts as needed
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Farmers' Community</Text>
      {communityPosts.map((post) => (
        <View key={post.id} style={styles.postContainer}>
          <Text style={styles.userName}>{post.user}</Text>
          <Text style={styles.postText}>{post.postText}</Text>
          <Text style={styles.postDate}>{post.date}</Text>
          {/* Add additional UI elements like comments, likes, and shares here */}
        </View>
      ))}
      <TouchableOpacity
        style={styles.newPostButton}
        onPress={() => {
          // Implement logic to create a new post
        }}
      >
        <Text style={styles.newPostButtonText}>Create New Post</Text>
      </TouchableOpacity>
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