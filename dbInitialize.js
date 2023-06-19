// Required modules
const Sequelize = require('sequelize');

// Database configuration
const config = {
  username: 'root',
  password: 'root',
  database: 'dog',
  host: 'localhost',
  dialect: 'mssql',
};

const dogModel = require('./models/dogModel'); // Path to your User.js model file

const sequelize = new Sequelize(config);

sequelize.sync({ force: true }) // Set force to true to drop and recreate tables
  .then(() => {
    console.log('Database initialized successfully');

    // Create users
    const dogsData = [
        {
            "name": "Neo",
            "color": "red & amber",
            "tail_length": 22,
            "weight": 32
        },
        {
            "name": "Jessy",
            "color": "black & white",
            "tail_length": 7,
            "weight": 14
        }
    ];

    dogModel.bulkCreate(dogsData)
      .then(() => {
        console.log('Data inserted successfully');
      })
      .catch((error) => {
        console.error('Error inserting data:', error);
      });
  })
  .catch((error) => {
    console.error('Error initializing database:', error);
  });
