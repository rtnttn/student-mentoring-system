/* eslint-disable radix */
const express = require('express');
// eslint-disable-next-line no-unused-vars
const { sequelize } = require('../models');
// eslint-disable-next-line no-unused-vars
const db = require('../models');

const router = express.Router();

// eslint-disable-next-line no-unused-vars
const { Student, Staff, Subject, Application, Group, Member, Attendance, Timeslot, Availability } =
  db.sequelize.models;

module.exports = () => {
  // Dash routes
  // Find and count applications by mentor and mentee
  router.get('/applications', async (req, res) => {
    console.log('/dash/applications - get');

    // Get subjectId for mentor EoI
    const mentorApp = await Subject.findOne({
      where: {
        subjectName: 'Mentor Application',
      },
    });
    const { subjectId } = mentorApp;
    console.log(subjectId);

    // Mentor applications
    const mentors = await Application.findAll({
      where: {
        forMentor: true,
        subjectId: {
          [db.Op.ne]: subjectId,
        },
      },
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

    // Mentee applications
    const mentees = await Application.findAll({
      where: {
        forMentor: false,
        subjectId: {
          [db.Op.ne]: subjectId,
        },
      },
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

    // Applications to become mentor
    const mentorEoI = await Application.findAll({
      where: {
        subjectId,
      },
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

    // Counts
    const mentorCount = await Application.count({
      where: {
        forMentor: true,
        subjectId: {
          [db.Op.ne]: subjectId,
        },
      },
    });
    const menteeCount = await Application.count({
      where: {
        forMentor: false,
        subjectId: {
          [db.Op.ne]: subjectId,
        },
      },
    });
    const eoICount = await Application.count({
      where: { subjectId },
    });
    console.log(mentorCount);
    console.log(menteeCount);
    console.log(eoICount);
    res.send({ mentors, mentees, mentorCount, menteeCount, mentorEoI, eoICount });
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
          model: Attendance,
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
      // order: [[Attendance, sequelize.fn('max', sequelize.col('date')), 'ASC']],
    });
    console.log(groups);
    const lastMet = await sequelize.query(
      'SELECT MAX(date) AS date, groupId from Attendance where confirmed = true GROUP BY groupId'
    );
    const firstMet = await sequelize.query(
      'SELECT MIN(date) AS date, groupId from Attendance where confirmed = true GROUP BY groupId'
    );
    const sessionCount = await sequelize.query(
      'SELECT Members.groupId, COUNT(Attendance.date) as sessionCount FROM Members INNER JOIN Attendance ON Members.groupId = Attendance.groupId WHERE Members.isMentor = "1" AND Attendance.studentId = Members.studentId GROUP BY Members.groupId'
    );
    console.log(lastMet);
    console.log(firstMet);
    console.log(sessionCount);
    // Count
    const groupCount = await Group.count();
    console.log(groupCount);
    res.send({ groups, groupCount, lastMet, firstMet, sessionCount });
  });

  // Student dash
  router.get('/student/:id', async (req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    const student = await Student.findByPk(id, {
      attributes: {
        exclude: ['studentPassword'],
      },
      include: [
        {
          model: Availability,
          include: [
            {
              model: Timeslot,
            },
          ],
        },
        {
          model: Application,
          include: [
            {
              model: Subject,
              attributes: ['subjectName'],
            },
          ],
        },
        {
          model: Member,
          include: [
            {
              model: Group,
              include: [
                {
                  model: Staff,
                  attributes: ['staffName'],
                },
                {
                  model: Subject,
                  attributes: ['subjectName'],
                },
              ],
            },
          ],
        },
        {
          model: Attendance,
        },
      ],
    });
    console.log(student);
    const groups = await Member.findAll({
      where: {
        studentId: id,
      },
      attributes: ['groupId'],
    });
    console.log(groups);
    // eslint-disable-next-line prefer-const
    let groupIds = [];
    for (let i = 0; i < groups.length; i += 1) {
      // eslint-disable-next-line prefer-const
      let { groupId } = groups[i];
      groupIds.push(groupId);
    }

    const mentors = await Member.findAll({
      where: {
        groupId: groupIds,
        isMentor: true,
      },
      include: [
        {
          model: Student,
          attributes: ['studentName'],
        },
      ],
    });
    console.log(mentors);

    // eslint-disable-next-line prefer-const
    let mentorIds = [];
    for (let i = 0; i < mentors.length; i += 1) {
      // eslint-disable-next-line prefer-const
      let { studentId } = mentors[i];
      mentorIds.push(studentId);
    }

    const meetings = await Attendance.findAll({
      where: {
        studentId: mentorIds,
        groupId: groupIds,
      },
    });
    console.log(meetings);

    res.send({ student, mentors, meetings });
  });

  return router;
};
