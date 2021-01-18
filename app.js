const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoute = require('./routes/users.routes');
const keys = require('./config/keys.js');

const PORT = process.env.PORT ?? 3000;
const app = express();

mongoose.connect(keys.mongoURI)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(error => console.log(error));

app.use(bodyParser.json());

app.use('/auth', userRoute);


app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
})