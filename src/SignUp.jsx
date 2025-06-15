import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './main.css';

const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");

 
  const GOOGLE_CLIENT_ID = '273395712269-jpl8t38b3t9kvk2m3gprondmv92u9rm9.apps.googleusercontent.com';

  const GOOGLE_SIGNUP_BACKEND_ENDPOINT = 'http://localhost:5000/api/auth/google/signup'; 

  useEffect(() => {

    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleSignUpSuccess, 
      });
 
    }
  }, []);


  const handleGoogleSignUpSuccess = async (response) => {
    const idToken = response.credential;
    console.log("Google ID Token received:", idToken);

    try {
      const backendResponse = await fetch(GOOGLE_SIGNUP_BACKEND_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken, username }), 
      });

      const data = await backendResponse.json();

      if (backendResponse.ok) {
        setWarning("");
        console.log("Backend response (Google Sign Up):", data);

        navigate('/login-home');
      } else {
        setWarning(data.message || "Google sign up failed on server.");
        console.error("Backend Error (Google Sign Up):", data);
      }
    } catch (err) {
      setWarning("Network error or issue communicating with backend.");
      console.error("Error sending token to backend:", err);
    }
  };


  const handleSubmit = () => {
    const emailInput = document.getElementById("emailInput");
    const valid = emailInput.checkValidity();
    return valid;
  };

  const saveData = () => {
    const raw = localStorage.getItem("accounts");
    const accounts = raw ? JSON.parse(raw) : [];

    const newAccount = { email, username, password };
    accounts.push(newAccount);
    localStorage.setItem("accounts", JSON.stringify(accounts));
  };

  const handleEmailPasswordSignUp = () => {
    const isValid = handleSubmit();

    if (isValid) {
      saveData(); 
      setWarning("");
      setEmail("");
      setUsername("");
      setPassword("");
      navigate('/login-home');
    } else {
      setWarning("Please enter a valid email address.");
    }
  };

  const orangeStyle = {
    color: "#ff8237"
  };

  const orangeStyle2 = {
    backgroundColor: "#ff8237"
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

      <h1 style={orangeStyle} id="signUp">Sign Up</h1>

      <label htmlFor="emailInput">Email:</label>
      <input
        type="email"
        id="emailInput"
        placeholder="abc123@domain.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <label htmlFor="usernameInput">Username:</label>
      <input
        type="text"
        id="usernameInput"
        placeholder="e.g. Ansh Kamkhalia"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <label htmlFor="passwordInput">Password:</label>
      <input
        type="password"
        id="passwordInput"
        placeholder="••••••••••"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button style={orangeStyle2} onClick={handleEmailPasswordSignUp}>Sign Up</button>

      {warning && <p className="warning">{warning}</p>}

      <p style={{ textAlign: "center", marginTop: "20px" }}>
        OR
      </p>

      <div
        id="googleSignUpButton"
        style={googleButtonStyle}
        onClick={() => {
          if (window.google) {
            window.google.accounts.id.prompt();
          }
        }}
      >
        <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google logo" style={googleIconStyle} />
        Sign Up with Google
      </div>

      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Already have an account? <Link to="/login">Log in here</Link>
      </p>
    </div>
  );
};

export default SignUp;