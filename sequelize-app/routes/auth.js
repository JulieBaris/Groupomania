// Imports utils
const express = require('express')
const password = require('../middleware/password_validator')
const router = express.Router()
const {
     signUp,
     loginUser
    } = require('../controllers/auth')

//Requête POST pour s'inscrire au réseau social
router.post('/sign-up', password, signUp)
//Requête POST pour se connecter au réseau social
router.post('/login', loginUser)


module.exports = router