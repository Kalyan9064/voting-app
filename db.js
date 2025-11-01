const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// ==========================
// Choose which DB to use
// ==========================
// Uncomment the one you want and comment the other

const mongoURL = process.env.MONGODB_URL_LOCAL;   // ⬅️ Use this for LOCAL MongoDB
// const mongoURL = process.env.MONGODB_URL_ATLAS;  // ⬅️ Use this for ATLAS (Cloud)

// ==========================
// Connect to MongoDB
// ==========================
mongoose.connect(mongoURL, {
  useNewUrlParser: true,    // Use new URL parser (required for newer MongoDB versions)
  useUnifiedTopology: true  // Use new server discovery and monitoring engine
});

// Get default connection object
const db = mongoose.connection;

// ==========================
// Event listeners for connection
// ==========================

// Triggered when successfully connected
db.on('connected', () => {
  console.log(`✅ Connected to MongoDB server: ${mongoURL.includes('127.0.0.1') ? 'LOCAL' : 'ATLAS'}`);
});

// Triggered when there is an error connecting
db.on('error', (err) => {
  console.error("❌ MongoDB server connection error:", err);
});

// Triggered when connection is disconnected
db.on('disconnected', () => {
  console.log("⚠️ MongoDB server disconnected");
});

// Export the connection object for use in other files
module.exports = db;
