'use strict'

var mongoose = require ('mongoose');
var mongoosePromise = mongoosePromise;
var app = require('./app');

var port = 3700;


mongoose.connect('mongodb://localhost:27017/siscal')
	.then(() => {
		console.log("Conexión establecida KLK");

		// Establecemos la conexión

		app.listen(port, () => {
			console.log("Servidor corriendo mas que feliz sanchez")
		})
	})
	.catch(err => console.log(err));

