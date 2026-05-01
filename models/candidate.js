const mongoose = require('mongoose');
const User = require('./user');

// ==========================
// Define the candidate schema
// ==========================
const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    party: {
        type: String,
        required: true
    },

    age: {
        type: Number,        // ✅ Fixed: was String
        required: true
    },

    votes: [
        {
            User: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            votedAt: {
                type: Date,
                default: Date.now  // ✅ Fixed: removed () parentheses
            }
        }
    ],

    voteCount: {
        type: Number,
        default: 0
    }
});


const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;