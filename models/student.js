'use strict'

var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = Schema({
	name: String,
	lastName: String,
	img: String,
	grade: String,
	register: Number,
	tutors: String,
	calificaciones: {type: Schema.ObjectId, ref: "Cal"},
	userName: String,
	hash: String,
	salt: String,
	credential: String,
	hash : "",
	salt: ""
});

module.exports = mongoose.model("Student", StudentSchema);

