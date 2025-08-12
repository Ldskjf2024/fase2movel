import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';

export default function UsersScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://my-json-server.typicode.com/Ldskjf2024/fase2movel/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <FlatList
      data={users}
      keyExtractor={item => String(item.id)}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Albums', { userId: item.id, userName: item.name })}>
          <Text style={{ padding: 16, fontSize: 18 }}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
}
