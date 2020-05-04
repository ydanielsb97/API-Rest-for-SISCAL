const User = require('./auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';
const expiresIn = 24 * 60 * 60;

exports.createUser = (req, res, next) =>{
	const newUser = {
		name: req.body.name,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password)
	}

	User.create(newUser, (err, user)=>{
		if(err && err.code == 11000) return res.status(409).send("Email already exist") 

		if (err) return res.status(500).send('Server Error');
		const accessToken = jwt.sign({id:user.id}, SECRET_KEY, {expiresIn: expiresIn})

		const userData = {
			name: user.name,
			email: user.email,
			accessToken: accessToken,
			expiresIn: expiresIn
		}

		res.send({ userData });
	});
}

exports.loginUsers = (req, res, next) => {
	const userData = {
		email: req.body.email,
		password: req.body.password
	}

	User.findOne({email: userData.email}, (err, user) =>{
		if(err) return res.status(500).send({message:"Has been an error"});

		if(!user){
			// Email does`nt exist
			res.status(409).send({message: "Has been an error"});
		}else{
			const resultPassword = bcrypt.compareSync(userData.password, user.password);
			if(resultPassword){
				const accessToken = jwt.sign({id: user._id}, SECRET_KEY, {expiresIn: expiresIn});		

			const dataUser = {
				name: user.name,
				email: user.email,
				accessToken: accessToken,
				expiresIn: expiresIn
			}	
				res.send({dataUser});

			}else{
				// Password does`nt exist

				res.status(409).send({message: "Has been an error"});
			}
		};
		

	});
}


