const User = require('./auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';
const expiresIn = 24 * 60 * 60;

exports.createUser = (req, res, next) =>{
	const newUser = {
		name: req.body.name,
		userName: req.body.userName,
		password: bcrypt.hashSync(req.body.password)
	}

	User.create(newUser, (err, user)=>{
		if(err && err.code == 11000) return res.status(409).send("userName already exist") 

		
		if (err) return res.status(500).send('Server Error');
		const accessToken = jwt.sign({id:user.id}, SECRET_KEY, {expiresIn: expiresIn})

		const userData = {
			name: user.name,
			userName: user.userName,
			accessToken: accessToken,
			expiresIn: expiresIn
		}

		res.send({ userData });
	});
}

exports.loginUsers = (req, res, next) => {
	const userData = {
		userName: req.body.userName,
		password: req.body.password
	}

	User.findOne({userName: userData.userName}, (err, user) =>{
		if(err) return res.status(500).send({message:"Ha1s been an error"});

		if(!user){
			// userName does`nt exist
			res.status(409).send({message: "Has 2been an error"});
		}else{
			const resultPassword = bcrypt.compareSync(userData.password, user.password);
			if(resultPassword){
				const accessToken = jwt.sign({id: user._id}, SECRET_KEY, {expiresIn: expiresIn});		

			const dataUser = {
				name: user.name,
				userName: user.userName,
				accessToken: accessToken,
				expiresIn: expiresIn
			}	
				res.send({dataUser});

			}else{
				// Password does`nt exist

				res.status(409).send({message: "Ha3s been an error"});
			}
		};
		

	});
}


