const asyncHandler = require('express-async-handler');
// const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const Message = require('../models/message');
// const passport = require('passport')


exports.index = asyncHandler( async(req, res, next) => {

	// need to query db for messages
	const messages = await Message.find({}).populate("user", "username")
	let name
	let author

	console.log(req.user)
	console.log(messages)
	if (req.user) {
		name = req.user.username
	} else {
		name = null
	}
	
  	res.render('index', { 
		user: req.user,
		username: name,
		messages: messages,
  	});
});
  
exports.index_post = [

	// validation

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