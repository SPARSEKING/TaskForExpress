const express = require('express');
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser');
const userRoute = require('./routes/users.routes');
const keys = require('./config/keys.js');

const PORT = process.env.PORT ?? 3000;
const app = express();
const database = new Sequelize(keys.postgresURI);

database.authenticate()

app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'));

app.use('/auth', userRoute);

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
})