require('dotenv').config()
const jwt = require('jsonwebtoken')

const autherise = (req,res,next) => {
    const user = {mobileno : req.body.mobileno}
    const Token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    req.accessToken = Token
    next()
}

module.exports = autherise