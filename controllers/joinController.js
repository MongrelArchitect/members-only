const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');

exports.getJoin = (req, res, next) => {
  if (!req.user || req.user.member) {
    res.redirect('/');
  }
  res.render('joinForm', { user: req.user });
};

exports.postJoin = [
  body('password', 'Passcode required').notEmpty(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // no pass, redirect & inform
      res.render('joinForm', { user: req.user, errors: errors.mapped() });
    } else if (req.body.password !== process.env.CLUB_PASSCODE) {
      // bad pass, redirect & inform
      res.render('joinForm', {
        user: req.user,
        // give error the same pattern as express-validator errors
        errors: { password: { msg: 'Incorrect passcode' } },
      });
    } else {
      // good to go
      try {
        await User.findByIdAndUpdate(req.user._id, { member: true });
        res.redirect('/');
      } catch (err) {
        next(err);
      }
    }
  }),
];
