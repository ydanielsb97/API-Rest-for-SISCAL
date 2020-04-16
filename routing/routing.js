
var express = require("express");
var controllerLogin = require("../controllers/siscal");

var routing = express.Router();

routing.post('/create', controllerLogin.createUser);
routing.get('/loginstudent/:userName', controllerLogin.getStudent);
routing.get('/loginteacher/:userName', controllerLogin.getTeacher);
routing.get('/loginmanager/:userName', controllerLogin.getManager);
routing.get('/getinfoforcal/:grade/:register', controllerLogin.getInfoCal);
routing.post('/getinfoforcal/:idcal', controllerLogin.setCal);



module.exports = routing;