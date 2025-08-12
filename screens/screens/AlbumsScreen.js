import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';

export default function AlbumsScreen({ route, navigation }) {
  const { userId, userName } = route.params;
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://my-json-server.typicode.com/Ldskjf2024/fase2movel/albums?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        setAlbums(data);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <>
      <Text style={{ padding: 16, fontSize: 20, fontWeight: 'bold' }}>{userName}</Text>
      <FlatList
        data={albums}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Photos', { albumId: item.id, albumTitle: item.title })}>
            <Text style={{ padding: 16, fontSize: 18 }}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </>
  );
}
