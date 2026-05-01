const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const { jwtAuthMiddleware, generateToken } = require('./../jwt');
const bcrypt = require('bcrypt');

// ==========================
// POST - Sign Up (Register New User)
// ==========================
router.post('/signup', async (req, res) => {
  try {
    const data = req.body;

    // ✅ Fixed: duplicate check BEFORE hashing
    const existingUser = await User.findOne({
      $or: [
        { aadharCardNumber: data.aadharCardNumber },
        ...(data.email ? [{ email: data.email }] : [])  // ✅ Fixed: only check email if provided
      ]
    });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // ✅ Check if admin already exists (only one admin allowed)
    if (data.role === 'admin') {
      const existingAdmin = await User.findOne({ role: 'admin' });
      if (existingAdmin) {
        return res.status(400).json({ message: 'Admin already exists. Only one admin allowed.' });
      }
    }

    // ✅ Hash password after all checks pass
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    // ✅ Create new user
    const newUser = new User(data);
    const savedUser = await newUser.save();
    console.log('✅ User saved successfully');

    const payload = {
      id: savedUser._id,
      role: savedUser.role,
    };

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

    const user = await User.findOne({ aadharCardNumber });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.password) {
      return res.status(500).json({ error: 'Password missing in database' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const payload = {
      id: user._id,
      role: user.role,
    };

    const token = generateToken(payload);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        name: user.name,
        aadharCardNumber: user.aadharCardNumber,
        role: user.role,
      }
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
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