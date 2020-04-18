
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var InfoSchema = Schema({
	name: String,
	lastName: String,
	img: String,
	grade: String,
	register: Number,
	tutors: String,
	credential: String
})