
var express = require("express");
var jwt = require('express-jwt');

var auth = jwt ({secret: "MY_SECRET", userProperty: "payload"});
var routing = express.Router();

var ctrlProfile = require('../controllers/profile');
var ctrlAuth    = require('../controllers/authentication');

//Perfil luego de acceder
routing.get('/profile', auth, ctrlProfile.profileRead);

// Autenticación
routing.post('/login', ctrlAuth.login);
routing.post('/register', ctrlAuth.register);

module.exports = routing;