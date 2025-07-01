import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = '';    //use your own api key here
  const DEFAULT_CITY = 'London';              //modify to your liking

  useEffect(() => {
    fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${DEFAULT_CITY}`)
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch weather:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ff8800" />
      </View>
    );
  }

  if (!weather) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red' }}>Error fetching weather data.</Text>
      </View>
    );
  }

  const { location, current } = weather;

  const kphToMph = (kph) => (kph * 0.621371).toFixed(1);
  const cToF = (c) => (c * 9) / 5 + 32;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Image source={require('../assets/logo2.png')} style={styles.logo} />
      </View>

      {/* Location + Time */}
      <View style={styles.card}>
        <MaterialCommunityIcons name="map-marker" size={28} color="#ff8800" />
        <Text style={styles.city}>{location.name}, {location.country}</Text>
        <Text style={styles.smallText}>Local Time: {location.localtime}</Text>
        <Text style={styles.smallText}>Time Zone: {location.tz_id}</Text>
      </View>

      {/* Temperature */}
      <View style={styles.card}>
        <MaterialCommunityIcons name="thermometer" size={28} color="#ff8800" />
        <Image source={{ uri: `https:${current.condition.icon}` }} style={styles.weatherIcon} />
        <Text style={styles.temp}>
          {current.temp_c}°C / {cToF(current.temp_c).toFixed(1)}°F
        </Text>
        <Text style={styles.condition}>{current.condition.text}</Text>
      </View>

      {/* Feels like */}
      <View style={styles.card}>
        <MaterialCommunityIcons name="thermometer-lines" size={28} color="#ff8800" />
        <Text style={styles.infoText}>
          Feels Like: {current.feelslike_c}°C / {cToF(current.feelslike_c).toFixed(1)}°F
        </Text>
      </View>

      {/* Wind */}
      <View style={styles.card}>
        <MaterialCommunityIcons name="weather-windy" size={28} color="#ff8800" />
        <Text style={styles.infoText}>
          Wind: {current.wind_kph} kph / {kphToMph(current.wind_kph)} mph
        </Text>
      </View>

      {/* UV Index */}
      <View style={styles.card}>
        <MaterialCommunityIcons name="weather-sunny-alert" size={28} color="#ff8800" />
        <Text style={styles.infoText}>UV Index: {current.uv}</Text>
      </View>

      {/* Visibility */}
      <View style={styles.card}>
        <MaterialCommunityIcons name="eye-outline" size={28} color="#ff8800" />
        <Text style={styles.infoText}>
          Visibility: {current.vis_km} km / {(current.vis_km * 0.621371).toFixed(1)} mi
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 60,
    paddingBottom: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  logo: {
    width: 160,
    height: 60,
    resizeMode: 'contain',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  city: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 5,
    color: '#333',
    textAlign: 'center',
  },
  temp: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ff8800',
    marginVertical: 10,
  },
  condition: {
    fontSize: 18,
    color: '#555',
  },
  smallText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  infoText: {
    fontSize: 18,
    color: '#444',
    marginTop: 10,
    textAlign: 'center',
  },
  weatherIcon: {
    width: 80,
    height: 80,
    marginVertical: 10,
  },
});




