var router = require('express').Router();
var sequelize = require('../db.js');
var Log = sequelize.import('../models/log.js');
var User = sequelize.import('../models/user.js');
// var Definition = sequelize.import('../models/definition.js');

router.post('/', function(req, res){
	//req has some body properties that have a username and pwd
	var description = req.body.log.description;
	var result = req.body.log.result;
	var definition = req.body.log.def;
	var user = req.user;
	console.log(req.body)
	//use our sequelize model to create log 
	Log
		.create({
			description: description,
			result: result,
			owner: user.id,
			def: definition
		})
		.then(
			function createSuccess(log){
				res.json(log);
			},
			function createError(err){
				res.send(500, err.message);
			}
		);
}); 

router.get('/', function(req, res){
	var userid = req.user.id;
	Log
		.findAll({
			where: { owner: userid }
		})
		.then(
			function findAllSuccess(data){
				//console.log(data);
				res.json(data);
			},
			function findAllError(err){
				res.send(500, err.message);
			}
		);
});

//This will retrieve one workout specified by the log id
router.get('/:id', function(req, res){
	var data = req.params.id;

	Log
		.findOne({
			where: { id: data }
		}).then(
			function getSuccess(updateData){
				res.json(updateData);
			},
			function getError(err){
				res.send(500, err.message);
			}
		);
});

//This will return the data from the log that was updated
router.put('/', function(req, res){
	var description = req.body.log.description;
	var result = req.body.log.result;
	var data = req.body.log.id;
	var definition = req.body.log.def;

	Log
		.update(
			{
				description: description,
				result: result,
				def: definition
			},

			{ where: { id: data } }
		)
		.then(
			function updateSuccess(updateLog){
				res.json(updateLog);
			},
			function updateError(err){
				res.send(500, err.message);
			}
		)
});

router.delete('/', function(req, res){
	var data = req.body.log.id;
	Log
		.destroy({
			where: { id: data }
		})
		.then(
			function deleteLogSuccess(data){
				res.send("you removed a log");
			},
			function deleteLogError(err){
				res.send(500, err.message);
			}
		);
});

module.exports = router;




