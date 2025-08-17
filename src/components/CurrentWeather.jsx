import WeatherIcon from './WeatherIcon';
import '../css/CurrentWeather.css';

export default function CurrentWeather({ weather, displayCity }) {
  if (!weather) return null;

  const formatTime = (timestamp) =>
    new Date(timestamp * 1000).toLocaleTimeString('sv-SE', {
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div>
      <h2>
        {displayCity}, {weather.sys.country}
      </h2>

      <p>Temperatur: {weather.main.temp} °C</p>
      <p>Känns som: {weather.main.feels_like} °C</p>
      <p>Väder: {weather.weather[0].description}</p>

      <div
        className="weather-icon-wrapper"
        data-weather={weather.weather[0].main}
      >
        <WeatherIcon main={weather.weather[0].main} />
      </div>

      <p>Vind: {weather.wind.speed} m/s</p>
      <p>Fuktighet: {weather.main.humidity} %</p>
      <p>Lufttryck: {weather.main.pressure} hPa</p>
      <p>Soluppgång: {formatTime(weather.sys.sunrise)}</p>
      <p>Solnedgång: {formatTime(weather.sys.sunset)}</p>
    </div>
  );
}
