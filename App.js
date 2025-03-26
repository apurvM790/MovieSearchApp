import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet} from 'react-native';
import "./global.css"
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import FavoriteMoviesScreen from "./screens/FavoriteMoviesScreen";
import FavoriteMoviesDetailScreen from "./screens/FavoriteMoviesDetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="Details" component={DetailsScreen}/>
      <Stack.Screen name="Favorites" component={FavoriteMoviesScreen}/>
      <Stack.Screen name="Favorite_Movie" component={FavoriteMoviesDetailScreen} />
      </Stack.Navigator>
      </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
