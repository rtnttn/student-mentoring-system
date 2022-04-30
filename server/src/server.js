// Imports
const express = require('express');
const config = require('./config/config');
// const db = require('./models')

// Initialize express
const app = express();

// Data handling middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routing middleware
// Test route
app.get('/test', (req, res) => {
  console.log('/test - test');
  res.send('Test route: Server up');
});

app.get('/', (req, res) => {
  console.log('/ - get');
  res.send('Home page');
});

// Start server
// db.sequelize.sync().then(() => {
//   app.listen(config.port, () => console.log(`Server is running on: ${config.port}`));
// })
app.listen(config.port, () => console.log(`Server is running on: ${config.port}`));
