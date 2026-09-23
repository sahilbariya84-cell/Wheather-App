# Weather App (React Native + Expo)

A simple cross-platform weather app built with React Native and Expo. Users can
search for any city and see the current temperature, weather description,
humidity, and wind speed, using live data from the OpenWeatherMap API.

## Features
- Search weather by city name
- Displays temperature, "feels like", humidity, and wind speed
- Clean, responsive UI that works on both Android and iOS
- Loading and error states for a smooth user experience

## Tech Stack
- **React Native** – cross-platform mobile UI framework
- **Expo** – toolchain for building/running React Native apps
- **OpenWeatherMap API** – free weather data API

## Project Structure
```
WeatherApp/
├── App.js          # Main app component (UI + logic)
├── app.json        # Expo app configuration
├── package.json     # Project dependencies
└── README.md         # Project documentation
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
   and paste it into the `API_KEY` constant in `App.js`.
4. Start the app:
   ```
   npx expo start
   ```
5. Scan the QR code with the **Expo Go** app (Android/iOS) to run it on your
   phone, or press `a` / `i` in the terminal to run it on an
   Android/iOS emulator.

## How It Works
- The user types a city name and taps **Search**.
- The app calls the OpenWeatherMap REST API using `fetch()`.
- The JSON response (temperature, humidity, wind speed, description) is
  stored in state and rendered on screen.
- Loading and error states are handled so the UI never gets stuck.

## Author
Submitted as a Tiny Project for the Cross Platform Development (CPD) subject.
