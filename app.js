const express = require('express')
const app = express()
const port = 3000
const jwt  = require('jsonwebtoken')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

require('dotenv').config()

app.use(bodyParser.json())

mongoose.connect(
    process.env.DB_CONNECTION, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log('Connected to DB')
)

/*
const verifyToken = (req, res, next) => {
    const token = req.body.token
    if (!token) {
        return res.send('Invalid token')
    }

    const check = jwt.verify(token, 'admin', (err, user) => {
        if (err) return res.send('Invalid token')

        console.log(user)
        next()
    })
}
*/


const userRoute = require('./routes/users')
app.use('/api/users', userRoute)

app.listen(port, () => { console.log(`Server is running at http://localhost:${port}`) })