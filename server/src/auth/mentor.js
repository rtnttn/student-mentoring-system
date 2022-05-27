/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');
const config = require('../config/config');

function mentor(req, res, next) {
  if (!req.student.isMentor) {
    return res.status(403).send('Access Denied');
    // 401 = Unauthorized (no valid token)
    // 403 = Forbidden (valid token, insufficient privileges)
  }
  next();
}

module.exports = mentor;
