'use strict'

var mongoose = require ('mongoose');
var crypto = require ('crypto');
var Schema = mongoose.Schema;
var jwt = require('jsonwebtoken');

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
	credential: String

	//add password in frontend model
});

StudentSchema.method.setPassword = function(password){
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

StudentSchema.method.validPassword = function(password){
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');

	return this.hash === hash;
};

StudentSchema.method.generateJwt = ()=>{
	var expiry = new Date;
	expiry.setDate(expiry.getDate() + 7)

	return jwt.sign({
		_id: this._id,
		name: this.name,
		userName: this.userName,
		grade: this.grade,
		register: this.register,
		credential: this.credential
	}, "THE SECRET");
};

module.exports = mongoose.model("Student", StudentSchema);

