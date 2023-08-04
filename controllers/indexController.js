const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Message = require('../models/message');

exports.getIndex = asyncHandler(async (req, res, next) => {
  try {
    const messages = await Message.find({}).populate('user');
    res.render('index', { messages, user: req.user });
  } catch (err) {
    next(err);
  }
});

exports.postIndex = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title required')
    .isLength({ min: 1, max: 50 })
    .withMessage('50 character limit'),

  body('text')
    .trim()
    .notEmpty()
    .withMessage('Message required')
    .isLength({ min: 1, max: 500 })
    .withMessage('500 character limit'),

  asyncHandler(async (req, res, next) => {
    const newMessage = new Message({
      text: req.body.text,
      timestamp: Date.now(),
      title: req.body.title,
      user: req.user._id,
    });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      try {
        const messages = await Message.find({});
        res.render('index', {
          errors: errors.mapped(),
          messages,
          newMessage,
          user: req.user,
        });
      } catch (e) {
        next(e);
      }
    } else if (!req.user) {
      res.redirect('/signup');
    } else {
      await newMessage.save();
      res.redirect('/');
    }
  }),
];
