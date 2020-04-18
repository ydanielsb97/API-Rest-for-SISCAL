
var passport = require('passport');
var LocalStrategy = require('passport-local');
var mongoose = require('mongoose');
var Student = mongoose.model("Student");
var Teacher = mongoose.model("Teacher");
var Manager = mongoose.model("Manager");