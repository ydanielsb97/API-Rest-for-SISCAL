'use strict'

var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var TeacherSchema = Schema({
	name: String,
	lastName: String,
	age: Number,
	img: String,
	matter: String,
	register: Number,
	startDate: Number,
	userName: String,
	credential: String
});

module.exports = mongoose.model("Teacher", TeacherSchema);