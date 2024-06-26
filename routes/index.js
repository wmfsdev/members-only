const express = require('express');

const router = express.Router();

const index_controller = require('../controllers/indexController');

router.get('/', index_controller.index)

router.post('/', index_controller.index_post)

router.post('/delete/:id', index_controller.index_message_post)

module.exports = router;
