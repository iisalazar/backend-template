const express = require('express');
const mongo = require('mongodb').MongoClient;
const crypto = require("crypto");
const assert = require('assert');
const jwt = require('jsonwebtoken');

const app = express();
// to enable REST endpoints
app.use(express.json());
// connecting to DB
const client = new mongo('mongodb://localhost:27017/user_db') 

const dbName = 'UsersDB'; // the database name to be used

let toHash = (text) => {
	const hasher = crypto.createHash('sha512');
	return hasher.update(text, 'utf-8').digest('hex')
}

let newToken = (payload, key='secretKey') => {
	return jwt.sign(payload, key)
}

let verifyAndDecode = (token, key='secretKey') => {
	return jwt.verify(token, key)
}

client.connect( (err) => {
	if(err){
		throw err
	}
	console.log("MongoDB connected...")
	const db = client.db(dbName)
	let users = db.collection('users');

	app.get('/', (req, res) => {
		res.send({ "test" : "A"})
	})

	app.get("/users/", (req, res) => {
		users.find({}).toArray( (err, u) => {
			res.send(u)
		})
	})
	app.get("/protected/", (req, res) => {
		var token = req.headers.token || null
		if (token === null){
			res.send({ "status" : "error", "message" : "No token provided" })	
		}else {
			var decoded = verifyAndDecode(token)
			res.send(decoded)
		}
	})
	app.post("/users/login/", (req, res) => {
		users.find({ username: req.body.username }).limit(1).next( (err, user) => {
			if(err){
				throw err
			}
			if(user !== null){
				// console.log(`User object: ${user}`)
				var hashed_password = toHash(req.body.password)
				if(hashed_password === user.password){
					res.send({
						"token" : newToken({ "username" : req.body.username})
					})
				}else {
					res.send({
						"match" : false
					})
				}
			}else {
				res.send({
					"status" : "error",
					"message": "User not found"
				})
			}

		})
	})
	app.post('/users/create/', (req, res) => {

		var data = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			username: req.body.username,
			password: toHash(req.body.password)
		}
		users.insertOne(data, (err, r) => {
			if(err) {
				throw err
			}
			console.log(r)
		})
		console.log(data)
		res.send(data)

	})

	app.listen(3000, (err) => {
		if(err){
			throw err
		}
		console.log("Server is running at :3000")
	})
})

/*
mongo.connect('mongodb://127.0.0.1/user_backend', (err, db) => {
	if(err){
		throw err
	}
	console.log("MongoDB connected...")

	


	app.get('/', (req, res) => {
		res.send({ "test" : "A"})
	})

	app.get("/users/", (req, res) => {
		users.find({}).toArray( (err, u) => {
			res.send(u)
		})
	})

	app.listen(3000, (err) => {
		if(err){
			throw err
		}
		console.log("Server is running at :3000")
	})
})

*/