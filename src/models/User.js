const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const checkHash = require('../utils/password');

const userSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		validate: value => {
			if(!validator.isEmail(value)){
				throw new Error({ error: 'Invalid Email Address'})
			}
		}
	},
	password: {
		type: String,
		required: true,
		minLength: 7
	},
	tokens: [{
		token: {
			type: String,
			required: true
		}
	}]
})

// Hash the password before saving the user model
userSchema.pre('save', async function(next) {	
	let hasher = crypto.createHash('sha512')
	const user = this;
	if (user.isModified('password')){
		user.password = hasher.update(user.password, 'utf-8').digest('hex')
	}
	next()
})

// Generate an auth token for the user
userSchema.methods.generateAuthToken = async function(){
	const user = this
	const token = jwt.sign({ _id: user._id }, "MySecretKey69")//process.env.JWT_KEY)
	user.tokens = user.tokens.concat({ token })
	await user.save()
	return token
}

// Search for a user by email and password
userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email })
	if (!user){
		throw new Error({ error: "User not found" })
	}
	if (!checkHash(password, user.password)){
		throw new Error({ error: "Passwords do not match"})
	}
	return user
}

const User = mongoose.model('User', userSchema)
module.exports = User
