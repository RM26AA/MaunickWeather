// App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import ForecastScreen from './screens/ForecastScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      let iconName;

      if (route.name === 'Home') iconName = 'home-outline';
      else if (route.name === 'Search') iconName = 'magnify';
      else if (route.name === 'Forecast') iconName = 'weather-partly-cloudy';

      return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: '#ff8800', // bright orange
    tabBarInactiveTintColor: 'gray',
    headerShown: false, // hide all top headers
  })}
>

        <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Forecast" component={ForecastScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


