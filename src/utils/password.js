const crypto = require('crypto')

class Hasher{
	checkMatch(text, hashed_password){
		const hasher = crypto.createHash('sha512')
		var password = hasher.update(text, 'utf-8').digest('hex')
		if(password === hashed_password){
			return true
		}
		return false
	}
	hashText (text){
		const hasher = crypto.createHash('sha512')
		return hasher.update(text, 'utf-8').digest('hex')
	}
}

module.exports = Hasher

