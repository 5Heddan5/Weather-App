import { useState, useEffect } from 'react';
import CurrentWeather from './components/CurrentWeather';
import ForecastList from './components/ForecastList';
import Favorites from './components/Favorites';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  // Ladda favoriter från localStorage vid start
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(saved);
  }, []);

  //  Hjälpfunktion för att spara till både state och localStorage
  const saveFavorites = (newFavorites) => {
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  // fetchWeathertar emot en stad (searchCity),
  // annars används state.city som fallback
  const fetchWeather = async (searchCity = city) => {
    if (!searchCity) return;

    try {
      setError(null);
      setWeather(null);
      setForecast([]);

      // 1️⃣ Hämta aktuellt väder
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=metric&lang=sv`
      );

      if (!response.ok) {
        throw new Error('Kunde inte hämta väder');
      }

      const data = await response.json();
      setWeather(data);

      // 2️⃣ När väderdata är hämtat, hämta även prognos
      fetchForecast(searchCity);
    } catch (err) {
      setError(err.message);
    }
  };

  //  Hämta 5-dagarsprognos
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

  const handleSearch = () => {
    if (!city) return;
    fetchWeather(city);
  };


  const addFavorite = () => {
    if (!city || favorites.includes(city)) return;
    const updated = [...favorites, city];
    saveFavorites(updated);
  };

  const removeFavorite = (fav) => {
    const updated = favorites.filter((c) => c !== fav);
    saveFavorites(updated);
  };

  return (
    <div>
      <h1>Weather-App</h1>
      <input
        type="text"
        placeholder="Search city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button onClick={handleSearch}>Sök</button>
      <button onClick={addFavorite}>Lägg till favorit</button>

      {/* Visa ev. felmeddelanden */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Favoriter: när man klickar på en favorit
          så uppdateras input + vädret hämtas direkt */}
      <Favorites
        favorites={favorites}
        onSelect={(fav) => {
          setCity(fav); // uppdaterar inputfältet
          fetchWeather(fav); // hämtar vädret direkt (ingen knapp behövs)
        }}
        onRemove={removeFavorite}
      />

      {/* Visa aktuellt väder + prognos */}
      <CurrentWeather weather={weather} />
      <ForecastList forecast={forecast} />
    </div>
  );
};

export default Weather;
