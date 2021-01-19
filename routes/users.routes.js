const express = require('express');
const router = express.Router();

const controller = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/authMiddleware.js');

router

    .get('/',authMiddleware, controller.get)
    .post('/', controller.register)
    .delete('/', controller.delete)
    .post('/login', controller.login)

module.exports = router;