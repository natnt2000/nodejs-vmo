const User = require('../models/User')

const router = require('express').Router()
const jwt = require('jsonwebtoken')

router.post('/login', async (req, res) => {
    const user = await User.findOne({username: req.body.username})

    if (!user) return res.status(400).send("Username doesn't exist")

    if (!(await user.verifyPassword(req.body.password))) return res.status(400).send('Password is incorrect')

    const token = await jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)

    res.header('auth-token', token).send(token)
})

module.exports = router