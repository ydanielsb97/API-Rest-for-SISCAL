'use strict'

var express = require('express');
var bodyPareser = require('body-parser');

var app = express();

// Configuráción de Rutas


var router = require('./routing/routing');


// Middlewares
// Son métodos o acciones que se ejecutaran antes del método de la ruta
app.use(bodyPareser.urlencoded({extended:false}));
app.use(bodyPareser.json()); // Convierte todas las request o peticiones a formato JSON

//CORS

//Rutas

app.use('/api', router);

//exportar

module.exports = app;

