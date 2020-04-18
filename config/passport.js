
var passport = require('passport');
var LocalStrategy = require('passport-local');
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy(
	function(username, password, done){
		User.findOne({username: userName}, (err, user)=>{
			if (err) { return done(err); };

			//Si usuario no es encontrado en la DB

			if (!user){ return done(null, false, {
				message: "Usuario no encontrado"
			})};

			//Si la contraseña es incorrecta 

			if (!User.validPassword(password)){
				return done(null, false, {
					message: "Contraseña incorrecta"
				});
			};

			// Si credenciales son correctas

			return done(null, user);

		})



	}));