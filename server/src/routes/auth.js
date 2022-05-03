/* eslint-disable radix */
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const config = require('../config/config');

const router = express.Router();

// eslint-disable-next-line no-unused-vars
const {
  Student,
  Staff,
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
  // Student login
  // eslint-disable-next-line consistent-return
  router.get('/login/student', async (req, res) => {
    console.log('/auth/login/student - post');
    const { email, password } = req.body;

    try {
      const student = await Student.findOne({ where: { email } });

      if (!student) {
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, student.password);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const payload = {
        student: {
          studentId: student.studentId,
          name: student.name,
          email: student.email,
          isMentor: student.isMentor,
        },
      };

      jwt.sign(payload, config.authentication.jwtSecret, { expiresIn: '7d' }, (error, token) => {
        if (error) throw error;
        res.json({ token });
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server error');
    }
  });

  // Staff login
  // eslint-disable-next-line consistent-return
  router.post('/login/staff', async (req, res) => {
    console.log('/auth/login/staff - post');
    const { email, password } = req.body;

    try {
      const staff = await Staff.findOne({ where: { email } });

      if (!staff) {
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, staff.password);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const payload = {
        staff: {
          staffId: staff.staffId,
          name: staff.name,
          email: staff.email,
          isCoordinator: staff.isCoordinator,
        },
      };

      jwt.sign(payload, config.authentication.jwtSecret, { expiresIn: '7d' }, (error, token) => {
        if (error) throw error;
        res.json({ token });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send('Server error');
    }
  });
};
