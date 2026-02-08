import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { router } from 'expo-router';
import { usePosts } from './context/PostsContext';
import { useAuth } from './context/AuthContext';
import { colors } from '../styles/colors';
import * as ImagePicker from 'expo-image-picker';

export default function NewPost() {
    const { addPost } = usePosts();
    const { user } = useAuth();
    const [text, setText] = useState('');
    const [image, setImage] = useState('');
    const [date, setDate] = useState('');
    const [people, setPeople] = useState('');
    const [city, setCity] = useState('');
    const [stateName, setStateName] = useState('');
    const [address, setAddress] = useState('');
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');

    function submit() {
        if (!text) return;
        addPost({
            user: user ? user.name : 'You',
            text,
            image: image || undefined,
            date: date || new Date().toISOString(),
            peopleRequired: Number(people) || 0,
            venue: { city, state: stateName, address },
            coords: lat && lon ? { lat: parseFloat(lat), lon: parseFloat(lon) } : null,
        });
        router.push('/feed');
    }

    async function pickImage() {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission required', 'Permission to access photos is required.');
            return;
        }
        const result: any = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7 });
        if (!result.cancelled) {
            setImage(result.assets && result.assets[0] ? result.assets[0].uri : (result as any).uri);
        }
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
            <Text style={styles.label}>Description</Text>
            <TextInput style={styles.input} value={text} onChangeText={setText} placeholder="What's happening?" multiline />

            <Text style={styles.label}>Image</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#eef6ff' }]} onPress={pickImage}>
                    <Text style={{ color: colors.primary, fontWeight: '700' }}>Pick Image</Text>
                </TouchableOpacity>
                <TextInput style={[styles.input, { flex: 1 }]} value={image} onChangeText={setImage} placeholder="Or paste image URL" />
            </View>
            {image ? <Image source={{ uri: image }} style={{ width: '100%', height: 180, borderRadius: 10, marginTop: 8 }} /> : null}

            <Text style={styles.label}>Event Date (YYYY-MM-DD)</Text>
            <TextInput style={styles.input} value={date} onChangeText={setDate} placeholder="2026-02-07" />

            <Text style={styles.label}>People required</Text>
            <TextInput style={styles.input} value={people} onChangeText={setPeople} keyboardType="numeric" />

            <Text style={styles.label}>Venue - City</Text>
            <TextInput style={styles.input} value={city} onChangeText={setCity} />

            <Text style={styles.label}>Venue - State</Text>
            <TextInput style={styles.input} value={stateName} onChangeText={setStateName} />

            <Text style={styles.label}>Venue - Address</Text>
            <TextInput style={styles.input} value={address} onChangeText={setAddress} />

            <Text style={styles.label}>Coordinates (optional)</Text>
            <View style={{ flexDirection: 'row' }}>
                <TextInput style={[styles.input, { flex: 1, marginRight: 6 }]} value={lat} onChangeText={setLat} placeholder="lat" keyboardType="numeric" />
                <TextInput style={[styles.input, { flex: 1 }]} value={lon} onChangeText={setLon} placeholder="lon" keyboardType="numeric" />
            </View>

            <TouchableOpacity style={styles.button} onPress={submit}>
                <Text style={styles.btnText}>Publish</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f7f9fc' },
    label: { marginTop: 12, marginBottom: 6, color: colors.textDark, fontWeight: '600' },
    input: { backgroundColor: colors.textWhite, borderRadius: 8, padding: 10, borderWidth: 1, borderColor: '#e6eef9' },
    button: { marginTop: 18, backgroundColor: colors.primary, padding: 12, borderRadius: 8, alignItems: 'center' },
    btnText: { color: colors.textWhite, fontWeight: '700' },
});
