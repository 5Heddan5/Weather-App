import { useState } from 'react';
import SunIcon from './assets/icons/sun.png';
import CloudIcon from './assets/icons/sun-cloud.png';
import RainIcon from './assets/icons/rain2.png';
import SnowIcon from './assets/icons/snow-cloud.png';
import ThunderIcon from './assets/icons/thunderstorm.png';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async () => {
    if (!city) return;

    try {
      setError(null);
      setWeather(null);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error('Stad hittades inte');
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const getWeatherIcon = (main) => {
    switch (main) {
      case 'Clear':
        return <img src={SunIcon} height={64} alt="sun" />;
      case 'Clouds':
        return <img src={CloudIcon} height={64} alt="clouds" />;
      case 'Rain':
        return <img src={RainIcon} height={64} alt="rain" />;
      case 'Snow':
        return <img src={SnowIcon} height={64} alt="snow" />;
      case 'Thunderstorm':
        return <img src={ThunderIcon} height={64} alt="thunder" />;
      default:
        return <img src={SunIcon} height={64} alt="sun" />;
    }
  };

  return (
    <div>
      <h1>Väderapp</h1>
      <input
        type="text"
        placeholder="Skriv stad..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
      />
      <button onClick={fetchWeather}>Sök</button>

      {error && <p>{error}</p>}

      {weather && (
        <div>
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p>Temperatur: {weather.main.temp} °C</p>
          <p>Väder: {weather.weather[0].description}</p>
          {getWeatherIcon(weather.weather[0].main)}
          <p>Vind: {weather.wind.speed} m/s</p>
          <p>Fuktighet: {weather.main.humidity} %</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
