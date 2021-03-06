const express = require('express')
// Importation du "middleware" relatif à l'authentification
const auth = require("../middleware/auth");
const router = express.Router()
const ctrlComment = require('../controllers/comment')

// ------------Routes relatives aux commentaires------------------//
//Requête POST pour créer un commentaire
router.post('/comment', auth, ctrlComment.createComment)
//Requête POST pour voir tous les commentaires
router.post('/comments',  ctrlComment.findAllComments)
//Requête GET pour voir tous les commentaires
router.get('/comment/:id',  ctrlComment.findOneComment)


module.exports = router