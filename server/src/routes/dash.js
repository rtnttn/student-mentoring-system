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
  // ROUTES HERE
  // Dash routes
  // Find and count mentors and mentees
  // OLD -- multiple database trips
  router.get('/api/dash/applications', async (req, res) => {
    console.log('/dash/applications - get');
    const mentors = await Application.findAndCountAll({
      where: { forMentor: true },
      include: [Student, Subject],
    });
    console.log(mentors);
    // res.send(mentors);
    const mentees = await Application.findAndCountAll({
      where: { forMentor: false },
      include: [Student, Subject],
    });
    console.log(mentees);
    res.send({ mentors, mentees });
  });

  // NEW -- Single database query, different data structure
  router.get('/api/dash/opti/applications', async (req, res) => {
    console.log('/dash/opti/applications - get');
    try {
      const applications = await Application.findAll({
        order: [['createdAt', 'ASC']],
        attributes: {
          include: [
            [
              sequelize.literal(`(
              SELECT COUNT(*)
              FROM Applications as Application
              WHERE
                Application.forMentor = true
            )`),
              'mentorCount',
            ],
            [
              sequelize.literal(`(
              SELECT COUNT(*)
              FROM Applications as Application
              WHERE
                Application.forMentor = false
            )`),
              'menteeCount',
            ],
          ],
        },
        include: [Student, Subject],
      });
      console.log(applications);
      res.send(applications);
    } catch (error) {
      console.log(error);
      res.send(`error ${error}`);
    }
  });

  // Find and count mentors, mentees and staff
  // OLD -- Multiple database trips
  router.get('/api/dash/users', async (req, res) => {
    console.log('/dash/users - get');
    const mentors = await Student.findAndCountAll({
      where: { isMentor: true },
    });
    console.log(mentors);
    const mentees = await Student.findAndCountAll({
      where: { isMentor: false },
    });
    console.log(mentees);
    const staff = await Staff.findAndCountAll();
    console.log(staff);
    res.send({ mentors, mentees, staff });
  });

  // NEW -- Down to two queries
  router.get('/api/dash/opti/users', async (req, res) => {
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
