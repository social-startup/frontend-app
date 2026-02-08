import React, { useMemo, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Share, Alert, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { usePosts, haversineDistanceKm } from './context/PostsContext';
import FilterBar from '../components/ui/FilterBar';
import { router } from 'expo-router';
import CommentModal from '../components/ui/CommentModal';
import { useAuth } from './context/AuthContext';
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
    aspectRatio: 16 / 9,
    borderRadius: 10,
    marginBottom: 12,
    resizeMode: 'cover',
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
  const { posts, toggleLike, addComment } = usePosts();
  const { user } = useAuth();
  const [filters, setFilters] = useState<{ radiusKm?: number; center?: { lat: number; lon: number } | null; date?: string | null }>({});
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [activePostId, setActivePostId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      if (filters.date) {
        try {
          const postDate = p.date ? p.date.split('T')[0] : null;
          if (postDate !== filters.date) return false;
        } catch (_) {}
      }
      if (filters.radiusKm && filters.center && p.coords) {
        const d = haversineDistanceKm(filters.center as any, p.coords as any);
        if (d > (filters.radiusKm || 0)) return false;
      }
      return true;
    });
  }, [posts, filters]);

  async function handleShare(item: any) {
    try {
      await Share.share({ message: `${item.user}: ${item.text} ${item.image || ''}` });
    } catch (e) {
      Alert.alert('Share failed');
    }
  }

  function openCommentModal(id: string) {
    setActivePostId(id);
    setCommentModalVisible(true);
  }

  function handleCommentSubmit(text: string) {
    if (!activePostId) return;
    addComment(activePostId, text, user ? user.name : 'You');
    Alert.alert('Comment added');
  }

  function renderPost({ item }: { item: typeof posts[0] }) {
    return (
      <View style={styles.postCard}>
        <View style={styles.postHeader}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={24} color={colors.textWhite} />
            </View>
            <Text style={styles.userName}>{item.user}</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/profile')}>
            <Ionicons name="ellipsis-horizontal" size={20} color={colors.textDark} />
          </TouchableOpacity>
        </View>

        <Text style={styles.postText}>{item.text}</Text>

        {item.image && <Image source={{ uri: item.image }} style={styles.postImage} />}

        <View style={styles.postActions}>
          <TouchableOpacity
            style={[styles.actionButton, item.liked && styles.actionButtonActive]}
            onPress={() => toggleLike(item.id)}
          >
            <Ionicons name={item.liked ? 'heart' : 'heart-outline'} size={22} color={item.liked ? '#ff4458' : colors.primary} />
            <Text style={styles.actionText}>{item.likes}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => openCommentModal(item.id)}>
            <Ionicons name="chatbubble-outline" size={22} color={colors.primary} />
            <Text style={styles.actionText}>{item.comments.length}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => handleShare(item)}>
            <Ionicons name="share-social-outline" size={22} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f4f8' }}>
      <View style={[globalStyles.header, { alignItems: 'center' }]}>
        <Text style={globalStyles.headerTitle}>Feed</Text>
        <View style={{ position: 'absolute', right: 12, top: 18, flexDirection: 'row' }}>
          <TouchableOpacity style={{ marginRight: 12 }} onPress={() => router.push('/newpost')}>
            <Ionicons name="add-circle" size={26} color={colors.textWhite} />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginRight: 12 }} onPress={() => router.push('/map')}>
            <Ionicons name="map-outline" size={26} color={colors.textWhite} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/profile')}>
            <Ionicons name="person-circle" size={28} color={colors.textWhite} />
          </TouchableOpacity>
        </View>
      </View>

      <FilterBar
        onApply={(f) => {
          setFilters(f);
        }}
      />
      <FlatList
        data={filtered}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingVertical: 8, paddingBottom: 32 }}
      />

      <CommentModal
        visible={commentModalVisible}
        comments={
          activePostId ? (posts.find((p) => p.id === activePostId)?.comments || []) : []
        }
        onClose={() => {
          setCommentModalVisible(false);
          setActivePostId(null);
        }}
        onSubmit={handleCommentSubmit}
      />
    </SafeAreaView>
  );
}
