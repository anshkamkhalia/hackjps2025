import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Weather from './Weather'; 

const ComparePlacesPage = () => {
  const location = useLocation();
  const { country1, country2 } = location.state || {};

  if (!country1 || !country2) {
    return <Navigate to="/my-places" replace />;
  }

  return (
    <div style={comparePageContainerStyle}>
      <h1 style={comparePageHeadingStyle}>Comparing Destinations</h1>
      <p style={comparePageSubheadingStyle}>See a side-by-side comparison of weather for your chosen locations.</p>

      <div style={comparisonGridStyle}>
        <div style={comparisonCardStyle}>
          <h2 style={comparisonCardHeadingStyle}>{country1}</h2>
          <Weather place={country1} /> 
        </div>

        
        <div style={comparisonCardStyle}>
          <h2 style={comparisonCardHeadingStyle}>{country2}</h2>
          <Weather place={country2} /> 
        </div>
      </div>
      
      

      
      <button 
        onClick={() => window.history.back()} 
        style={backButtonComparePageStyle}
      >
        Back to My Saved Trips
      </button>
    </div>
  );
};

const comparePageContainerStyle = {
  padding: '2rem',
  textAlign: 'center',
  backgroundColor: '#000000',
  color: 'white',
  minHeight: '100vh',
  fontFamily: 'Raleway',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxSizing: 'border-box'
};

const comparePageHeadingStyle = {
  fontSize: '3rem',
  marginBottom: '0.5rem',
  color: '#FFA500'
};

const comparePageSubheadingStyle = {
  fontSize: '1.2rem',
  color: '#CCC',
  marginBottom: '2rem'
};

const comparisonGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr', 
  gap: '2.5rem', 
  maxWidth: '1000px', 
  width: '100%',
  margin: '0 auto 3rem auto', 
};

const comparisonCardStyle = {
  backgroundColor: '#4B4B4B',
  padding: '1.8rem', 
  borderRadius: '12px', 
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.4)', 
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  minHeight: '400px' 
};

const comparisonCardHeadingStyle = {
  fontSize: '2rem',
  color: '#FFD700', 
  marginBottom: '1rem'
};

const backButtonComparePageStyle = {
  fontFamily: "Raleway",
  padding: '0.8rem 1.5rem',
  border: 'none',
  backgroundColor: '#6A5ACD',
  color: 'white',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '1.1rem',
  transition: 'background-color 0.3s ease',
  marginTop: '2rem'
};

export default ComparePlacesPage;