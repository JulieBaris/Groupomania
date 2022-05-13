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
router.put('/profil/:id', updateProfil)
router.get('/profils', getAllProfils)
router.get('/profil/:id', getSingleProfil)
router.delete('/profil/:id', deleteSingleProfil)
//router.delete('/allProfils', authentification, deleteAllProfils)


// -------------------------EXPORT ROUTER-------------------------
module.exports = router