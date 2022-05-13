/* eslint-disable radix */
const express = require('express');
const db = require('../models');

const router = express.Router();

// eslint-disable-next-line no-unused-vars
const {
  // Student,
  // Staff,
  Subject,
  // Application,
  // Group,
  // Member,
  // Attendance,
  // Timeslot,
  // Availability
} = db.sequelize.models;

module.exports = () => {
  // ROUTES HERE
  // Subject routes
  // Find all subjects
  router.get('/all', async (req, res) => {
    console.log('/subjects/all - get');
    const list = await Subject.findAll();
    console.log(list);
    res.send(list);
  });

  // Find subject by id
  router.get('/id/:id', async (req, res) => {
    console.log('/subjects/id/:id - get');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    const subject = await Subject.findByPk(id);
    res.send(subject);
  });

  // Add a subject
  router.post('/add', async (req, res) => {
    console.log('/subjects/add - post');
    console.log(req.body);
    const { subjectName } = req.body;
    const subject = await Subject.create({ subjectName });
    console.log(subject.toJSON());
    res.send(subject);
  });

  // Edit a subject
  router.put('/edit/:id', async (req, res) => {
    console.log('/subjects/edit/:id - put');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    console.log(req.body);
    const { subjectName } = req.body;
    const subject = await Subject.update({ subjectName }, { where: { subjectId: id } });
    res.send(subject);
  });

  // Delete a subject
  router.delete('/:id', (req, res) => {
    console.log('/subjects/:id - delete');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    Subject.destroy({ where: { subjectId: id } });
    res.send(`ID: ${id} deleted`);
  });
  return router;
};
