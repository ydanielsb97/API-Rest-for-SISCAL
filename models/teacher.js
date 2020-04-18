'use strict'

var mongoose = require ('mongoose');
var crypto = require ('crypto');
var Schema = mongoose.Schema;
var jwt = require('jsonwebtoken');

var TeacherSchema = Schema({
	name: String,
	lastName: String,
	age: Number,
	img: String,
	matter: String,
	register: Number,
	startDate: Number,
	userName: String,
	credential: String,

	hash: String,
	salt: String
});


TeacherSchema.method.setPassword = function(password){
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

TeacherSchema.method.validPassword = function(password){
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');

	return this.hash === hash;
};

TeacherSchema.method.generateJwt = ()=>{
	var expiry = new Date;
	expiry.setDate(expiry.getDate() + 7)

	return jwt.sign({
		_id: this._id,
		name: this.name,
		userName: this.userName,
		register: this.register,
		credential: this.credential
	}, "THE SECRET");
};


module.exports = mongoose.model("Teacher", TeacherSchema);