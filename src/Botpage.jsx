import React, { useState, useEffect, useRef } from 'react';
import './Botpage.css';
import { useNavigate } from 'react-router-dom';
import './main.css';

const link = document.createElement("link");
link.href = "https://fonts.googleapis.com/css2?family=Raleway:wght@400;600&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

function Bot() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages([
      {
        role: 'model',
        text: "Hello! I am here to help you decide on a country to visit. What kind of destination are you looking for?"
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
          parts: [{ text: 'You are a helpful travel assistant whose sole purpose is to help users select a country to visit...' }]
        },
        {
          role: 'model',
          parts: [{ text: 'Okay, I understand. I will focus only on helping the user select a country for their trip.' }]
        },
        ...messages.map(msg => ({
          role: msg.role,
          parts: [{ text: msg.text }]
        })),
        { role: 'user', parts: [{ text: userMsg.text }] }
      ];

      const payload = { contents: chatHistory };

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key`,
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
        setMessages(prev => [...prev, { role: 'model', text: 'Error getting AI response.' }]);
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: 'Error connecting to AI.' }]);
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
    backgroundColor: '#000',
    color: '#fff'
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
    border: '2px solid #FFA500',
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
    backgroundColor: '#FF5349',
    alignSelf: 'flex-end',
    color: '#fff'
  };

  const aiMessageStyle = {
    ...messageStyle,
    backgroundColor: '#FFA500',
    alignSelf: 'flex-start',
    color: '#000'
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
    border: '1px solid #FFA500',
    fontSize: '1rem',
    backgroundColor: '#222',
    color: '#fff',
    minHeight: '70px',
    fontFamily: 'Raleway, sans-serif',
    width:"1600px"
  };

  const buttonStyle = {
    padding: '0.8rem 1.5rem',
    border: 'none',
    backgroundColor: loading ? '#888' : '#FFA500',
    color: '#000',
    fontWeight: '600',
    borderRadius: '8px',
    cursor: loading ? 'not-allowed' : 'pointer',
    fontSize: '1rem',
    height: '70px',
    fontFamily: 'Raleway, sans-serif',
    width:"100px"
  };

  const planTripButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#FF5349',
    color: '#fff'
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
            <span>Thinking...</span>
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
          placeholder="Type your message..."
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

export default Bot;
