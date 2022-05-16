/* eslint-disable prefer-const */
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
  Member,
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

  // Log session (mentor duty)
  router.post('/add', async (req, res) => {
    console.log('/attendance/add - post');
    console.log(req.body);
    const { groupId, studentId, date, confirmed, startTime, endTime } = req.body;
    const attendance = await Attendance.create({
      groupId,
      studentId,
      date,
      confirmed,
      startTime,
      endTime,
    });
    console.log(attendance);
    res.send(attendance);
  });

  // Confirm session (mentor duty)
  router.post('/confirm', async (req, res) => {
    console.log('/attendance/confirm - post');
    console.log(req.body);
    let { studentId, groupId, date, confirmed, startTime, endTime } = req.body;
    const confirm = await Attendance.update({ confirmed }, { where: { studentId, groupId, date } });
    console.log(confirm);
    const mentees = await Member.findAll({ where: { groupId, isMentor: false } });
    let sessions = [];
    for (let i = 0; i < mentees.length; i += 1) {
      // eslint-disable-next-line no-shadow
      let { studentId, groupId } = mentees[i];
      let sessionMember = { studentId, groupId, date, startTime, endTime };
      sessions.push(sessionMember);
    }
    const attendance = await Attendance.bulkCreate(sessions);
    console.log(attendance);
    res.send({ confirm, attendance });
  });

  // Confirm attendance (mentee duty)
  router.put('/confirm', async (req, res) => {
    console.log('/attendance/confirm - put');
    const { studentId, groupId, date, confirmed } = req.body;
    const attendance = await Attendance.update(
      { confirmed },
      { where: { studentId, groupId, date } }
    );
    console.log(attendance);
    res.send(attendance);
  });

  // Delete attendance (mentor only)
  router.delete('/groupid/:id', (req, res) => {
    console.log('/attendance/groupid/:id - delete');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    const { date } = req.body;
    console.log(date);
    Attendance.destroy({ where: { groupId: id, date } });
    res.send(`Attendance entries for group ${id}, date ${date} deleted`);
  });
  return router;
};
