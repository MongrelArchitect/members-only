const passport = require('passport');
const { body, validationResult } = require('express-validator');

// GET request for login form
exports.getLoginForm = (req, res, next) => {
  if (req.user) {
    res.redirect('/');
  } else {
    const { flash } = req.session;
    res.render('loginForm', {
      // give it the same error message structure as express-validator
      errors: flash && flash.error ? { auth: { msg: flash.error } } : null,
      // passport strategy uses flash messages for prior form data
      email: flash && flash.email ? flash.email[0] : '',
      password: flash && flash.password ? flash.password[0] : '',
    });
  }
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

  (req, res, next) => {
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
  },

  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true,
    successRedirect: '/',
  }),
];
