/* eslint-disable radix */
// Imports
const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const config = require('./config/config');
// const { sequelize } = require('./models');
const db = require('./models');
const routes = require('./routes');

// Initialize express
const app = express();

// const { Student, Staff, Subject, Application, Group, Member, Attendance, Timeslot, Availability } = db.sequelize.models;

// Data handling middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routing middleware
app.use('/', routes());

// Start server
db.sequelize.sync().then(() => {
  app.listen(config.port, () => console.log(`Server is running on: ${config.port}`));
});
