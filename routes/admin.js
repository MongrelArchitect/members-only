const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.get('/', adminController.getAdmin);

router.post('/', adminController.postAdmin);

module.exports = router;
