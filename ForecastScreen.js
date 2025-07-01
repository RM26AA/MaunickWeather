import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Keyboard,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons, Feather, Entypo, FontAwesome5 } from '@expo/vector-icons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Animated, { FadeInDown } from 'react-native-reanimated';

const logo = require('../assets/logo2.png');
const initialLayout = { width: Dimensions.get('window').width };

const WEATHER_API_KEY = '';    //use your own API here

export default function ForecastScreen() {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('London');
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'forecast', title: '3-Day Forecast' },
    { key: 'astronomy', title: 'Astronomy' },
  ]);
  const [loading, setLoading] = useState(false);
  const [forecastData, setForecastData] = useState([]);
  const [astronomyData, setAstronomyData] = useState(null);

  const fetchForecast = async (loc) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${loc}&days=3&aqi=no&alerts=no`
      );
      const data = await response.json();

      if (data.error) {
        Alert.alert('Error', data.error.message);
        setLoading(false);
        return;
      }

      const forecastDays = data.forecast.forecastday.map((day) => ({
        date: day.date,
        condition: day.day.condition.text,
        icon: day.day.condition.icon,
        sunrise: day.astro.sunrise,
        sunset: day.astro.sunset,
        maxTempC: day.day.maxtemp_c,
        minTempC: day.day.mintemp_c,
        chanceOfRain: day.day.daily_chance_of_rain,
      }));

      const astro = data.forecast.forecastday[0].astro;

      setForecastData(forecastDays);
      setAstronomyData({
        moonrise: astro.moonrise,
        moonset: astro.moonset,
        moonPhase: astro.moon_phase,
        moonIllumination: astro.moon_illumination + '%',
      });
      setLocation(data.location.name + ', ' + data.location.region + ', ' + data.location.country);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForecast('London');
  }, []);

  const ForecastTab = () => (
    <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
      {forecastData.length === 0 && !loading ? (
        <Text style={{ textAlign: 'center', marginTop: 40 }}>No data available</Text>
      ) : (
        forecastData.map((day, i) => (
          <Animated.View
            entering={FadeInDown.delay(i * 100)}
            key={day.date}
            style={styles.forecastBox}
          >
            <Text style={styles.date}>{day.date}</Text>
            <View style={styles.rowCenter}>
              <Image
                source={{ uri: 'https:' + day.icon }}
                style={{ width: 36, height: 36, marginRight: 10 }}
              />
              <Text style={styles.condition}>{day.condition}</Text>
            </View>
            <Text style={styles.sun}>
              Sunrise: {day.sunrise} | Sunset: {day.sunset}
            </Text>
            <Text style={styles.temp}>
              Max: {day.maxTempC}°C / {(day.maxTempC * 9 / 5 + 32).toFixed(1)}°F
              {'  '}| Min: {day.minTempC}°C / {(day.minTempC * 9 / 5 + 32).toFixed(1)}°F
            </Text>
            <Text style={styles.rain}>Chance of rain: {day.chanceOfRain}%</Text>
          </Animated.View>
        ))
      )}
    </ScrollView>
  );

  const AstronomyTab = () => (
    <View style={{ padding: 20 }}>
      {!astronomyData && !loading ? (
        <Text style={{ textAlign: 'center', marginTop: 40 }}>No astronomy data</Text>
      ) : (
        <Animated.View entering={FadeInDown} style={styles.astronomyBox}>
          <View style={styles.rowCenter}>
            <Entypo
              name="arrow-up"
              size={28}
              color="#ff8800"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.astronomyText}>Moonrise: {astronomyData?.moonrise}</Text>
          </View>
          <View style={styles.rowCenter}>
            <Entypo
              name="arrow-down"
              size={28}
              color="#ff8800"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.astronomyText}>Moonset: {astronomyData?.moonset}</Text>
          </View>
          <View style={styles.rowCenter}>
            <FontAwesome5
              name="moon"
              size={28}
              color="#ff8800"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.astronomyText}>Moon phase: {astronomyData?.moonPhase}</Text>
          </View>
          <View style={styles.rowCenter}>
            <MaterialCommunityIcons
              name="brightness-percent"
              size={28}
              color="#ff8800"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.astronomyText}>Moon illumination: {astronomyData?.moonIllumination}</Text>
          </View>
        </Animated.View>
      )}
    </View>
  );

  const renderScene = SceneMap({
    forecast: ForecastTab,
    astronomy: AstronomyTab,
  });

  const handleSearchSubmit = () => {
    if (search.trim() === '') {
      Alert.alert('Enter a location to search');
      return;
    }
    Keyboard.dismiss();
    fetchForecast(search.trim());
    setSearch('');
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
      </View>

      {/* Title */}
      <Text style={styles.title}>Forecast</Text>

      {/* Location name */}
      <Text style={styles.locationName}>{location}</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="gray" style={{ marginLeft: 10 }} />
        <TextInput
          placeholder="Search city or location"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          returnKeyType="search"
          onSubmitEditing={handleSearchSubmit}
        />
        <TouchableOpacity onPress={handleSearchSubmit} style={{ padding: 8 }}>
          <Feather name="arrow-right-circle" size={28} color="#ff8800" />
        </TouchableOpacity>
      </View>

      {loading && (
        <ActivityIndicator size="large" color="#ff8800" style={{ marginVertical: 20 }} />
      )}

      {/* Tab View */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#ff8800' }}
            style={{ backgroundColor: 'white' }}
            labelStyle={{ color: '#ff8800', fontWeight: 'bold' }}
            activeColor="#ff8800"
            inactiveColor="gray"
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logoContainer: {
    marginTop: 80, // moved down to clear Dynamic Island
    alignItems: 'center',
    marginBottom: 8,
  },
  logo: {
    width: 160,
    height: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black', // changed to black
    textAlign: 'center',
    marginBottom: 8,
    
  },
  locationName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    textAlign: 'center',
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 10,
    height: 50,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#222',
  },
  forecastBox: {
    backgroundColor: '#fff8f0',
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    shadowColor: '#ff8800',
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  date: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 6,
    color: '#ff8800',
  },
  condition: {
    fontSize: 17,
    fontWeight: '600',
    color: '#444',
  },
  sun: {
    fontSize: 14,
    color: '#666',
    marginTop: 6,
  },
  temp: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
  },
  rain: {
    marginTop: 6,
    fontSize: 14,
    color: '#666',
  },
  astronomyBox: {
    backgroundColor: '#fff8f0',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 15,
    elevation: 3,
    shadowColor: '#ff8800',
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  astronomyText: {
    fontSize: 16,
    marginVertical: 6,
    color: '#444',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

