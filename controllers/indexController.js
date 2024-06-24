const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Message = require('../models/message');

exports.index = asyncHandler( async(req, res, next) => {

	const messages = await Message.find({}).populate("user",  ["username", "admin"])
	let name
	let admin
	
	if (req.user) name = req.user.username, admin = req.user.admin
	else name = null, admin = null
	
  	res.render('index', { 
		user: req.user,
		username: name,
		admin: admin,
		messages: messages,
  	});
});

exports.index_message_post = asyncHandler( async(req, res, next) => {
	await Message.findByIdAndDelete(req.params.id)
	res.redirect('/')
})
  
exports.index_post = [

	body('title')
		.isLength({ min: 1 })
		.escape()
		.withMessage('Title too short'),
	body('message')
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