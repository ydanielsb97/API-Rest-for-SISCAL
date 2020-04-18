
var mongoose = require("mongoose");
var User = mongoose.model("User");

module.exports.profileRead = function(req, res){


	if(!req.payload.id){
		res.status(401).json({
			"message":"UnauthorizedError: Perfil privado"
		})
	}else{

		User.findById(req.payload_id).exec(function(err, user){

			res.status(200).json(user);
		})
	}


}