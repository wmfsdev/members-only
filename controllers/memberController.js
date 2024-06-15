const asyncHandler = require('express-async-handler');
const Member = require('../models/member');

exports.member_create_get = asyncHandler(async (req, res, next) => {
  res.render('sign_up_get', {
    title: 'Sign-up Form',
  });
});

exports.member_create_post = [

  // validation

  asyncHandler(async (req, res, next) => {
    const member = new Member({
      username: req.body.username,
      password: req.body.password,
    });
    await member.save();
  }),

];
