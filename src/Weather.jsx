import React, { useState, useEffect } from 'react';
import './Weather.css';

const Weather = ({ place }) => {
  const [forecastByDay, setForecastByDay] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!place) return;

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${apiKey}&units=imperial`;

    fetch(url)
      .then(async response => {
        if (!response.ok) {
          const errMsg = await response.text();
          throw new Error(`API error: ${response.status} - ${errMsg}`);
        }
        return response.json();
      })
      .then(data => {
        const grouped = {};

        data.list.forEach(item => {
          const date = new Date(item.dt * 1000);
          const day = date.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });

          if (!grouped[day]) grouped[day] = [];
          grouped[day].push({
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            temp: item.main.temp,
            description: item.weather[0].description,
            icon: item.weather[0].icon
          });
        });

        setForecastByDay(grouped);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
        setForecastByDay({});
      });
  }, [place]);

  if (error) return <p className="error">Error: {error}</p>;
  if (!Object.keys(forecastByDay).length) return <p className="loading">Loading forecast for {place}...</p>;

  return (
    <div className="weather-container">
      <h2 className="weather-title">5-Day Forecast for {place}</h2>
      {Object.entries(forecastByDay).map(([day, forecasts]) => (
        <div key={day} className="forecast-day">
          <h3 className="day-header">{day}</h3>
          <div className="day-forecast-grid">
            {forecasts.map((item, idx) => (
              <div className="mini-card" key={idx}>
                <p className="forecast-time">{item.time}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                  alt={item.description}
                  className="weather-icon"
                />
                <p className="forecast-temp">{item.temp.toFixed(1)}°C</p>
                <p className="forecast-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Weather;
