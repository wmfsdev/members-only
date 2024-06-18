const express = require('express');

const router = express.Router();

const user_controller = require('../controllers/userController');

// user - Sign-up

router.get('/sign-up', user_controller.user_create_get);

router.post('/sign-up', user_controller.user_create_post);

// user - Sign-in

router.get('/sign-in', user_controller.user_signin_get);

router.post('/sign-in', user_controller.user_signin_post)

// user - Membership

router.get('/membership', user_controller.user_member_get)

module.exports = router;
