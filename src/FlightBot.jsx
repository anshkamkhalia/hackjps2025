import React, { useState, useEffect, useRef } from 'react';
import './Botpage.css';
import { useNavigate } from 'react-router-dom';
import './main.css';

const link = document.createElement("link");
link.href = "https://fonts.googleapis.com/css2?family=Raleway:wght@400;600&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

function FlightBot() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages([
      {
        role: 'model',
        text: "Hey there! ✈️ I can help you find cheap flights.\n\nWhere are you flying from?\nWhere to?\nWhen?\nAnd what’s your price range?"
      }
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const chatHistory = [
        {
          role: 'user',
          parts: [{ text: 'You are a flight search assistant. Ask for travel details and search online for the cheapest flight deals based on the user\'s departure city, destination, dates, and budget. Include URLs if available.' }]
        },
        {
          role: 'model',
          parts: [{ text: 'Got it! I’ll focus on helping users find flights and provide cheap deals with links if I can.' }]
        },
        ...messages.map(msg => ({
          role: msg.role,
          parts: [{ text: msg.text }]
        })),
        { role: 'user', parts: [{ text: userMsg.text }] }
      ];

      const payload = { contents: chatHistory };

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAs3Xd_p5GEp_-cymEpt6crf8831eyNg4Y`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      );

      const result = await response.json();

      const aiMsg = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (aiMsg) {
        setMessages(prev => [...prev, { role: 'model', text: aiMsg }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', text: 'Hmm, I had trouble finding flights just now. Try rephrasing?' }]);
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: '⚠️ Error reaching the flight finder! Try again in a bit.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter' && !loading) sendMessage();
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100vh',
    width: '85vw',
    maxWidth: '1300px',
    margin: '0 auto',
    padding: '2rem',
    boxSizing: 'border-box',
    fontFamily: 'Raleway, sans-serif',
    backgroundColor: '#000000',
    color: '#FF3B3F'
  };

  const chatBoxStyle = {
    flex: 1,
    backgroundColor: '#111',
    borderRadius: '12px',
    padding: '1.5rem',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    marginBottom: '1rem',
    border: '2px solid #FF3B3F',
  };

  const messageStyle = {
    maxWidth: '70%',
    padding: '0.75rem 1rem',
    borderRadius: '16px',
    wordBreak: 'break-word',
    fontSize: '1rem',
    lineHeight: '1.5',
  };

  const userMessageStyle = {
    ...messageStyle,
    backgroundColor: '#FF3B3F',
    alignSelf: 'flex-end',
    color: '#fff'
  };

  const aiMessageStyle = {
    ...messageStyle,
    backgroundColor: '#D90000',
    alignSelf: 'flex-start',
    color: '#fff'
  };

  const inputContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  };

  const inputStyle = {
    flex: 1,
    padding: '1rem',
    borderRadius: '8px',
    border: '1px solid #FF3B3F',
    fontSize: '1rem',
    backgroundColor: '#222',
    color: '#fff',
    minHeight: '70px',
    fontFamily: 'Raleway, sans-serif',
    width: "1600px"
  };

  const buttonStyle = {
    padding: '0.8rem 1.5rem',
    border: 'none',
    backgroundColor: loading ? '#444' : '#FF3B3F',
    color: '#fff',
    fontWeight: '600',
    borderRadius: '8px',
    cursor: loading ? 'not-allowed' : 'pointer',
    fontSize: '1rem',
    height: '70px',
    fontFamily: 'Raleway, sans-serif',
    width: "100px"
  };

  const planTripButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#8B0000'
  };

  return (
    <div style={containerStyle}>
      <div style={chatBoxStyle}>
        {messages.map((msg, idx) => (
          <div key={idx} style={msg.role === 'user' ? userMessageStyle : aiMessageStyle}>
            <span>{msg.text}</span>
          </div>
        ))}
        {loading && (
          <div style={aiMessageStyle}>
            <span>Searching flights...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div style={inputContainerStyle}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="e.g., NYC to Tokyo on July 10 under $800"
          disabled={loading}
          style={inputStyle}
        />
        <button onClick={sendMessage} disabled={loading} style={buttonStyle}>
          Send
        </button>
        <button onClick={() => navigate('/map')} style={planTripButtonStyle}>
          Plan Trip
        </button>
      </div>
    </div>
  );
}

export default FlightBot;
