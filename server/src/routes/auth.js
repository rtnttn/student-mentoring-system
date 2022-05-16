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

// AUTH LEVELS
// Are you logged in?
// Are you a student?
// Are you a mentor?
// Are you the mentor for this group? <-------
// Are you a staff member?
// Are you a course coordinator?

module.exports = () => {
  // ROUTES HERE
  // Student login
  // eslint-disable-next-line consistent-return
  router.post('/login/student', async (req, res) => {
    console.log('/auth/login/student - post');
    const { studentEmail, studentPassword } = req.body;

    try {
      const student = await Student.findOne({ where: { studentEmail } });

      if (!student) {
        // CHANGE THIS
        return res.status(400).json({ errors: [{ msg: 'No such account' }] });
      }

      const isMatch = await bcrypt.compare(studentPassword, student.studentPassword);

      if (!isMatch) {
        // CHANGE THIS
        return res.status(400).json({ errors: [{ msg: 'Invalid password' }] });
      }

      const payload = {
        student: {
          studentId: student.studentId,
          name: student.name,
          studentEmail: student.studentEmail,
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
    const { staffEmail, staffPassword } = req.body;

    try {
      const staff = await Staff.findOne({ where: { staffEmail } });

      if (!staff) {
        // CHANGE THIS
        return res.status(400).json({ errors: [{ msg: 'No such account' }] });
      }

      const isMatch = await bcrypt.compare(staffPassword, staff.staffPassword);

      if (!isMatch) {
        // CHANGE THIS
        return res.status(400).json({ errors: [{ msg: 'Invalid password' }] });
      }

      const payload = {
        staff: {
          staffId: staff.staffId,
          name: staff.name,
          staffEmail: staff.staffEmail,
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
  return router;
};
