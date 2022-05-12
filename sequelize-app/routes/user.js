const express = require('express')
const password = require('../middleware/password_validator')
const {validateTocken} = require('../middleware/auth')
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
router.post('/login',loginUser)
//options : profils utilisateurs -> 
router.put('/profil/:id',validateTocken, updateProfil)
router.get('/allProfils',validateTocken, getAllProfils)
router.get('/profil/:id', validateTocken, getSingleProfil)
router.delete('/profil/:id',validateTocken, deleteSingleProfil)
//router.delete('/allProfils', authentification, deleteAllProfils)


// -------------------------EXPORT ROUTER-------------------------
module.exports = router