'use strict'

var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var ManagerSchema = Schema({
	name: String,
	lastName: String,
	age: Number,

	img: String,
	tutors: String,
	_userName: String,
	credential: String,
	
	hash : "",
	salt: ""
});

module.exports = mongoose.model("Manager", ManagerSchema);

