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
  // Attendance,
  Timeslot,
  // Availability
} = db.sequelize.models;

module.exports = () => {
  // ROUTES HERE
  // Initialize timeslots
  router.post('/init', async (req, res) => {
    console.log('/timeslots/init - post');
    try {
      const { flag } = req.body;
      if (flag) {
        const timeslots = await Timeslot.bulkCreate([
          { timeslotId: 1, timeslotName: 'Monday Morning' },
          { timeslotId: 2, timeslotName: 'Monday Afternoon' },
          { timeslotId: 3, timeslotName: 'Monday Evening' },
          { timeslotId: 4, timeslotName: 'Tuesday Morning' },
          { timeslotId: 5, timeslotName: 'Tuesday Afternoon' },
          { timeslotId: 6, timeslotName: 'Tuesday Evening' },
          { timeslotId: 7, timeslotName: 'Wednesday Morning' },
          { timeslotId: 8, timeslotName: 'Wednesday Afternoon' },
          { timeslotId: 9, timeslotName: 'Wednesday Evening' },
          { timeslotId: 10, timeslotName: 'Thursday Morning' },
          { timeslotId: 11, timeslotName: 'Thursday Afternoon' },
          { timeslotId: 12, timeslotName: 'Thursday Evening' },
          { timeslotId: 13, timeslotName: 'Friday Morning' },
          { timeslotId: 14, timeslotName: 'Friday Afternoon' },
          { timeslotId: 15, timeslotName: 'Friday Evening' },
          { timeslotId: 16, timeslotName: 'Saturday Morning' },
          { timeslotId: 17, timeslotName: 'Saturday Afternoon' },
          { timeslotId: 18, timeslotName: 'Saturday Evening' },
          { timeslotId: 19, timeslotName: 'Sunday Morning' },
          { timeslotId: 20, timeslotName: 'Sunday Afternoon' },
          { timeslotId: 21, timeslotName: 'Sunday Evening' },
        ]);
        // console.log(timeslots.toJSON());
        res.send(timeslots);
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server error');
    }
  });

  // Display timeslots
  router.get('/', async (req, res) => {
    console.log('/timeslots/ - get');
    const timeslots = await Timeslot.findAll();
    console.log(timeslots);
    res.send(timeslots);
  });

  return router;
};
