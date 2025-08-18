import WeatherIcon from './WeatherIcon';
import '../css/ForecastList.css';

export default function ForecastList({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div>
      <h3>5-dagars prognos</h3>
      <div className="forecast-list" >
        {forecast.map((day) => (
          <div key={day.dt}>
            <p>
              {new Date(day.dt_txt).toLocaleDateString('sv-SE', {
                weekday: 'short',
              })}
            </p>
            <WeatherIcon main={day.weather[0].main} size={48} />
            <p>{Math.round(day.main.temp)} °C</p>
          </div>
        ))}
      </div>
    </div>
  );
}
