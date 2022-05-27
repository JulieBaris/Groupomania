// Imports utils
const express = require("express");
const router = express.Router();
//authentification
const auth = require("../middleware/auth");

// importer les controllers
const postCtrl = require("../controllers/post");

// Requête POST pour poster un nouvel article
router.post("/article", auth, postCtrl.createPost);
// Requête PUT pour modifier un post 
router.put("/article/:id", auth, postCtrl.modifyPost);
// Requête GET pour afficher tous les articles
router.get("/articles",auth, postCtrl.findAllPosts);
// Requête POST pour trouver les articles publiés par un utilisateur en particulier
router.post('/articleByUserId', auth, postCtrl.getByUserId)
//Requête GET pour afficher un article grâce à son id
router.get("/article/:id", auth, postCtrl.findOnePost);
// Requête DELETE pour supprimer un article 
router.delete("/article/:id", auth, postCtrl.deletePost);
// Requête DELETE pour supprimer tous les articles publiés par un utilisateur en particulier 
router.delete("/myArticles", auth, postCtrl.deleteAllMyPosts);


// Export du router
module.exports = router;