const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('./routes/users.routes');

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(bodyParser.json());

app.use('/users', userRoute);

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
})