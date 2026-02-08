import React from 'react';
import { Slot } from 'expo-router';
import { PostsProvider } from './context/PostsContext';
import { AuthProvider } from './context/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <PostsProvider>
        <Slot />
      </PostsProvider>
    </AuthProvider>
  );
}
