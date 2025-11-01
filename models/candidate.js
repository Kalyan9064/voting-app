const mongoose = require('mongoose'); // Import Mongoose for MongoDB
const User = require('./user');
//const passport = require('passport'); // Import Passport (for authentication, not used directly here)

// ==========================
// Define the person schema
// ==========================
const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    party:{
        type: String,
        required: true
    },

    age: {
        type: String,
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
                default: Date.now()
            }
        }
    ],

    voteCount: {
        type: Number,
        default: 0
    }


});


const Candidate = mongoose.model('Candidate', candidateSchema);

// Export the model so it can be used in other files (e.g., routes, authentication)
module.exports = Candidate;