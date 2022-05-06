const express = require('express')
const password = require('../middleware/password_validator')
const authentification = require('../middleware/auth')
const router = express.Router()
const {
     signUp,
     loginUser,
     updateProfil,
     getAllProfils,
     getSingleProfil,
     deleteSingleProfil,
     deleteAllProfils,

    } = require('../controllers/user')

// -------------------------CUSTOM ROUTE-------------------------
router.post('/sign-up', password, signUp)
router.post('/login', loginUser)
//options : profils utilisateurs -> 
router.put('/profil/:id', password, authentification, updateProfil)
router.get('/allProfils' , getAllProfils)
router.get('/profil/:id', getSingleProfil)
router.delete('/profil/:id',authentification, deleteSingleProfil)
router.delete('/allProfils', deleteAllProfils)


// -------------------------EXPORT ROUTER-------------------------
module.exports = router