const express = require('express')
const router = express.Router()
const auth = require("../middleware/auth")
const {
     updateProfil,
     getAllProfils,
     getSingleProfil,
     deleteSingleProfil

    } = require('../controllers/user')

// Profils utilisateurs -> 
router.put('/profil/:id', auth, updateProfil)
router.get('/profils', auth, getAllProfils)
router.get('/profil/:id', auth, getSingleProfil)
router.delete('/profil/:id', auth, deleteSingleProfil)
//router.delete('/allProfils', auth, deleteAllProfils)


// -------------------------EXPORT ROUTER-------------------------
module.exports = router