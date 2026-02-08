import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Alert } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Comment {
  id: string;
  user: string;
  text: string;
  date: string;
}

export interface Post {
  id: string;
  user: string;
  text: string;
  image?: string;
  likes: number;
  comments: Comment[];
  liked?: boolean;
  date?: string; // ISO date string
  peopleRequired?: number;
  venue?: { city?: string; state?: string; address?: string };
  coords?: { lat: number; lon: number } | null;
}

type PostsContextType = {
  posts: Post[];
  addPost: (p: Omit<Post, 'id' | 'likes' | 'comments' | 'liked'>) => void;
  toggleLike: (id: string) => void;
  addComment: (id: string, text: string, user?: string) => void;
};

const PostsContext = createContext<PostsContextType | undefined>(undefined);

const STORAGE_KEY = 'posts_v1';

const initialPosts: Post[] = [
  {
    id: '1',
    user: 'John Doe',
    text: 'Had an amazing day at the beach! The sun was shining and the waves were perfect.',
    image: 'https://via.placeholder.com/400x220/0078d4/ffffff?text=Beach+Day',
    likes: 42,
    comments: [
      { id: 'c1', user: 'Alex', text: 'Looks fun!', date: new Date().toISOString() },
    ],
    liked: false,
    date: new Date().toISOString(),
    peopleRequired: 0,
    venue: { city: 'Los Angeles', state: 'CA', address: 'Santa Monica Beach' },
    coords: { lat: 34.0094, lon: -118.4973 },
  },
  {
    id: '2',
    user: 'Jane Smith',
    text: 'Just finished reading an incredible book. Highly recommend it to everyone!',
    image: 'https://via.placeholder.com/400x220/0078d4/ffffff?text=Book+Review',
    likes: 28,
    comments: [],
    liked: false,
    date: new Date().toISOString(),
    peopleRequired: 0,
    venue: { city: 'New York', state: 'NY', address: 'Local Library' },
    coords: { lat: 40.7128, lon: -74.006 },
  },
];

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  // load from storage once
  useEffect(() => {
    async function load() {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as Post[];
          setPosts(parsed);
        }
      } catch (e) {
        // ignore
      }
    }
    load();
  }, []);

  // persist when posts change
  useEffect(() => {
    async function save() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
      } catch (e) {
        // ignore
      }
    }
    save();
  }, [posts]);

  function addPost(p: Omit<Post, 'id' | 'likes' | 'comments' | 'liked'>) {
    const newPost: Post = {
      ...p,
      id: uuidv4(),
      likes: 0,
      comments: [],
      liked: false,
    };
    setPosts((s) => [newPost, ...s]);
    Alert.alert('Post added', 'Your post is now public');
  }

  function toggleLike(id: string) {
    setPosts((s) =>
      s.map((p) => {
        if (p.id !== id) return p;
        const liked = !p.liked;
        return { ...p, liked, likes: liked ? p.likes + 1 : Math.max(0, p.likes - 1) };
      })
    );
  }

  function addComment(id: string, text: string, user = 'Anonymous') {
    const comment: Comment = { id: uuidv4(), user, text, date: new Date().toISOString() };
    setPosts((s) => s.map((p) => (p.id === id ? { ...p, comments: [...p.comments, comment] } : p)));
  }

  return (
    <PostsContext.Provider value={{ posts, addPost, toggleLike, addComment }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const ctx = useContext(PostsContext);
  if (!ctx) throw new Error('usePosts must be used within PostsProvider');
  return ctx;
}

export function haversineDistanceKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  const toRad = (v: number) => (v * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);
  const aCalc = sinDLat * sinDLat + sinDLon * sinDLon * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(aCalc), Math.sqrt(1 - aCalc));
  return R * c;
}

export default PostsContext;
