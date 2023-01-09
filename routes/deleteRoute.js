const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const deleteUser = require('../controllers/deleteUser.js')
const authenticate = require('../model/authenticate')

router.use(bodyParser.json())

router.route('/').delete(authenticate,deleteUser)

module.exports = router;