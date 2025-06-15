import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const redIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 38"><path fill="#DC143C" d="M19 0c-9.5 0-17 7.5-17 17s17 21 17 21 17-11.5 17-21-7.5-17-17-17z"/><circle fill="#FFFFFF" cx="19" cy="17" r="3"/></svg>',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});


const COUNTRY_COORDINATES = {
  'United States': { lat: 39.8283, lng: -98.5795 },
  'Canada': { lat: 56.1304, lng: -106.3468 },
  'Mexico': { lat: 23.6345, lng: -102.5528 },
  'Brazil': { lat: -14.2350, lng: -51.9253 },
  'Argentina': { lat: -34.6037, lng: -58.3816 },
  'United Kingdom': { lat: 55.3781, lng: -3.4360 },
  'UK': { lat: 55.3781, lng: -3.4360 }, 
  'France': { lat: 46.603354, lng: 1.888334 },
  'Germany': { lat: 51.1657, lng: 10.4515 },
  'Italy': { lat: 41.8719, lng: 12.5674 },
  'Spain': { lat: 40.4637, lng: -3.7492 },
  'Portugal': { lat: 39.3999, lng: -8.2245 },
  'China': { lat: 35.8617, lng: 104.1954 },
  'Japan': { lat: 36.2048, lng: 138.2529 },
  'India': { lat: 20.5937, lng: 78.9629 },
  'Australia': { lat: -25.2744, lng: 133.7751 },
  'New Zealand': { lat: -40.9006, lng: 174.8860 },
  'Egypt': { lat: 26.8206, lng: 30.8025 },
  'South Africa': { lat: -30.5595, lng: 22.9375 },
  "Afghanistan":{ lat: 33.9391, lng: 67.7100 }, "Albania":{ lat: 41.1533, lng: 20.1683 }, "Algeria":{ lat: 28.0339, lng: 1.6596 }, "Andorra":{ lat: 42.5063, lng: 1.5218 }, "Angola":{ lat: -11.2027, lng: 17.8739 }, "Anguilla":{ lat: 18.2206, lng: -63.0686 }, "Antigua & Barbuda":{ lat: 17.0608, lng: -61.7964 }, "Armenia":{ lat: 40.0691, lng: 45.0382 }, "Aruba":{ lat: 12.5211, lng: -69.9683 }, "Austria":{ lat: 47.5162, lng: 14.5501 }, "Azerbaijan":{ lat: 40.1431, lng: 47.5769 }, "Bahamas":{ lat: 25.0343, lng: -77.3963 }, "Bahrain":{ lat: 25.9304, lng: 50.6378 }, "Bangladesh":{ lat: 23.6850, lng: 90.3563 }, "Barbados":{ lat: 13.1939, lng: -59.5432 }, "Belarus":{ lat: 53.7098, lng: 27.9534 }, "Belgium":{ lat: 50.5039, lng: 4.4699 }, "Belize":{ lat: 17.1899, lng: -88.4976 }, "Benin":{ lat: 9.3077, lng: 2.3158 }, "Bermuda":{ lat: 32.3078, lng: -64.7505 }, "Bhutan":{ lat: 27.5142, lng: 90.4336 }, "Bolivia":{ lat: -16.2902, lng: -63.5887 }, "Bosnia & Herzegovina":{ lat: 43.9159, lng: 17.6791 }, "Botswana":{ lat: -22.3285, lng: 24.6849 }, "British Virgin Islands":{ lat: 18.4207, lng: -64.6399 }, "Brunei":{ lat: 4.5353, lng: 114.7277 }, "Bulgaria":{ lat: 42.7339, lng: 25.4858 }, "Burkina Faso":{ lat: 12.2383, lng: -1.5616 }, "Burundi":{ lat: -3.3733, lng: 29.9189 }, "Cambodia":{ lat: 12.5657, lng: 104.9910 }, "Cameroon":{ lat: 7.3697, lng: 12.3547 }, "Cape Verde":{ lat: 16.5388, lng: -23.0418 }, "Cayman Islands":{ lat: 19.3133, lng: -81.2546 }, "Chad":{ lat: 15.4542, lng: 18.7322 }, "Chile":{ lat: -35.6751, lng: -71.5430 }, "Colombia":{ lat: 4.5709, lng: -74.2973 }, "Congo":{ lat: -0.2280, lng: 15.8277 }, "Cook Islands":{ lat: -21.2333, lng: -159.7667 }, "Costa Rica":{ lat: 9.7489, lng: -83.7534 }, "Cote D Ivoire":{ lat: 7.5399, lng: -5.5471 }, "Croatia":{ lat: 45.1, lng: 15.2 }, "Cruise Ship":{ lat: 0, lng: 0 }, "Cuba":{ lat: 21.5218, lng: -77.7812 }, "Cyprus":{ lat: 35.1264, lng: 33.4299 }, "Czech Republic":{ lat: 49.8175, lng: 15.4730 }, "Denmark":{ lat: 56.2639, lng: 9.5018 }, "Djibouti":{ lat: 11.8251, lng: 42.5903 }, "Dominica":{ lat: 15.4150, lng: -61.3710 }, "Dominican Republic":{ lat: 18.7357, lng: -70.1627 }, "Ecuador":{ lat: -1.8312, lng: -78.1834 }, "El Salvador":{ lat: 13.7942, lng: -88.8965 }, "Equatorial Guinea":{ lat: 1.6500, lng: 10.2679 }, "Estonia":{ lat: 58.5953, lng: 25.0136 }, "Ethiopia":{ lat: 9.1450, lng: 40.4897 }, "Falkland Islands":{ lat: -51.7963, lng: -59.5236 }, "Faroe Islands":{ lat: 61.8926, lng: -6.9118 }, "Fiji":{ lat: -17.7134, lng: 178.0650 }, "Finland":{ lat: 61.9241, lng: 25.7482 }, "French Polynesia":{ lat: -17.6797, lng: -149.4068 }, "French West Indies":{ lat: 16.2650, lng: -61.5510 }, "Gabon":{ lat: -0.2280, lng: 11.6055 }, "Gambia":{ lat: 13.4432, lng: -15.3101 }, "Georgia":{ lat: 42.3154, lng: 43.3569 }, "Ghana":{ lat: 7.9465, lng: -1.0232 }, "Gibraltar":{ lat: 36.1408, lng: -5.3536 }, "Greece":{ lat: 39.0742, lng: 21.8243 }, "Greenland":{ lat: 71.7069, lng: -42.6043 }, "Grenada":{ lat: 12.1165, lng: -61.6790 }, "Guam":{ lat: 13.4443, lng: 144.7937 }, "Guatemala":{ lat: 15.7835, lng: -90.2308 }, "Guernsey":{ lat: 49.4657, lng: -2.5853 }, "Guinea":{ lat: 9.9456, lng: -9.6966 }, "Guinea Bissau":{ lat: 11.8037, lng: -15.1804 }, "Guyana":{ lat: 4.8604, lng: -58.9302 }, "Haiti":{ lat: 18.9712, lng: -72.2852 }, "Honduras":{ lat: 15.2000, lng: -86.2419 }, "Hong Kong":{ lat: 22.3193, lng: 114.1694 }, "Hungary":{ lat: 47.1625, lng: 19.5033 }, "Iceland":{ lat: 64.9631, lng: -19.0208 }, "Indonesia":{ lat: -0.7893, lng: 113.9213 }, "Iran":{ lat: 32.4279, lng: 53.6880 }, "Iraq":{ lat: 33.2232, lng: 43.6793 }, "Ireland":{ lat: 53.4129, lng: -8.2439 }, "Isle of Man":{ lat: 54.2361, lng: -4.5481 }, "Israel":{ lat: 31.0461, lng: 34.8516 }, "Jamaica":{ lat: 18.1096, lng: -77.2975 }, "Jersey":{ lat: 49.2138, lng: -2.1312 }, "Jordan":{ lat: 30.5852, lng: 36.2384 }, "Kazakhstan":{ lat: 48.0196, lng: 66.9237 }, "Kenya":{ lat: -0.0236, lng: 37.9062 }, "Kuwait":{ lat: 29.3117, lng: 47.4818 }, "Kyrgyz Republic":{ lat: 41.2044, lng: 74.7661 }, "Laos":{ lat: 19.8563, lng: 102.4955 }, "Latvia":{ lat: 56.8796, lng: 24.6032 }, "Lebanon":{ lat: 33.8547, lng: 35.8623 }, "Lesotho":{ lat: -29.6100, lng: 28.2336 }, "Liberia":{ lat: 6.4281, lng: -9.4295 }, "Libya":{ lat: 26.3351, lng: 17.2283 }, "Liechtenstein":{ lat: 47.1660, lng: 9.5554 }, "Lithuania":{ lat: 55.1694, lng: 23.8813 }, "Luxembourg":{ lat: 49.8153, lng: 6.1296 }, "Macau":{ lat: 22.1987, lng: 113.5439 }, "Macedonia":{ lat: 41.6086, lng: 21.7453 }, "Madagascar":{ lat: -18.7669, lng: 46.8691 }, "Malawi":{ lat: -13.2543, lng: 34.3015 }, "Malaysia":{ lat: 4.2105, lng: 101.9758 }, "Maldives":{ lat: 3.2028, lng: 73.2207 }, "Mali":{ lat: 17.5707, lng: -3.9962 }, "Malta":{ lat: 35.9375, lng: 14.3754 }, "Mauritania":{ lat: 21.0079, lng: -10.9408 }, "Mauritius":{ lat: -20.3484, lng: 57.5522 }, "Moldova":{ lat: 47.4116, lng: 28.3699 }, "Monaco":{ lat: 43.7384, lng: 7.4246 }, "Mongolia":{ lat: 46.8625, lng: 103.8467 }, "Montenegro":{ lat: 42.7087, lng: 19.3744 }, "Montserrat":{ lat: 16.7425, lng: -62.1874 }, "Morocco":{ lat: 31.7917, lng: -7.0926 }, "Mozambique":{ lat: -18.6657, lng: 35.5296 }, "Namibia":{ lat: -22.9576, lng: 18.4904 }, "Nepal":{ lat: 28.3949, lng: 84.1240 }, "Netherlands":{ lat: 52.1326, lng: 5.2913 }, "Netherlands Antilles":{ lat: 12.2000, lng: -68.7000 }, "New Caledonia":{ lat: -20.9043, lng: 165.6181 }, "Nicaragua":{ lat: 12.8654, lng: -85.2072 }, "Niger":{ lat: 17.6078, lng: 8.0817 }, "Nigeria":{ lat: 9.0820, lng: 8.6753 }, "Norway":{ lat: 60.4720, lng: 8.4689 }, "Oman":{ lat: 21.5125, lng: 55.9232 }, "Pakistan":{ lat: 30.3753, lng: 69.3451 }, "Palestine":{ lat: 31.9522, lng: 35.2332 }, "Panama":{ lat: 8.5380, lng: -80.7821 }, "Papua New Guinea":{ lat: -6.3150, lng: 143.9555 }, "Paraguay":{ lat: -23.4425, lng: -58.4438 }, "Peru":{ lat: -9.1900, lng: -75.0152 }, "Philippines":{ lat: 12.8797, lng: 121.7740 }, "Poland":{ lat: 51.9194, lng: 19.1451 },
  "Puerto Rico":{ lat: 18.2208, lng: -66.5901 }, "Qatar":{ lat: 25.3548, lng: 51.1839 }, "Reunion":{ lat: -21.1151, lng: 55.5364 }, "Romania":{ lat: 45.9432, lng: 24.9668 }, "Russia":{ lat: 61.5240, lng: 105.3188 }, "Rwanda":{ lat: -1.9403, lng: 29.8739 }, "Saint Pierre & Miquelon":{ lat: 46.8852, lng: -56.3159 }, "Samoa":{ lat: -13.7590, lng: -172.1046 }, "San Marino":{ lat: 43.9424, lng: 12.4578 }, "Satellite":{ lat: 0, lng: 0 }, "Saudi Arabia":{ lat: 23.8859, lng: 45.0792 }, "Senegal":{ lat: 14.4974, lng: -14.4524 }, "Serbia":{ lat: 44.0165, lng: 21.0059 }, "Seychelles":{ lat: -4.6796, lng: 55.4920 }, "Sierra Leone":{ lat: 8.4606, lng: -11.7799 }, "Singapore":{ lat: 1.3521, lng: 103.8198 }, "Slovakia":{ lat: 48.6690, lng: 19.6990 }, "Slovenia":{ lat: 46.1512, lng: 14.9955 }, "South Korea":{ lat: 35.9078, lng: 127.7669 }, "Sri Lanka":{ lat: 7.8731, lng: 80.7718 }, "St Kitts & Nevis":{ lat: 17.3578, lng: -62.7828 }, "St Lucia":{ lat: 13.9094, lng: -60.9789 }, "St Vincent":{ lat: 13.2500, lng: -61.2000 }, "St. Lucia":{ lat: 13.9094, lng: -60.9789 }, "Sudan":{ lat: 12.8628, lng: 30.2176 }, "Suriname":{ lat: 3.9193, lng: -56.0278 }, "Swaziland":{ lat: -26.5225, lng: 31.4659 }, "Sweden":{ lat: 60.1282, lng: 18.6435 }, "Switzerland":{ lat: 46.8182, lng: 8.2275 }, "Syria":{ lat: 34.8021, lng: 38.9968 }, "Taiwan":{ lat: 23.6978, lng: 120.9605 }, "Tajikistan":{ lat: 38.8610, lng: 71.2761 }, "Tanzania":{ lat: -6.3690, lng: 34.8888 }, "Thailand":{ lat: 15.8700, lng: 100.9925 }, "Timor L'Este":{ lat: -8.8742, lng: 125.7275 }, "Togo":{ lat: 8.6195, lng: 0.8248 }, "Tonga":{ lat: -20.2976, lng: -174.8018 }, "Trinidad & Tobago":{ lat: 10.6918, lng: -61.2225 }, "Tunisia":{ lat: 33.8869, lng: 9.5375 }, "Turkey":{ lat: 38.9637, lng: 35.2433 }, "Turkmenistan":{ lat: 38.9697, lng: 59.5563 }, "Turks & Caicos":{ lat: 21.6940, lng: -71.7979 }, "Uganda":{ lat: 1.3733, lng: 32.2903 }, "Ukraine":{ lat: 48.3794, lng: 31.1656 }, "United Arab Emirates":{ lat: 23.4241, lng: 53.8478 }, "Uruguay":{ lat: -32.5228, lng: -55.7658 }, "Uzbekistan":{ lat: 41.3775, lng: 64.5853 }, "Venezuela":{ lat: 6.4238, lng: -66.5897 }, "Vietnam":{ lat: 14.0583, lng: 108.2772 }, "Virgin Islands (US)":{ lat: 18.3358, lng: -64.8963 }, "Yemen":{ lat: 15.5527, lng: 48.5164 }, "Zambia":{ lat: -13.1339, lng: 27.8493 }, "Zimbabwe":{ lat: -19.0154, lng: 29.1549 }
};

function MyPlacesPage() {
  const [savedMaps, setSavedMaps] = useState([]);
  const [selectedForComparison, setSelectedForComparison] = useState([]); 
  const navigate = useNavigate();
  const [expandedMapId, setExpandedMapId] = useState(null);

  useEffect(() => {
    const storedMaps = JSON.parse(localStorage.getItem('savedMaps')) || [];
    storedMaps.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setSavedMaps(storedMaps);
  }, []);

  const handleDeleteMap = (idToDelete) => {
    if (window.confirm("Are you sure you want to delete this saved map?")) {
      const updatedMaps = savedMaps.filter(map => map.id !== idToDelete);
      localStorage.setItem('savedMaps', JSON.stringify(updatedMaps));
      setSavedMaps(updatedMaps);
      if (expandedMapId === idToDelete) {
        setExpandedMapId(null);
      }
      setSelectedForComparison(prevSelected => prevSelected.filter(id => id !== idToDelete));
    }
  };

  const toggleMapExpansion = (id) => {
    setExpandedMapId(expandedMapId === id ? null : id);
  };

  const getMapCenter = (country) => {
    return COUNTRY_COORDINATES[country]
      ? [COUNTRY_COORDINATES[country].lat, COUNTRY_COORDINATES[country].lng]
      : [20, 0]; 
  };

  const handleFlightAdviceClick = (country) => {
    navigate('/weather-test', { state: { country: country } });
  };

  const handleSelectForComparison = (id) => {
    setSelectedForComparison(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(selectedId => selectedId !== id);
      } else {
        if (prevSelected.length < 2) {
          return [...prevSelected, id];
        } else {
          alert("You can only select up to two places for comparison.");
          return prevSelected; 
        }
      }
    });
  };

  const handleCompareButtonClick = () => {
    if (selectedForComparison.length === 2) {
      const [id1, id2] = selectedForComparison;
      const country1 = savedMaps.find(map => map.id === id1)?.country;
      const country2 = savedMaps.find(map => map.id === id2)?.country;

      if (country1 && country2) {
        navigate('/compare-places', { state: { country1, country2 } });
        setSelectedForComparison([]); 
      } else {
        alert("Could not find selected countries for comparison.");
      }
    } else {
      alert("Please select exactly two places to compare.");
    }
  };


  return (
    <div style={myPlacesPageStyle}>
      <h1 style={myPlacesHeadingStyle}>My Saved Trips</h1>

      {savedMaps.length === 0 ? (
        <p style={noSavedMapsMessageStyle}>You haven't saved any maps yet. Go back and plan a trip!</p>
      ) : (
        <div style={savedMapsGridStyle}>
          {savedMaps.map((mapEntry) => {
            const allMapPoints = [
              ...(mapEntry.places || []), 
              ...(mapEntry.activities || []) 
            ].filter(
              point => typeof point.latitude === 'number' && typeof point.longitude === 'number' &&
                       point.latitude >= -90 && point.latitude <= 90 && 
                       point.longitude >= -180 && point.longitude <= 180
            );

            return (
              <div key={mapEntry.id} style={savedMapCardStyle}>
                <h2 style={savedMapCardHeadingStyle}>{mapEntry.country}</h2>
                <p style={savedMapCardDateStyle}>Saved on: {new Date(mapEntry.timestamp).toLocaleDateString()}</p>

                {(mapEntry.places && mapEntry.places.length > 0) && (
                  <>
                    <h3 style={{...savedMapPlacesHeadingStyle, color: '#4682B4'}}>Places to Visit:</h3>
                    <ul style={{...savedMapPlacesListStyle, color: '#87CEEB'}}>
                      {mapEntry.places.map((place, index) => (
                        <li key={`place-${mapEntry.id}-${index}`}>
                          <strong>{place.name}</strong>: {place.description}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {(mapEntry.activities && mapEntry.activities.length > 0) && (
                  <>
                    <h3 style={{...savedMapPlacesHeadingStyle, color: '#DC143C'}}>Activities to Do:</h3>
                    <ul style={{...savedMapPlacesListStyle, color: '#FA8072'}}>
                      {mapEntry.activities.map((activity, index) => (
                        <li key={`activity-${mapEntry.id}-${index}`}>
                          <strong>{activity.name}</strong>: {activity.description}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <div style={compareSelectionStyle}>
                  <input
                    type="checkbox"
                    id={`compare-checkbox-${mapEntry.id}`}
                    checked={selectedForComparison.includes(mapEntry.id)}
                    onChange={() => handleSelectForComparison(mapEntry.id)}
                    disabled={selectedForComparison.length === 2 && !selectedForComparison.includes(mapEntry.id)}
                    style={{cursor: 'pointer'}} 
                  />
                  <label htmlFor={`compare-checkbox-${mapEntry.id}`} style={compareLabelStyle}>
                    Select to Compare
                  </label>
                </div>


                <button
                  onClick={() => handleFlightAdviceClick(mapEntry.country)}
                  style={flightAdviceButtonStyle}
                >
                  Show Weather
                </button>
                
                {(allMapPoints.length > 0) && (
                  <button
                    onClick={() => toggleMapExpansion(mapEntry.id)}
                    style={toggleMapButtonStyle}
                  >
                    {expandedMapId === mapEntry.id ? 'Hide Map' : 'Show Map'}
                  </button>
                )}

                {expandedMapId === mapEntry.id && (
                  <div style={mapContainerStyleMini}>
                    <MapContainer
                      center={getMapCenter(mapEntry.country)}
                      zoom={5} 
                      scrollWheelZoom={true}
                      style={{ height: '100%', width: '100%', borderRadius: '8px' }}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                    
                      {allMapPoints.map((point, index) => (
                        <Marker
                          key={`marker-${mapEntry.id}-${index}`}
                          position={[point.latitude, point.longitude]}
                          icon={point.type === 'activity' ? redIcon : defaultIcon} 
                        >
                          <Popup>
                            <strong>{point.name}</strong><br />
                            {point.description}
                          </Popup>
                        </Marker>
                      ))}
                    </MapContainer>
                  </div>
                )}

                <button
                  onClick={() => handleDeleteMap(mapEntry.id)}
                  style={deleteMapButtonStyle}
                >
                  Delete Map
                </button>
              </div>
            );
          })}
        </div>
      )}


      {savedMaps.length > 0 && (
        <button
          onClick={handleCompareButtonClick}
          style={compareButtonStyle}
          disabled={selectedForComparison.length !== 2} 
        >
          Compare Selected Places ({selectedForComparison.length}/2)
        </button>
      )}

      <button onClick={() => navigate('/login-home')} style={backToHomeButtonStyle}>
        Back to Plan a Trip
      </button>
    </div>
  );
}


const myPlacesPageStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
  padding: '2rem',
  boxSizing: 'border-box',
  fontFamily:"Raleway",
  backgroundColor: '#000000',
  color: 'white',
  textAlign: 'center'
};

const myPlacesHeadingStyle = {
  fontFamily:"Raleway",
  fontSize: '3rem',
  marginBottom: '2rem',
  color: '#FFA500'
};

const noSavedMapsMessageStyle = {
  fontFamily:"Raleway",
  fontSize: '1.5rem',
  color: '#BBB',
  marginTop: '3rem'
};

const savedMapsGridStyle = {
  fontFamily:"Raleway",
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '2rem',
  width: '100%',
  maxWidth: '1200px',
  marginTop: '2rem'
};

const savedMapCardStyle = {
  fontFamily:"Raleway",
  backgroundColor: '#4B4B4B',
  padding: '1.5rem',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'left',
  position: 'relative'
};

const savedMapCardHeadingStyle = {
  fontFamily:"Raleway",
  fontSize: '2rem',
  color: '#FFA500',
  marginBottom: '0.5rem'
};

const savedMapCardDateStyle = {
  fontFamily:"Raleway",
  fontSize: '0.9rem',
  color: '#DDD',
  marginBottom: '1rem'
};

const savedMapPlacesHeadingStyle = { 
  fontFamily:"Raleway",
  fontSize: '1.3rem',
  marginBottom: '0.8rem',
  alignSelf: 'flex-start'
};

const savedMapPlacesListStyle = { 
  fontFamily:"Raleway",
  listStyleType: 'disc',
  paddingLeft: '20px',
  marginBottom: '1.5rem',
  alignSelf: 'flex-start',
};

const mapContainerStyleMini = {
  fontFamily:"Raleway",
  height: '300px',
  width: '100%',
  marginTop: '1.5rem',
  borderRadius: '8px',
  overflow: 'hidden',
  border: '1px solid #FFA500'
};

const deleteMapButtonStyle = {
  fontFamily:"Raleway",
  padding: '0.6rem 1.2rem',
  border: 'none',
  backgroundColor: '#FF5349',
  color: 'white',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '0.9rem',
  transition: 'background-color 0.3s ease',
  marginTop: '1.5rem'
};

const toggleMapButtonStyle = {
  fontFamily:"Raleway",
  padding: '0.6rem 1.2rem',
  border: 'none',
  backgroundColor: '#4CAF50',
  color: 'white',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '0.9rem',
  transition: 'background-color 0.3s ease',
  marginTop: '1rem', 
};

const flightAdviceButtonStyle = {
  fontFamily:"Raleway",
  padding: '0.6rem 1.2rem',
  border: 'none',
  backgroundColor: '#007bff', 
  color: 'white',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '0.9rem',
  transition: 'background-color 0.3s ease',
  marginTop: '1rem', 
  marginBottom: '0.5rem', 
};

const backToHomeButtonStyle = {
  fontFamily:"Raleway",
  padding: '1rem 2rem',
  border: 'none',
  backgroundColor: '#6A5ACD',
  color: 'white',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '1.2rem',
  transition: 'background-color 0.3s ease',
  marginTop: '3rem'
};


const compareSelectionStyle = {
  display: 'flex',
  alignItems: 'center',
  marginTop: '1rem',
  marginBottom: '0.5rem',
  color: '#FFF' 
};

const compareLabelStyle = {
  marginLeft: '8px',
  cursor: 'pointer',
  fontSize: '0.9rem',
  userSelect: 'none' 
};

const compareButtonStyle = {
  fontFamily: "Raleway",
  padding: '0.8rem 1.5rem',
  border: 'none',
  backgroundColor: '#FFD700', 
  color: '#333', 
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  transition: 'background-color 0.3s ease, transform 0.2s ease',
  marginTop: '2.5rem',
  marginBottom: '1rem',
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
};

export default MyPlacesPage;