const express = require('express');
const logoutController = require('../controllers/logoutController');

const router = express.Router();

router.get('/', logoutController.getLogout);

router.post('/', logoutController.postLogout);

module.exports = router;
