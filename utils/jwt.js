const {decode, sign, verify}  = require("jsonwebtoken")
require("dotenv").config()
const jwtSecretKey = process.env.JWT_SECRET_KEY || 'what'
const generateToken = ({userId}) => {
    const tokenTimeAlive = process.env.JWT_TIME_ALIVE
    const data = {
        expiredTime: (new Date().getTime() + tokenTimeAlive),
        _id: userId
    }
    console.log("secret key: ", jwtSecretKey)
    const token = sign(data, jwtSecretKey)

    return token
}
const getPayload = (token)  => {
    const result = verify(token, jwtSecretKey)
    return result
}

module.exports = {
    generateToken,
    getPayload
}