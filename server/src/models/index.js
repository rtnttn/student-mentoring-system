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

// Models
// Student model
const Student = sequelize.define('Student', {
  studentId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  studentName: { type: DataTypes.STRING, allowNull: false },
  studentEmail: { type: DataTypes.STRING, allowNull: false, unique: true },
  studentPassword: { type: DataTypes.STRING, allowNull: false },
  courseName: { type: DataTypes.STRING },
  courseStage: { type: DataTypes.STRING },
  isMentor: { type: DataTypes.BOOLEAN, defaultValue: false },
});

// Staff model
const Staff = sequelize.define(
  'Staff',
  {
    staffId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    staffName: { type: DataTypes.STRING, allowNull: false },
    staffEmail: { type: DataTypes.STRING, allowNull: false, unique: true },
    staffPassword: { type: DataTypes.STRING, allowNull: false },
    isCoordinator: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    freezeTableName: true,
  }
);

// Subjects model
const Subject = sequelize.define('Subject', {
  subjectId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  subjectName: { type: DataTypes.STRING, allowNull: false, unique: true },
});

// Application model
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
const Member = sequelize.define('Member', {
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
const Attendance = sequelize.define(
  'Attendance',
  {
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
    date: { type: DataTypes.DATEONLY, primaryKey: true },
    confirmed: { type: DataTypes.BOOLEAN },
  },
  {
    freezeTableName: true,
  }
);

// Timeslot model
const Timeslot = sequelize.define('Timeslot', {
  timeslotId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  timeslotName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

// Availability model
const Availability = sequelize.define('Availability', {
  studentId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: Student, key: 'studentId' },
  },
  timeslotId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Timeslot,
      key: 'timeslotId',
    },
  },
});

// Associations
Student.hasMany(Availability, { foreignKey: 'studentId' });

Availability.belongsTo(Student, { foreignKey: 'studentId' });

Timeslot.hasMany(Availability, { foreignKey: 'timeslotId' });

Availability.belongsTo(Timeslot, { foreignKey: 'timeslotId' });

Student.hasMany(Application, { foreignKey: 'studentId' });

Application.belongsTo(Student, { foreignKey: 'studentId' });

Subject.hasMany(Application, { foreignKey: 'subjectId' });

Application.belongsTo(Subject, { foreignKey: 'subjectId' });

Subject.hasMany(Group, { foreignKey: 'subjectId' });

Group.belongsTo(Subject, { foreignKey: 'subjectId' });

Staff.hasMany(Group, { foreignKey: 'supervisorId' });

Group.belongsTo(Staff, { foreignKey: 'supervisorId' });

Student.hasMany(Member, { foreignKey: 'studentId' });

Member.belongsTo(Student, { foreignKey: 'studentId' });

Group.hasMany(Member, { foreignKey: 'groupId' });

Member.belongsTo(Group, { foreignKey: 'groupId' });

Student.hasMany(Attendance, { foreignKey: 'studentId' });

Attendance.belongsTo(Student, { foreignKey: 'studentId' });

Group.hasMany(Attendance, { foreignKey: 'groupId' });

Attendance.belongsTo(Group, { foreignKey: 'groupId' });

// object
db.sequelize = sequelize;
// class
db.Sequelize = Sequelize;

module.exports = db;
module.exports.Op = Sequelize.Op;
