import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function PhotoDetailScreen({ route }) {
  const { photo } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo.url }} style={styles.image} />
      <Text style={styles.title}>{photo.title}</Text>
      <Text style={styles.description}>Essa é a foto “{photo.title}” do seu álbum.</Text>
      <Text style={styles.date}>Data: 12/08/2025</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  image: { width: '100%', height: 300, marginBottom: 16 },
  title: { fontSize: 20, fontWeight: 'bold' },
  description: { marginTop: 8, fontSize: 16 },
  date: { marginTop: 4, color: '#555' }
});
