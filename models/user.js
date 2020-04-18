'use strict'

var mongoose = require ('mongoose');
var crypto = require ('crypto');
var Schema = mongoose.Schema;
var jwt = require('jsonwebtoken');

var userSchema = Schema({

	calificaciones: {type: Schema.ObjectId, ref: "Cal", require: false},
	userName: {type: String, unique: true, require: true},
	name: {type: String, require: true},

	hash: String,
	salt: String
	

	//add password in frontend model
});

userSchema.method.setPassword = function(password){
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.method.validPassword = function(password){
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');

	return this.hash === hash;
};

userSchema.method.generateJwt = ()=>{
	var expiry = new Date;
	expiry.setDate(expiry.getDate() + 7)

	return jwt.sign({
		_id: this._id,
		name: this.name,
		userName: this.userName,
		exp: parseInt(expiry.getTime() / 1000)
	}, "MY_SECRET");
};

module.exports = mongoose.model("User", userSchema);

