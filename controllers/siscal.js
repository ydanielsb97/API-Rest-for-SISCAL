'use strict'
var Student = require('../models/student');
var Teacher = require('../models/teacher');
var Cal = require('../models/calificaciones');
var Crypto = require('crypto');

var controllerLogin = {

	createUser: function(req, res){
		var params = req.body

		if(params.credential == "Estudiante"){

			var usuario = new Student;
			var calificaciones= new Cal;

			usuario.name = params.name;
			usuario.lastName = params.lastName;
			usuario.img = null;
			usuario.grade = params.grade;
			usuario.register = params.register;
			usuario.userName = params.userName;
			usuario.credential = params.credential;

			calificaciones.calMath = 0
			calificaciones.calSoc = 0
			calificaciones.calNat = 0
			calificaciones.calSpan = 0
			calificaciones.calIngl = 0
			calificaciones.calCivic = 0
			calificaciones.calArt = 0
			calificaciones.calSpor = 0


			calificaciones.save((err, calificaciones1)=>{
				//Guardamos primero calificaciones para obtener su id y establecerlo en usuario

				usuario.calificaciones = calificaciones1._id;
				usuario.save((err, studentSaved)=>{
					//populamos la propiedad calificaciones del estudiante guardado para que nos muestre todas las calificacioes
					Student.populate(studentSaved, {path: "calificaciones"}, function(err, student){
						res.status(200).send({
							estudiante: student
					})
					});
				});

			})

			}else{

				var usuario = new Teacher;

				usuario.name = params.name;
				usuario.lastName = params.lastName;
				usuario.age = params.age;
				usuario.img = null;
				usuario.matter = params.matter;
				usuario._register = params._register;
				usuario.startDate = params.startDate;
				usuario.userName = params.userName;
				usuario.credential = params.credential;

				usuario.save((err, studentSaved)=>{
					res.status(200).send({
						Maestro: studentSaved
						});
					});

			};
	},

	getStudent: function(req, res){
		let userName = req.params.userName;
		Student.find({userName : userName}).exec((err,student)=>{
			Student.populate(student, {path: calificaciones}, function(err, student1){
				res.status(200).send({
				data: student
			})	
			})

		});

	},
	getTeacher: function(req, res){
		let userName = req.params.userName;

		Teacher.find({userName : userName}).exec((err,Teacher)=>{
				res.status(200).send({data: teacher1});	
		});

	},
	getManager: function(req, res){
		let userName = req.params.userName;
		Manager.find({userName : userName}).exec((err,Manager)=>{
				res.status(200).send({data: Manager});
		});

	},

	getInfoCal: function(req, res){
		/* El maestro digitará el grado y el numero de la lista del estudiante a modificar,
			Se recibirán por parámetros y se buscará el estudiante con dicho grado y registro,
			Se guarda el array con los del estudiante en una variable,
			y de la variable extraemos calificaciones. luego buscamos por ese id en Cal.
			*/
		let register = req.params.register;
		let grade = req.params.grade;
		Student.find({grade: grade, register: register}).exec((err, student)=>{
			let student1 = student[0];
			let calificaciones = student1.calificaciones;

			Cal.findById(calificaciones, (err, calificaciones1)=>{
			res.status(200).send({cal: calificaciones1})
			})
			
				
		});

	},

	setCal: function(req, res){
		/*Pasamos por parámetro el id de las calificaciones del estudiante obtenida
			previamente con getInfoCal, y por el cuerpo de la request el json con la
			calificación modificada*/
		let idCal = req.params.idcal;
		
		let calModificadas = req.body;

		Cal.findByIdAndUpdate(idCal, calModificadas, {new:true}, (err, calificacionesNew)=>{
			res.status(200).send({calificaciones:calificacionesNew});
		});
	}

};

module.exports = controllerLogin;