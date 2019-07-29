const express = require('express')
const userRouter = require('./src/routers/user')
// const port = process.env.PORT // gets the port from the .env file in root directory
const port = 3000
require('./src/db/db')

const app = express();

app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
	console.log("Server running at :3000...")
})