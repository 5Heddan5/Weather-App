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
    <div className="current-weather">
      <div className="weather-flex">
        <div className="weather-left">
          <h2>
            {displayCity}, {weather.sys.country}
          </h2>

          <div
            className="weather-icon-wrapper"
            data-weather={weather.weather[0].main}
          >
            <WeatherIcon main={weather.weather[0].main} />
          </div>

          <p className="current-temp">{Math.round(weather.main.temp)}°C</p>
          <p className="feels-like">
            Känns som: {Math.round(weather.main.feels_like)}°C
          </p>
          <p className="description">{weather.weather[0].description}</p>
        </div>

        <div className="details-right">
          <div className="detail-card">
            <p>Vind</p>
            <p>{Math.round(weather.wind.speed)} m/s</p>
          </div>
          <div className="detail-card">
            <p>Soluppgång</p>
            <p>{formatTime(weather.sys.sunrise)}</p>
          </div>
          <div className="detail-card">
            <p>Solnedgång</p>
            <p>{formatTime(weather.sys.sunset)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
