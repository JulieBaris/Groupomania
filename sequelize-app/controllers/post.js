
//___________________________Création des "controllers" pour les posts____________________//
// Importation du modèle d'un post
const Post = require('../models').Post
const Comment = require('../models').Comment
// Importation de l'outil fs (permet de supprimer les fichiers "image" inutils dans le dossier images)
const fs = require('fs');

// controller pour trouver tous les articles
exports.findAllPosts = (req, res, next) => {
  Post.findAll({
    order: [
      ['createdAt', 'DESC']
  ]})
  .then(articles => {
      console.log(articles);
      res.status(200).json(articles);
  })
  .catch(error => res.status(400).json({ error }));
};

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

  // vérification que tous les champs sont remplis
  if(title === null || title === '' || content === null || content === ''|| imageUrl === null || imageUrl === '') {
      return res.status(400).json({'error': "Merci de remplir au minimum le champ Titre et Article."});
  }

  const postObject = req.body;

  // Création d'un nouvel objet article
  const post = new Post({
        ...postObject,
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
  Post.update({ ...postObject, id:  req.params.id}, { where: {id: req.params.id} })
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

// // 
/** d'importer le package 'file system' de Node pour accéder aux differentes opérations liées aux systèmes de fichiers
 *  ainsi on peut gérer les téléchargements et suppressions d'images ***/
// const fs = require('fs');
// /*** importer les modèles ***/
// let db = require('../models');
// const Post = db.Post
// const User = db.User;
// const getAuthUserId = require("../middleware/getAuthUserId");
// /***  Créer un post ***/
// exports.createPost = (req, res, next) => {
//     if (!req.body.content) {
//         res.status(400).send({
//             message: "impossible de publier un message vide !"
//         });
//         return
//     }
//     if (req.file) {
//         Post.create({
//                 userId: getAuthUserId(req),
//                 content: req.body.content,
//                 imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
//             })
//             .then(() => res.status(201).json({
//                 message: 'post créé !'
//             }))
//             .catch((error) => res.status(400).json({
//                 error,
//                 message: 'Vous ne pouvez pas publier un post'
//             }))
//     } else {
//         Post.create({
//                 userId: getAuthUserId(req),
//                 content: req.body.content,
//                 imageUrl: null,
//             })
//             .then(() => res.status(201).json({
//                 message: 'post créé !'
//             }))
//             .catch((error) => res.status(400).json({
//                 error,
//                 message: 'Vous ne pouvez pas publier un post'
//             }))
//     }
// }
// /*** Modifier une publication ***/
// exports.updatePost = (req, res, next) => {
//     Post.findOne({

//             where: {
//                 id: req.params.id
//             }
//         })
//         .then(post => {
//             if (post.userId !== getAuthUserId(req)) {
//                 return res.status(404).json({
//                     error
//                 })
//             };
//             const postObject = req.file ? {
//                 ...req.body.post,
//                 imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//             } : {
//                 ...req.body
//             };
//             Post.update({
//                     ...postObject
//                 }, {
//                     where: {
//                         id: req.params.id
//                     }
//                 })
//                 .then(() => res.status(200).json({
//                     message: 'publication à jour !'
//                 }))
//                 .catch(error => res.status(400).json({
//                     error
//                 }))
//         });

// };
// /*** Supprimer une publication ***/
// exports.deletePost = (req, res, next) => {
//     Post.findOne({
//             where: {
//                 id: req.params.id
//             }
//         })
//         .then(post => {
//             if (post.userId !== getAuthUserId(req)) {
//                 return res.status(404).json({
//                     message: 'post introuvable'
//                 })
//             };
//             if (req.file) {
//                 const filename = post.imageUrl.split('/images/')[1];
//                 fs.unlink(`images/${filename}`, () => {
//                     post.destroy({
//                             where: {
//                                 id: req.params.id
//                             }
//                         })
//                         .then(() => res.status(200).json({
//                             message: 'le post est bien supprimé !'
//                         }))
//                         .catch(error => res.status(400).json({
//                             error
//                         }))
//                 })
//             } else {
//                 post.destroy({
//                         where: {
//                             id: req.params.id
//                         }
//                     })
//                     .then(() => res.status(200).json({
//                         message: 'le post est bien supprimé !'
//                     }))
//                     .catch(error => res.status(400).json({
//                         error
//                     }))
//             }
//         })
//         .catch(error => res.status(500).json({
//             error,
//             message: 'impossible de supprimer le post !'
//         }))
// };
// /* Afficher un seul message */
// exports.getOnePost = (req, res, next) => {
//     /*** on récupére id du post depuis la base de données ***/
//     Post.findOne({
//             where: {
//                 id: req.params.id
//             }
//         })
//         .then(post => res.status(200).json({
//             post
//         }))
//         .catch(error => res.status(404).json({
//             error,
//             message: 'impossible de récupèrer un post'
//         }))
// };
// /***  Afficher les posts ***/
// exports.getAllPosts = (req, res, next) => {
//     /*** on récupère tous les posts ***/
//     Post.findAll({
//             include: [{
//                 model: User,
//                 attributes: ['firstName', 'lastName', 'imageUrl']
//             }],
//         })
//         /*** si tout est ok ***/
//         .then(posts => res.status(200).json({
//             posts
//         }))
//         /*** sinon on envoie une erreur ***/
//         .catch(error => res.status(400).json({
//             error
//         }))

// };
// 