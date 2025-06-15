import { useLocation, Navigate } from 'react-router-dom';
import Weather from './Weather';

const WeatherTestPage = () => {
  const location = useLocation();
  const country = location.state?.country;

  if (!country) {
    return <Navigate to="/" replace />;
  }

  return <Weather place={country} />;
};

export default WeatherTestPage;
