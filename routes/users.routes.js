const express = require('express');
const router = express.Router();

const controller = require('../controllers/users.controller');

router

    .get('/', controller.get)
    .post('/', controller.add)
    .put('/:id', controller.rewrite)
    .delete('/:id', controller.delete)
    .post('/login', controller.login)
    .post('/registration', controller.register)

module.exports = router;