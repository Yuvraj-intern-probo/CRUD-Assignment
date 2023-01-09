const express = require('express')
const router = express.Router()
const createUser = require('../controllers/createUser')
const bodyParser = require('body-parser');
const authorise = require('../model/autherise')
router.use(bodyParser.json());

router.route('/').post(authorise,createUser)
    
module.exports = router