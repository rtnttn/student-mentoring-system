/* eslint-disable radix */
const express = require('express');
const { sequelize } = require('../models');
const db = require('../models');

const router = express.Router();

// eslint-disable-next-line no-unused-vars
const {
  Student,
  Staff,
  Subject,
  Application,
  // Group,
  // Member,
  // Attendance,
  // Timeslot,
  // Availability
} = db.sequelize.models;

module.exports = () => {
  // Dash routes
  // Find and count mentors and mentees
  router.get('/applications', async (req, res) => {
    console.log('/dash/applications - get');
    const mentors = await Application.findAndCountAll({
      where: { forMentor: true },
      include: [
        {
          model: Student,
          attributes: { exclude: ['studentPassword'] },
        },
        { model: Subject },
      ],
    });
    console.log(mentors);
    // res.send(mentors);
    const mentees = await Application.findAndCountAll({
      where: { forMentor: false },
      include: [
        {
          model: Student,
          attributes: { exclude: ['studentPassword'] },
        },
        { model: Subject },
      ],
    });
    console.log(mentees);
    res.send({ mentors, mentees });
  });

  // Find and count mentors, mentees and staff
  router.get('/users', async (req, res) => {
    console.log('/dash/users - get');
    const mentors = await Student.findAndCountAll({
      where: { isMentor: true },
      attributes: { exclude: ['studentPassword'] },
    });
    console.log(mentors);
    const mentees = await Student.findAndCountAll({
      where: { isMentor: false },
      attributes: { exclude: ['studentPassword'] },
    });
    console.log(mentees);
    const staff = await Staff.findAndCountAll({
      attributes: { exclude: ['staffPassword'] },
    });
    console.log(staff);
    res.send({ mentors, mentees, staff });
  });

  // NEW -- Down to two queries
  router.get('/opti/users', async (req, res) => {
    console.log('/dash/opti/users - get');
    const students = await Student.findAll({
      attributes: {
        include: [
          [
            sequelize.literal(`(
            SELECT COUNT(*)
            FROM Students as Student
            WHERE
              Student.isMentor = true
          )`),
            'mentorCount',
          ],
          [
            sequelize.literal(`(
            SELECT COUNT(*)
            FROM Students as Student
            WHERE
              Student.isMentor = false
          )`),
            'menteeCount',
          ],
        ],
      },
    });
    console.log(students);
    const staff = await Staff.findAndCountAll();
    console.log(staff);
    res.send({ students, staff });
  });
  return router;
};
