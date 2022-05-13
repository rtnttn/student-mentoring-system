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
  // Group,
  // Member,
  Attendance,
  // Timeslot,
  // Availability
} = db.sequelize.models;

module.exports = () => {
  // Get attendance by group
  router.get('/groupid/:id', async (req, res) => {
    console.log('/attendance/groupid/:id - get');
    let { id } = req.params;
    id = parseInt(id);
    const attendance = await Attendance.findAll({ where: { groupid: id } });
    console.log(attendance);
    res.send(attendance);
  });

  // Get attendance by student
  router.get('/studentid/:id', async (req, res) => {
    console.log('/attendance/studentid/:id - get');
    let { id } = req.params;
    id = parseInt(id);
    const attendance = await Attendance.findAll({ where: { studentId: id } });
    console.log(attendance);
    res.send(attendance);
  });

  // Mark attendance
  router.post('/add', async (req, res) => {
    console.log('/attendance/add - post');
    console.log(req.body);
    const { groupId, studentId, date, confirmed } = req.body;
    const attendance = await Attendance.create({ groupId, studentId, date, confirmed });
    console.log(attendance);
    res.send(attendance);
  });
  return router;
};
