// src/components/ForecastList.jsx
import WeatherIcon from './WeatherIcon';

export default function ForecastList({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div>
      <h3>5-dagars prognos</h3>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {forecast.map((day) => (
          <div key={day.dt}>
            <p>
              {new Date(day.dt_txt).toLocaleDateString('sv-SE', {
                weekday: 'short',
              })}
            </p>
            <WeatherIcon main={day.weather[0].main} size={48} />
            <p>{Math.round(day.main.temp)} °C</p>
            <p style={{ fontSize: '0.8rem' }}>{day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
