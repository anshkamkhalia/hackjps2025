
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const userName = "Traveler";

  const containerStyle = {
    fontFamily: "Raleway, sans-serif",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#1a1a1a',
    color: '#e0e0e0',
    padding: '2rem',
    boxSizing: 'border-box',
  };

  const headingStyle = {
    fontFamily: "Raleway, sans-serif",
    fontSize: '3.5rem',
    background: 'linear-gradient(to right, #ff4d4d, #ffa500)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '1rem',
    textAlign: 'center',
    fontWeight: '700',
    textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
  };

  const subHeadingStyle = {
    fontSize: '1.5rem',
    color: '#bbb',
    textAlign: 'center',
    maxWidth: '800px',
    lineHeight: '1.6',
    marginBottom: '3rem',
  };

  const buttonGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '2.5rem',
    maxWidth: '1000px',
    width: '100%',
    padding: '0 1rem',
  };

  const cardStyle = {
    backgroundColor: '#282828',
    borderRadius: '15px',
    padding: '2.5rem',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  };

  const cardTitleStyle = {
    fontFamily: "Raleway, sans-serif",
    fontSize: '1.8rem',
    color: '#f0f0f0',
    marginBottom: '1rem',
    fontWeight: '600',
  };

  const cardDescriptionStyle = {
    fontFamily: "Raleway, sans-serif",
    fontSize: '1rem',
    color: '#999',
    marginBottom: '2rem',
    lineHeight: '1.5',
  };

  const cardButtonStyle = {
    fontFamily: "Raleway, sans-serif",
    padding: '1.2rem 2.5rem',
    fontSize: '1.3rem',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    color: 'white',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    width: '100%',
    maxWidth: '250px',
  };

  const myMapsButtonStyle = {
    ...cardButtonStyle,
    backgroundColor: '#6A5ACD',
  };

  const planTripButtonStyle = {
    ...cardButtonStyle,
    backgroundColor: '#4CAF50',
  };

  const newTripButtonStyle = {
    ...cardButtonStyle,
    backgroundColor: '#00BFFF',
  };

  const dealFinderButtonStyle = {
    ...cardButtonStyle,
    backgroundColor: '#FF6347',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Welcome back, {userName}!</h1>
      <p style={subHeadingStyle}>
        Your ultimate travel guide awaits. Plan your next adventure or explore your saved journeys.
      </p>

      <div style={buttonGridStyle}>
        <div
          style={cardStyle}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px)';
            e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.6)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.4)';
          }}
        >
          <h2 style={cardTitleStyle}>My Saved Trips</h2>
          <p style={cardDescriptionStyle}>
            Revisit all your carefully planned itineraries and discovered locations.
          </p>
          <button
            onClick={() => navigate('/my-places')}
            style={myMapsButtonStyle}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#584BAA'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6A5ACD'}
          >
            View My Trips
          </button>
        </div>

        <div
          style={cardStyle}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px)';
            e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.6)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.4)';
          }}
        >
          <h2 style={cardTitleStyle}>Plan a Trip</h2>
          <p style={cardDescriptionStyle}>
            Let our intelligent chatbot help you craft your perfect journey from scratch.
          </p>
          <button
            onClick={() => navigate('/bot')}
            style={planTripButtonStyle}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#419944'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
          >
            Start Planning (Chatbot)
          </button>
        </div>

        <div
          style={cardStyle}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px)';
            e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.6)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.4)';
          }}
        >
          <h2 style={cardTitleStyle}>Start a New Trip</h2>
          <p style={cardDescriptionStyle}>
            Begin a fresh adventure by exploring a blank map or choosing a template.
          </p>
          <button
            onClick={() => navigate('/map')}
            style={newTripButtonStyle}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#009ACD'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#00BFFF'}
          >
            Create New Trip
          </button>
        </div>

        <div
          style={cardStyle}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px)';
            e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.6)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.4)';
          }}
        >
          <h2 style={cardTitleStyle}>Deal Finder</h2>
          <p style={cardDescriptionStyle}>
            Discover the best flights, accommodations, and travel deals with our smart bot.
          </p>
          <button
            onClick={() => navigate('/deal-finder')}
            style={dealFinderButtonStyle}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#E5533A'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FF6347'}
          >
            Find Deals
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;