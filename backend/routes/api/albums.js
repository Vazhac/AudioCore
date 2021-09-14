const express = require('express');
const router = express.Router();
const { User, Song, Comment, } = require("../../db/models")
const { asyncHandler } = require('./utils')

// GET /api/albums
router.get('/', asyncHandler(async (req, res) => {
  const albums = await Song.findAll({
    include: [{
      model: User,
      attributes: ['id', 'username']
    }]
  })
  res.json(albums)
}))

// GET /api/albums/:id based on album id
router.get('/:id', asyncHandler(async (req, res) => {
  const album = await Song.findByPk(req.params.id, {
    include: [{
      model: User,
      attributes: ['id', 'username']
    }]
  })
  res.json(album)
}));

// POST /api/albums
router.post('/', asyncHandler(async (req, res) => {
  const album = await Song.create(req.body)
  res.json(album)
}))


module.exports = router;
