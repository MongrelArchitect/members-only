const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Message = require('../models/message');

exports.getIndex = asyncHandler(async (req, res, next) => {
  try {
    const messages = await Message.find({}).populate('user');
    res.render('index', { messages, title: 'Members Only', user: req.user });
  } catch (err) {
    next(err);
  }
});

exports.postIndex = [
  // XXX Need max lenghts & whatnot
  body('title').trim().notEmpty().withMessage('Title required'),

  body('text').trim().notEmpty().withMessage('Message required'),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      try {
        const messages = await Message.find({}, 'text title');
        res.render('index', {
          errors: errors.mapped(),
          messages,
          title: 'Members Only',
          user: req.user,
        });
      } catch (e) {
        next(e);
      }
    } else if (!req.user) {
      res.redirect('/signup');
    } else {
      const newMessage = new Message({
        text: req.body.text,
        timestamp: Date.now(),
        title: req.body.title,
        user: req.user._id,
      });
      await newMessage.save();
      res.redirect('/');
    }
  }),
];
