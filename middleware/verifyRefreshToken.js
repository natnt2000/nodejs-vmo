import { jwtDecode } from '../helpers/tokenHelper.js'

const verifyRefreshToken = (req, res, next) => {
    const { access_token, refresh_token } = req.body

    if (!access_token || !refresh_token) return res.status(401).send('Access Denied')

    const accessPayload = jwtDecode(access_token, process.env.ACCESS_TOKEN_SECRET)
    const refreshPayload = jwtDecode(refresh_token, process.env.REFRESH_TOKEN_SECRET)

    if (accessPayload._id !== refreshPayload._id) return res.status(401).send('Access Denied')

    req.user = refreshPayload
    next()
}

export default verifyRefreshToken