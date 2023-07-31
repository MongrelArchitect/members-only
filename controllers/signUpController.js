const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// GET request for sign up form
exports.getSignUpForm = (req, res, next) => {
  res.render('signUpForm');
};

// POST request for sign up form
exports.postSignUpForm = [
  // sanitize & validate input
  body('firstName')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('First name required')
    .isLength({ max: 255 })
    .withMessage('255 characters maximum'),

  body('lastName')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Last name required')
    .isLength({ max: 255 })
    .withMessage('255 characters maximum'),

  body('email', 'Valid email address required').trim().escape().isEmail(),

  body('password', 'Password does not meet requirements')
    .notEmpty()
    .withMessage('Password required')
    .isStrongPassword(),

  body('passwordConfirm')
    .notEmpty()
    .withMessage('Please confirm password')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match'),

  asyncHandler(async (req, res, next) => {
    const newUser = new User({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      member: false,
      password: req.body.password,
    });

    const errors = validationResult(req);
    // check for errors in form validation
    if (!errors.isEmpty()) {
      res.render('signUpForm', {
        errors: errors.mapped(),
        passwordConfirm: req.body.passwordConfirm,
        newUser,
      });
    } else {
      bcrypt.hash(req.body.password, 10, async (hashError, hashedPass) => {
        if (hashError) {
          // problem hashing the password
          next(hashError);
        } else {
          try {
            // use hashed password & save new user to database
            newUser.password = hashedPass;
            await newUser.save();
            res.send('SUCCESS!');
          } catch (err) {
            // problem saving user to database
            next(err);
          }
        }
      });
    }
  }),
];
