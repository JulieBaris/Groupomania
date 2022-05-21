const express = require('express')
// Importation du "middleware" relatif à l'authentification
const router = express.Router()
const {
     findAllComments,
     findOneComment,
     createComment,
     deleteComment
    } = require('../controllers/comment')

// -------------------------CUSTOM ROUTE-------------------------
router.post('/comment', createComment)
router.get('/comments', findAllComments)
router.get('/comment/:id', findOneComment)
router.delete('/comment/:id', deleteComment)

// -------------------------EXPORT ROUTER-------------------------
module.exports = router