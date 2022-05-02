/* eslint-disable no-unused-vars */
// src/models.js
// Connects to database

// Imports
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config');

// eslint-disable-next-line prefer-const
let db = {};

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
);

// Student model
const Student = sequelize.define('Student', {
  studentId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  studentName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  courseName: { type: DataTypes.STRING },
  courseStage: { type: DataTypes.STRING },
  isMentor: { type: DataTypes.BOOLEAN, defaultValue: false },
});

// Staff model
const Staff = sequelize.define('Faculty', {
  staffId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  staffName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  isCoordinator: { type: DataTypes.BOOLEAN, defaultValue: false },
});

// Subjects model
const Subject = sequelize.define('Subject', {
  subjectId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  subjectName: { type: DataTypes.STRING, allowNull: false, unique: true },
});

// Session application model
const Application = sequelize.define('Application', {
  applicationId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  studentId: { type: DataTypes.INTEGER, references: { model: Student, key: 'studentId' } },
  subjectId: { type: DataTypes.INTEGER, references: { model: Subject, key: 'subjectId' } },
  forMentor: { type: DataTypes.BOOLEAN, defaultValue: false },
});

// Group model
const Group = sequelize.define('Group', {
  groupId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  supervisorId: { type: DataTypes.INTEGER, references: { model: Staff, key: 'staffId' } },
  subjectId: { type: DataTypes.INTEGER, references: { model: Subject, key: 'subjectId' } },
  semesterCode: { type: DataTypes.STRING },
});

// Group members model
const Members = sequelize.define('Members', {
  groupId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: Group, key: 'groupId' },
  },
  studentId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: Student, key: 'studentId' },
  },
  isMentor: { type: DataTypes.BOOLEAN, defaultValue: false },
});

// Attendance model
const Attendance = sequelize.define('Attendance', {
  groupId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: Members, key: 'groupId' },
  },
  studentId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: Members, key: 'studentId' },
  },
  date: { type: DataTypes.DATEONLY },
  confirmed: { type: DataTypes.BOOLEAN },
});

// object
db.sequelize = sequelize;
// class
db.Sequelize = Sequelize;

module.exports = db;
module.exports.Op = Sequelize.Op;
