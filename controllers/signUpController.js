const asyncHandler = require('express-async-handler');
const passport = require('passport');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// GET request for sign up form
exports.getSignUpForm = (req, res, next) => {
  if (req.user) {
    res.redirect('/');
  } else {
    res.render('signUpForm');
  }
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

  body('email', 'Valid email address required')
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage('3 characters minimum')
    .isLength({ max: 254 })
    .withMessage('254 characters maximum')
    .isEmail()
    .custom(async (value) => {
      const existingUser = await User.findOne({ email: value });
      if (existingUser) {
        throw new Error('Email already in use');
      }
    }),

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
      admin: false,
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
            next();
          } catch (err) {
            // problem saving user to database
            next(err);
          }
        }
      });
    }
  }),

  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true,
    successRedirect: '/',
  }),
];
