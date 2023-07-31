const express = require('express');
const signUpController = require('../controllers/signUpController');

const router = express.Router();

router.get('/', signUpController.getSignUpForm);
router.post('/', signUpController.postSignUpForm);

module.exports = router;
