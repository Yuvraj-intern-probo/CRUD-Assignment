require('dotenv').config()
const jwt = require("jsonwebtoken")
const authorise = require('../model/autherise')


const authenticate = (req,res,next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] 
    //if the token exists, it splits it. Otherwise it returns undefined

    if(token == null)
        return res.sendStatus(401)
    
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user) => {
        if(err)
            return res.sendStatus(403)
        req.tokenUser = user
        next()
    })
}

module.exports = authenticate