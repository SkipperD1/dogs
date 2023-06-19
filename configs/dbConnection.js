const Sequelize = require('sequelize');

const sequelize = new Sequelize('dog', 'root', 'root', {
    dialect: 'mssql',
    host: 'localhost',
    logging: false
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection established");
    })
    .catch((err) => {
        console.error("Unable to connect the database: ", err);
    });

module.exports = {sequelize, Sequelize};