/* eslint-disable radix */
const express = require('express');
const db = require('../models');

const router = express.Router();

// eslint-disable-next-line no-unused-vars
const {
  // Student,
  // Staff,
  // Subject,
  // Application,
  // Group,
  // Member,
  // eslint-disable-next-line no-unused-vars
  Attendance,
  // Timeslot,
  // Availability
} = db.sequelize.models;

module.exports = () => {
  // ROUTES HERE
  router.get('/', async (req, res) => [res.send('/attendance/ - get')]);
  return router;
};
