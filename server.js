const express = require('express'); // Import Express framework
const cors = require('cors'); // ✅ Import once
const app = express(); // Create an Express application
const db = require('./db'); // Import database connection (MongoDB)
require('dotenv').config(); // Load environment variables from .env file

const bodyParser = require('body-parser'); // Middleware to parse JSON request bodies

// ==========================
// ✅ CORS SETUP
// ==========================
app.use(cors({
  origin: 'http://localhost:5173', // your React frontend
  credentials: true,
}));

// ==========================
// Middleware Setup
// ==========================
app.use(bodyParser.json()); // ✅ Parse JSON requests

// ==========================
// Import Routes
// ==========================
const userRoutes = require('./routes/userRoutes'); 
const candidateRoutes = require('./routes/candidateRoutes'); 

// ==========================
// Use Routes
// ==========================
app.use('/user', userRoutes); 
app.use('/candidate', candidateRoutes); 

// ==========================
// Server Start
// ==========================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
