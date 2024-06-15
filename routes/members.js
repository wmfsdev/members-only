const express = require('express');

const router = express.Router();

const member_controller = require('../controllers/memberController');

// MEMBER - Sign-up

router.get('/sign-up', member_controller.member_create_get);

router.post('/sign-up', member_controller.member_create_post);

module.exports = router;
