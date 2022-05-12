//_____________________________Les routes relatives aux sauces______________________//

//_______________Utils pour l'importation_________________//
// Importation de "express"
const express = require('express');
// Importation des routes de "express"
const router = express.Router();
// Importation du "middleware" relatif à l'authentification
const {validateTocken} = require('../middleware/auth');
// Importation du "middleware" relatif à "multer" pour la gestion des fichiers images
//const multer = require('../middleware/multer_config');
// Importation du "controller" relatif au sauce
const postCtrl = require('../controllers/post');

//_______________Gestion des routes_________________//
// permet à l'usager de trouver toutes les sauces
router.get('/articles', postCtrl.findAllPosts);
// permet à l'usager de trouver une sauce
router.get('/article/:id', postCtrl.findOnePost);
// Envoi des données du formulaire de sauce dans la collection MongoDB
router.post('/article', postCtrl.createPost);
// permet à l'user de modifier sa sauce, mise à jour des données de la collection MongoDB
router.put('/article/:id', postCtrl.modifyPost);
// permet à l'user de supprimer une sauce
router.delete('/article/:id', postCtrl.deletePost);
// permet d'envoyer son avis sur la recette
router.post('/article/:id/like', postCtrl.statusLike);

//___________________Exportation des routes_________________//
module.exports = router;