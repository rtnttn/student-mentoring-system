/* eslint-disable radix */
const express = require('express');
const db = require('../models');

const router = express.Router();

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-empty-pattern
const {
  // Student,
  // Staff,
  // Subject,
  // Application,
  // Group,
  // Member,
  // Attendance,
  // Timeslot,
  // Availability
} = db.sequelize.models;

module.exports = () => {
  // ROUTES HERE
  router.get('/', async (req, res) => {
    res.send('/availability/ - get');
  });
  return router;
};
