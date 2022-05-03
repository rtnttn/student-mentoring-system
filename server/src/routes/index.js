const express = require('express');

const studentsRoute = require('./students');
const staffRoute = require('./staff');
const subjectsRoute = require('./subjects');
const applicationsRoute = require('./applications');
const dashRoute = require('./dash');
const groupsRoute = require('./groups');
const membersRoute = require('./members');
const availabilityRoute = require('./availability');
const attendanceRoute = require('./attendance');
const timeslotsRoute = require('./timeslots');
const authRoute = require('./auth');

const router = express.Router();

module.exports = () => {
  router.get('/', (req, res) => {
    console.log('/ - get');
    res.send('/ - get WELCOME');
  });

  router.use('/students', studentsRoute());
  router.use('/staff', staffRoute());
  router.use('/subjects', subjectsRoute());
  router.use('/applications', applicationsRoute());
  router.use('/dash', dashRoute());
  router.use('/groups', groupsRoute());
  router.use('/members', membersRoute());
  router.use('/availability', availabilityRoute());
  router.use('/attendance', attendanceRoute());
  router.use('/timeslots', timeslotsRoute());
  router.use('/auth', authRoute());

  return router;
};
