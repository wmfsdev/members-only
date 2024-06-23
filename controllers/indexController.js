const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Message = require('../models/message');

exports.index = asyncHandler( async(req, res, next) => {

	const messages = await Message.find({}).populate("user", "username")
	let name

	if (req.user) name = req.user.username
	else name = null
	
  	res.render('index', { 
		user: req.user,
		username: name,
		messages: messages,
  	});
});
  
exports.index_post = [

	body('title')
		.trim()
		.isLength({ min: 1 })
		.escape()
		.withMessage('Title too short'),
	body('message')
		.trim()
		.isLength({ min: 5 })
		.escape()
		.withMessage("Message too short"),

	asyncHandler( async(req, res, next) => {
			
		const message = new Message({
			title: req.body.title,
			message: req.body.message,
			time: Date.now(),
			user: req.user.id,
		})
		
		await message.save()
		res.redirect('/')
	})

]