// 
//___________________________Création des "controllers" pour les posts____________________//
// Importation du modèle d'un post
const Post = require('../models').Post
// Importation de l'outil fs (permet de supprimer les fichiers "image" inutils dans le dossier images)
const fs = require('fs');

// controller pour trouver tous les articles
exports.findAllPosts = (req, res, next) => {
  // méthode findAll pour trouver tous les posts correspondant au model Post
  Post.findAll()
    // puis si "posts" est trouvé, on valide la requête et on renvoie la réponse au format json
    .then(posts => res.status(201).json(posts))
    .catch((e) => res.status(400).json(e, {
      message: "Aucun article n'a été trouvé !"
    }));
};

// controller pour trouver un post
exports.findOnePost = (req, res, next) => {
    let id = req.params.id
  // méthode findOne pour trouver avec en paramètre l'id de l'article, un article correspondant au model Post 
  Post.findOne({
      where : {id:id}
    }, {
      ...req.body
    })
    // puis si "onePost" est trouvé, on valide la requête et on renvoie la réponse au format json
    .then(onePost => res.status(201).json(onePost))
    .catch((e) => res.status(400).json(e, {
      message: "L'article recherché n'a pas été trouvé."
    }));
};

// controller pour créer un article     
exports.createPost = (req, res, next) => {
  // on crée une constante "postObject" pour que la requête POST puisse être acceptée 
 // let imageUrlPost = `${req.protocol}://${req.get('host')}/images/post/${req.file.filename}`
  let {firstName, lastName, object, article, imageUrl, like, dislikes, userLiked, userDisliked} = req.body
  // on crée et on sauvegarde une sauce dans la collection MongoDB en mettant en place les protocoles de sécurité
  const post = new Post({firstName, lastName, object, article, imageUrl, like, dislikes, userLiked, userDisliked});
  post.save()
    .then(() => res.status(201).json({
      message: "L'article a bien été créé !"
    }))
    .catch((e) => res.status(400).json(e, {
      message: "L'article n'a pas été créé !"
    }));
};

// controller pour modifier un article
exports.modifyPost = (req, res, next) => {
  //  let { firstName, lastName, object, article, imageUrl, like, dislike, userliked, userdisliked} = req.body
    let id = req.params.id

    Post.findOne({
        where: {id:id}
    }).then( post => {
        if (post){
            post.update({...req.body})
            .then((updatePost) => {
                return res.status(202).json({
                    message: "L'article a bien été modifié.",
                     updatePost
                })
            })
        }else{
            return res.status(206).json({
                message: "L'article n'a pas été trouvé."
            })
        }
    }).catch(error => {
        return res.status(400).json({
            "error": error
        })
    })
   
}
// controller pour supprimer un article
exports.deletePost = (req, res, next) => {
  // récupérer l'id dans l'url de la requête
  let id = req.params.id
  Post.findOne({
      where : {id : id}
    })
    .then(post => {
      //const filename = post.imageUrl.split('/images/post/')[1];
      //On supprime la sauce grâce à son id et on supprime l'image dans le dossier images grâce à la méthode unlink
    //   fs.unlink(`images/post/${filename}`, () => {
    //     Post.destroy({
    //         _id: req.params.id
    //       }, {
    //         ...req.body.imageUrl
    //       })
    post.destroy()
          .then(() => res.status(200).json({message: "L'article a bien été supprimé !"}))
          .catch(() => res.status(400).json({message: "L'article n'a pas été supprimé !"}));
      })
    //})
    .catch((e) => res.status(500).json(e, {
      message: "Une erreur est survenue."
    }));
};
//___________________________Création des "controllers" pour la gestion des likes____________________//

// controller pour gérer les likes/dislikes
exports.statusLike = (req, res, next) => {
  // récupérer l'id dans l'url de la requête
  let id = req.params.id
  Post.findOne({
      where : {id : id}
    })
    .then(postLikes => {
      // Si l'userLiked est False et que le like == 1, on incrément dans "likes" la valeur 1 et on push l'id dans l'userLiked 
      if (!postLikes.usersLiked.includes(req.body.userId) && req.body.like === 1) {
        // mise à jour de la table post
        Post.updateOne({
            _id: req.params.id
          }, {
            // utilisation de l'opérateur $inc de la table post
            $inc: {
              likes: 1
            },
            // utilisation de l'opérateur push
            $push: {
              usersLiked: req.body.userId
            }
          })
          .then(() => res.status(200).json({
            message: "J'aime!"
          }))
          .catch((e) => res.status(400).json(e, {
            message: "Une erreur est survenue!"
          }));
      }
      // Si l'userDisliked est False et que le like == -1, on incrément dans "dislikes" la valeur 1 et on push l'id dans l'userDisliked 
      if (!postLikes.usersDisliked.includes(req.body.userId) && req.body.like === -1) {
        // mise à jour de la table post
        Post.updateOne({
            _id: req.params.id
          }, {
            // utilisation de l'opérateur $inc de la table post
            $inc: {
              dislikes: 1
            },
            // utilisation de l'opérateur $push
            $push: {
              usersDisliked: req.body.userId
            }
          })
          .then(() => res.status(200).json({
            message: "Je n'aime pas !"
          }))
          .catch(error => res.status(400).json({
            error
          }, {
            message: "Votre avis n'a pas été mis à jour !"
          }));
      }
      // Si l'userLiked est True et que le like == 0, alors on incrémente dans le "likes" la valeur -1 et on supprime l'id de l'userLiked
      if (postLikes.usersLiked.includes(req.body.userId) && req.body.like === 0) {
        // mise à jour de la table post
        Post.updateOne({
            _id: req.params.id
          }, {
            // utilisation de l'opérateur $inc de table post
            $inc: {
              likes: -1
            },
            // utilisation de l'opérateur $pull
            $pull: {
              usersLiked: req.body.userId
            }
          })
          .then(() => res.status(200).json({
            message: "J'aimais, je n'ai plus d'avis."
          }))
          .catch(error => res.status(400).json({
            error
          }, {
            message: " Votre avis n'a pas été mis à jour !"
          }));
      }
      // Si l'userDisliked est True et que le like == 0, alors on incrémente dans le "likes" la valeur -1 et on supprime l'id de l'userDisliked
      if (postLikes.usersDisliked.includes(req.body.userId) && req.body.like === 0) {
        // mise à jour de la collection MongoDB
        Post.updateOne({
            _id: req.params.id
          }, {
            // utilisation de l'opérateur $inc de table post
            $inc: {
              dislikes: -1
            },
            // utilisation de l'opérateur $pull
            $pull: {
              usersDisliked: req.body.userId
            }
          })
          .then(() => res.status(200).json({
            message: "Je n'aimais pas, je n'ai plus d'avis."
          }))
          .catch(error => res.status(400).json({
            error
          }, {
            message: "Votre avis n'a pas été mis à jour"
          }));
      }
    }) // En cas d'erreur, renvoyer un message d'erreur
    .catch(() => res.status(500).json({
      message: "Une erreur est survenue."
    }));
}
// module.exports = {

//     // create post
//     addPost: (req, res, next) => {
//        let {firstName, lastName, object, article, imageUrl} = req.body
//        Post.create({
//            firstName,
//            lastName,
//            object,
//            article,
//            imageUrl,
//        })
//        .then((post) => {return res.status(201).json({
//                message: "Post created successfully",
//                post
//             })
//         .catch((err) => {
//             return res.status(400).json({err, message:"le post n'a pas été créé!"})
//         })
//     })
//     },

//     updatePost: (req, res, next) => {
//         let {firstName, lastName, object, article, imageUrl} = req.body
//         let id = req.params.id

//         Post.findOne({
//             where: {id:id}
//         }).then( post => {
//             if (post){
//                post.update({firstName, lastName, object, article, imageUrl})
//                 .then((updatePost) => {
//                     return res.status(202).json({
//                         message: "Post updated successfully",
//                         updatePost
//                     })
//                 })
//             }else{
//                 return res.status(206).json({
//                     message: "Post not found"
//                 })
//             }
//         }).catch(error => {
//             return res.status(400).json({
//                 error, 
//                 message:"une erreur est survenue."
//             })
//         })
//     },


//     // get all posts

//     getAllPosts: (req, res, next ) => {

//         Post.findAll({
//             attributes: ['id', 'firstName', 'lastName', 'object', 'article','imageUrl'],
//             limit: 40,
//             order: [['id', 'DESC']]
//         }).then(posts => {
//             return res.status(200).json({
//                 posts,
//                 message:"tous les posts ont été trouvé!"
//             })
//         }).catch(err => {
//             return res.status(400).json({err, message:"Aucun post n'a été trouvé."})
//         })
//     },

//     // get single Post by id

//     getSinglePost:(req, res, next) => {
//         let id = req.params.id

//         Post.findByPk(id)
//         .then((post) => {
//             return res.status(200).json({post, message:"le post a été trouvé"})
//         }).catch(err => {
//             return res.status(400).json({err, message:"le post n'a pas été trouvé."})
//         })
//     },

//      // delete Post by id

//      deleteSinglePost: (req, res, next) => {
//      let id = req.params.id

//      Post.destroy({
//           where: {id: id}
//      }).then(() =>{
//           return res.status(200).json({
//                message: "Post Deleted successfully"
//           })
//      }).catch(err =>{
//           return res.status(400).json({err, message:"l'article n'a pas été supprimé"})
//      })

//      },

//      // delete all users

//      deleteAllPosts: (req, res, next) => {
//      Post.destroy({
//           truncate: true
//           }).then(() => {
//           return res.status(200).json({
//                success: true,
//                message: "All Posts deleted"
//           })
//           }).catch(err => {
//                return res.status(400).json({err, message:"les articles n'ont pas été supprimés."})
//           })
//      },

// }