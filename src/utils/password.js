const crypto = require('crypto')

const hasher = (text, user_password) => {
	const hasher = crypto.createHash('sha512')
	var hashed_password = hasher.update(text, 'utf-8').digest('hex')
	return user_password === hashed_password	
}
// exports as function
/*
	const hasher = require('/utils/Password')
	hasher(text, user_password_default)
*/
module.exports = hasher

