/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
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
  Timeslot,
  Availability,
} = db.sequelize.models;

module.exports = () => {
  // ROUTES HERE
  router.get('/', async (req, res) => {
    res.send('/availability/ - get');
  });

  router.get('/studentid/:id', async (req, res) => {
    console.log('/availability/studentid/:id - get');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    const availability = await Availability.findAll({
      where: { studentId: id },
      include: Timeslot,
    });
    console.log(availability);
    res.send(availability);
  });

  // Add availability
  router.post('/add', async (req, res) => {
    console.log('/availability/add - post');
    console.log(req.body);
    let { studentId, timeslotIds } = req.body;
    studentId = parseInt(studentId);
    let studentAvailability = [];
    for (let i = 0; i < timeslotIds.length; i++) {
      let timeslotId = parseInt(timeslotIds[i]);
      let timeslot = {
        studentId,
        timeslotId,
      };
      console.log(timeslot);
      studentAvailability.push(timeslot);
    }
    const availability = await Availability.bulkCreate(studentAvailability);
    console.log(availability);
    res.send(availability);
    // console.log(studentAvailability);
    // res.send(studentAvailability);
  });

  // Edit availability (Delete and add new);
  router.put('/edit', async (req, res) => {
    console.log('/availability/edit - PUT');
    console.log(req.body);
    let { studentId, timeslotIds } = req.body;
    studentId = parseInt(studentId);
    Availability.destroy({ where: { studentId } });
    let studentAvailability = [];
    for (let i = 0; i < timeslotIds.length; i++) {
      let timeslotId = parseInt(timeslotIds[i]);
      let timeslot = {
        studentId,
        timeslotId,
      };
      console.log(timeslot);
      studentAvailability.push(timeslot);
    }
    const availability = await Availability.bulkCreate(studentAvailability);
    console.log(availability);
    res.send(availability);
  });

  // Delete availability
  router.delete('/:id', (req, res) => {
    console.log('/availabilities/:id - delete');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    Availability.destroy({ where: { studentId: id } });
    res.send(`Availabilities for student ${id} deleted`);
  });

  return router;
};
