const express = require('express');
const router = express.Router();
const controller = require('./api.controller');

router.get('/', controller.handle.bind(controller))
router.get('/totals', controller.handle.bind(controller))
router.get('/:id', controller.handle.bind(controller))


module.exports = router;
