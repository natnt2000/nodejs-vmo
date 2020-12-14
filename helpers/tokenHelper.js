import jwt from 'jsonwebtoken'

const { sign, verify } = jwt

const jwtSign = (payload, secretKey, expiredTime) => sign(payload, secretKey, expiredTime)

const jwtVerify = (payload, secretKey) => verify(payload, secretKey)

const jwtVerifyIgnoreExpiration = (token, secretKey) =>  verify(token, secretKey, {
    ignoreExpiration: true
})

export { jwtSign, jwtVerify, jwtVerifyIgnoreExpiration }