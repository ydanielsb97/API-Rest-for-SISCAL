
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({

	name:{
		type: String,
		required: true,
		trim: true //Quita los espacios en blanco
	},

	email:{
		type: String,
		required: true,
		trim: true,
		unique: true // Hace que no se repita en la base de datos
	},

	password:{
		type: String,
		required: true,
		trim: true
	}

},{
	timestamps:true // Hace que se guarde la fecha de creación y actualización
});

module.exports = userSchema;
