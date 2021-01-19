const express = require('express');
const router = express.Router();

const controller = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth.middleware.js');
const validationMiddleware = require('../middlewares/validation.middleware.js');
const createUserScheme = require('../validation-schemes/create-user.scheme.js');
const updateUserScheme = require('../validation-schemes/update-user.scheme');

router

    .get('/',authMiddleware, controller.get)
    .post('/',validationMiddleware(createUserScheme), controller.register)
    .delete('/', controller.delete)
    .post('/login', controller.login)
    .put('/:id',validationMiddleware(updateUserScheme), controller.update)

module.exports = router;