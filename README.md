# Weather App (React Native + Expo)

A cross-platform weather app built with React Native and Expo. Search any
city to see the current temperature, condition, humidity, and wind speed,
using live data from the OpenWeatherMap API — styled with a dusk-sky gradient,
custom weather icons, and a serif/sans type pairing.

## Features
- Search weather by city name
- Displays temperature, condition, "feels like", humidity, and wind speed
- Custom SVG weather icons (sun, cloud, rain, storm, snow, mist) that match
  the live condition returned by the API
- Gradient background with Fraunces + Inter typography
- Loading and error states for a smooth user experience

## Tech Stack
- **React Native** – cross-platform mobile UI framework
- **Expo** – toolchain for building/running React Native apps
- **expo-linear-gradient** – background gradient
- **react-native-svg** – custom weather icons
- **@expo-google-fonts/fraunces & inter** – typography
- **OpenWeatherMap API** – free weather data API

## Project Structure
```
WeatherApp/
├── App.js          # Main app component (UI + logic)
├── WeatherIcons.js   # Custom SVG weather icon components
├── app.json          # Expo app configuration
├── package.json       # Project dependencies
└── README.md            # Project documentation
```

## Setup Instructions

1. Install [Node.js](https://nodejs.org) and the Expo CLI:
   ```
   npm install -g expo-cli
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
   and paste it into the `API_KEY` constant in `App.js` (a working key is
   already included for demo purposes).
4. Start the app:
   ```
   npx expo start
   ```
5. Scan the QR code with the **Expo Go** app (Android/iOS) to run it on your
   phone, or press `a` / `i` in the terminal to run it on an
   Android/iOS emulator.

## How It Works
- The user types a city name and taps the search icon.
- The app calls the OpenWeatherMap REST API using `fetch()`.
- The JSON response (temperature, humidity, wind speed, condition) is stored
  in state and rendered on screen, with a matching custom weather icon.
- Loading and error states are handled so the UI never gets stuck.

## Author
Submitted as a Tiny Project for the Cross Platform Development (CPD) subject.
