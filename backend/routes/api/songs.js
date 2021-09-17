let express = require('express');
const router = express.Router();
let { User, Song } = require('../../db/models');
const { asyncHandler } = require('./utils')
const { restoreUser } = require('../../utils/auth');

//GET /api/songs - Get the list of all songs in the database
router.get('/', asyncHandler(async (req, res) => {
    const songs = await Song.findAll()
    res.json(songs)
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
