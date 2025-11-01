const express = require('express');
const router = express.Router(); // Create a new router object
const User = require('./../models/user'); // Import Mongoose model
const { jwtAuthMiddleware, generateToken } = require('./../jwt'); // Import JWT functions
const bcrypt = require('bcrypt');

// ==========================
// POST - Sign Up (Register New User)
// ==========================
router.post('/signup', async (req, res) => {
  try {
    const data = req.body; // Get user input from request body

    // ✅ Check if admin already exists (only one admin allowed)
    if (data.role === 'admin') {
      const existingAdmin = await User.findOne({ role: 'admin' });
      if (existingAdmin) {
        return res.status(400).json({ message: 'Admin already exists. Only one admin allowed.' });
      }
    }

    // ✅ Hash password before saving
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    // ✅ Check if user already exists by Aadhaar or Email
    const existingUser = await User.findOne({
      $or: [
        { aadharCardNumber: data.aadharCardNumber },
        { email: data.email }
      ]
    });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // ✅ Create new user
    const newUser = new User(data);
    const savedUser = await newUser.save();
    console.log('✅ User saved successfully');

    // ✅ Include role in payload (IMPORTANT FIX)
    const payload = {
      id: savedUser._id,
      role: savedUser.role,
    };

    // Generate JWT token
    const token = generateToken(payload);
    console.log("Token created:", token);

    // ✅ Remove password before sending response
    const userResponse = savedUser.toObject();
    delete userResponse.password;

    res.status(200).json({ response: userResponse, token: token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ==========================
// POST - Login User
// ==========================
router.post('/login', async (req, res) => {
  try {
    const { aadharCardNumber, password } = req.body;

    if (!aadharCardNumber || !password) {
      return res.status(400).json({ error: 'Aadhar number and password are required' });
    }

    // Find user by Aadhar number
    const user = await User.findOne({ aadharCardNumber });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // ✅ Include role in JWT payload
    const payload = {
      id: user._id,
      role: user.role,
    };

    const token = generateToken(payload);

    res.status(200).json({
      message: 'Login successful',
      token: token,
      user: {
        name: user.name,
        aadharCardNumber: user.aadharCardNumber,
        role: user.role,
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ==========================
// GET - Fetch Profile (Protected)
// ==========================
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ==========================
// PUT - Update Password (Protected)
// ==========================
router.put('/profile/password', jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new password are required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
