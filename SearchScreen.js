import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SearchScreen() {
  const [query, setQuery] = useState('London');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = '';    //use your own api here

  const searchWeather = async () => {
    if (!query.trim()) return;
    setLoading(true);
    Keyboard.dismiss();
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}`
      );
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error('Search error:', error);
      setWeather(null);
    }
    setLoading(false);
  };

  const kphToMph = (kph) => (kph * 0.621371).toFixed(1);
  const cToF = (c) => ((c * 9) / 5 + 32).toFixed(1);

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      {/* Logo + Title */}
      <View style={styles.header}>
        <Image source={require('../assets/logo2.png')} style={styles.logo} />
        <Text style={styles.title}>Search</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <MaterialCommunityIcons name="magnify" size={24} color="#ff8800" />
        <TextInput
          style={styles.input}
          placeholder="Enter city name"
          placeholderTextColor="#aaa"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={searchWeather}
        />
        <TouchableOpacity onPress={searchWeather}>
          <MaterialCommunityIcons name="arrow-right-circle" size={28} color="#ff8800" />
        </TouchableOpacity>
      </View>

      {/* Weather Info */}
      {loading && (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#ff8800" />
        </View>
      )}

      {weather && !loading && (
        <>
          <View style={styles.card}>
            <MaterialCommunityIcons name="map-marker" size={28} color="#ff8800" />
            <Text style={styles.city}>
              {weather.location.name}, {weather.location.region}, {weather.location.country}
            </Text>
            <Text style={styles.infoText}>Local time: {weather.location.localtime}</Text>
            <Text style={styles.infoText}>Time zone: {weather.location.tz_id}</Text>
          </View>

          <View style={styles.card}>
            <MaterialCommunityIcons name="weather-partly-cloudy" size={28} color="#ff8800" />
            <Image
              source={{ uri: `https:${weather.current.condition.icon}` }}
              style={styles.weatherIcon}
            />
            <Text style={styles.temp}>
              {weather.current.temp_c}°C / {cToF(weather.current.temp_c)}°F
            </Text>
            <Text style={styles.infoText}>{weather.current.condition.text}</Text>
            <Text style={styles.infoText}>
              Feels like: {weather.current.feelslike_c}°C / {cToF(weather.current.feelslike_c)}°F
            </Text>
          </View>

          <View style={styles.card}>
            <MaterialCommunityIcons name="water-percent" size={28} color="#ff8800" />
            <Text style={styles.infoText}>Humidity: {weather.current.humidity}%</Text>
          </View>

          <View style={styles.card}>
            <MaterialCommunityIcons name="weather-windy" size={28} color="#ff8800" />
            <Text style={styles.infoText}>
              Wind: {weather.current.wind_kph} kph ({kphToMph(weather.current.wind_kph)} mph) {weather.current.wind_dir}
            </Text>
          </View>

          <View style={styles.card}>
            <MaterialCommunityIcons name="weather-sunny-alert" size={28} color="#ff8800" />
            <Text style={styles.infoText}>UV Index: {weather.current.uv}</Text>
          </View>

          <View style={styles.card}>
            <MaterialCommunityIcons name="eye-outline" size={28} color="#ff8800" />
            <Text style={styles.infoText}>
              Visibility: {weather.current.vis_km} km ({(weather.current.vis_km * 0.621371).toFixed(1)} mi)
            </Text>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 160,
    height: 60,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 8,
    color: '#333',
  },
  loadingBox: {
    marginTop: 20,
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
    fontSize: 20,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
    color: '#333',
  },
  temp: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ff8800',
    marginVertical: 10,
  },
  weatherIcon: {
    width: 80,
    height: 80,
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#444',
    marginTop: 6,
    textAlign: 'center',
  },
});
