/* eslint-disable radix */
const express = require('express');
const db = require('../models');

const router = express.Router();

// eslint-disable-next-line no-unused-vars
const {
  Student,
  Staff,
  Subject,
  Application,
  Group,
  Member,
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
          include: [
            {
              model: Member,
              include: [
                {
                  model: Group,
                  include: [
                    {
                      model: Subject,
                      attributes: ['subjectName'],
                    },
                    {
                      model: Staff,
                      attributes: ['staffName'],
                    },
                  ],
                },
              ],
            },
          ],
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
          include: [
            {
              model: Member,
              include: [
                {
                  model: Group,
                  include: [
                    {
                      model: Subject,
                      attributes: ['subjectName'],
                    },
                    {
                      model: Staff,
                      attributes: ['staffName'],
                    },
                  ],
                },
              ],
            },
          ],
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
      include: [
        {
          model: Member,
          include: [
            {
              model: Group,
              include: [
                {
                  model: Subject,
                  attributes: ['subjectName'],
                },
                {
                  model: Staff,
                  attributes: ['staffName'],
                },
              ],
            },
          ],
        },
      ],
    });
    console.log(mentors);
    const mentees = await Student.findAndCountAll({
      where: { isMentor: false },
      attributes: { exclude: ['studentPassword'] },
      include: [
        {
          model: Member,
          include: [
            {
              model: Group,
              include: [
                {
                  model: Subject,
                  attributes: ['subjectName'],
                },
                {
                  model: Staff,
                  attributes: ['staffName'],
                },
              ],
            },
          ],
        },
      ],
    });
    console.log(mentees);
    const staff = await Staff.findAndCountAll({
      attributes: { exclude: ['staffPassword'] },
      include: [
        {
          model: Group,
          include: [
            {
              model: Subject,
              attributes: ['subjectName'],
            },
          ],
        },
      ],
    });
    console.log(staff);
    res.send({ mentors, mentees, staff });
  });

  router.get('/groups', async (req, res) => {
    console.log('/dash/groups - get');
    const groups = await Group.findAndCountAll({
      include: [
        {
          model: Staff,
          attributes: ['staffName'],
        },
        {
          model: Subject,
          attributes: ['subjectName'],
        },
        {
          model: Member,
          include: [
            {
              model: Student,
              attributes: ['studentName'],
            },
          ],
        },
      ],
    });
    console.log(groups);
    res.send(groups);
  });

  return router;
};
