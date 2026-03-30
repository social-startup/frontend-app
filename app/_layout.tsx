import 'react-native-get-random-values';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Slot } from 'expo-router';
import { PostsProvider } from './context/PostsContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <PostsProvider>
          <StatusBar hidden />
          <Slot />
        </PostsProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
