const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth')

const router = express.Router()

// CREATE endpoint
router.get('/users', (req, res) => {
	res.send("test")
})

router.post('/users', async(req, res) => {
	// Create new User
	try {
		const user = new User(req.body)
		await user.save()
		const token = await user.generateAuthToken()
		res.status(201).send({ token })
	} catch(error){
		res.status(400).send(error)
	}
})

// View profile of logged-in user
router.get('/users/me', auth, async(req, res) => {
	req.user.password = null
	res.send(req.user)
})

router.post('/users/login', async(req, res) => {
	// Login a registered user
	try {
		const { email, password } = req.body
		const user = await User.findByCredentials(email, password)
		if (!user){
			return res.status(401).send({ error: "Login failed! Check authentication token"})
		}
		const token = await user.generateAuthToken()
		res.send({token })
	} catch (error){
		res.status(400).send(error)
	}
})


// An endpoint to logout
router.post('/users/me/logout', auth, async(req, res) => {
	console.log(req.token)
	try {

		req.user.tokens = req.user.tokens.filter( (token) => {
			return token.token != req.token
		})
		await req.user.save()
		res.send({logout: true})
	} catch(error) {
		res.status(500).send(error)
	}
})

// An endpoint to logout all from my devices
router.post('/users/me/logoutall', auth, async(req, res) => {
	try {
		req.user.tokens.splice(0, req.user.tokens.length)
		await req.user.save()
		res.send({ logout: true })
	} catch(error){
		res.status(500).send(error)
	}
})
module.exports = router