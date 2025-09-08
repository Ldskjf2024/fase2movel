// AlbumListScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AlbumListScreen({ route, navigation }) {
  const { userId, userName } = route.params;
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://my-json-server.typicode.com/Ldskjf2024/fase2movel/albums?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setAlbums(data);
        setFilteredAlbums(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [userId]);

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = albums.filter((a) =>
      a.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredAlbums(filtered);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="purple" />
        <Text>Carregando álbuns...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Cabeçalho com título */}
      <Text style={styles.title}>Álbums</Text>

      {/* Busca */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="black" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Título do álbum"
          value={search}
          onChangeText={handleSearch}
        />
      </View>

      {/* Lista de álbuns */}
      <View style={styles.albumBlock}>
        <FlatList
          data={filteredAlbums}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[styles.albumRow, index < filteredAlbums.length - 1 && styles.borderBottom]}
              onPress={() =>
                navigation.navigate("Photos", { albumId: item.id, albumTitle: item.title })
              }
            >
              <Text style={styles.albumTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Seta no final da tela, alinhada à esquerda */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>&lt;</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 15 },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 25,
    paddingHorizontal: 12,
    height: 45,
    marginBottom: 35,
  },
  searchInput: { flex: 1, fontSize: 16 },
  albumBlock: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 500, 
  },
  albumRow: { padding: 15, borderColor: "black", justifyContent: "center" },
  albumTitle: { fontSize: 18 },
  borderBottom: { borderBottomWidth: 1, borderBottomColor: "#ccc" },
  backButton: { paddingVertical: 10, alignItems: "flex-start" },
  backButtonText: { fontSize: 24 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
