/* eslint-disable radix */
const express = require('express');
const db = require('../models');

const router = express.Router();

// eslint-disable-next-line no-unused-vars
const {
  // Student,
  // Staff,
  // Subject,
  Application,
  // Group,
  // Member,
  // Attendance,
  // Timeslot,
  // Availability
} = db.sequelize.models;

module.exports = () => {
  // ROUTES HERE
  // Application routes
  // Find all applications
  router.get('/api/applications', async (req, res) => {
    console.log('/applications - get');
    const list = await Application.findAll();
    console.log(list);
    res.send(list);
  });

  // Find application by id
  router.get('/api/application/:id', async (req, res) => {
    console.log('/application/:id - get');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    const application = await Application.findByPk(id);
    console.log(application);
    res.send(application);
  });

  // Find all applications by student
  router.get('/api/applications/:id', async (req, res) => {
    console.log('/applications/:id - get');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    const list = await Application.findAll({ where: { studentId: id } });
    console.log(list);
    res.send(list);
  });

  // Find all mentee applications BROKEN
  router.get('/api/applications/mentees/all', async (req, res) => {
    console.log('/applications/mentees - get');
    const list = await Application.findAll({ where: { forMentor: false } });
    console.log(list);
    res.send(list);
  });

  // Find all mentee applications by student
  router.get('/api/applications/mentee/:id', async (req, res) => {
    console.log('/applications/mentee/:id - get');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    const list = await Application.findAll({ where: { studentId: id, forMentor: false } });
    console.log(list);
    res.send(list);
  });

  // Find all mentor applications BROKEN
  router.get('/api/applications/mentors/all', async (req, res) => {
    console.log('/applications/mentors - get');
    const list = await Application.findAll({ where: { forMentor: true } });
    console.log(list);
    res.send(list);
  });

  // Find all mentor applications by student
  router.get('/api/applications/mentor/:id', async (req, res) => {
    console.log('/applications/mentor/:id - get');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    const list = await Application.findAll({ where: { studentId: id, forMentor: true } });
    console.log(list);
    res.send(list);
  });

  // Create an application
  router.post('/api/application/add', async (req, res) => {
    console.log('/application/add - post');
    console.log(req.body);
    const { studentId, subjectId, forMentor } = req.body;
    const application = await Application.create({ studentId, subjectId, forMentor });
    console.log(application.toJSON());
    res.send(application);
  });

  // Edit an application
  router.put('/api/application/edit/:id', async (req, res) => {
    console.log('/application/edit/:id - put');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    console.log(req.body);
    const { studentId, subjectId, forMentor } = req.body;
    const application = await Application.update(
      { studentId, subjectId, forMentor },
      { where: { applicationId: id } }
    );
    console.log(application);
    res.send(application);
  });

  // Delete an application
  router.delete('/api/application/:id', (req, res) => {
    console.log('/application/:id - delete');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    Application.destroy({ where: { applicationId: id } });
    res.send(`ID: ${id} deleted`);
  });
  return router;
};
