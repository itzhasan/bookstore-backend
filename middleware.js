const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.ACCESS_TOKEN_SECRET;
const isAuthenticated = (req, res, next) => {
    // Get token from header
    const token = req.header('token');
  
    // Check if token is present
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      // Verify token
      const decoded = jwt.verify(token, secretKey);
      req.user = decoded.user;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Token is not valid' });
    }
  };
  module.exports = isAuthenticated;