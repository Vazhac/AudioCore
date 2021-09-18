let express = require('express');
const router = express.Router();
let { User, Song, Comment, Album } = require('../../db/models');
const { asyncHandler } = require('./utils')
const { restoreUser } = require('../../utils/auth');

//GET /api/songs - Get the list of all songs in the database
router.get('/', asyncHandler(async (req, res) => {
    const songs = await Song.findAll()
    res.json(songs)
}))

//GET /api/songs/:id/comments - Get all comments for a song with the given id
router.get('/:id/comments', asyncHandler(async (req, res) => {
    // const song = await Song.findByPk(req.params.id)
    const comments = await Comment.findAll({
        include: User,
        where: {
            songId: req.params.id
        }
    })
    // console.log(comments)
    res.json(comments)
}))

//POST /api/songs/:id/comments - Create a comment for any song if the user is logged in
router.post('/:id/comments', asyncHandler(async (req, res) => {
    const { newComment } = req.body;
    const { userId, body, id } = newComment;
    // console.log(userId, body, songId)
    console.log(newComment)
    const comment = await Comment.create({ userId, body, songId: id });
    res.json(comment)
}))

//GET /api/songs/:id - Get a song by id
router.get('/:id', asyncHandler(async (req, res) => {
    const song = await Song.findByPk(req.params.id)
    res.json(song)
}))

//POST /api/songs - Create a new song and return the page with the new song
router.post('/', asyncHandler(async (req, res) => {
    const { userId, title, album, url } = req.body;
    const song = await Song.create({ userId, title, album, url });
    res.json(song)
}))

//PUT /api/songs/:id - Update a song by id
router.put('/:id', asyncHandler(async (req, res) => {
    const song = await Song.findByPk(req.params.id);
    const { userId, title, album, url } = req.body;
    const updatedSong = await song.update({ userId, title, album, url });
    res.json(updatedSong)
}))

//DELETE /api/songs/:id - Delete a song if the user is the owner
router.delete('/:id', restoreUser, asyncHandler(async (req, res) => {
    const song = await Song.findByPk(req.params.id)
    if (song.userId === req.user.id) {
        await song.destroy()
        res.json({ success: true })
    } else {
        res.status(403).json({ success: false })
    }
}))

module.exports = router;