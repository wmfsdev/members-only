const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const passport = require('passport')

exports.user_create_get = asyncHandler(async (req, res, next) => {
  res.render('sign_up', {
    title: 'Sign-up Form',
  });
});

// SIGN-IN -- GET
exports.user_signin_get = asyncHandler(async (req, res, next) => {
  res.render('sign_in', {
    title: 'Sign-in',
  });
});

// SIGN-IN -- POST
exports.user_signin_post = passport.authenticate("local", {
  successRedirect: '/',
  failureRedirect: '/',
  failureMessage: true,
})
// ----

exports.user_member_get = asyncHandler(async(req, res, next) => {
  res.render('user_member', {
    title: "Become a Member",
  })
})

exports.user_create_post = [

  body('username')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Please enter a username'),
  body('password')
    .isLength({ min: 1 }),
  body('password-confirm')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords must match'),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    });

    if (!errors.isEmpty()) {
      // there are errors
      res.render('sign_up', {
        title: 'Sign-up Form',
        username: user.username,
        errors: errors.array(),
      });
    } else {
      await user.save();
      res.redirect('/users/sign-in');
    }
  }),

];
