const mongoose = require('mongoose'); // Import Mongoose for MongoDB
//const passport = require('passport'); // Import Passport (for authentication, not used directly here)

// ==========================
// Define the person schema
// ==========================
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    email: {
        type: String,
    },

    mobile: {
        type: String,
    },
    address: {
        type: String,
        required: true
    },
    aadharCardNumber: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        required: true,
        type: String,
    },

    role: {
        type: String,
        enum: ['voter', 'admin'],
        default: 'voter'

    },

    idVoted: {
        type: Boolean,
        default: false
    }

});


const User = mongoose.model('User', userSchema);

// Export the model so it can be used in other files (e.g., routes, authentication)
module.exports = User;