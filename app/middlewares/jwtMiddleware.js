// middlewares/jwtMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const jwtMiddleware = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Assumes 'Bearer <token>'

  if (!token) {
    return res.status(403).json({ message: 'No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded

    req.userData = await User.findByPk(req.user.id);
    if (!req.userData) {
      return res.status(401).json({ message: 'User not found.' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = jwtMiddleware;
