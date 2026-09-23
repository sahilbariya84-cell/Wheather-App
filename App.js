import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Get a free API key from https://openweathermap.org/api and paste it below
const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const url = `${BASE_URL}?q=${encodeURIComponent(
        city
      )}&appid=${API_KEY}&units=metric`;

      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
      } else {
        setError(data.message || 'City not found');
      }
    } catch (err) {
      setError('Something went wrong. Check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Weather App</Text>
        <Text style={styles.subtitle}>Check the current weather of any city</Text>

        <View style={styles.searchRow}>
          <TextInput
            style={styles.input}
            placeholder="Enter city name"
            placeholderTextColor="#cfd8dc"
            value={city}
            onChangeText={setCity}
            onSubmitEditing={fetchWeather}
            returnKeyType="search"
          />
          <TouchableOpacity style={styles.button} onPress={fetchWeather}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>

        {loading && <ActivityIndicator size="large" color="#fff" style={styles.loader} />}

        {error && <Text style={styles.error}>{error}</Text>}

        {weather && !loading && (
          <View style={styles.card}>
            <Text style={styles.cityName}>
              {weather.name}, {weather.sys?.country}
            </Text>
            <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
            <Text style={styles.description}>
              {weather.weather?.[0]?.description}
            </Text>

            <View style={styles.detailsRow}>
              <View style={styles.detailBox}>
                <Text style={styles.detailLabel}>Feels like</Text>
                <Text style={styles.detailValue}>
                  {Math.round(weather.main.feels_like)}°C
                </Text>
              </View>
              <View style={styles.detailBox}>
                <Text style={styles.detailLabel}>Humidity</Text>
                <Text style={styles.detailValue}>{weather.main.humidity}%</Text>
              </View>
              <View style={styles.detailBox}>
                <Text style={styles.detailLabel}>Wind</Text>
                <Text style={styles.detailValue}>{weather.wind.speed} m/s</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A90D9',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 14,
    color: '#e3f2fd',
    marginTop: 6,
    marginBottom: 30,
  },
  searchRow: {
    flexDirection: 'row',
    width: '100%',
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 18,
    justifyContent: 'center',
    marginLeft: 10,
  },
  buttonText: {
    color: '#4A90D9',
    fontWeight: 'bold',
    fontSize: 15,
  },
  loader: {
    marginTop: 40,
  },
  error: {
    color: '#ffe0e0',
    marginTop: 30,
    fontSize: 16,
    textAlign: 'center',
  },
  card: {
    marginTop: 40,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    padding: 25,
    width: '100%',
    alignItems: 'center',
  },
  cityName: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '600',
  },
  temp: {
    fontSize: 56,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontSize: 18,
    color: '#e3f2fd',
    textTransform: 'capitalize',
    marginTop: 5,
    marginBottom: 20,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  detailBox: {
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    color: '#e3f2fd',
    fontSize: 12,
  },
  detailValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 4,
  },
});
