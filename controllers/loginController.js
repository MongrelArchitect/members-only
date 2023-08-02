const asyncHandler = require('express-async-handler');
const passport = require('passport');
const { body, validationResult } = require('express-validator');

// GET request for login form
exports.getLoginForm = (req, res, next) => {
  const errorMessage = req.session.flash.error;
  res.render('loginForm', {
    errors: errorMessage ? { auth: { msg: errorMessage } } : null,
  });
};

// POST request for login form
exports.postLoginForm = [
  body('email')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Please enter email')
    .isEmail()
    .withMessage('Invalid email address'),

  body('password', 'Password required').notEmpty(),

  asyncHandler(async (req, res, next) => {
    // check for errors in validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('loginForm', {
        email: req.body.email,
        errors: errors.mapped(),
        password: req.body.password,
      });
    } else {
      next();
    }
  }),

  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true,
    successRedirect: '/',
  }),
];
