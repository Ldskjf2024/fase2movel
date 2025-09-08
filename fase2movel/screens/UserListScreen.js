// UserListScreen.js
import { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function UserListScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/Ldskjf2024/fase2movel/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = users.filter((u) =>
      u.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="purple" />
        <Text>Carregando usuários...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuários</Text>

      {/* busca */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="black" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar"
          value={search}
          onChangeText={handleSearch}
        />
      </View>

      {/* lista de usuários */}
      <View style={styles.userBlock}>
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[styles.userRow, index < filteredUsers.length - 1 && styles.borderBottom]}
              onPress={() =>
                navigation.navigate("Albums", {
                  userId: item.id,
                  userName: item.name,
                })
              }
            >
              <Text style={styles.userName}>{item.name}</Text>
              <Ionicons name="chevron-forward" size={20} color="gray" style={{ opacity: 0.6 }} />
            </TouchableOpacity>
          )}
        />
      </View>
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
    marginBottom: 20,
  },
  searchInput: { flex: 1, fontSize: 16 },
  userBlock: { borderWidth: 2, borderColor: "black", borderRadius: 12, overflow: "hidden" },
  userRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 15 },
  userName: { fontSize: 18 },
  borderBottom: { borderBottomWidth: 1, borderBottomColor: "#ccc" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
