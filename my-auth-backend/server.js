
require('dotenv').config();


const express = require('express');
const { OAuth2Client } = require('google-auth-library'); 
const cors = require('cors'); 
const jwt = require('jsonwebtoken');


const app = express();
const PORT = process.env.PORT || 5000; 


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


const users = [];


const generateAuthToken = (user) => {

  return jwt.sign(
    { userId: user.id, email: user.email, googleId: user.googleId }, 
    process.env.JWT_SECRET, 
    { expiresIn: '1h' } 
  );
};


app.use(cors());

app.use(express.json());

app.post('/api/auth/google/login', async (req, res) => {
  const { idToken } = req.body; 


  if (!idToken) {
    return res.status(400).json({ message: 'Google ID Token is missing.' });
  }

  try {

    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: process.env.GOOGLE_CLIENT_ID, 
    });


    const payload = ticket.getPayload();


    let user = users.find(u => u.googleId === googleId); 

    if (!user) {
      
      user = users.find(u => u.email === email);
      if (user && !user.googleId) {

        user.googleId = googleId;
        user.name = name; 
        user.picture = picture;
        console.log(`Linked existing user ${user.email} with Google ID.`);
      } else if (!user) {
   
        user = {
          id: users.length + 1, 
          googleId,
          email,
          name,
          picture,
          createdAt: new Date(),
        };
        users.push(user);
        console.log(`New user created via Google: ${user.email}`);
      }
    } else {
      console.log(`Existing user logged in via Google: ${user.email}`);
      user.name = name; 
      user.picture = picture;
    }

    const authToken = generateAuthToken(user);

    res.status(200).json({
      message: 'Google authentication successful',
      user: { id: user.id, email: user.email, name: user.name, picture: user.picture },
      token: authToken, 
    });

  } catch (error) {

    console.error('Google ID token verification failed:', error);
    res.status(401).json({ message: 'Authentication failed: Invalid Google ID token.' });
  }
});


app.get('/api/protected', (req, res) => {
  res.status(200).json({ message: 'Welcome to the protected area! You are authenticated.' });
});


app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});