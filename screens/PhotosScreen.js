import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';

export default function PhotosScreen({ route, navigation }) {
  const { albumId, albumTitle } = route.params;
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://my-json-server.typicode.com/Ldskjf2024/fase2movel/photos?albumId=${albumId}`)
      .then(res => res.json())
      .then(data => {
        setPhotos(data);
        setLoading(false);
      });
  }, [albumId]);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <>
      <Text style={{ padding: 16, fontSize: 20, fontWeight: 'bold' }}>{albumTitle}</Text>
      <FlatList
        data={photos}
        numColumns={2}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('PhotoDetail', { photo: item })}>
            <Image source={{ uri: item.thumbnailUrl }} style={styles.thumbnail} />
          </TouchableOpacity>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  thumbnail: { width: 150, height: 150, margin: 8 }
});
