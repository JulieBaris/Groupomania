const express = require('express')
const password = require('../middleware/password_validator')
const router = express.Router()
const {
     signUp,
     loginUser
    } = require('../controllers/auth')

// -------------------------CUSTOM ROUTE-------------------------
router.post('/sign-up', password, signUp)
router.post('/login', loginUser)
// -------------------------EXPORT ROUTER-------------------------
module.exports = router