//___________________________Création des "controllers" pour les posts____________________//
// Importation du modèle d'un post
const Post = require('../models').Post
const Comment = require('../models').Comment
const User = require('../models').User
// Importation de l'outil fs (permet de supprimer les fichiers "image" inutils dans le dossier images)
//const fs = require('fs');

// controller pour trouver tous les articles
exports.findAllPosts = (req, res, next) => {
  Post.findAll({
    include : [User],
    order: [
      ['createdAt', 'DESC']
  ]})
  .then(posts => {
      console.log(posts);
      res.status(200).json(posts);
  })
  .catch(error => res.status(400).json(error ));
};
exports.getByUser =(req, res, next) => {
  console.log(typeof(req.body.UserId))
  
  Post.findAll({where:{userId: req.body.UserId}})
  .then(articleById => {
    console.log(articleById);
    res.status(200).json(articleById)
  })
  .catch(error => res.status(404).json({ error }));
}

// controller pour trouver un post
exports.findOnePost = (req, res, next) => {
  Post.findOne({ where: {id: req.params.id} })
  .then(article => {
    console.log(article);
    res.status(200).json(article)
  })
  .catch(error => res.status(404).json({ error }));
};

// controller pour créer un article     
exports.createPost = async (req, res, next) => {
  // éléments de la requète
  const title = req.body.title;
  const content =  req.body.content;
  const imageUrl = req.body.imageUrl;
 // const userId = User.findOne({where:{id : req.body.id}})

  // vérification que tous les champs sont remplis
  if(title === null || title === '' || content === null || content === ''|| imageUrl === null || imageUrl === '') {
      return res.status(400).json({'error': "Merci de remplir au minimum le champ Titre et Article."});
  }

  const postObject = req.body;

  // Création d'un nouvel objet article
  const post = new Post({
        ...postObject
    });
  // Enregistrement de l'objet article dans la base de données
  post.save()
    .then(() => res.status(201).json({ message: 'Article créé !'}))
    .catch(error => res.status(400).json({ error }));
};

// controller pour modifier un article
exports.modifyPost = (req, res, next) => {
  // éléments de la requète
  const title = req.body.title;
  const content =  req.body.content;
  const imageUrl =  req.body.imageUrl;

  // vérification que tous les champs sont remplis
  if(title === null || title === '' || content === null || content === '' || imageUrl === null || imageUrl === '') {
      return res.status(400).json({message: "Veuillez remplir tous les champs"});
  }
  const postObject = req.body;
  Post.update({ ...postObject}, { where: {id: req.params.id} })
  .then(() => res.status(200).json({ message: "L'article a été modifié avec succès !"}))
  .catch(error => res.status(400).json({ error }));
   
}
// controller pour supprimer un article
exports.deletePost = (req, res, next) => {
  Comment.destroy({where: {id: req.params.id}})
    .then(() => 
      Post.destroy({ where: {id: req.params.id} })
      .then(() => res.status(200).json({ message: "L'article a été supprimé avec succès !"}))
    )
};
exports.adminDeletePost = (req, res, next) => {
      Post.findOne({
              where: {
                  id: req.params.id
              }
          })
          .then(post => {
              
            post.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                .then(() => res.status(200).json({
                    message: 'Vous avez supprimé la publication du user'
                }))
                .catch(error => res.status(400).json({
                    error
                }))
          
          });
  };