import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './main.css';

const Homepage = () => {
  const primaryColor = '#ff4d4d';
  const secondaryColor = '#ffa500';
  const darkBg = '#1a1a1a';
  const lightText = '#e0e0e0';

  const carouselImages = [
    'https://picsum.photos/id/1015/900/400',
    'https://picsum.photos/id/1039/900/400',
    'https://picsum.photos/id/1041/900/400',
    'https://picsum.photos/id/1050/900/400',
    'https://www.savoredjourneys.com/wp-content/uploads/2014/09/bora-bora-beach.jpg',
    'https://media.cntraveler.com/photos/598339c9b7a86962e8e27c5d/master/w_1200,c_limit/Paris_GettyImages-601763009.jpg',
    'https://content.skyscnr.com/m/3fa1c24e3955f94f/original/GettyImages-525508231.jpg?resize=1800px:1800px&quality=100',
    'https://i.natgeofe.com/n/8eba070d-14e5-4d07-8bab-9db774029063/93080_4x3.jpg'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const shuffleArray = (array) => {
    let newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  const handleShuffleImages = () => {
    const shuffled = shuffleArray(carouselImages);
    const newIndex = shuffled.indexOf(carouselImages[currentImageIndex]);
    setCurrentImageIndex(newIndex !== -1 ? newIndex : 0);
  };

  const baseTextStyle = {
    fontFamily: 'Raleway, sans-serif',
    color: lightText,
    lineHeight: '1.8',
    fontSize: '1.1rem',
  };

  const sectionHeadingStyle = {
    fontFamily: 'Raleway, sans-serif',
    fontSize: '2.5rem',
    marginBottom: '25px',
    fontWeight: '700',
  };

  const gradientText = {
    background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: `1px 1px 4px rgba(255, 100, 0, 0.4)`,
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/login', label: 'Login' },
    { path: '/signup', label: 'Sign Up' },
  ];

  return (
    <div style={{ backgroundColor: darkBg, minHeight: '100vh', paddingBottom: '50px' }}>
      <nav
        style={{
          backgroundColor: '#282828',
          padding: '20px 60px',
          borderRadius: '15px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'Raleway, sans-serif',
          boxShadow: '0 10px 20px rgba(255, 77, 77, 0.2)',
          margin: '25px auto 50px',
          maxWidth: '95%',
          width: '900px',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <h1
          style={{
            ...sectionHeadingStyle,
            fontSize: '2.2rem',
            margin: 0,
            marginRight: 'auto',
            ...gradientText,
            textShadow: '1px 1px 3px rgba(255, 100, 0, 0.4)',
          }}
        >
          Ultimate Travel Guide
        </h1>

        <div style={{ display: 'flex', gap: '30px' }}>
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              style={{
                color: primaryColor,
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.15rem',
                transition: 'color 0.3s ease, transform 0.2s ease',
              }}
              onMouseEnter={e => {
                e.target.style.color = secondaryColor;
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.target.style.color = primaryColor;
                e.target.style.transform = 'translateY(0)';
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>

      <div
        style={{
          maxWidth: '900px',
          margin: '50px auto',
          borderRadius: '15px',
          overflow: 'hidden',
          boxShadow: '0 10px 20px rgba(0,0,0,0.4)',
          position: 'relative',
          backgroundColor: '#282828',
        }}
      >
        {carouselImages.length > 0 && (
          <img
            src={carouselImages[currentImageIndex]}
            alt="Travel Destination"
            style={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
              borderRadius: '15px',
              display: 'block',
            }}
          />
        )}
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '15px',
          }}
        >
          <button
            onClick={handlePrevImage}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: primaryColor,
              color: 'white',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease, transform 0.2s ease',
              boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = secondaryColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = primaryColor)}
          >
            Previous
          </button>
          <button
            onClick={handleShuffleImages}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: `2px solid ${lightText}`,
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: lightText,
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease, color 0.3s ease, transform 0.2s ease, border-color 0.3s ease',
              boxShadow: '0 3px 10px rgba(0,0,0,0.4)',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = secondaryColor;
              e.target.style.color = darkBg;
              e.target.style.borderColor = secondaryColor;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'rgba(0,0,0,0.5)';
              e.target.style.color = lightText;
              e.target.style.borderColor = lightText;
            }}
          >
            Shuffle
          </button>
          <button
            onClick={handleNextImage}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: primaryColor,
              color: 'white',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease, transform 0.2s ease',
              boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = secondaryColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = primaryColor)}
          >
            Next
          </button>
        </div>
      </div>

      <main style={{ padding: '0 20px', ...baseTextStyle, display: 'flex', flexDirection: 'column', gap: '50px' }}>
        <section style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: '#222',
          boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
          textAlign: 'center',
        }}>
          <h2 style={{ ...sectionHeadingStyle, ...gradientText, fontSize: '2.5rem', marginBottom: '15px' }}>Your Journey, Redefined. Plan Smarter, Travel Happier.</h2>
          <p style={{ ...baseTextStyle, fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
            Tired of endless travel planning and missed opportunities? We simplify every step, from
            discovering hidden gems to navigating new cities, so you can focus on making unforgettable memories.
          </p>
        </section>

        <section style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: '#222',
          boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
        }}>
          <h2 style={{ ...sectionHeadingStyle, ...gradientText, textAlign: 'left', fontSize: '2.2rem' }}>Why Choose Us?</h2>
          <p style={{ ...baseTextStyle, textAlign: 'left', fontSize: '1.05rem' }}>
            We combine cutting-edge travel planning tools with real-time maps, AI assisted
            planning, searching, and deal-finding to aid you in finding the right
            trip for you. Our platform is designed to make your dream vacation a seamless reality.
          </p>
        </section>

        <section style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: '#222',
          boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
          textAlign: 'center',
        }}>
          <h2 style={{ ...sectionHeadingStyle, ...gradientText, fontSize: '2.2rem' }}>How It Works</h2>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', flexWrap: 'wrap', gap: '30px', marginTop: '30px' }}>
            <div style={{ flex: '1 1 200px', padding: '15px', borderRadius: '8px', backgroundColor: '#2a2a2a' }}>
              <h3 style={{ ...baseTextStyle, color: primaryColor, fontSize: '1.2rem', marginBottom: '10px' }}>1. Plan Your Adventure</h3>
              <p style={{ ...baseTextStyle, fontSize: '0.95rem', lineHeight: '1.5' }}>Use our intuitive tools to outline your next trip.</p>
            </div>
            <div style={{ flex: '1 1 200px', padding: '15px', borderRadius: '8px', backgroundColor: '#2a2a2a' }}>
              <h3 style={{ ...baseTextStyle, color: primaryColor, fontSize: '1.2rem', marginBottom: '10px' }}>2. AI Assistance</h3>
              <p style={{ ...baseTextStyle, fontSize: '0.95rem', lineHeight: '1.5' }}>Get smart recommendations for destinations & activities.</p>
            </div>
            <div style={{ flex: '1 1 200px', padding: '15px', borderRadius: '8px', backgroundColor: '#2a2a2a' }}>
              <h3 style={{ ...baseTextStyle, color: primaryColor, fontSize: '1.2rem', marginBottom: '10px' }}>3. Navigate with Ease</h3>
              <p style={{ ...baseTextStyle, fontSize: '0.95rem', lineHeight: '1.5' }}>Our maps guide you every step of the way.</p>
            </div>
          </div>
        </section>

        <section style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: '#222',
          boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
        }}>
          <h2 style={{ ...sectionHeadingStyle, ...gradientText, textAlign: 'left', fontSize: '2.2rem' }}>Features</h2>
          <ul style={{ ...baseTextStyle, paddingLeft: '25px', fontSize: '1.05rem' }}>
            <li style={{ marginBottom: '10px' }}>Real-time maps using Leaflet Map API for precise navigation.</li>
            <li style={{ marginBottom: '10px' }}>Built-in AI assistance to find the best trips, and activities for you.</li>
            <li style={{ marginBottom: '10px' }}>Save your past maps with your account to view them later on.</li>
            <li style={{ marginBottom: '10px' }}>Free service with full functionaility.</li>
            <li style={{ marginBottom: '10px' }}>Maps/destinations are comparable by weather.</li>
            <li style={{ marginBottom: '10px' }}>Shows weather for the next 5 days in your desired location.</li>
            <li style={{ marginBottom: '10px' }}>AI assistance to help find the best deals on the market.</li>
          </ul>
        </section>

        <section style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: '#222',
          boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
          textAlign: 'center',
        }}>
          <h2 style={{ ...sectionHeadingStyle, ...gradientText, fontSize: '2.2rem' }}>Latest Travel Tips</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
            <Link to="/blog/article-1" style={{ ...baseTextStyle, color: primaryColor, textDecoration: 'none', fontSize: '1.05rem', transition: 'color 0.2s ease' }}
                  onMouseEnter={e => e.target.style.color = secondaryColor}
                  onMouseLeave={e => e.target.style.color = primaryColor}>
              5 Must-Visit Destinations for Solo Travelers
            </Link>
            <Link to="/blog/article-2" style={{ ...baseTextStyle, color: primaryColor, textDecoration: 'none', fontSize: '1.05rem', transition: 'color 0.2s ease' }}
                  onMouseEnter={e => e.target.style.color = secondaryColor}
                  onMouseLeave={e => e.target.color = primaryColor}>
              How Our AI Can Find You Cheaper Flights
            </Link>
            <Link to="/blog/article-3" style={{ ...baseTextStyle, color: primaryColor, textDecoration: 'none', fontSize: '1.05rem', transition: 'color 0.2s ease' }}
                  onMouseEnter={e => e.target.style.color = secondaryColor}
                  onMouseLeave={e => e.target.style.color = primaryColor}>
              Navigating Uncharted Territory: A Map Guide
            </Link>
          </div>
          <Link to="/blog" style={{ ...baseTextStyle, display: 'inline-block', marginTop: '30px', color: secondaryColor, textDecoration: 'none', fontWeight: 'bold', transition: 'color 0.2s ease' }}
                onMouseEnter={e => e.target.style.color = primaryColor}
                onMouseLeave={e => e.target.style.color = secondaryColor}>
            View All Articles &rarr;
          </Link>
        </section>


        <section style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '30px',
          borderRadius: '15px',
          backgroundColor: '#2a2a2a',
          boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
          textAlign: 'center',
          border: `1px solid ${secondaryColor}`,
        }}>
          <h2 style={{ ...sectionHeadingStyle, ...gradientText, marginBottom: '25px', fontSize: '2.5rem' }}>Ready to Explore?</h2>
          <p style={{ ...baseTextStyle, marginBottom: '40px', fontSize: '1.2rem' }}>
            It’s completely free to sign up and explore. Start planning your next adventure with
            Ultimate Travel Guide now! Don’t just dream it. Go live it.
          </p>
          <Link
            to="/signup"
            style={{
              display: 'inline-block',
              marginTop: '0px',
              padding: '18px 36px',
              background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
              borderRadius: '12px',
              color: darkBg,
              fontWeight: 'bold',
              fontSize: '1.3rem',
              textDecoration: 'none',
              transition: 'transform 0.3s, box-shadow 0.4s',
              letterSpacing: '0.07em',
              boxShadow: '0 5px 15px rgba(255, 77, 77, 0.3)',
            }}
            onMouseEnter={e => {
              e.target.style.transform = 'translateY(-5px) scale(1.03)';
              e.target.style.boxShadow = '0 10px 25px rgba(255, 165, 0, 0.5)';
            }}
            onMouseLeave={e => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 5px 15px rgba(255, 77, 77, 0.3)';
            }}
          >
            Sign Up Now!
          </Link>
        </section>
      </main>

      <footer style={{
        backgroundColor: '#282828',
        padding: '30px 20px',
        marginTop: '50px',
        textAlign: 'center',
        fontFamily: 'Raleway, sans-serif',
        color: lightText,
        borderRadius: '15px',
        maxWidth: '900px',
        margin: '50px auto 25px',
        boxShadow: '0 -5px 15px rgba(0,0,0,0.2)',
      }}>
        <div style={{ marginBottom: '20px' }}>
          <Link to="/privacy" style={{ ...baseTextStyle, color: primaryColor, textDecoration: 'none', margin: '0 15px' }}
                onMouseEnter={e => e.target.style.color = secondaryColor} onMouseLeave={e => e.target.style.color = primaryColor}>
            Privacy Policy
          </Link>
          <Link to="/terms" style={{ ...baseTextStyle, color: primaryColor, textDecoration: 'none', margin: '0 15px' }}
                onMouseEnter={e => e.target.style.color = secondaryColor} onMouseLeave={e => e.target.style.color = primaryColor}>
            Terms of Service
          </Link>
          <Link to="/contact" style={{ ...baseTextStyle, color: primaryColor, textDecoration: 'none', margin: '0 15px' }}
                onMouseEnter={e => e.target.style.color = secondaryColor} onMouseLeave={e => e.target.style.color = primaryColor}>
            Contact Us
          </Link>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ ...baseTextStyle, color: lightText, margin: '0 10px', textDecoration: 'none', transition: 'color 0.3s ease' }}
             onMouseEnter={e => e.target.style.color = primaryColor} onMouseLeave={e => e.target.style.color = lightText}>
            Facebook
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ ...baseTextStyle, color: lightText, margin: '0 10px', textDecoration: 'none', transition: 'color 0.3s ease' }}
             onMouseEnter={e => e.target.style.color = primaryColor} onMouseLeave={e => e.target.style.color = lightText}>
            Instagram
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ ...baseTextStyle, color: lightText, margin: '0 10px', textDecoration: 'none', transition: 'color 0.3s ease' }}
             onMouseEnter={e => e.target.style.color = primaryColor} onMouseLeave={e => e.target.style.color = lightText}>
            X (Twitter)
          </a>
        </div>
        <p style={{ ...baseTextStyle, fontSize: '0.9rem', marginBottom: '0' }}>&copy; {new Date().getFullYear()} Ultimate Travel Guide. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;