/* eslint-disable radix */
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../models');
const config = require('../config/config');

const router = express.Router();

// eslint-disable-next-line no-unused-vars
const {
  Student,
  // Staff,
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
  // Student routes
  // Find all students
  router.get('/all', async (req, res) => {
    console.log('/students/all - get');
    // res.send('students, get');
    const list = await Student.findAll();
    console.log(list);
    res.send(list);
  });

  // Find all mentors
  router.get('/mentors', async (req, res) => {
    console.log('/students/mentors - get');
    const list = await Student.findAll({ where: { isMentor: true } });
    res.send(list);
  });

  // Find student by id
  router.get('/id/:id', async (req, res) => {
    console.log('/students/id/:id - get');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    const student = await Student.findByPk(id);
    console.log(student);
    res.send(student);
  });

  // Add a student
  // eslint-disable-next-line consistent-return
  router.post('/add', async (req, res) => {
    console.log('/students/add - post');
    console.log(req.body);
    // isMentor left out: default to false, change within UI
    const { studentName, email, password, courseName, courseStage } = req.body;
    try {
      const student = await Student.findOne({ where: { email } });
      if (student) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      const newStudent = {
        studentName,
        email,
        password,
        courseName,
        courseStage,
      };

      const salt = await bcrypt.genSalt(10);

      newStudent.password = await bcrypt.hash(password, salt);
      console.log(newStudent);

      // Save to database
      const studentRes = await Student.create({
        studentName: newStudent.studentName,
        email: newStudent.email,
        password: newStudent.password,
        courseName: newStudent.courseName,
        courseStage: newStudent.courseStage,
      });

      // Send a token
      const payload = {
        student: {
          studentId: studentRes.studentId,
          studentName: studentRes.studentName,
          email: studentRes.email,
          isMentor: studentRes.isMentor,
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
    // const student = await Student.create({
    //   studentName,
    //   email,
    //   password,
    //   courseName,
    //   courseStage,
    // });
    // console.log(student.toJSON());
    // res.send(student);
  });

  // Edit student details
  router.put('/edit/id/:id', async (req, res) => {
    console.log('/students/edit/id/:id - put');
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
  router.put('/edit/priv/:id', async (req, res) => {
    console.log('/students/edit/priv/:id - put');
    let { id } = req.params;
    id = parseInt(id);
    console.log(id);
    console.log(req.body);
    const { isMentor } = req.body;
    const student = await Student.update({ isMentor }, { where: { studentId: id } });
    console.log(student);
    res.send(student);
  });

  // Delete student BROKEN
  // router.delete('/:id', (req, res) => {
  //   console.log('/students/:id - delete');
  //   let { id } = req.params;
  //   id = parseInt(id);
  //   console.log(id);
  //   Student.destroy({ where: { studentId: id } });
  //   res.send(`ID: ${id} deleted`);
  // });
  return router;
};
