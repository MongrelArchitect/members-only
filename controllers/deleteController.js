const asyncHandler = require('express-async-handler');
const { isValidObjectId } = require('mongoose');
const { body, validationResult } = require('express-validator');
const Message = require('../models/message');

exports.getDelete = (req, res, next) => {
  res.redirect('/');
};

exports.postDelete = [
  // input is hidden, but just in case someone's trying to be tricksy
  body('messageId', 'Invalid message ID')
    .trim()
    .escape()
    .notEmpty()
    .custom((value) => isValidObjectId(value))
    .custom(async (value) => {
      const message = await Message.findById(value);
      if (!message) {
        throw new Error('Invalid message ID');
      }
    }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      try {
        const messages = await Message.find({}).populate('user');
        res.render('index', {
          errors: errors.mapped(),
          messages,
          user: req.user,
        });
      } catch (err) {
        next(err);
      }
    } else if (!req.user || !req.user.admin) {
      res.redirect('/');
    } else {
      try {
        await Message.findByIdAndDelete(req.body.messageId);
        res.redirect('/');
      } catch (e) {
        next(e);
      }
    }
  }),
];
