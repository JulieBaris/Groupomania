const express = require('express')
// Importation du "middleware" relatif à l'authentification
//const authentification = require('../middleware/auth');
const router = express.Router()
const {
     addComment,
     updateComment ,
     getAllComments,
     getSingleComment,
     deleteAllComments,
     deleteSingleComment
    } = require('../controllers/comment')

// -------------------------CUSTOM ROUTE-------------------------
router.post('/comment', addComment)

router.put('/comment/:id', updateComment)

router.get('/comments', getAllComments)

router.get('/comment/:id', getSingleComment)

router.delete('/comment/:id', deleteSingleComment)

router.delete('/comments', deleteAllComments)


// -------------------------EXPORT ROUTER-------------------------
module.exports = router