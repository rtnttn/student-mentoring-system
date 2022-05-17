/* eslint-disable radix */
const express = require('express');
const db = require('../models');

const router = express.Router();

// eslint-disable-next-line no-unused-vars
const {
  // Student,
  // Staff,
  Subject,
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
  router.get('/all', async (req, res) => {
    console.log('/applications/all - get');
    const list = await Application.findAll();
    console.log(list);
    res.send(list);
  });

  // Find application by id
  router.get('/id/:id', async (req, res) => {
    console.log('/applications/id/:id - get');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    const application = await Application.findByPk(id);
    console.log(application);
    res.send(application);
  });

  // Find all applications by student
  router.get('/student/:id', async (req, res) => {
    console.log('/applications/student/:id - get');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    const list = await Application.findAll({ where: { studentId: id } });
    console.log(list);
    res.send(list);
  });

  // Find all mentee applications
  router.get('/mentees/all', async (req, res) => {
    console.log('/applications/mentees/all - get');
    const list = await Application.findAll({ where: { forMentor: false } });
    console.log(list);
    res.send(list);
  });

  // Find all mentee applications by student
  router.get('/mentees/student/:id', async (req, res) => {
    console.log('/applications/mentees/student/:id - get');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    const list = await Application.findAll({ where: { studentId: id, forMentor: false } });
    console.log(list);
    res.send(list);
  });

  // Find all mentor applications
  router.get('/mentors/all', async (req, res) => {
    console.log('/applications/mentors/all - get');
    const list = await Application.findAll({ where: { forMentor: true } });
    console.log(list);
    res.send(list);
  });

  // Find all mentor applications by student
  router.get('/mentors/student/:id', async (req, res) => {
    console.log('/mentors/student/:id - get');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    const list = await Application.findAll({ where: { studentId: id, forMentor: true } });
    console.log(list);
    res.send(list);
  });

  // Create an application
  router.post('/add', async (req, res) => {
    console.log('/applications/add - post');
    console.log(req.body);
    const { studentId, subjectId, forMentor } = req.body;
    const application = await Application.create({ studentId, subjectId, forMentor });
    console.log(application.toJSON());
    res.send(application);
  });

  // Apply to be a mentor
  router.post('/becomeamentor', async (req, res) => {
    console.log('/applications/becomeamentor - post');
    console.log(req.body);
    const mentorApp = await Subject.findOne({
      where: {
        subjectName: 'Mentor Application',
      },
    });
    const { subjectId } = mentorApp;
    console.log(subjectId);
    const { studentId } = req.body;
    console.log(studentId);
    const application = await Application.create({ studentId, subjectId });
    console.log(application);
    res.send(application);
  });

  // Edit an application
  router.put('/edit/:id', async (req, res) => {
    console.log('/applications/edit/:id - put');
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

  // Approve an application
  router.put('/approve/:id', async (req, res) => {
    console.log('/applications/approve/:id - put');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    console.log(req.body);
    const { isApproved } = req.body;
    const application = await Application.update({ isApproved }, { where: { applicationId: id } });
    console.log(application);
    res.send(application);
  });

  // Delete an application
  router.delete('/:id', (req, res) => {
    console.log('/applications/:id - delete');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    Application.destroy({ where: { applicationId: id } });
    res.send(`ID: ${id} deleted`);
  });
  return router;
};
