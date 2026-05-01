const jwt = require('jsonwebtoken'); // Import jsonwebtoken library

// ==========================
// JWT Authentication Middleware
// ==========================
const jwtAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization; // Extract the Authorization header

    // ✅ Check if the header exists
    if (!authHeader) {
        return res.status(401).json({ error: "Authorization header missing" });
    }

    // ✅ Split and check token format
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: "Token missing or malformed" });
    }

    try {
        // Verify the JWT token using the secret from .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach decoded user info to the request object
        req.user = decoded;

        // Continue to next middleware or route handler
        next();
    } catch (err) {
        console.error("JWT verification failed:", err.message);
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};

// ==========================
// Function to generate JWT token
// ==========================
const generateToken = (userData) => {
    // userData can include user ID, role, etc.
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '1h' }); // optional expiry
};

// Export both the middleware and token generator
module.exports = { jwtAuthMiddleware, generateToken };
