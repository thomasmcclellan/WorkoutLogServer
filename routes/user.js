var router = require('express').Router();
var sequelize = require('../db.js');
var User = sequelize.import('../models/user.js');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


router.post('/', function(req, res){
	var username = req.body.user.username;
	var pass = req.body.user.password;
	
	var firstName = req.body.user.firstName;
	var lastName = req.body.user.lastName;
	var age = req.body.user.age;
	var gender = req.body.user.gender;
	//Need to create a user object and use sequelize to put that user into our db

	User.create({
		username: username,
		passwordhash: bcrypt.hashSync(pass, 10),
		firstName: firstName,
		lastName: lastName,
		age: age,
		gender: gender
	}).then(
		//Sequelize is going to return the object it created from db
		function createSuccess(user){
			var token = jwt.sign({ id:user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 20 });
			res.json({
				user: user,
				message: 'created',
				sessionToken: token
			});
		}, 
		function createError(err){
			res.send(500, err.message);
		}
	);
});

module.exports = router;
