/* eslint-disable radix */
const express = require('express');
const { sequelize } = require('../models');
const db = require('../models');

const router = express.Router();

// eslint-disable-next-line no-unused-vars
const { Student, Staff, Subject, Application, Group, Member, Attendance, Timeslot, Availability } =
  db.sequelize.models;

module.exports = () => {
  // ROUTES HERE
  // Group routes
  // Find all groups
  router.get('/all', async (req, res) => {
    console.log('/groups/all - get');
    const list = await Group.findAll();
    console.log(list);
    res.send(list);
  });

  // Find group by id
  router.get('/id/:id', async (req, res) => {
    console.log('/groups/id/:id - get');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    const group = await Group.findByPk(id, {
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
              attributes: ['studentName', 'studentEmail'],
            },
          ],
        },
      ],
    });
    console.log(group);
    res.send(group);
  });

  // Pull data for group creation
  router.get('/add', async (req, res) => {
    console.log('/groups/add - get');

    // Application data
    const applications = await Application.findAll({
      include: [
        {
          model: Student,
          attributes: { exclude: ['studentPassword'] },
          include: [
            {
              model: Availability,
              include: [
                {
                  model: Timeslot,
                  attributes: ['timeslotName'],
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
                      model: Subject,
                      attributes: ['subjectName'],
                    },
                  ],
                },
                {
                  model: Student,
                  attributes: ['studentName', 'studentEmail'],
                },
              ],
            },
          ],
        },
        {
          model: Subject,
        },
      ],
    });
    console.log(applications);

    // Staff data
    const staff = await Staff.findAll({
      attributes: ['staffName', 'staffId', 'staffEmail'],
    });
    console.log(staff);

    // Group data
    const group = await Group.findAll({
      include: [
        {
          model: Staff,
          attributes: ['staffName', 'staffId', 'staffEmail'],
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
              attributes: ['studentName', 'studentEmail'],
              include: [
                {
                  model: Availability,
                  include: [
                    {
                      model: Timeslot,
                      attributes: ['timeslotName'],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      // order: [[Attendance, sequelize.fn('max', sequelize.col('date')), 'ASC']],
    });
    console.log(group);

    // Group aggregates
    const lastMet = await sequelize.query(
      'SELECT MAX(date) AS date, groupId from Attendance where confirmed = true GROUP BY groupId'
    );
    const firstMet = await sequelize.query(
      'SELECT MIN(date) AS date, groupId from Attendance where confirmed = true GROUP BY groupId'
    );
    const sessionCount = await sequelize.query(
      'SELECT Members.groupId, COUNT(Attendance.date) as sessionCount FROM Members INNER JOIN Attendance ON Members.groupId = Attendance.groupId WHERE Members.isMentor = "1" AND Attendance.studentId = Members.studentId GROUP BY Members.groupId'
    );
    const menteeCount = await sequelize.query(
      'SELECT Members.groupId, COUNT(Members.studentId) AS menteeCount FROM Members WHERE Members.isMentor = "0" GROUP BY Members.groupId;'
    );
    console.log(lastMet);
    console.log(firstMet);
    console.log(sessionCount);
    console.log(menteeCount);
    res.send({ applications, staff, group, lastMet, firstMet, sessionCount, menteeCount });
  });

  // Create a group NEW
  router.post('/add', async (req, res) => {
    console.log('/groups/add - post');
    console.log(req.body);
    const { group, students } = req.body;
    console.log(group);
    console.log(students);

    // Group creation
    const { supervisorId, subjectId } = group;
    const semesterCode = 1; // TODO
    const newGroup = await Group.create({ supervisorId, subjectId, semesterCode });
    console.log(newGroup);
    const { groupId } = newGroup;
    console.log(groupId);

    // Member creation, application deletion
    // eslint-disable-next-line prefer-const
    let menteeIds = [];
    for (let i = 0; i < students.length; i += 1) {
      // eslint-disable-next-line prefer-const
      let { studentId, isMentor } = students[i];
      students[i] = {
        studentId,
        isMentor,
        groupId,
      };
      if (!isMentor) {
        menteeIds.push(studentId);
      }
    }
    const members = await Member.bulkCreate(students);
    Application.destroy({
      where: {
        studentId: { [db.Op.in]: menteeIds },
        subjectId,
      },
    });
    console.log(members);

    res.send({ newGroup, members });
  });

  // Add members to a group
  router.put('/add/:id', async (req, res) => {
    console.log('/groups/add/:id - put');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    console.log(req.body);
    const { students } = req.body;
    console.log(students);
    const group = await Group.findByPk(id);
    const { subjectId } = group;
    // eslint-disable-next-line prefer-const
    let menteeIds = [];
    for (let i = 0; i < students.length; i += 1) {
      // eslint-disable-next-line prefer-const
      let { studentId, isMentor } = students[i];
      students[i] = {
        studentId,
        isMentor,
        groupId: id,
      };
      if (!isMentor) {
        menteeIds.push(studentId);
      }
    }
    const members = await Member.bulkCreate(students);
    Application.destroy({
      where: {
        studentId: { [db.Op.in]: menteeIds },
        subjectId,
      },
    });
    console.log(members);
    res.send(members);
  });

  // Create a group LEGACY
  router.post('/legacy/add', async (req, res) => {
    console.log('/groups/legacy/add - post');
    console.log(req.body);
    const { supervisorId, subjectId, semesterCode } = req.body;
    const group = await Group.create({ supervisorId, subjectId, semesterCode });
    console.log(group);
    res.send(group);
  });

  // Edit a group
  router.put('/edit/:id', async (req, res) => {
    console.log('/groups/edit/:id - put');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    console.log(req.body);
    const { supervisorId, subjectId, semesterCode } = req.body;
    const group = await Group.update(
      { supervisorId, subjectId, semesterCode },
      { where: { groupId: id } }
    );
    console.log(group);
    res.send(group);
  });

  // Delete a group
  router.delete('/:id', (req, res) => {
    console.log('/groups/:id - delete');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    Group.destroy({ where: { groupId: id } });
    res.send(`ID ${id} deleted`);
  });
  return router;
};
