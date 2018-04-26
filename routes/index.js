const express = require('express')
const scrap = require('../scrap')

const router = express.Router()

router.post('/loadImage', async (req, res, next) => {
  try {
    const images = await scrap.dood(req.body.category)
    res.status(200).send(images)
  }catch(err) {
    res.status(err.status || 400).send(err.message || err)
  }
})

module.exports = router