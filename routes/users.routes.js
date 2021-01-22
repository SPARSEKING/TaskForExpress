const express = require('express');
const router = express.Router();

const controller = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth.middleware.js');
const validationMiddleware = require('../middlewares/validation.middleware.js');
const createUserScheme = require('../validation-schemes/create-user.scheme.js');
const updateUserScheme = require('../validation-schemes/update-user.scheme');
const upload = require('../middlewares/upload.js');

router

    .get('/', authMiddleware, controller.get)
    .post('/', upload.single('image'), controller.register)
    .delete('/:id', controller.delete)
    .post('/login', controller.login)
    .put('/:id', upload.single('image'), controller.update)

module.exports = router;