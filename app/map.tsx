import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import { usePosts } from './context/PostsContext';
import { colors } from '../styles/colors';
import { router } from 'expo-router';

export default function MapScreen() {
  const { posts } = usePosts();

  const initialRegion = {
    latitude: posts && posts[0] && posts[0].coords ? posts[0].coords.lat : 21.1458,
    longitude: posts && posts[0] && posts[0].coords ? posts[0].coords.lon : 79.0882,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {posts.map((p) =>
          p.coords ? (
            <Marker key={p.id} coordinate={{ latitude: p.coords.lat, longitude: p.coords.lon }} title={p.user} description={p.text}>
              <TouchableOpacity onPress={() => router.push('/feed')}>
                <View style={styles.marker} />
              </TouchableOpacity>
            </Marker>
          ) : null
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  marker: { width: 18, height: 18, borderRadius: 9, backgroundColor: colors.primary, borderWidth: 2, borderColor: colors.textWhite },
});
