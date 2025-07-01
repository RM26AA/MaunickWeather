# 🌤️ Maunick Weather

**Maunick Weather** is a modern, beautifully designed weather app built with **React Native** and **Expo**, using the [WeatherAPI.com](https://www.weatherapi.com/) for real-time and forecast data. It provides detailed weather information, forecasts, and astronomical data — all wrapped in a smooth, scrollable, swipeable experience with a clean white & orange theme.

---

## 🚀 Features

- ⛅ **Current Weather**: Live weather updates (temperature, wind, humidity, visibility, etc.)
- 📍 **Search Locations**: Get weather data for any city in the world
- 📅 **3-Day Forecast**: Includes sunrise, sunset, temperature highs/lows, and chance of rain
- 🌙 **Astronomy Info**: Moonrise, moonset, moon phase, and illumination
- 💡 **Dual Units**: Celsius/Fahrenheit, KPH/MPH
- 🎨 **Sleek UI**: White and orange color theme, custom branding with your logo
- 🤳 **Swipe Navigation**: Swipe between Home, Search, and Forecast pages
- 🎬 **Smooth Animations**: Animated splash screen and transitions
- 📱 **Responsive Design**: Fits all screen sizes

---

## 📁 Project Structure

```
MaunickWeather/
├── assets/
│ ├── logo.png
│ ├── logo2.png
│ └── weather-icons/ # Optional custom weather icons
├── screens/
│ ├── SplashScreen.js
│ ├── HomeScreen.js
│ ├── SearchScreen.js
│ └── ForecastScreen.js
├── App.js
├── package.json
└── README.md
```


---

## 🧰 Built With

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [WeatherAPI.com](https://www.weatherapi.com/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [Vector Icons](https://icons.expo.dev/)

---

## ⚙️ Getting Started

### 1. Clone the Repository

```
git clone https://github.com/your-username/maunick-weather.git
cd maunick-weather
```

### 2. Install Dependencies

```
npm install
```

### 3. Add Your API Key
Create a .env file or hardcode your WeatherAPI key in your screens (for development):

```
const API_KEY = 'your_api_key_here'; // Replace with your actual API key
```

- You can sign up for a free key at https://www.weatherapi.com/signup.aspx

### 4. Run the App

```
npx expo start
```

Scan the QR code with your Expo Go app or run in emulator/simulator.

## ✏️ Customization

- Change Default Location: Update "London" to your desired default in HomeScreen.js and ForecastScreen.js.
- Icons: Replace default weather icons with your own under /assets/weather-icons/.
- Branding: Swap logos (logo.png, logo2.png) in the assets folder.

## 🧪 Testing the API (Optional)

If you want to test the WeatherAPI in a browser or index.html, you can call:

```
https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=London&days=3&aqi=no&alerts=no
```

## 📄 License

This project is open-source and free to use. Attribution to WeatherAPI.com is required when using their free tier.

## 🤝 Credits

- Weather data from WeatherAPI
- UI Icons by MaterialCommunityIcons
- Built with ❤️ using Expo & React Native













