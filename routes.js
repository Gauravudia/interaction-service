const express = require('express');
const interactionController = require('./controller');


const router = express.Router();

// Routes for interactions
router.post('/discussions/:id/like', interactionController.likeDiscussion);
router.post('/discussions/:id/comment', interactionController.commentOnDiscussion);
router.post('/comments/:id/like', interactionController.likeComment);
router.post('/comments/:id/comment', interactionController.replyToComment);
router.put('/comments/:id', interactionController.updateComment);
router.delete('/comments/:id', interactionController.deleteComment);


module.exports = router;