const express = require('express');
const router = express.Router();
const { User, Song, Album } = require("../../db/models")
const { asyncHandler } = require('./utils')
const { restoreUser } = require('../../utils/auth');

// GET /api/albums
router.get('/', asyncHandler(async (req, res) => {
  const albums = await Album.findAll({ include: User });
  res.json(albums)
}))

// POST /api/albums - Create a new album based on the request body
router.post('/', asyncHandler(async (req, res) => {
  const { userId, title, imageUrl } = req.body
  const album = await Album.create({ userId, title, imageUrl })
  res.json(album)
}))

// GET /api/albums/:id based on album id
router.get('/:id', asyncHandler(async (req, res) => {
  const album = await Album.findByPk(req.params.id, { include: User });
  res.json(album)
}))


//PUT /api/albums/:id - update album based on album id
router.put('/:id', asyncHandler(async (req, res) => {
  const album = await Album.findByPk(req.params.id, { include: User });
  const { title, imageUrl } = req.body
  const updatedAlbum = await album.update({ userId, title, imageUrl })
  res.json(updatedAlbum)
}))

//Delete /api/albums/:id - delete album based on album id if user is the owner
router.delete('/:id', restoreUser, asyncHandler(async (req, res) => {
  const album = await Album.findByPk(req.params.id)
  if (req.user.id === album.userId) {
    await album.destroy()
    res.json({ message: 'Album deleted' })
  } else {
    res.status(403).json({ message: 'You are not authorized to delete this album' })
  }
}))

module.exports = router;
