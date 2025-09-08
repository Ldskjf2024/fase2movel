import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import UserListScreen from "./screens/UserListScreen";
import AlbumListScreen from "./screens/AlbumListScreen";
import PhotoGridScreen from "./screens/PhotoGridScreen"; 
import PhotoDetailScreen from "./screens/PhotoDetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Users" component={UserListScreen} />
        <Stack.Screen name="Albums" component={AlbumListScreen} />
        <Stack.Screen name="Photos" component={PhotoGridScreen} />
        <Stack.Screen name="PhotoDetail" component={PhotoDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
