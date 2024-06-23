const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const passport = require('passport')

exports.user_create_get = asyncHandler(async (req, res, next) => {
  res.render('sign_up', {
    title: 'Sign-up Form',
    user: req.user,
  });
});

// SIGN-IN -- GET
exports.user_signin_get = asyncHandler(async (req, res, next) => {
  res.render('sign_in', {
    title: 'Sign-in',
    user: req.user,
  });
});

// SIGN-IN -- POST
exports.user_signin_post = passport.authenticate("local", {
  successRedirect: '/',
  failureRedirect: '/',
  failureMessage: true,
})

// LOG-OUT
exports.user_logout_get = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});


// MEMBERSHIP STATUS -- GET
exports.user_member_get = asyncHandler(async(req, res, next) => {
  res.render('user_member', {
    title: "Become a Member",
    user: req.user,
  })
})

// MEMBERSHIP STATUS -- POST
exports.user_member_post =  asyncHandler( async(req, res, next) => {
  const user = { _id: req.user.id }
  const update = { member: true }

  await User.findOneAndUpdate(user, update)
  res.redirect('/')
})

// ADMIN STATUS
exports.user_admin_get = asyncHandler( async(req, res, next) => {
  res.render('user_admin', {
    title: "Admin",
    user: req.user,
  })
})

exports.user_admin_post = [

  body('adminpass')
    .isLength({ min: 2 })
    .withMessage("too short"),

  asyncHandler( async(req, res, next) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {

      res.render('user_admin', {
        title: "Admin",
        user: user.req,
        errors: errors.array(),
      })
    } else if (process.env.adminPassword === req.body.adminpass) {
    
      const user = { _id: req.user.id }
      const update = { admin: true }

      await User.findOneAndUpdate(user, update)
      res.redirect('/')
    } else {
    
      res.render('user_admin', {
        title: "Admin",
        user: req.user,
        errors: [{ msg: "Incorrect Password" }]
      })
    }

  })

]

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
        user: req.user,
        errors: errors.array(),
      });
    } else {
      await user.save();
      res.redirect('/users/sign-in');
    }
  }),

];
