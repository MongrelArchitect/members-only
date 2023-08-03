const express = require('express');
const deleteController = require('../controllers/deleteController');

const router = express.Router();

router.get('/', deleteController.getDelete);

router.post('/', deleteController.postDelete);

module.exports = router;
