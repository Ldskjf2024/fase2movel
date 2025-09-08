// PhotoDetailScreen.js
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function PhotoDetailScreen({ route, navigation }) {
  const { photo } = route.params;

  // Data atual formatada
  const today = new Date().toLocaleDateString("pt-BR");

  return (
    <View style={styles.container}>
      {/* Imagem centralizada */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: photo.url }} style={styles.image} resizeMode="contain" />
      </View>

      {/* Área de descrição próxima da imagem */}
      <View style={styles.infoContainer}>
        <Text style={styles.date}>Data da foto: {today}</Text>
        <Text style={styles.description}>{photo.title}</Text>
      </View>

      {/* Botão voltar no rodapé */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>&lt;</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  imageWrapper: { alignItems: "center", marginTop: 20 },
  image: { width: "100%", height: 700 },
  infoContainer: { paddingHorizontal: 20, marginTop: -200 }, 
  date: { fontSize: 14, color: "#666", marginBottom: 5 },
  description: { fontSize: 25, fontWeight: "500", color: "#000" },
  backButton: {
    paddingVertical: 150,
    paddingHorizontal: 20,
    borderColor: "#fff",
  },
  backButtonText: { fontSize: 24 },
});
