const express = require('express');
const router = express.Router();

const controller = require('../controllers/users.controller');

router

    .get('/', controller.get)
    .post('/', controller.add)
    .put('/', controller.rewrite)
    .delete('/:id', controller.delete)

module.exports = router;