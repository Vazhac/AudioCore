const express = require('express');
const router = express.Router();
const { Album } = require("../../db/models")
const { asyncHandler } = require('./utils')
const { restoreUser } = require('../../utils/auth');

// GET /api/albums
router.get('/', asyncHandler(async (req, res) => {
  const albums = await Album.findAll()
  res.json(albums)
}))

// GET /api/albums/:id based on album id
router.get('/:id', asyncHandler(async (req, res) => {
  const album = await Album.findByPk(req.params.id)
  res.json(album)
}))

// POST /api/albums - Create a new album based on the request body
router.post('/', asyncHandler(async (req, res) => {
  const { title, imageUrl } = req.body
  const album = await Album.create({ title, imageUrl })
  res.json(album)
}))

//PUT /api/albums/:id - update album based on album id
router.put('/:id', asyncHandler(async (req, res) => {
  const album = await Album.findByPk(req.params.id)
  const updatedAlbum = await album.update(req.body)
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
