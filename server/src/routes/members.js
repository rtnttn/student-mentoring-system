/* eslint-disable radix */
const express = require('express');
const db = require('../models');

const router = express.Router();

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-empty-pattern
const {
  // Student,
  // Staff,
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
  router.get('/', async (req, res) => {
    res.send('/members/ - get');
  });
  // Member routes
  // Find all members of a group
  // app.get('/api/members/groupid/:id', async (req, res) => {
  //   console.log('/members/group/:id - get');
  //   let { id } = req.params;
  //   id = parseInt(id);
  //   console.log(id);
  //   const list = await Member.findAll({ where: { groupId: id } });
  //   console.log(list);
  //   res.send(list);
  // });

  // Find all groups of a member
  // app.get('/api/member/:id', async (req, res) => {
  //   console.log('/member/:id - get')
  //   let {id} = req.params;
  //   id = parseInt(id);
  //   console.log(id);
  //   const list = await Group.findAll()
  // })

  // Find group mentor

  // Find group students
  return router;
};
