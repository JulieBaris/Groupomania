const Comment = require('../models/comment').Comment

module.exports = {

findAllComments:(req, res, next) => {
  Comment.findAll({where: {articleId: req.params.id}})
    .then(comments => {
        console.log(comments);
        res.status(200).json({data: comments});
    })
    .catch(error => res.status(400).json({ error }));
  },

  findOneComment : (req, res, next) => {
    Comment.findOne({ where: {id: req.params.id}})
    .then(comment => {
      console.log(comment);
      res.status(200).json(comment)
    })
    .catch(error => res.status(404).json({ error }));
  },

  createComment : (req, res, next) => {

    if (!req.body.content) {
      res.status(400).send({
          message: "impossible de publier un commentaire vide !"
      });
  }
  Comment.create(
    {
          userId: req.body.userId,
          postId: req.body.postId,
          content: req.body.content
      })
      .then(() => res.status(201).json({
          message: 'votre commentaire est créé !',
          userId: req.body.userId,
          postId: req.body.postId,
          content: req.body.content
      }))
      .catch(error => res.status(400).json({
          error,
          message: 'impossible de créer un commentaire'
      }))
  },

  deleteComment : (req, res, next) => {
    Comment.destroy({ where: {id: req.params.id} })
      .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  }

}