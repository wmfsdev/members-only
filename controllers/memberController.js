const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const Member = require('../models/member');

exports.member_create_get = asyncHandler(async (req, res, next) => {
  res.render('sign_up_get', {
    title: 'Sign-up Form',
  });
});

exports.member_create_post = [

  // validation

  asyncHandler(async (req, res, next) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await Member.create({
      username: req.body.username,
      password: hashedPassword,
    });
  }),

];
