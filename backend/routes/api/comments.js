const express = require('express');
const router = express.Router();
const { User, Song, Comment, } = require("../../db/models")
const { asyncHandler } = require('./utils')

//PUT /api/songs/:id/comments/:commentId - Update a comment for a song if the user is the author
router.put('/:id/comments/:commentId', asyncHandler(async (req, res) => {
  let comment = await Comment.findByPk(req.params.commentId)
  let user = await User.findByPk(req.session.userId)
  if (comment.userId === user.id) {
    let updatedComment = await comment.update({
      content: req.body.content,
    })
    return res.json(updatedComment)
  } else {
    res.status(403).send("You are not authorized to edit this comment")
  }
}))

//DELETE /api/songs/:id/comments/:commentId - Delete a comment for a song if the user is the author
router.delete('/:id/comments/:commentId', asyncHandler(async (req, res) => {
  let song = await Song.findByPk(req.params.id)
  let comment = await Comment.findByPk(req.params.commentId)
  if (comment.userId === req.user.id) {
    await comment.destroy()
    return res.json(comment)
  } else {
    res.status(403).json({ message: "You are not the author of this comment" })
  }
}))

//GET /api/songs/:id/comments/:commentId - Get a comment for a song
router.get('/:id/comments/:commentId', asyncHandler(async (req, res) => {
  let song = await Song.findByPk(req.params.id)
  let comment = await Comment.findByPk(req.params.commentId)
  return res.json(comment)
}))

module.exports = router;
