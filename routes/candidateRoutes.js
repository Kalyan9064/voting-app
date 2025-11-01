const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate');
const { jwtAuthMiddleware } = require('../jwt');
const User = require('../models/user');

// ==========================
// Helper Function — Check if user is admin
// ==========================
const checkAdminRole = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user && user.role === 'admin';
  } catch (err) {
    console.error('Error checking admin role:', err);
    return false;
  }
};

// ==========================
// POST - Add a new candidate (Admin Only)
// ==========================
router.post('/', jwtAuthMiddleware, async (req, res) => {
  try {
    const isAdmin = await checkAdminRole(req.user.id);
    if (!isAdmin)
      return res.status(403).json({ message: 'User does not have admin role' });

    const data = req.body;
    const newCandidate = new Candidate(data);
    const savedCandidate = await newCandidate.save();

    console.log('Candidate saved successfully');
    res.status(201).json(savedCandidate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ==========================
// PUT - Update candidate (Admin Only)
// ==========================
router.put('/:candidateID', jwtAuthMiddleware, async (req, res) => {
  try {
    const isAdmin = await checkAdminRole(req.user.id);
    if (!isAdmin)
      return res.status(403).json({ message: 'User does not have admin role' });

    const candidateID = req.params.candidateID;
    const updateData = req.body;

    const updatedCandidate = await Candidate.findByIdAndUpdate(candidateID, updateData, {
      new: true,
      runValidators: true
    });

    if (!updatedCandidate)
      return res.status(404).json({ error: 'Candidate not found' });

    console.log('Candidate updated:', candidateID);
    res.status(200).json(updatedCandidate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ==========================
// DELETE - Remove a candidate by ID (Admin Only)
// ==========================
router.delete('/:candidateID', jwtAuthMiddleware, async (req, res) => {
  try {
    const isAdmin = await checkAdminRole(req.user.id);
    if (!isAdmin)
      return res.status(403).json({ message: 'User does not have admin role' });

    const candidateID = req.params.candidateID;
    const deletedCandidate = await Candidate.findByIdAndDelete(candidateID);

    if (!deletedCandidate)
      return res.status(404).json({ error: 'Candidate not found' });

    console.log('Candidate deleted');
    res.status(200).json({ message: 'Candidate deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ==========================
// GET - Fetch all candidates (Public)
// ==========================
router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ==========================
// POST - Vote for a candidate (Voter Only)
// ==========================
router.post('/vote/:candidateID', jwtAuthMiddleware, async (req, res) => {
  try {
    const candidateID = req.params.candidateID;
    const userId = req.user.id;

    // Find candidate
    const candidate = await Candidate.findById(candidateID);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent multiple votes
    if (user.idVoted) {
      return res.status(400).json({ message: 'User has already voted' });
    }

    // Prevent admin voting
    if (user.role === 'admin') {
      return res.status(403).json({ message: 'Admin cannot vote' });
    }

    // Record vote
    candidate.votes.push({ User: userId });
    candidate.voteCount++;
    await candidate.save();

    // Mark user as voted
    user.idVoted = true;
    await user.save();

    return res.status(200).json({ message: 'Vote recorded successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ==========================
// GET - Vote Count Results
// ==========================
router.get('/vote/count', async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ voteCount: -1 });

    const results = candidates.map((c) => ({
      name: c.name,
      party: c.party,
      votes: c.voteCount
    }));

    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
