const bodyParser = require('body-parser')
const express = require('express')
const router = express.Router()
const updateUser = require('../controllers/updateUser')
const authenticate = require('../model/authenticate')
router.use(bodyParser.json());

router.route('/').put(authenticate,updateUser)

module.exports = router;