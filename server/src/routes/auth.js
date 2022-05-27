/* eslint-disable radix */
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const config = require('../config/config');

// middleware
// eslint-disable-next-line no-unused-vars
const coordinator = require('../auth/coordinator');
// eslint-disable-next-line no-unused-vars
const mentor = require('../auth/mentor');
// eslint-disable-next-line no-unused-vars
const staff = require('../auth/staff');
const student = require('../auth/student');

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
  // Get user - student
  router.get('/student', student, async (req, res) => {
    console.log('/auth/student - GET');
    const { studentId } = req.body;
    try {
      const user = await Student.findByPk(studentId, {
        attributes: { exclude: ['studentPassword'] },
      });
      console.log(user);
      res.send(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server error');
    }
  });

  // Get user - staff
  router.get('/staff', staff, async (req, res) => {
    console.log('/auth/staff - GET');
    const { staffId } = req.body;
    try {
      const user = await Staff.findByPk(staffId, { attributes: { exclude: ['staffPassword'] } });
      console.log(user);
      res.send(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server error');
    }
  });

  // Student login
  // eslint-disable-next-line consistent-return
  router.post('/login/student', async (req, res) => {
    console.log('/auth/login/student - post');
    const { studentEmail, studentPassword } = req.body;

    try {
      const user = await Student.findOne({ where: { studentEmail } });

      if (!user) {
        // CHANGE THIS
        return res.status(400).json({ errors: [{ msg: 'No such account' }] });
      }

      const isMatch = await bcrypt.compare(studentPassword, user.studentPassword);

      if (!isMatch) {
        // CHANGE THIS
        return res.status(400).json({ errors: [{ msg: 'Invalid password' }] });
      }

      const payload = {
        student: {
          studentId: user.studentId,
          name: user.name,
          studentEmail: user.studentEmail,
          isMentor: user.isMentor,
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
      const user = await Staff.findOne({ where: { staffEmail } });

      if (!user) {
        // CHANGE THIS
        return res.status(400).json({ errors: [{ msg: 'No such account' }] });
      }

      const isMatch = await bcrypt.compare(staffPassword, user.staffPassword);

      if (!isMatch) {
        // CHANGE THIS
        return res.status(400).json({ errors: [{ msg: 'Invalid password' }] });
      }

      const payload = {
        staff: {
          staffId: user.staffId,
          name: user.name,
          staffEmail: user.staffEmail,
          isCoordinator: user.isCoordinator,
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
