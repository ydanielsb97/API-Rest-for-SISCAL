
var passport = require('passport');
var mongoose = require('mangoose');
var User  = mongoose.model('User');

module.exports.register = function(req, res){

	var user = new User;

	user.userName = req.body.userName;
	user.name = req.body.name;

	user.setPassword(req.body.password);

	user.save(function(err){
		var token = user.generateJwt();

		res.response(200);

		res.json({
			"token": token
		});
	});
	
};

module.exports.login = function(req, res){

	passport.authenticate('local', function(err, user, info){

		var token;

		// Si passport tiene algún error
		if(err){
			res.status(404).json(err)
		};

		// Si usuario es encontrado
		if(user){
			token = User.generateJwt();

			res.status(200);
			res.json({
				"token": token
			});
		}else{
			//Si usuario no es encontrado
			res.status(401).json(info)
		};
	});
};

