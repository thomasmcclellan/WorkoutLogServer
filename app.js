// This uses Nodemon
// It is a utility that will monitor for any changes in your source and automatically restart your server
// Used instead of node to allow that auto restart

// npm install -g nodemon (then)
// nodemon app.js

require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db.js');

var User = sequelize.import('./models/user');

sequelize.sync();
// sequelize.sync({ force: true }); //DANGER: THIS WILL DROP (DELETE) THE USER TABLE!!!

// User.sync();
// User.sync({ force: true }); //DANGER: THIS WILL DROP (DELETE) THE USER TABLE!!!

app.use(bodyParser.json());

// Middleware => CORS (Cross-Origin Resource Sharing)
app.use(require('./middleware/headers'));
app.use(require('./middleware/validate-session'));

app.use('/api/user', require('./routes/user'));
//login route
app.use('/api/login', require('./routes/session'));
app.use('/api/definition', require('./routes/definition'));
app.use('/api/log', require('./routes/log'));

//this links with client
app.use('/api/test', function(req, res){
	res.send('Hello World');
});

app.listen(3000, function(){
	console.log("app is listening on 3000");
});























