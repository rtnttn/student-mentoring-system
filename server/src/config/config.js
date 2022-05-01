// src/config/config.js
// holds all configuration data for the server

module.exports = {
  // Port variable
  port: process.env.PORT || 5000,

  // Database configuration
  db: {
    database: process.env.DB_NAME || 'mentor_system',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './mentor_system.sqlite',
    },
  },

  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'placeholdersecret',
  },
};
