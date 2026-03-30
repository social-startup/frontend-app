import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export type User = { id: number; email: string; username: string } | null;

type AuthContextType = {
  user: User;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
};

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE = 'http://localhost:3000'; // Change for production

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
        const storedUser = await AsyncStorage.getItem(USER_KEY);
        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {}
    }
    load();
  }, []);

  async function register(email: string, password: string, username: string) {
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, username }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Registration failed');

      const { access_token } = data;
      setToken(access_token);

      // Decode token to get user info (simple, in production use jwt-decode)
      const payload = JSON.parse(atob(access_token.split('.')[1]));
      const userData = { id: payload.sub, email: payload.email, username };
      setUser(userData);

      await AsyncStorage.setItem(TOKEN_KEY, access_token);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
    } catch (e: any) {
      Alert.alert('Error', e.message);
      throw e;
    }
  }

  async function login(email: string, password: string) {
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');

      const { access_token } = data;
      setToken(access_token);

      // Get user profile
      const profileResponse = await fetch(`${API_BASE}/auth/profile`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      const profile = await profileResponse.json();
      const userData = { id: profile.userId, email: profile.email, username: 'User' }; // Adjust as needed
      setUser(userData);

      await AsyncStorage.setItem(TOKEN_KEY, access_token);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
    } catch (e: any) {
      Alert.alert('Error', e.message);
      throw e;
    }
  }

  async function logout() {
    setUser(null);
    setToken(null);
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
      await AsyncStorage.removeItem(USER_KEY);
    } catch (e) {}
  }

  return <AuthContext.Provider value={{ user, token, login, register, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default AuthContext;
