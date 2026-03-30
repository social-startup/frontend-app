import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../../../styles/colors';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { user, signInAnonymously, signOut } = useAuth();
  const [name, setName] = useState('You');
  const [bio, setBio] = useState('Hello! I am using SocialConnect.');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');

  useEffect(() => {
    if (user) setName(user.name);
  }, [user]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
        </View>
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.location}>{city}{city && stateName ? ', ' : ''}{stateName}</Text>
        </View>
      </View>

      {!user ? (
        <View style={{ marginBottom: 12 }}>
          <Text style={{ marginBottom: 6, color: colors.textDark }}>Sign in (enter a display name)</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput style={[styles.input, { flex: 1 }]} value={name} onChangeText={setName} />
            <TouchableOpacity
              style={[styles.button, { marginLeft: 8 }]}
              onPress={async () => {
                await signInAnonymously(name || 'You');
                Alert.alert('Signed in');
              }}
            >
              <Text style={styles.btnText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity style={[styles.button, { marginBottom: 12 }]} onPress={async () => { await signOut(); Alert.alert('Signed out'); }}>
          <Text style={styles.btnText}>Sign Out</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.label}>Bio</Text>
      <TextInput style={styles.input} value={bio} onChangeText={setBio} multiline />

      <Text style={styles.label}>City</Text>
      <TextInput style={styles.input} value={city} onChangeText={setCity} />

      <Text style={styles.label}>State</Text>
      <TextInput style={styles.input} value={stateName} onChangeText={setStateName} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          Alert.alert('Saved', 'Profile updated');
          router.back();
        }}
      >
        <Text style={styles.btnText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f9fc' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: colors.textWhite, fontSize: 28, fontWeight: '700' },
  name: { fontSize: 20, fontWeight: '700', color: colors.textDark },
  location: { color: '#5f6b7a' },
  label: { marginTop: 12, marginBottom: 6, color: colors.textDark, fontWeight: '600' },
  input: { backgroundColor: colors.textWhite, borderRadius: 8, padding: 10, borderWidth: 1, borderColor: '#e6eef9' },
  button: { marginTop: 18, backgroundColor: colors.primary, padding: 12, borderRadius: 8, alignItems: 'center' },
  btnText: { color: colors.textWhite, fontWeight: '700' },
});
