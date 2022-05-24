// Imports utils
const express = require("express");
const router = express.Router();
//authentification
const auth = require("../middleware/auth");
const authAdmin = require('../middleware/authAdmin')

// importer les controllers
const postCtrl = require("../controllers/post");

// Requête POST pour poster un nouvel article
router.post("/article", auth, postCtrl.createPost);
router.post('/articleByUserId', auth, postCtrl.getByUser)
// Requête PUT pour modifier un post 
router.put("/article/:id", auth, postCtrl.modifyPost);
// Requête DELETE pour supprimer un article 
router.delete("/article/:id", auth, postCtrl.deletePost);
// Requête GET pour afficher tous les articles
router.get("/articles",auth, postCtrl.findAllPosts);
//Requête GET pour afficher un article grâce à son id
router.get("/article/:id", auth, postCtrl.findOnePost);
// Requête DELETE de l'administrateur pour supprimer un article
router.delete('/article/:id', authAdmin, postCtrl.adminDeletePost);

// Export du router
module.exports = router;