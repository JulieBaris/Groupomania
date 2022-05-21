const express = require('express')
const router = express.Router()
const {
     updateProfil,
     getAllProfils,
     getSingleProfil,
     deleteSingleProfil

    } = require('../controllers/user')

// Profils utilisateurs -> 
router.put('/profil/:id', updateProfil)
router.get('/profils', getAllProfils)
router.get('/profil/:id', getSingleProfil)
router.delete('/profil/:id', deleteSingleProfil)
//router.delete('/allProfils', authentification, deleteAllProfils)


// -------------------------EXPORT ROUTER-------------------------
module.exports = router