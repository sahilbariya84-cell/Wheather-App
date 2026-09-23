import React, { useState, useCallback } from 'react';
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
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Line } from 'react-native-svg';
import { useFonts, Fraunces_500Medium } from '@expo-google-fonts/fraunces';
import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { iconForCode } from './WeatherIcons';

// Get a free API key from https://openweathermap.org/api and paste it below
const API_KEY = '360d07b883bf2113a478f030b6384bca';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

function SearchIcon() {
  return (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <Path
        d="M14 5L21 12M21 12L14 19M21 12H3"
        stroke="#FFD8A8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Fraunces_500Medium,
    Inter_400Regular,
    Inter_600SemiBold,
  });

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async () => {
    const trimmed = city.trim();
    setError(null);
    setWeather(null);

    if (!trimmed) {
      setError('Enter a city to check its weather.');
      return;
    }

    setLoading(true);

    try {
      const url = `${BASE_URL}?q=${encodeURIComponent(
        trimmed
      )}&appid=${API_KEY}&units=metric`;

      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
      } else {
        setError(
          data.message === 'city not found'
            ? "Couldn't find that city — check the spelling and try again."
            : data.message || 'Something went wrong.'
        );
      }
    } catch (err) {
      setError("Couldn't reach the weather service. Check your connection.");
    } finally {
      setLoading(false);
    }
  }, [city]);

  if (!fontsLoaded) {
    return (
      <LinearGradient colors={['#0f1b3d', '#1b3566', '#2f5c93']} style={styles.loadingScreen}>
        <ActivityIndicator size="large" color="#ffd8a8" />
      </LinearGradient>
    );
  }

  const HeroIcon = weather ? iconForCode(weather.weather?.[0]?.icon) : null;

  return (
    <LinearGradient colors={['#0f1b3d', '#1b3566', '#2f5c93']} style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <StatusBar style="light" />
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <Text style={styles.eyebrow}>Cross Platform Development — Tiny Project</Text>
          <Text style={styles.title}>How's the sky, out there?</Text>

          <View style={styles.searchRow}>
            <TextInput
              style={styles.input}
              placeholder="Search a city"
              placeholderTextColor="rgba(238,243,251,0.4)"
              value={city}
              onChangeText={setCity}
              onSubmitEditing={fetchWeather}
              returnKeyType="search"
            />
            <TouchableOpacity style={styles.searchButton} onPress={fetchWeather}>
              <SearchIcon />
            </TouchableOpacity>
          </View>

          <View style={styles.status}>
            {loading && <ActivityIndicator size="large" color="#ffd8a8" />}
            {!loading && error && <Text style={styles.error}>{error}</Text>}
            {!loading && !error && !weather && (
              <Text style={styles.hint}>Try "Vadodara" or your own city.</Text>
            )}
          </View>

          {weather && !loading && (
            <View style={styles.result}>
              <Text style={styles.place}>
                {weather.name}, {weather.sys?.country}
              </Text>

              <View style={styles.hero}>
                {HeroIcon && <HeroIcon />}
                <Text style={styles.temp}>{Math.round(weather.main.temp)}°</Text>
              </View>

              <Text style={styles.description}>
                {weather.weather?.[0]?.description}
              </Text>

              <View style={styles.statsRow}>
                <View style={styles.stat}>
                  <Text style={styles.statLabel}>Feels like</Text>
                  <Text style={styles.statValue}>
                    {Math.round(weather.main.feels_like)}°C
                  </Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statLabel}>Humidity</Text>
                  <Text style={styles.statValue}>{weather.main.humidity}%</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statLabel}>Wind</Text>
                  <Text style={styles.statValue}>{weather.wind.speed} m/s</Text>
                </View>
              </View>
            </View>
          )}

          <Text style={styles.footnote}>
            Live weather from the OpenWeatherMap API.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  loadingScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 64,
    paddingHorizontal: 26,
    paddingBottom: 40,
  },
  eyebrow: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: 'rgba(238,243,251,0.55)',
    marginBottom: 4,
  },
  title: {
    fontFamily: 'Fraunces_500Medium',
    fontSize: 26,
    color: '#ffffff',
    marginBottom: 34,
    textAlign: 'center',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1.5,
    borderBottomColor: 'rgba(238,243,251,0.28)',
    paddingBottom: 10,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    color: '#ffffff',
    fontSize: 17,
    paddingVertical: 4,
  },
  searchButton: {
    paddingLeft: 10,
    paddingVertical: 4,
  },
  status: {
    minHeight: 70,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  error: {
    fontFamily: 'Inter_400Regular',
    color: '#ffc9b8',
    marginTop: 30,
    fontSize: 15,
    textAlign: 'center',
  },
  hint: {
    fontFamily: 'Inter_400Regular',
    marginTop: 30,
    fontSize: 14,
    color: 'rgba(238,243,251,0.45)',
    textAlign: 'center',
  },
  result: {
    width: '100%',
    alignItems: 'center',
  },
  place: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: 'rgba(238,243,251,0.65)',
    marginTop: 6,
  },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    marginTop: 6,
  },
  temp: {
    fontFamily: 'Fraunces_500Medium',
    fontSize: 80,
    color: '#ffffff',
    letterSpacing: -1,
  },
  description: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: 'rgba(238,243,251,0.75)',
    marginTop: 4,
    marginBottom: 28,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: 'rgba(238,243,251,0.18)',
    paddingTop: 18,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11.5,
    color: 'rgba(238,243,251,0.5)',
    marginBottom: 4,
  },
  statValue: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 17,
    color: '#ffffff',
  },
  footnote: {
    fontFamily: 'Inter_400Regular',
    marginTop: 42,
    fontSize: 11.5,
    color: 'rgba(238,243,251,0.35)',
    textAlign: 'center',
    lineHeight: 17,
  },
});
