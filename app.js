'use strict'

var express = require('express');
var bodyPareser = require('body-parser');
var passport = require('passport');
var User = require('models/user');
var congi = require('config/passport');
var app = express();

// Configuráción de Rutas


var router = require('./routing/routing');


// Middlewares
// Son métodos o acciones que se ejecutaran antes del método de la ruta

app.use(bodyPareser.urlencoded({extended:false}));
app.use(bodyPareser.json()); // Convierte todas las request o peticiones a formato JSON

//CORS

//Rutas
app.use(passport.initialize());
app.use('/api', router);

//exportar

module.exports = app;

