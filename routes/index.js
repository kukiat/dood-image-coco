const express = require('express')
const { dood } = require('../scrap')
const { respondResult, respondError } = require('../utils/response')

const router = express.Router()

router.post('/loadImage', async (req, res, next) => {
  try {
    const images = await dood(req.body.category)
    respondResult(res)(images)
  }catch(err) {
    respondError(res)(err)
  }
})

module.exports = router