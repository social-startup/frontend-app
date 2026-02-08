import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export type User = { id: string; name: string; email?: string } | null;

type AuthContextType = {
  user: User;
  signInAnonymously: (name: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const KEY = 'auth_user_v1';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    async function load() {
      try {
        const raw = await AsyncStorage.getItem(KEY);
        if (raw) setUser(JSON.parse(raw));
      } catch (e) {}
    }
    load();
  }, []);

  async function signInAnonymously(name: string) {
    const u = { id: Math.random().toString(36).slice(2, 9), name };
    setUser(u);
    try {
      await AsyncStorage.setItem(KEY, JSON.stringify(u));
    } catch (e) {}
  }

  async function signOut() {
    setUser(null);
    try {
      await AsyncStorage.removeItem(KEY);
    } catch (e) {}
  }

  return <AuthContext.Provider value={{ user, signInAnonymously, signOut }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default AuthContext;
