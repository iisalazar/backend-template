const mongoose = require('mongoose');
//const url = process.env.MONGODB_URL
const url = 'mongodb://localhost:27017/user_db'
mongoose.connect(url, {
	useNewUrlParser: true,
	useCreateIndex: true
})