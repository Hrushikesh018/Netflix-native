import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MovieRows from './Components/MovieRows';
import Trending from './Components/Trending';
import Home from './Components/Home';
import Movies from './Components/Movies';
import Login from './Components/Login';
import MovieDetails from './Components/MovieDetails';
import Player from './Components/Player';


// enableScreens(); // Call this before creating any navigators

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Trending" component={Trending} />
        <Stack.Screen name="Movies" component={Movies} />
        <Stack.Screen name="Details" component={MovieDetails} />
        <Stack.Screen name="Player" component={Player} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
