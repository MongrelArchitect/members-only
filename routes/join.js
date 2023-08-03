const express = require('express');
const joinController = require('../controllers/joinController');

const router = express.Router();

router.get('/', joinController.getJoin);

router.post('/', joinController.postJoin);

module.exports = router;
