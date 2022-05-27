const auth = require('../middleware/auth')

// Imports utils
const express = require("express");
const router = express.Router();

// importer les controllers
const adminCtrl = require("../controllers/admin");

// Requête DELETE de l'administrateur pour supprimer un profil
router.delete('/AdminDeleteProfil/:id',adminCtrl.adminDeleteProfil);
// Requête DELETE de l'administrateur pour supprimer un article
router.delete('/AdminDeletePost/:id', auth, adminCtrl.adminDeletePost);
// Requête DELETE de l'administrateur pour supprimer un commentaire
router.delete('/AdminDeleteComment/:id', adminCtrl.adminDeleteComment);

// Export du router
module.exports = router;