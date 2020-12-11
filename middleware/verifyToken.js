import { jwtVerify } from '../helpers/tokenHelper.js'

const verifyToken = (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) return res.status(401).send('Access Denied')
    
    const [authType, token] = authorization.trim().split(' ')

    if (authType !== 'Bearer') return res.status(401).send('Expected a Bearer token')

    try {
        const user = jwtVerify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = user
        next()
    } catch (error) {
        res.status(400).send('Invalid Token')
    }

}

export default verifyToken 