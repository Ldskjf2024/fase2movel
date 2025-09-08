// PhotoGridScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

export default function PhotoGridScreen({ route, navigation }) {
  const { albumId } = route.params;
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://my-json-server.typicode.com/Ldskjf2024/fase2movel/photos?albumId=${albumId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPhotos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [albumId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="purple" />
        <Text>Carregando fotos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Título no topo */}
      <Text style={styles.title}>Fotos</Text>

      {/* Grid de miniaturas */}
<FlatList
  data={photos}
  numColumns={2}
  keyExtractor={(item) => item.id.toString()}
  contentContainerStyle={styles.grid}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.photoWrapper}
      onPress={() => navigation.navigate("PhotoDetail", { photo: item })}
    >
      {/* Troque thumbnailUrl por url */}
      <Image source={{ uri: item.url }} style={styles.thumbnail} />
    </TouchableOpacity>
  )}
/>

      {/* Seta no final da tela, alinhada à esquerda */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>&lt;</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginVertical: 15 },
  grid: { paddingBottom: 20 },
  photoWrapper: { flex: 1, margin: 8, alignItems: "center" },
  thumbnail: { width: 150, height: 150, borderRadius: 8 },
  backButton: {
    paddingVertical: 40,
    borderColor: "#fff",
  },
  backButtonText: { fontSize: 24 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
