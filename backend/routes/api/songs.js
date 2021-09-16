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
    const { userId, title, album, url } = req.body;
    const song = await Song.create({ userId, title, album, url });
    res.json(song)
}))

router.put("/:id", asyncHandler(async (req, res) => {

    let song = await Song.findByPk(req.params.id);
    let { title, url, album } = req.body;

    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
        song.title = title;
        song.album = album;
        song.url = url;
        song.save();
        res.send(song)
    } else {
        res.send(errors)
    }
}));

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
