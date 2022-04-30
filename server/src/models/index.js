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

// TODO data model

// object
db.sequelize = sequelize;
// class
db.Sequelize = Sequelize;
