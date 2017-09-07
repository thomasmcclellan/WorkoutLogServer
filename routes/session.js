var router = require('express').Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var sequelize = require('../db');
var User = sequelize.import('../models/user');


router.post('/', function(req, res){
	//1) First we need a function that searches for a particular user that matches the incoming requires
		//2) If the request is successful and the username matches, we need to do some stuff
			//Compare the password
				//If the password matches, show success and give the user a token
				//If the password doesn't match, show that the failure to authenticate
			//If the request is not successful and there is not a user that matches that request, throw an error
			//3) If the request was not successful and that user doesn't exist, throw an error
	User.findOne({ where:{ username: req.body.user.username }}).then(
		function(user) {
			if (user) {
				bcrypt.compare(req.body.user.password, user.passwordhash, function(err, matches){
					if (matches) {
					   var token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
						res.json({
							user: user,
							message: "successfully authenticated",
							sessionToken: token
						});
					}else {
					res.status(500).send({ error: "failed to authenticate" });
					}
				});
			} else {
				res.status(500).send({ error: "failed to authenticate" });
			}
		},
		function(err) {
			res.json(err);
		}
	);
});

module.exports = router;