import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';

const mockPosts = [
  {
    id: '1',
    user: 'John Doe',
    text: 'Had an amazing day at the beach! The sun was shining and the waves were perfect.',
    // image: 'https://via.placeholder.com/400x220/0078d4/ffffff?text=Beach+Day',
    likes: 42,
    comments: 8,
    liked: false,
  },
  {
    id: '2',
    user: 'Jane Smith',
    text: 'Just finished reading an incredible book. Highly recommend it to everyone!',
    image: 'https://picsum.photos/400/300',
    likes: 28,
    comments: 5,
    liked: false,
  },
  {
    id: '3',
    user: 'Mike Johnson',
    text: 'Excited to share my latest project. Check it out!',
    image: 'https://picsum.photos/400/220',
    likes: 67,
    comments: 12,
    liked: false,
  },
  {
    id: '4',
    user: 'Sarah Wilson',
    text: 'Beautiful sunset today. Nature never ceases to amaze me.',
    image: 'https://picsum.photos/400/220',
    likes: 89,
    comments: 15,
    liked: false,
  },
];

const styles = StyleSheet.create({
  postCard: {
    backgroundColor: colors.textWhite,
    marginHorizontal: 8,
    marginVertical: 6,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  userName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textDark,
  },
  postText: {
    fontSize: 15,
    color: colors.textDark,
    lineHeight: 22,
    marginBottom: 10,
    fontWeight: '500',
  },
  postImage: {
    width: '100%',
    height: 220,
    borderRadius: 10,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 12,
    borderTopWidth: 0.5,
    borderTopColor: '#e0e0e0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  actionButtonActive: {
    backgroundColor: '#f0f4f8',
  },
  actionText: {
    marginLeft: 6,
    color: colors.textDark,
    fontSize: 13,
    fontWeight: '600',
  },
  feedContainer: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  });
  export default function FeedPage() {
  const [posts, setPosts] = useState(mockPosts);

  const handleLike = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const isLiked = !post.liked;

          return {
            ...post,
            liked: isLiked,
            likes: isLiked ? post.likes + 1 : post.likes - 1,
          };
        }
        return post;
      })
    );
  };

  const renderPost = ({ item }: { item: typeof mockPosts[0] }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={24} color={colors.textWhite} />
          </View>
          <Text style={styles.userName}>{item.user}</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={20} color={colors.textDark} />
        </TouchableOpacity>
      </View>

      <Text style={styles.postText}>{item.text}</Text>

      {item.image && (
        <Image source={{ uri: item.image }} style={styles.postImage} />
      )}

      <View style={styles.postActions}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            item.liked && styles.actionButtonActive,
          ]}
          onPress={() => handleLike(item.id)}
        >
          <Ionicons
            name={item.liked ? "heart" : "heart-outline"}
            size={22}
            color={item.liked ? "#ff4458" : colors.primary}
          />
          <Text style={styles.actionText}>{item.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons
            name="chatbubble-outline"
            size={22}
            color={colors.primary}
          />
          <Text style={styles.actionText}>{item.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons
            name="share-social-outline"
            size={22}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.headerTitle}>Feed</Text>
      </View>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingVertical: 4 }}
      />
    </View>
  );
}
