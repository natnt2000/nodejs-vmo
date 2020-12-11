import User from '../models/User.js'
import { jwtSign } from '../helpers/tokenHelper.js'

const login = async (req, res) => {
    const user = await User.findOne({ username: req.body.username })

    if (!user) return res.status(400).send("Username doesn't exist")

    const isMatched = await user.verifyPassword(req.body.password, user.password)

    if (!isMatched) return res.status(400).send('Password is incorrect')

    const access_token = await jwtSign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_LIFE
    })

    const refresh_token = await jwtSign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_LIFE
    })

    res.json({
        access_token,
        refresh_token,
        status: "Logged in"
    })
    
}

const refreshToken = async (req, res) => {
    const access_token = await jwtSign({_id: req.user._id}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_LIFE
    })
    res.json({
        access_token,
        refreshToken: req.body.refresh_token
    })
}

export { login, refreshToken }