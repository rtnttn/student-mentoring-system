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
  router.get('/api/subjects', async (req, res) => {
    console.log('/subjects - get');
    const list = await Subject.findAll();
    console.log(list);
    res.send(list);
  });

  // Find subject by id
  router.get('/api/subject/:id', async (req, res) => {
    console.log('/subject/:id - get');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    const subject = await Subject.findByPk(id);
    res.send(subject);
  });

  // Add a subject
  router.post('/api/subject/add', async (req, res) => {
    console.log('/subject/add - post');
    console.log(req.body);
    const { subjectName } = req.body;
    const subject = await Subject.create({ subjectName });
    console.log(subject.toJSON());
    res.send(subject);
  });

  // Edit a subject
  router.put('/api/subject/edit/:id', async (req, res) => {
    console.log('/subject/edit/:id - put');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    console.log(req.body);
    const { subjectName } = req.body;
    const subject = await Subject.update({ subjectName }, { where: { subjectId: id } });
    res.send(subject);
  });

  // Delete a subject
  router.delete('/api/subject/:id', (req, res) => {
    console.log('/subject/:id - delete');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    Subject.destroy({ where: { subjectId: id } });
    res.send(`ID: ${id} deleted`);
  });
  return router;
};
