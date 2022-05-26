//___________________________Création des "controllers" pour les posts____________________//
// Importation du modèle d'un post
const Post = require('../models').Post
const Comment = require('../models').Comment
const User = require('../models').User

// controller pour créer un article     
exports.createPost = async (req, res, next) => {
  // éléments de la requète
  const title = req.body.title;
  const content =  req.body.content;
  const imageUrl = req.body.imageUrl;
  // vérification que tous les champs sont remplis
  if(title === null || title === '' || content === null || content === ''|| imageUrl === null || imageUrl === '')
  {
      return res.status(400).json({message: "Merci de remplir tous les champs du formulaire."});
  }
  const postObject = req.body;
  // Création d'un nouvel objet article
  const post = new Post({...postObject});
  // Enregistrement de l'objet article dans la base de données
  post.save()
    .then(() => res.status(201).json({ message: 'Article créé !'}))
    .catch(error => res.status(400).json({ error }))
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
  .catch(error => res.status(400).json({ error, message:" L'article n'a pas été modifié !" }))
}
// controller pour trouver tous les articles d'un utilisateur
exports.getByUserId =(req, res, next) => 
{
  Post.findAll({where:{userId: req.body.UserId}})
  .then(articleById => {res.status(200).json(articleById)})
  .catch(error => res.status(404).json({ error, message: "Aucun article correspondant à cet utilisateur a été trouvé." }));
}
// controller pour trouver un article
exports.findOnePost = (req, res, next) => {
  Post.findOne({ where: {id: req.params.id} })
  .then(article => {res.status(200).json(article)})
  .catch(error => res.status(404).json({ error, message:"L'article n'a pas été trouvé."}));
};
// controller pour trouver tous les articles
exports.findAllPosts = (req, res, next) => {
  Post.findAll({
    include : {
      model : User,
      attributes : ["id","userName", "imageUrl"]
    },
    order: [['createdAt', 'DESC']]})
  .then(posts => {res.status(200).json(posts)})
  .catch(error => res.status(400).json({error, message:"Aucun article article n'a été trouvé."} ));
};
// controller pour supprimer un article
exports.deletePost = (req, res, next) => {
  Comment.destroy({where: {id: req.params.id}})
    .then(() => 
      Post.destroy({ where: {id: req.params.id} })
      .then(() => res.status(200).json({ message: "L'article a été supprimé avec succès !"}))
      .catch(error => res.status(400).json({error, message:"L'article n'a pas été supprimé."}))
    )
    .catch(error => res.status(500).json({error, message:"Une erreur s'est produite."}))
};
// controller pour supprimer tous les articles d'un utilisateur
exports.deleteAllMyPosts = (req, res, next) => 
{
  Comment.destroy({where:{userId: req.body.UserId}})
  .then(() =>
    Post.destroy({where:{userId: req.body.UserId}})
    .then(() => res.status(200).json({ message: "Tous vos articles ont été supprimés !"}))
    .catch(error => res.status(400).json({error, message:"Nous n'avons pas pu supprimer vos articles."}))
  )
  .catch(error => res.status(500).json({error, message:"Une erreur s'est produite."}))
};
// contrôleur dédié à l'administrateur pour supprimer un article
exports.adminDeletePost = (req, res, next) => 
{
  Comment.destroy({where:{id: req.body.id}})
  .then(()=> Post.findOne({where: {id: req.params.id}})
  .then(post =>
    {
      post.destroy({where: {id: req.params.id, isAdmin : true}})
      .then(() => res.status(200).json({message: "Vous avez supprimé la publication de l'utilisateur"}))
      .catch(error => res.status(400).json({ error, message: "L'article n'a pas été supprimé."}))
    })
  .catch(error => res.status(500).json({error, message:"Une erreur s'est produite."})))
};