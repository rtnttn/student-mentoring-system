/* eslint-disable radix */
const express = require('express');
const db = require('../models');

const router = express.Router();

// eslint-disable-next-line no-unused-vars
const {
  // Student,
  // Staff,
  // Subject,
  // Application,
  Group,
  // Member,
  // Attendance,
  // Timeslot,
  // Availability
} = db.sequelize.models;

module.exports = () => {
  // ROUTES HERE
  // Group routes
  // Find all groups
  router.get('/api/groups', async (req, res) => {
    console.log('/groups - get');
    const list = await Group.findAll();
    console.log(list);
    res.send(list);
  });

  // Find group by id
  router.get('/api/group/:id', async (req, res) => {
    console.log('/group/:id - get');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    const group = await Group.findByPk(id);
    console.log(group);
    res.send(group);
  });

  // Create a group
  router.post('/api/group/add', async (req, res) => {
    console.log('/group/add - post');
    console.log(req.body);
    const { supervisorId, subjectId, semesterCode } = req.body;
    const group = await Group.create({ supervisorId, subjectId, semesterCode });
    console.log(group);
    res.send(group);
  });

  // Edit a group
  router.put('/api/group/edit/:id', async (req, res) => {
    console.log('/group/edit/:id - put');
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

  // BROKEN
  // Delete a group
  // router.delete('/api/group/:id', (req, res) => {
  //   console.log('/group/:id - delete');
  //   let { id } = req.params;
  //   id = parseInt(id);
  //   console.log(id);
  //   Group.destroy({ where: { groupId: id } });
  //   res.send(`ID ${id} deleted`);
  // });
  return router;
};
