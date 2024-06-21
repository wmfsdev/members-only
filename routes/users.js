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

router.post('/membership', user_controller.user_member_post)

// admin

router.get('/admin', user_controller.user_admin_get)

router.post('/admin', user_controller.user_admin_post)

module.exports = router;
