/* eslint-disable radix */
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const config = require('../config/config');

const router = express.Router();

// eslint-disable-next-line no-unused-vars
const {
  // Student,
  Staff,
  // Subject,
  // Application,
  // Group,
  // Member,
  // Attendance,
  // Timeslot,
  // Availability
} = db.sequelize.models;

module.exports = () => {
  // ROUTES HERE
  // Staff routes
  // Find all staff
  router.get('/all', async (req, res) => {
    console.log('/staff/all - get');
    const list = await Staff.findAll();
    console.log(list);
    res.send(list);
  });

  // Find a staff member by ID
  router.get('/id/:id', async (req, res) => {
    console.log('/staff/id/:id - get');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    const staff = await Staff.findByPk(id);
    console.log(staff);
    res.send(staff);
  });

  // Add a staff member
  // eslint-disable-next-line consistent-return
  router.post('/add', async (req, res) => {
    console.log('/staff/add - post');
    console.log(req.body);
    // isMentor left out: default to false, change within UI
    const { staffName, staffEmail, staffPassword } = req.body;
    try {
      const staff = await Staff.findOne({ where: { staffEmail } });
      if (staff) {
        return res.status(400).json({ errors: [{ msg: 'Staff member already exists' }] });
      }

      const newStaff = {
        staffName,
        staffEmail,
        staffPassword,
      };

      const salt = await bcrypt.genSalt(10);

      newStaff.staffPassword = await bcrypt.hash(staffPassword, salt);
      console.log(newStaff);

      // Save to database
      const staffRes = await Staff.create({
        staffName: newStaff.staffName,
        staffEmail: newStaff.staffEmail,
        staffPassword: newStaff.staffPassword,
      });

      // Send a token
      const payload = {
        student: {
          staffId: staffRes.staffId,
          staffName: staffRes.name,
          staffEmail: staffRes.staffEmail,
          isCoordinator: staffRes.isCoordinator,
        },
      };

      // Sign token
      jwt.sign(payload, config.authentication.jwtSecret, { expiresIn: '7d' }, (error, token) => {
        if (error) throw error;
        res.json({ token });
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server error');
    }
    // Pre-auth implementation
    // console.log(req.body);
    // const { staffName, staffEmail, staffPassword } = req.body;
    // const staff = await Staff.create({
    //   staffName,
    //   staffEmail,
    //   staffPassword,
    // });
    // console.log(staff.toJSON());
    // res.send(staff);
  });

  // Edit staff member details
  router.put('/edit/id/:id', async (req, res) => {
    console.log('/staff/edit/id/:id - put');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    console.log(req.body);
    const { staffName, staffEmail, staffPassword } = req.body;
    const staff = await Staff.update(
      {
        staffName,
        staffEmail,
        staffPassword,
      },
      {
        where: { staffId: id },
      }
    );
    console.log(staff);
    res.send(staff);
  });

  // Elevate staff privileges
  router.put('/edit/priv/:id', async (req, res) => {
    console.log('/staff/edit/priv/:id - put');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    console.log(req.body);
    const { isCoordinator } = req.body;
    const staff = await Staff.update({ isCoordinator }, { where: { staffId: id } });
    console.log(staff);
    res.send(staff);
  });

  // Delete a staff member BROKEN
  //   router.delete('/:id', (req, res) => {
  //     console.log('/staff/:id - delete');
  //     let { id } = req.params;
  //     id = parseInt(id);
  //     console.log(id);
  //     Staff.destroy({ where: { staffId: id } });
  //     res.send(`ID: ${id} deleted`);
  //   });
  return router;
};
