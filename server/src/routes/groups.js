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
  router.get('/all', async (req, res) => {
    console.log('/groups/all - get');
    const list = await Group.findAll();
    console.log(list);
    res.send(list);
  });

  // Find group by id
  router.get('/id/:id', async (req, res) => {
    console.log('/groups/:id - get');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    const group = await Group.findByPk(id);
    console.log(group);
    res.send(group);
  });

  // Create a group
  router.post('/add', async (req, res) => {
    console.log('/groups/add - post');
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

  // BROKEN
  // Delete a group
  // router.delete('/:id', (req, res) => {
  //   console.log('/groups/:id - delete');
  //   let { id } = req.params;
  //   id = parseInt(id);
  //   console.log(id);
  //   Group.destroy({ where: { groupId: id } });
  //   res.send(`ID ${id} deleted`);
  // });
  return router;
};
