/* eslint-disable radix */
const express = require('express');
const db = require('../models');

const router = express.Router();

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-empty-pattern
const {
  Student,
  Staff,
  Subject,
  // Application,
  Group,
  Member,
  // Attendance,
  // Timeslot,
  // Availability
} = db.sequelize.models;

module.exports = () => {
  // ROUTES HERE
  router.get('/', async (req, res) => {
    res.send('/members/ - get');
  });

  // Member routes
  // Find all members of a group
  router.get('/groupid/:id', async (req, res) => {
    console.log('/members/group/:id - get');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    const list = await Member.findAll({
      where: { groupId: id },
      include: [
        {
          model: Student,
          attributes: { exclude: ['studentPassword'] },
        },
        {
          model: Group,
          include: [
            { model: Subject },
            {
              model: Staff,
              attributes: { exclude: ['staffPassword'] },
            },
          ],
        },
      ],
    });
    console.log(list);
    res.send(list);
  });

  // Find all groups of a member
  router.get('/studentid/:id', async (req, res) => {
    console.log('/members/group/:id - get');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    const list = await Member.findAll({
      where: { studentId: id },
      include: [
        {
          model: Group,
          include: [
            { model: Subject },
            {
              model: Staff,
              attributes: { exclude: ['staffPassword'] },
            },
          ],
        },
      ],
    });
    console.log(list);
    res.send(list);
  });

  // Assign student to group
  router.post('/add', async (req, res) => {
    console.log('/members/add - post');
    console.log(req.body);
    const { studentId, isMentor, groupId } = req.body;
    const member = await Member.create({ studentId, groupId, isMentor });
    console.log(member);
    res.send(member);
  });

  // Delete membership
  router.delete('/:groupId&:studentId', (req, res) => {
    console.log('/members/:groupId&:studentId - delete');
    let { groupId, studentId } = req.params;
    groupId = parseInt(groupId);
    studentId = parseInt(studentId);
    console.log(`group ${groupId}, student ${studentId}`);
    Member.destroy({ where: { groupId, studentId } });
    res.send(`membership entry for group ${groupId}, student ${studentId} deleted`);
  });

  return router;
};
