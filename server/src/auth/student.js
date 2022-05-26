/* eslint-disable func-names */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = function student(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.authentication.jwtSecret);
    req.student = decoded.student;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
