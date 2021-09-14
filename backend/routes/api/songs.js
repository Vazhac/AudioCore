let express = require('express');
const router = express.Router();
let { User, Song } = require('../../db/models');
const { asyncHandler } = require('./utils')

//GET /api/songs - Get the list of all songs
router.get('/', asyncHandler(async (req, res) => {
    const songs = await Song.findAll({
        include: [{
            model: User,
            attributes: ['id', 'username']
        }]
    })
    res.json(songs)
}))

//GET /api/songs/:id - Get a song by id
router.get('/:id', asyncHandler(async (req, res) => {
    const song = await Song.findByPk(req.params.id, {
        include: [{
            model: User,
            attributes: ['id', 'username']
        }]
    })
    res.json(song)
}))

//POST /api/songs - Create a new song and return the page with the new song
router.post('/', asyncHandler(async (req, res) => {
    const song = await Song.create(req.body)
    res.json(song)
}))

//DELETE /api/songs/:id - Delete a song if the user is the owner
router.delete('/:id', asyncHandler(async (req, res) => {
    const song = await Song.findByPk(req.params.id)
    if (song.userId === req.user.id) {
        await song.destroy()
        res.json({ success: true })
    } else {
        res.status(403).json({ success: false })
    }
}))

module.exports = router;
