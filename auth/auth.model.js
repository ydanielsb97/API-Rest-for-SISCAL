
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Modelo principal de usuarios usuarios

const userSchema = new Schema ({

	name:{
		type: String,
		required: true,
		trim: true //Quita los espacios en blanco
	},

	userName:{
		type: String,
		required: true,
		trim: true,
		unique: true // Hace que no se repita en la base de datos
	},

	password:{
		type: String,
		required: true,
		trim: true
	},

	cal:{
		type: Schema.ObjectId, ref: "Cal",
		required: false
	},

	privileges:{
		type: String,
		required: true,
		trim: true
	},

	personalData:{
		type: Schema.ObjectId, ref: "PersonalData",
		required: true
	}

},{
	timestamps:true // Hace que se guarde la fecha de creación y actualización
});

const calSchema = new Schema({

	math:{
		type: Number,
		value: 0
	},
	soc:{
		type: Number,
		value:0
	},
	nat:{
		type: Number,
		value: 0
	},
	esp:{
		type: Number,
		value: 0
	},
	arte:{
		type: Number,
		value: 0
	},
	MyC:{
		type: Number,
		value: 0
	},
	ingles:{
		type: Number,
		value: 0
	},
	Deprte:{
		type: Number,
		value: 0
	}


});

const personalSchema = new Schema({

	grade:{
		type: String,
		required: false
	},

	phone:{
		type: Number,
		required: true,
	},

	email:{
		type: String,
		required: true,
		unique: true,
		trim: true
	},

	address:{
		type: String,
		required: true
	},

	gender:{
		type: String,
		required: true
	},

	age:{
		type: Number,
		required: true
	},

	tutor1:{
		type: String,
		required: false
	},

	phoneTutor1:{
		type: Number,
		required: false
	},

	emailTutor1:{
		type: String,
		required: false,
		trim: true
	},

	tutor2:{
		type: String,
		required: false
	},

	phoneTutor2:{
		type: Number,
		required: false
	},

	emailTutor2:{
		type: String,
		required: false,
		unique: true,
		trim: true
	},

	affliction:{
		type: String,
		required: true
	}


})




module.exports = mongoose.model("PersonalData", personalSchema)
module.exports = mongoose.model("Cals", calSchema);
module.exports = userSchema;



