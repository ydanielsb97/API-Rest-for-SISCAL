var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var CalificacionesSchema = Schema({

	calMath: Number,
	calSoc: Number,
	calNat: Number,
	calSpan: Number,
	calIngl: Number,
	calCivic: Number,
	calArt: Number,
	calSport: Number
	
});

module.exports = mongoose.model("Cal", CalificacionesSchema);