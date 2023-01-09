const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const showUser = require('../controllers/showUser.js')
const jwt = require('jsonwebtoken')
const authenticate = require('../model/authenticate')

router.use(bodyParser.json())

router.route('/').get(authenticate,showUser)

module.exports = router;
