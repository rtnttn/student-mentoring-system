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
  // Find and count applications by mentor and mentee
  router.get('/applications', async (req, res) => {
    console.log('/dash/applications - get');
    const mentors = await Application.findAll({
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
    const mentees = await Application.findAll({
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
    const mentorCount = await Application.count({ where: { forMentor: true } });
    const menteeCount = await Application.count({ where: { forMentor: false } });
    console.log(mentorCount);
    console.log(menteeCount);
    res.send({ mentors, mentees, mentorCount, menteeCount });
  });

  // Find and count mentors, mentees and staff
  router.get('/users', async (req, res) => {
    console.log('/dash/users - get');
    const mentors = await Student.findAll({
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
    const mentees = await Student.findAll({
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
    const staff = await Staff.findAll({
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
    // Counts
    const mentorCount = await Student.count({ where: { isMentor: true } });
    console.log(mentorCount);
    const menteeCount = await Student.count({ where: { isMentor: false } });
    console.log(menteeCount);
    const staffCount = await Staff.count();
    console.log(staffCount);
    res.send({ mentors, mentees, staff, mentorCount, menteeCount, staffCount });
  });

  // Find and count groups
  router.get('/groups', async (req, res) => {
    console.log('/dash/groups - get');
    const groups = await Group.findAll({
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
    // Count
    const groupCount = await Group.count();
    console.log(groupCount);
    res.send({ groups, groupCount });
  });

  return router;
};
