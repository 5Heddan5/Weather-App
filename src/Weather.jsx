import { useState } from 'react';
import CurrentWeather from './components/CurrentWeather';
import ForecastList from './components/ForecastList';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async () => {
    if (!city) return;

    try {
      setError(null);
      setWeather(null);
      setForecast([]);

      // 1️⃣ Hämta aktuellt väder
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=sv`
      );

      if (!response.ok) {
        throw new Error('Kunde inte hämta väder');
      }

      const data = await response.json();
      setWeather(data);

      // 2️⃣ När väderdata är hämtat, hämta även prognos
      fetchForecast(city);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchForecast = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric&lang=sv`
      );

      if (!response.ok) {
        throw new Error('Kunde inte hämta prognos');
      }

      const data = await response.json();

      // Filtrera ut ett värde per dag (kl 12:00)
      const daily = data.list.filter((item) =>
        item.dt_txt.includes('12:00:00')
      );

      setForecast(daily);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Weather-App</h1>
      <input
        type="text"
        placeholder="Search city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
      />
      <button onClick={fetchWeather}>Sök</button>

      {error && <p>{error}</p>}

      <CurrentWeather weather={weather} />
      <ForecastList forecast={forecast} />
    </div>
  );
};

export default Weather;
