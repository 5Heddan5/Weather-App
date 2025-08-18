import { useState, useEffect } from 'react';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import ForecastList from './components/ForecastList';
import Favorites from './components/Favorites';

import './css/Weather.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [displayCity, setDisplayCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourly, setHourly] = useState([]);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const capitalizeCity = (name) =>
    name ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() : '';

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(saved.map(capitalizeCity));
  }, []);

  const saveFavorites = (newFavorites) => {
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const fetchWeather = async (searchCity = city) => {
    if (!searchCity) return;

    try {
      setError(null);
      setWeather(null);
      setForecast([]);
      setHourly([]);

      // Hämta aktuellt väder
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=metric&lang=sv`
      );
      if (!response.ok) throw new Error('Kunde inte hämta väder');
      const data = await response.json();
      setWeather(data);

      // Hämta prognos
      fetchForecast(searchCity);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchForecast = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric&lang=sv`
      );
      if (!response.ok) throw new Error('Kunde inte hämta prognos');
      const data = await response.json();

      // 5-dagars: värden kl 12:00
      const daily = data.list.filter((item) =>
        item.dt_txt.includes('12:00:00')
      );
      setForecast(daily);

      // 24-timmars: de första 8 posterna (3h-intervall × 8 = 24h)
      setHourly(data.list.slice(0, 8));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = () => {
    if (!city) return;
    setDisplayCity(capitalizeCity(city));
    fetchWeather(city);
  };

  const addFavorite = () => {
    if (!city) return;
    const formattedCity = capitalizeCity(city);
    if (favorites.includes(formattedCity)) return;
    saveFavorites([...favorites, formattedCity]);
  };

  const removeFavorite = (fav) => {
    saveFavorites(favorites.filter((c) => c !== fav));
  };

  return (
    <div>
      <h1>WeatherNow</h1>

      <input
        type="text"
        placeholder="Sök stad..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button onClick={handleSearch}>Sök</button>
      <button onClick={addFavorite}>Lägg till favorit</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <Favorites
        favorites={favorites}
        onSelect={(fav) => {
          setCity(fav);
          setDisplayCity(fav);
          fetchWeather(fav);
        }}
        onRemove={removeFavorite}
      />

      <CurrentWeather weather={weather} displayCity={displayCity} />
      <HourlyForecast hourly={hourly} />
      <ForecastList forecast={forecast} />
    </div>
  );
};

export default Weather;
