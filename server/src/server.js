/* eslint-disable radix */
// Imports
const express = require('express');
const config = require('./config/config');
const db = require('./models');

// Initialize express
const app = express();

// eslint-disable-next-line no-unused-vars
const { Student, Staff, Subject, Application, Group, Members, Attendance } = db.sequelize.models;

// Data handling middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routing middleware
// Test routes
app.get('/test', (req, res) => {
  console.log('/test - test');
  res.send('Test route: Server up');
});

app.get('/', (req, res) => {
  console.log('/ - get');
  res.send('Home page');
});

// Server routes

// Student routes
// Find all students
app.get('/api/students', async (req, res) => {
  console.log('/students - get');
  // res.send('students, get');
  const list = await Student.findAll();
  console.log(list);
  res.send(list);
});

// Find all mentors
app.get('/api/students/mentors', async (req, res) => {
  console.log('/students/mentors - get');
  const list = await Student.findAll({ where: { isMentor: true } });
  res.send(list);
});

// Find student by id
app.get('/api/student/:id', async (req, res) => {
  console.log('/student/:id - get');
  let { id } = req.params;
  id = parseInt(id);
  console.log(id);
  const student = await Student.findByPk(id);
  console.log(student);
  res.send(student);
});

// Add a student
app.post('/api/student/add', async (req, res) => {
  console.log('/student/add - post');
  console.log(req.body);
  // isMentor left out: default to false, change within UI
  const { studentName, email, password, courseName, courseStage } = req.body;
  const student = await Student.create({
    studentName,
    email,
    password,
    courseName,
    courseStage,
  });
  console.log(student.toJSON());
  res.send(student);
});

// Edit student details
app.put('/api/student/edit/:id', async (req, res) => {
  console.log('/student/edit/:id - put');
  let { id } = req.params;
  id = parseInt(id);
  console.log(id);
  console.log(req.body);
  const { studentName, email, password, courseName, courseStage } = req.body;
  const student = await Student.update(
    {
      studentName,
      email,
      password,
      courseName,
      courseStage,
    },
    {
      where: { studentId: id },
    }
  );
  console.log(student);
  res.send(student);
});

// Change student privileges
app.put('/api/student/edit/priv/:id', async (req, res) => {
  console.log('/student/edit/priv/:id - put');
  let { id } = req.params;
  id = parseInt(id);
  console.log(id);
  console.log(req.body);
  const { isMentor } = req.body;
  const student = await Student.update({ isMentor }, { where: { studentId: id } });
  console.log(student);
  res.send(student);
});

// Delete student
app.delete('/api/student/:id', (req, res) => {
  console.log('/student/:id - delete');
  let { id } = req.params;
  id = parseInt(id);
  console.log(id);
  Student.destroy({ where: { studentId: id } });
  res.send(`ID: ${id} deleted`);
});

// Staff routes
// Find all staff
app.get('/api/staff', async (req, res) => {
  console.log('/staff - get');
  const list = await Staff.findAll();
  console.log(list);
  res.send(list);
});

// Find a staff member by ID
app.get('/api/staff/:id', async (req, res) => {
  console.log('/staff/:id - get');
  let { id } = req.params;
  id = parseInt(id);
  console.log(id);
  const staff = await Staff.findByPk(id);
  console.log(staff);
  res.send(staff);
});

// Add a staff member
app.post('/api/staff/add', async (req, res) => {
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
app.put('/api/staff/edit/:id', async (req, res) => {
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
app.put('/api/staff/edit/priv/:id', async (req, res) => {
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
app.delete('/api/staff/:id', (req, res) => {
  console.log('/staff/:id - delete');
  let { id } = req.params;
  id = parseInt(id);
  console.log(id);
  Staff.destroy({ where: { staffId: id } });
  res.send(`ID: ${id} deleted`);
});

// Start server
db.sequelize.sync().then(() => {
  app.listen(config.port, () => console.log(`Server is running on: ${config.port}`));
});
