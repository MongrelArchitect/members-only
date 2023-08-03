const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');

exports.getAdmin = (req, res, next) => {
  if (!req.user || !req.user.member || req.user.admin) {
    res.redirect('/');
  }
  res.render('joinForm', { user: req.user });
};

exports.postAdmin = [
  body('password', 'Passcode required').notEmpty(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // no pass, redirect & inform
      res.render('adminForm', { errors: errors.mapped(), user: req.user });
    } else if (req.body.password !== process.env.ADMIN_PASSCODE) {
      // bad pass, redirect & inform
      res.render('adminForm', {
        // give error the same pattern as express-validator errors
        errors: { password: { msg: 'Incorrect passcode' } },
        user: req.user,
      });
    } else {
      // good to go
      try {
        await User.findByIdAndUpdate(req.user._id, { admin: true });
        res.redirect('/');
      } catch (err) {
        next(err);
      }
    }
  }),
];
