const express = require('express');
const indexController = require('../controllers/indexController');

const router = express.Router();

router.get('/', indexController.getIndex);

router.post('/', indexController.postIndex);

module.exports = router;
