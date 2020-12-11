import jwt from 'jsonwebtoken'

const { sign, verify, decode } = jwt

const jwtSign = (payload, secretKey, expiredTime) => sign(payload, secretKey, expiredTime)

const jwtVerify = (payload, secretKey) => verify(payload, secretKey)

const jwtDecode = (token, secretKey) => decode(token, secretKey, {
    ignoreExpiration: true
})

export { jwtSign, jwtVerify, jwtDecode }