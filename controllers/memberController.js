const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const Member = require('../models/member');

exports.member_create_get = asyncHandler(async (req, res, next) => {
  res.render('sign_up', {
    title: 'Sign-up Form',
  });
});

exports.member_create_post = [

  body('username')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Please enter a username'),
  body('password')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('password-confirm')
    .escape()
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords must match'),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const member = new Member({
      username: req.body.username,
      password: hashedPassword,
    });

    if (!errors.isEmpty()) {
      // there are errors
      res.render('sign_up', {
        title: 'Sign-up Form',
        username: member.username,
        errors: errors.array(),
      });
    } else {
      await member.save();
      res.redirect('/members/sign-in');
    }
  }),

];
