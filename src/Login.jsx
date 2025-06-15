import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './main.css';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const GOOGLE_CLIENT_ID = '273395712269-jpl8t38b3t9kvk2m3gprondmv92u9rm9.apps.googleusercontent.com';

  const GOOGLE_LOGIN_BACKEND_ENDPOINT = 'http://localhost:5000/api/auth/google/login';
  useEffect(() => {

    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleLoginSuccess, 
      });

    }
  }, []);

 
  const handleGoogleLoginSuccess = async (response) => {
    const idToken = response.credential;
    console.log("Google ID Token received:", idToken);

    try {
      const backendResponse = await fetch(GOOGLE_LOGIN_BACKEND_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      const data = await backendResponse.json();

      if (backendResponse.ok) {
        setError("");
        console.log("Backend response (Google Login):", data);

        navigate('/login-home');
      } else {
        setError(data.message || "Google login failed on server.");
        console.error("Backend Error (Google Login):", data);
      }
    } catch (err) {
      setError("Network error or issue communicating with backend.");
      console.error("Error sending token to backend:", err);
    }
  };

  const handleEmailPasswordLogin = async () => {

    const raw = localStorage.getItem("accounts");
    const accounts = raw ? JSON.parse(raw) : [];

    const match = accounts.find(acc => acc.email === email && acc.password === password);

    if (match) {
      setError("");
      navigate('/login-home');
    } else {
      setError("Invalid email or password.");
    }
  };

  const buttonStyle = {
    backgroundColor: "#ff4122"
  };

  const googleButtonStyle = {
    backgroundColor: "#4285F4", 
    color: "white",
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
    width: "100%",
    boxSizing: "border-box"
  };

  const googleIconStyle = {
    marginRight: "10px",
    width: "20px",
    height: "20px",
  };

  return (
    <div className="container">
      <h1 id="loging">Login</h1>

      <label htmlFor="emailInput">Email:</label>
      <input
        type="email"
        id="emailInput"
        placeholder="abc123@domain.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <label htmlFor="passwordInput">Password:</label>
      <input
        type="password"
        id="passwordInput"
        placeholder="••••••••"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button style={buttonStyle} onClick={handleEmailPasswordLogin}>Log In</button>

      {error && <p className="warning">{error}</p>}

      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <p>OR</p>
      </div>

      <div
        id="googleSignInButton"
        style={googleButtonStyle}
        onClick={() => {
          if (window.google) {
            window.google.accounts.id.prompt();
          }
        }}
      >
        <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google logo" style={googleIconStyle} />
        Log in with Google
      </div>

    </div>
  );
};

export default Login;