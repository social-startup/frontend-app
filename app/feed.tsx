import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const mockPosts = [
  {
    id: '1',
    user: 'John Doe',
    text: 'Had an amazing day at the beach! The sun was shining and the waves were perfect.',
    image: 'https://via.placeholder.com/300x200/007bff/ffffff?text=Beach+Day',
    likes: 42,
    comments: 8,
  },
  {
    id: '2',
    user: 'Jane Smith',
    text: 'Just finished reading an incredible book. Highly recommend it to everyone!',
    image: 'https://via.placeholder.com/300x200/007bff/ffffff?text=Book+Review',
    likes: 28,
    comments: 5,
  },
  {
    id: '3',
    user: 'Mike Johnson',
    text: 'Excited to share my latest project. Check it out!',
    image: 'https://via.placeholder.com/300x200/007bff/ffffff?text=Project+Showcase',
    likes: 67,
    comments: 12,
  },
  {
    id: '4',
    user: 'Sarah Wilson',
    text: 'Beautiful sunset today. Nature never ceases to amaze me.',
    image: 'https://via.placeholder.com/300x200/007bff/ffffff?text=Sunset+View',
    likes: 89,
    comments: 15,
  },
];

export default function FeedPage() {
  const renderPost = ({ item }: { item: typeof mockPosts[0] }) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Ionicons name="person-circle" size={40} color="#007bff" />
        <Text style={styles.userName}>{item.user}</Text>
      </View>
      <Text style={styles.postText}>{item.text}</Text>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="heart-outline" size={24} color="#007bff" />
          <Text style={styles.actionText}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={24} color="#007bff" />
          <Text style={styles.actionText}>{item.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={24} color="#007bff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Feed</Text>
      </View>
      <FlatList
        data={mockPosts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#007bff',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  postContainer: {
    backgroundColor: '#e6f3ff',
    margin: 10,
    borderRadius: 10,
    padding: 15,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginLeft: 10,
  },
  postText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 5,
    color: '#007bff',
    fontSize: 14,
  },
});
