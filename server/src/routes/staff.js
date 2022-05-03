/* eslint-disable radix */
const express = require('express');
const db = require('../models');

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
  router.get('/api/staff', async (req, res) => {
    console.log('/staff - get');
    const list = await Staff.findAll();
    console.log(list);
    res.send(list);
  });

  // Find a staff member by ID
  router.get('/api/staff/:id', async (req, res) => {
    console.log('/staff/:id - get');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    const staff = await Staff.findByPk(id);
    console.log(staff);
    res.send(staff);
  });

  // Add a staff member
  router.post('/api/staff/add', async (req, res) => {
    console.log('/staff/add - post');
    console.log(req.body);
    const { staffName, email, password } = req.body;
    const staff = await Staff.create({
      staffName,
      email,
      password,
    });
    console.log(staff.toJSON());
    res.send(staff);
  });

  // Edit staff member details
  router.put('/api/staff/edit/:id', async (req, res) => {
    console.log('/staff/edit/:id - put');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    console.log(req.body);
    const { staffName, email, password } = req.body;
    const staff = await Staff.update(
      {
        staffName,
        email,
        password,
      },
      {
        where: { staffId: id },
      }
    );
    console.log(staff);
    res.send(staff);
  });

  // Elevate staff privileges
  router.put('/api/staff/edit/priv/:id', async (req, res) => {
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

  // Delete a staff member
  router.delete('/api/staff/:id', (req, res) => {
    console.log('/staff/:id - delete');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    Staff.destroy({ where: { staffId: id } });
    res.send(`ID: ${id} deleted`);
  });
  return router;
};
