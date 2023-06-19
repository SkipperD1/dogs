const dotenv = require('dotenv');
dotenv.config({path: './settings.env'});


// Handling Uncaught Exception
process.on('uncaughtException', err => {
    console.log(`An error occurred: ${err.name}, ${err.message}, ${err.stack}`);
    console.log('Unhandled exception! shutting down server...');
    process.exit(1);
});

const app = require('./index');

// Connecting to Database
const {sequelize} = require('./configs/dbConnection');

sequelize
    .sync( { alter:true })
    .then(result => {
        console.log("Database synced.")
        const port = process.env.PORT || 4000;
        app.listen(port, () => {
            console.log(`App running on port ${port}...`);
        });
    })
    .catch( error => {console.log(error);
    });

// Handling Unhandled Rejection
process.on('unhandledRejection', err => {
    console.log(`An error occurred: ${err.name}, ${err.message}, ${err.stack}`);
    console.log('Unhandled rejection! shutting down server...');
    app.close(() => { process.exit(1); });
});