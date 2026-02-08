import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';
import { colors } from '../../styles/colors';

type Props = {
  onApply: (filters: { radiusKm?: number; center?: { lat: number; lon: number } | null; date?: string | null }) => void;
};

export default function FilterBar({ onApply }: Props) {
  const [radius, setRadius] = useState('50');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [date, setDate] = useState('');
  const [permissionDenied, setPermissionDenied] = useState(false);

  async function useMyLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setPermissionDenied(true);
      Alert.alert('Permission required', 'Location permission is required to use this feature.');
      return;
    }
    setPermissionDenied(false);
    try {
      const pos = await Location.getCurrentPositionAsync({});
      setLat(String(pos.coords.latitude));
      setLon(String(pos.coords.longitude));
      Alert.alert('Location set', 'Using current location');
    } catch (e) {
      Alert.alert('Location failed', 'Unable to get current location');
    }
  }

  return (
    <View style={styles.bar}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.quick} onPress={() => setRadius('5')}>
          <Text style={styles.quickText}>5km</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quick} onPress={() => setRadius('10')}>
          <Text style={styles.quickText}>10km</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quick} onPress={() => setRadius('50')}>
          <Text style={styles.quickText}>50km</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quick} onPress={() => setRadius('100')}>
          <Text style={styles.quickText}>100km</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rowInputs}>
        <TextInput style={styles.input} placeholder="Radius km" keyboardType="numeric" value={radius} onChangeText={setRadius} />
        <TextInput style={styles.input} placeholder="Center lat" keyboardType="numeric" value={lat} onChangeText={setLat} />
        <TextInput style={styles.input} placeholder="Center lon" keyboardType="numeric" value={lon} onChangeText={setLon} />
        <TextInput style={[styles.input, { flex: 1 }]} placeholder="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} />
      </View>

      <View style={styles.rowEnd}>
        {permissionDenied ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#d9534f', marginRight: 8 }}>Location permission denied</Text>
            <TouchableOpacity style={styles.loc} onPress={useMyLocation}>
              <Text style={styles.locText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.loc} onPress={useMyLocation}>
            <Text style={styles.locText}>Use my location</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            onApply({
              radiusKm: parseFloat(radius) || undefined,
              center: lat && lon ? { lat: parseFloat(lat), lon: parseFloat(lon) } : null,
              date: date || null,
            })
          }
        >
          <Text style={styles.btnText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f7f9fc',
    borderBottomWidth: 1,
    borderBottomColor: '#eef3fb',
  },
  row: { flexDirection: 'row', marginBottom: 8 },
  quick: { backgroundColor: colors.primaryLighter, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, marginRight: 8 },
  quickText: { color: colors.primary, fontWeight: '700' },
  rowInputs: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  input: { flex: 0.8, marginRight: 8, paddingHorizontal: 8, paddingVertical: 8, backgroundColor: colors.textWhite, borderRadius: 8, borderWidth: 1, borderColor: '#e6eef9', fontSize: 13 },
  rowEnd: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  loc: { paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, backgroundColor: '#eef6ff' },
  locText: { color: colors.primary, fontWeight: '700' },
  button: { backgroundColor: colors.primary, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 },
  btnText: { color: colors.textWhite, fontWeight: '700' },
});
