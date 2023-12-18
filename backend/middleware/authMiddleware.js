const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const db = require('../db');


// Authentication middleware
const authenticateUser = asyncHandler(async (req, res, next) => {
    // Assume you have a middleware that extracts the JWT from the request headers
    const token = extractTokenFromHeaders(req);

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized, no token' });
    }

    try {
        // Verify the token and attach the decoded user information to the request
        const decoded = jwt.verify(token, 'samplekey');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
});

// Authorization middleware for admin
const authorizeAdmin = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.username === 'admin@gmail.com') {
        next();
    } else {
        return res.status(403).json({ error: 'Forbidden - Admin access required' });
    }
});

// Authorization middleware for user
const authorizeUser = asyncHandler(async (req, res, next) => {
    // Check if the user is updating their own account
    console.log(req.params.id, req.user.id)
    if (req.user.id && req.params.id && req.params.id == req.user.id) {
        next();
    } else {
        return res.status(403).json({ error: 'Forbidden - You can only update your own account' });
    }
});

const extractTokenFromHeaders = (req) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return null; // No Authorization header present
    }

    const [bearer, token] = authorizationHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
        return null; // Invalid Authorization header format
    }

    return token;
};


module.exports = { authenticateUser, authorizeAdmin, authorizeUser };