import WeatherIcon from './WeatherIcon';

export default function CurrentWeather({ weather }) {
  if (!weather) return null;

  const formatTime = (timestamp) =>
    new Date(timestamp * 1000).toLocaleTimeString('sv-SE', {
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div>
      <h2>
        {weather.name}, {weather.sys.country}
      </h2>
      <p>Tempratur: {weather.main.temp} °C</p>
      <p>Känns som: {weather.main.feels_like} °C</p>
      <p>Väder: {weather.weather[0].description}</p>
      <WeatherIcon main={weather.weather[0].main} />
      <p>Vind: {weather.wind.speed} m/s</p>
      <p>Fuktighet: {weather.main.humidity} %</p>
      <p>Lufttryck: {weather.main.pressure} hPa</p>
      <p>Soluppgång: {formatTime(weather.sys.sunrise)}</p>
      <p>Solnedgång: {formatTime(weather.sys.sunset)}</p>
    </div>
  );
}
