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


const VALID_COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia (Plurinational State of)", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Democratic Republic of the)", "Congo (Republic of the)", "Costa Rica", "Côte d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czechia", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Holy See", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea (Democratic People's Republic of)", "Korea (Republic of)", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia (Federated States of)", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine (State of)", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syrian Arab Republic", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom","UK", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela (Bolivarian Republic of)", "Viet Nam", "Yemen", "Zambia", "Zimbabwe"
];

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
  "Afghanistan":{ lat: 33.9391, lng: 67.7100 }, "Albania":{ lat: 41.1533, lng: 20.1683 }, "Algeria":{ lat: 28.0339, lng: 1.6596 }, "Andorra":{ lat: 42.5063, lng: 1.5218 }, "Angola":{ lat: -11.2027, lng: 17.8739 }, "Anguilla":{ lat: 18.2206, lng: -63.0686 }, "Antigua & Barbuda":{ lat: 17.0608, lng: -61.7964 }, "Armenia":{ lat: 40.0691, lng: 45.0382 }, "Aruba":{ lat: 12.5211, lng: -69.9683 }, "Austria":{ lat: 47.5162, lng: 14.5501 }, "Azerbaijan":{ lat: 40.1431, lng: 47.5769 }, "Bahamas":{ lat: 25.0343, lng: -77.3963 }, "Bahrain":{ lat: 25.9304, lng: 50.6378 }, "Bangladesh":{ lat: 23.6850, lng: 90.3563 }, "Barbados":{ lat: 13.1939, lng: -59.5432 }, "Belarus":{ lat: 53.7098, lng: 27.9534 }, "Belgium":{ lat: 50.5039, lng: 4.4699 }, "Belize":{ lat: 17.1899, lng: -88.4976 }, "Benin":{ lat: 9.3077, lng: 2.3158 }, "Bermuda":{ lat: 32.3078, lng: -64.7505 }, "Bhutan":{ lat: 27.5142, lng: 90.4336 }, "Bolivia":{ lat: -16.2902, lng: -63.5887 }, "Bosnia & Herzegovina":{ lat: 43.9159, lng: 17.6791 }, "Botswana":{ lat: -22.3285, lng: 24.6849 }, "British Virgin Islands":{ lat: 18.4207, lng: -64.6399 }, "Brunei":{ lat: 4.5353, lng: 114.7277 }, "Bulgaria":{ lat: 42.7339, lng: 25.4858 }, "Burkina Faso":{ lat: 12.2383, lng: -1.5616 }, "Burundi":{ lat: -3.3733, lng: 29.9189 }, "Cambodia":{ lat: 12.5657, lng: 104.9910 }, "Cameroon":{ lat: 7.3697, lng: 12.3547 }, "Cape Verde":{ lat: 16.5388, lng: -23.0418 }, "Cayman Islands":{ lat: 19.3133, lng: -81.2546 }, "Chad":{ lat: 15.4542, lng: 18.7322 }, "Chile":{ lat: -35.6751, lng: -71.5430 }, "Colombia":{ lat: 4.5709, lng: -74.2973 }, "Congo":{ lat: -0.2280, lng: 15.8277 }, "Cook Islands":{ lat: -21.2333, lng: -159.7667 }, "Costa Rica":{ lat: 9.7489, lng: -83.7534 }, "Cote D Ivoire":{ lat: 7.5399, lng: -5.5471 }, "Croatia":{ lat: 45.1, lng: 15.2 }, "Cruise Ship":{ lat: 0, lng: 0 }, "Cuba":{ lat: 21.5218, lng: -77.7812 }, "Cyprus":{ lat: 35.1264, lng: 33.4299 }, "Czech Republic":{ lat: 49.8175, lng: 15.4730 }, "Denmark":{ lat: 56.2639, lng: 9.5018 }, "Djibouti":{ lat: 11.8251, lng: 42.5903 }, "Dominica":{ lat: 15.4150, lng: -61.3710 }, "Dominican Republic":{ lat: 18.7357, lng: -70.1627 }, "Ecuador":{ lat: -1.8312, lng: -78.1834 }, "El Salvador":{ lat: 13.7942, lng: -88.8965 }, "Equatorial Guinea":{ lat: 1.6500, lng: 10.2679 }, "Estonia":{ lat: 58.5953, lng: 25.0136 }, "Ethiopia":{ lat: 9.1450, lng: 40.4897 }, "Falkland Islands":{ lat: -51.7963, lng: -59.5236 }, "Faroe Islands":{ lat: 61.8926, lng: -6.9118 }, "Fiji":{ lat: -17.7134, lng: 178.0650 }, "Finland":{ lat: 61.9241, lng: 25.7482 }, "French Polynesia":{ lat: -17.6797, lng: -149.4068 }, "French West Indies":{ lat: 16.2650, lng: -61.5510 }, "Gabon":{ lat: -0.2280, lng: 11.6055 }, "Gambia":{ lat: 13.4432, lng: -15.3101 }, "Georgia":{ lat: 42.3154, lng: 43.3569 }, "Ghana":{ lat: 7.9465, lng: -1.0232 }, "Gibraltar":{ lat: 36.1408, lng: -5.3536 }, "Greece":{ lat: 39.0742, lng: 21.8243 }, "Greenland":{ lat: 71.7069, lng: -42.6043 }, "Grenada":{ lat: 12.1165, lng: -61.6790 }, "Guam":{ lat: 13.4443, lng: 144.7937 }, "Guatemala":{ lat: 15.7835, lng: -90.2308 }, "Guernsey":{ lat: 49.4657, lng: -2.5853 }, "Guinea":{ lat: 9.9456, lng: -9.6966 }, "Guinea Bissau":{ lat: 11.8037, lng: -15.1804 }, "Guyana":{ lat: 4.8604, lng: -58.9302 }, "Haiti":{ lat: 18.9712, lng: -72.2852 }, "Honduras":{ lat: 15.2000, lng: -86.2419 }, "Hong Kong":{ lat: 22.3193, lng: 114.1694 }, "Hungary":{ lat: 47.1625, lng: 19.5033 }, "Iceland":{ lat: 64.9631, lng: -19.0208 }, "Indonesia":{ lat: -0.7893, lng: 113.9213 }, "Iran":{ lat: 32.4279, lng: 53.6880 }, "Iraq":{ lat: 33.2232, lng: 43.6793 }, "Ireland":{ lat: 53.4129, lng: -8.2439 }, "Isle of Man":{ lat: 54.2361, lng: -4.5481 }, "Israel":{ lat: 31.0461, lng: 34.8516 }, "Jamaica":{ lat: 18.1096, lng: -77.2975 }, "Jersey":{ lat: 49.2138, lng: -2.1312 }, "Jordan":{ lat: 30.5852, lng: 36.2384 }, "Kazakhstan":{ lat: 48.0196, lng: 66.9237 }, "Kenya":{ lat: -0.0236, lng: 37.9062 }, "Kuwait":{ lat: 29.3117, lng: 47.4818 }, "Kyrgyz Republic":{ lat: 41.2044, lng: 74.7661 }, "Laos":{ lat: 19.8563, lng: 102.4955 }, "Latvia":{ lat: 56.8796, lng: 24.6032 }, "Lebanon":{ lat: 33.8547, lng: 35.8623 }, "Lesotho":{ lat: -29.6100, lng: 28.2336 }, "Liberia":{ lat: 6.4281, lng: -9.4295 }, "Libya":{ lat: 26.3351, lng: 17.2283 }, "Liechtenstein":{ lat: 47.1660, lng: 9.5554 }, "Lithuania":{ lat: 55.1694, lng: 23.8813 }, "Luxembourg":{ lat: 49.8153, lng: 6.1296 }, "Macau":{ lat: 22.1987, lng: 113.5439 }, "Macedonia":{ lat: 41.6086, lng: 21.7453 }, "Madagascar":{ lat: -18.7669, lng: 46.8691 }, "Malawi":{ lat: -13.2543, lng: 34.3015 }, "Malaysia":{ lat: 4.2105, lng: 101.9758 }, "Maldives":{ lat: 3.2028, lng: 73.2207 }, "Mali":{ lat: 17.5707, lng: -3.9962 }, "Malta":{ lat: 35.9375, lng: 14.3754 }, "Mauritania":{ lat: 21.0079, lng: -10.9408 }, "Mauritius":{ lat: -20.3484, lng: 57.5522 }, "Moldova":{ lat: 47.4116, lng: 28.3699 }, "Monaco":{ lat: 43.7384, lng: 7.4246 }, "Mongolia":{ lat: 46.8625, lng: 103.8467 }, "Montenegro":{ lat: 42.7087, lng: 19.3744 }, "Montserrat":{ lat: 16.7425, lng: -62.1874 }, "Morocco":{ lat: 31.7917, lng: -7.0926 }, "Mozambique":{ lat: -18.6657, lng: 35.5296 }, "Namibia":{ lat: -22.9576, lng: 18.4904 }, "Nepal":{ lat: 28.3949, lng: 84.1240 }, "Netherlands":{ lat: 52.1326, lng: 5.2913 }, "Netherlands Antilles":{ lat: 12.2000, lng: -68.7000 }, "New Caledonia":{ lat: -20.9043, lng: 165.6181 }, "Nicaragua":{ lat: 12.8654, lng: -85.2072 }, "Niger":{ lat: 17.6078, lng: 8.0817 }, "Nigeria":{ lat: 9.0820, lng: 8.6753 }, "Norway":{ lat: 60.4720, lng: 8.4689 }, "Oman":{ lat: 21.5125, lng: 55.9232 }, "Pakistan":{ lat: 30.3753, lng: 69.3451 }, "Palestine":{ lat: 31.9522, lng: 35.2332 }, "Panama":{ lat: 8.5380, lng: -80.7821 }, "Papua New Guinea":{ lat: -6.3150, lng: 143.9555 }, "Paraguay":{ lat: -23.4425, lng: -58.4438 }, "Peru":{ lat: -9.1900, lng: -75.0152 }, "Philippines":{ lat: 12.8797, lng: 121.7740 }, "Poland":{ lat: 51.9194, lng: 19.1451 }, "Portugal": { lat: 39.3999, lng: -8.2245 },
  "Puerto Rico":{ lat: 18.2208, lng: -66.5901 }, "Qatar":{ lat: 25.3548, lng: 51.1839 }, "Reunion":{ lat: -21.1151, lng: 55.5364 }, "Romania":{ lat: 45.9432, lng: 24.9668 }, "Russia":{ lat: 61.5240, lng: 105.3188 }, "Rwanda":{ lat: -1.9403, lng: 29.8739 }, "Saint Pierre & Miquelon":{ lat: 46.8852, lng: -56.3159 }, "Samoa":{ lat: -13.7590, lng: -172.1046 }, "San Marino":{ lat: 43.9424, lng: 12.4578 }, "Satellite":{ lat: 0, lng: 0 }, "Saudi Arabia":{ lat: 23.8859, lng: 45.0792 }, "Senegal":{ lat: 14.4974, lng: -14.4524 }, "Serbia":{ lat: 44.0165, lng: 21.0059 }, "Seychelles":{ lat: -4.6796, lng: 55.4920 }, "Sierra Leone":{ lat: 8.4606, lng: -11.7799 }, "Singapore":{ lat: 1.3521, lng: 103.8198 }, "Slovakia":{ lat: 48.6690, lng: 19.6990 }, "Slovenia":{ lat: 46.1512, lng: 14.9955 }, "South Korea":{ lat: 35.9078, lng: 127.7669 }, "Spain":{ lat: 40.4637, lng: -3.7492 }, "Sri Lanka":{ lat: 7.8731, lng: 80.7718 }, "St Kitts & Nevis":{ lat: 17.3578, lng: -62.7828 }, "St Lucia":{ lat: 13.9094, lng: -60.9789 }, "St Vincent":{ lat: 13.2500, lng: -61.2000 }, "St. Lucia":{ lat: 13.9094, lng: -60.9789 }, "Sudan":{ lat: 12.8628, lng: 30.2176 }, "Suriname":{ lat: 3.9193, lng: -56.0278 }, "Swaziland":{ lat: -26.5225, lng: 31.4659 }, "Sweden":{ lat: 60.1282, lng: 18.6435 }, "Switzerland":{ lat: 46.8182, lng: 8.2275 }, "Syria":{ lat: 34.8021, lng: 38.9968 }, "Taiwan":{ lat: 23.6978, lng: 120.9605 }, "Tajikistan":{ lat: 38.8610, lng: 71.2761 }, "Tanzania":{ lat: -6.3690, lng: 34.8888 }, "Thailand":{ lat: 15.8700, lng: 100.9925 }, "Timor L'Este":{ lat: -8.8742, lng: 125.7275 }, "Togo":{ lat: 8.6195, lng: 0.8248 }, "Tonga":{ lat: -20.2976, lng: -174.8018 }, "Trinidad & Tobago":{ lat: 10.6918, lng: -61.2225 }, "Tunisia":{ lat: 33.8869, lng: 9.5375 }, "Turkey":{ lat: 38.9637, lng: 35.2433 }, "Turkmenistan":{ lat: 38.9697, lng: 59.5563 }, "Turks & Caicos":{ lat: 21.6940, lng: -71.7979 }, "Uganda":{ lat: 1.3733, lng: 32.2903 }, "Ukraine":{ lat: 48.3794, lng: 31.1656 }, "United Arab Emirates":{ lat: 23.4241, lng: 53.8478 }, "Uruguay":{ lat: -32.5228, lng: -55.7658 }, "Uzbekistan":{ lat: 41.3775, lng: 64.5853 }, "Venezuela":{ lat: 6.4238, lng: -66.5897 }, "Vietnam":{ lat: 14.0583, lng: 108.2772 }, "Virgin Islands (US)":{ lat: 18.3358, lng: -64.8963 }, "Yemen":{ lat: 15.5527, lng: 48.5164 }, "Zambia":{ lat: -13.1339, lng: 27.8493 }, "Zimbabwe":{ lat: -19.0154, lng: 29.1549 }
};


const callGeminiAI = async (prompt) => {
  const chatHistory = [{ role: 'user', parts: [{ text: prompt }] }];
  const payload = {
    contents: chatHistory,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            name: { type: "STRING" },
            description: { type: "STRING" },
            latitude: { type: "NUMBER" },
            longitude: { type: "NUMBER" }
          },
          required: ["name", "description", "latitude", "longitude"]
        }
      }
    }
  };

  const apiKey = "AIzaSyAs3Xd_p5GEp_-cymEpt6crf8831eyNg4Y";
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API Error Response:", errorText);
      throw new Error(`AI API request failed with status ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    if (result.candidates?.[0]?.content?.parts?.[0]) {
      try {
        return JSON.parse(result.candidates[0].content.parts[0].text);
      } catch (parseError) {
        console.error("Failed to parse AI response as JSON:", parseError);
        throw new Error('AI returned invalid JSON format. Check AI response structure.');
      }
    }
    throw new Error('AI did not return valid content or candidates.');
  } catch (apiError) {
    console.error("Network or API call error:", apiError);
    throw apiError; 
  }
};

function CountryDetailsPage() {
  const [countryInput, setCountryInput] = useState('');
  const [displayMessage, setDisplayMessage] = useState('What Country have You Decided?');
  const [isValidCountry, setIsValidCountry] = useState(false);
  const [chosenCountry, setChosenCountry] = useState(null);

  const [loadingAI, setLoadingAI] = useState(false);
  const [aiError, setAiError] = useState(null);


  const [placesToVisit, setPlacesToVisit] = useState([]);
  const [activitiesToDo, setActivitiesToDo] = useState([]);

  const navigate = useNavigate();

  const fetchRecommendationsFromAI = async (country) => {
    setLoadingAI(true);
    setAiError(null);
    setPlacesToVisit([]);
    setActivitiesToDo([]);

    try {
  
      const placesPrompt = `List 10 popular places to visit in ${country}, with a very brief description (max 2-3 sentences), their approximate latitude, and their approximate longitude. Provide the response as a JSON array of objects, where each object has "name", "description", "latitude", and "longitude" properties.`;
      const placesData = await callGeminiAI(placesPrompt);
      setPlacesToVisit(placesData);
      console.log("AI-recommended places stored:", placesData);


      const activitiesPrompt = `List 5 popular activities to do in ${country}, with a very brief description (max 2-3 sentences), their approximate latitude, and their approximate longitude (e.g., coordinates of a central point for the activity if exact point is hard). Provide the response as a JSON array of objects, where each object has "name", "description", "latitude", and "longitude" properties.`;
      const activitiesData = await callGeminiAI(activitiesPrompt);
      setActivitiesToDo(activitiesData);
      console.log("AI-recommended activities stored:", activitiesData);

    } catch (err) {
      console.error("Error fetching AI recommendations:", err);
      setAiError("Failed to get recommendations from AI. Please try again: " + err.message);
      setPlacesToVisit([]);
      setActivitiesToDo([]);
    } finally {
      setLoadingAI(false);
    }
  };

  const handleChooseCountry = () => {
    const trimmedInput = countryInput.trim();
    if (!trimmedInput) {
      setDisplayMessage('Please enter a country name.');
      setIsValidCountry(false);
      setChosenCountry(null);
      setPlacesToVisit([]);
      setActivitiesToDo([]);
      return;
    }

    const normalizedInput = trimmedInput.toLowerCase();

    const foundCountry = VALID_COUNTRIES.find(
      country => country.toLowerCase() === normalizedInput
    );

    const finalCountry = foundCountry || (normalizedInput === 'uk' ? 'United Kingdom' : null);


    if (finalCountry) {
      setDisplayMessage(`You've chosen: ${finalCountry}`);
      setIsValidCountry(true);
      setChosenCountry(finalCountry);
      fetchRecommendationsFromAI(finalCountry);
    } else {
      setDisplayMessage(`"${trimmedInput}" is not a recognized country. Please try again.`);
      setIsValidCountry(false);
      setChosenCountry(null);
      setPlacesToVisit([]);
      setActivitiesToDo([]);
    }
  };


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleChooseCountry();
    }
  };

  const handleSaveMap = () => {
    if (chosenCountry && (placesToVisit.length > 0 || activitiesToDo.length > 0)) {
      const savedMaps = JSON.parse(localStorage.getItem('savedMaps')) || [];
      const newMapEntry = {
        id: Date.now(),
        country: chosenCountry,
        places: placesToVisit,    
        activities: activitiesToDo, 
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('savedMaps', JSON.stringify([...savedMaps, newMapEntry]));
      alert(`Trip plan for ${chosenCountry} saved successfully!`);
    } else {
      alert("Please choose a country and generate recommendations/activities before saving.");
    }
  };

  const allMapPoints = [...placesToVisit, ...activitiesToDo].filter(
    point => typeof point.latitude === 'number' && typeof point.longitude === 'number' &&
             point.latitude >= -90 && point.latitude <= 90 && 
             point.longitude >= -180 && point.longitude <= 180
  );

  const initialMapCenter = chosenCountry && COUNTRY_COORDINATES[chosenCountry]
    ? [COUNTRY_COORDINATES[chosenCountry].lat, COUNTRY_COORDINATES[chosenCountry].lng]
    : [20, 0];

  const initialZoom = chosenCountry ? 5 : 2;

  return (
    <div style={pageStyle}>
      <h1 style={headingStyle}>Plan Your Trip!!</h1>

      <p style={{ ...messageStyle, color: isValidCountry ? '#8B0000' : '#FF5349' }}>
        {displayMessage}
      </p>

      <div style={inputContainerStyle}>
        <input
          type="text"
          value={countryInput}
          onChange={(e) => setCountryInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="UK, Japan, Italy..."
          style={inputStyle}
        />
        <button onClick={handleChooseCountry} style={buttonStyle}>
          Choose Country
        </button>
      </div>

      {chosenCountry && (
        <div style={recommendationsBoxStyle}>
          <h2 style={recommendationsHeadingStyle}>Your Trip Plan for {chosenCountry}:</h2>

          {loadingAI ? (
            <p style={loadingMessageStyle}>Getting recommendations and activities...</p>
          ) : aiError ? (
            <p style={errorMessageStyle}>{aiError}</p>
          ) : (
            <>

              {placesToVisit.length > 0 && (
                <>
                  <h3 style={{color: '#4682B4', fontSize: '1.4rem', marginTop: '1rem', marginBottom: '0.8rem'}}>10 Places to Visit:</h3>
                  <ul style={{listStyleType: 'decimal', paddingLeft: '20px', color: '#87CEEB'}}>
                    {placesToVisit.map((place, index) => (
                      <li key={`place-${index}`} style={{marginBottom: '10px'}}>
                        <strong>{place.name}</strong>: {place.description}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {activitiesToDo.length > 0 && (
                <>
                  <h3 style={{color: '#DC143C', fontSize: '1.4rem', marginTop: '1.5rem', marginBottom: '0.8rem'}}>5 Activities to Do:</h3>
                  <ul style={{listStyleType: 'decimal', paddingLeft: '20px', color: '#FA8072'}}>
                    {activitiesToDo.map((activity, index) => (
                      <li key={`activity-${index}`} style={{marginBottom: '10px'}}>
                        <strong>{activity.name}</strong>: {activity.description}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {(placesToVisit.length > 0 || activitiesToDo.length > 0) && (
                <button onClick={handleSaveMap} style={{...buttonStyle, backgroundColor: '#1E90FF', marginTop: '2rem'}}>
                  Save This Trip Plan
                </button>
              )}
            </>
          )}
        </div>
      )}

      {chosenCountry && allMapPoints.length > 0 && !loadingAI && !aiError && (
        <div style={mapContainerStyle}>
          <MapContainer
            center={initialMapCenter}
            zoom={initialZoom}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%', borderRadius: '8px' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {allMapPoints.map((point, index) => (
              <Marker key={`marker-${index}`} position={[point.latitude, point.longitude]}>
                <Popup>
                  <strong>{point.name}</strong><br />
                  {point.description}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}

      <button onClick={() => navigate('/login-home')} style={backButtonStyle}>
        Back to Homepage
      </button>
    </div>
  );
}


const pageStyle = {
  fontFamily:"Raleway",
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: '2rem',
  boxSizing: 'border-box',
  fontFamily: 'sans-serif',
  backgroundColor: '#000000',
  color: 'white',
  textAlign: 'center'
};

const headingStyle = {
  fontFamily:"Raleway",
  fontSize: '2.5rem',
  marginBottom: '1.5rem',
  color: '#FFA500'
};

const messageStyle = {
  fontFamily:"Raleway",
  fontSize: '1.2rem',
  maxWidth: '600px',
  lineHeight: '1.6',
  marginBottom: '2rem',
};

const inputContainerStyle = {
  fontFamily:"Raleway",
  display: 'flex',
  gap: '1rem',
  marginBottom: '2.5rem',
  width: '100%',
  maxWidth: '500px',
  justifyContent: 'center',

};

const inputStyle = {
  fontFamily:"Raleway",
  flex: '1 1 250px',
  maxWidth: '350px',
  padding: '0.75rem 1rem',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '1rem',
  boxSizing: 'border-box',
  color:"white",
  backgroundColor:"black"
};

const buttonStyle = {
  fontFamily:"Raleway",
  padding: '0.75rem 1.5rem',
  border: 'none',
  backgroundColor: '#FF5349',
  color: 'white',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '1rem',
  transition: 'background-color 0.3s ease'
};

const backButtonStyle = {
  fontFamily:"Raleway",
  padding: '0.8rem 1.8rem',
  border: 'none',
  backgroundColor: '#4caf50',
  color: 'white',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '1.1rem',
  transition: 'background-color 0.3s ease',
  marginTop: '3rem'
};

const recommendationsBoxStyle = {
  fontFamily:"Raleway",
  backgroundColor: '#4B4B4B',
  padding: '2rem',
  borderRadius: '10px',
  width: '90%',
  maxWidth: '800px',
  margin: '2rem 0',
  textAlign: 'left',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

const recommendationsHeadingStyle = {
  fontFamily:"Raleway",
  fontSize: '1.8rem',
  color: '#FFA500',
  marginBottom: '1.5rem',
  textAlign: 'center'
};

const loadingMessageStyle = {
  fontFamily:"Raleway",
  fontSize: '1.1rem',
  color: '#D4AF37'
};

const errorMessageStyle = {
  fontFamily:"Raleway",
  fontSize: '1.1rem',
  color: '#FF5349'
};


const mapContainerStyle = {
  fontFamily:"Raleway",
  height: '500px',
  width: '100%',
  marginTop: '2rem',
  borderRadius: '8px',
  overflow: 'hidden'
};

export default CountryDetailsPage;