import WeatherIcon from './WeatherIcon';
import '../css/HourlyForecast.css';

export default function HourlyForecast({ hourly }) {
  if (!hourly || hourly.length === 0) return null;

  const next24h = hourly.slice(0, 24);

  return (
    <div>
      <h3>24-timmars prognos</h3>
      <div className="hourly-forecast">
        {next24h.map((hour) => (
          <div key={hour.dt}>
            <p className="hour">{new Date(hour.dt_txt).getHours()}:00</p>
            <WeatherIcon main={hour.weather[0].main} size={24} />
            <p className="temp">{Math.round(hour.main.temp)}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}
