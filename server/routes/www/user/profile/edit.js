'use strict'
const router   = require('express').Router(),
      passport = require('passport')

// Edit profile
router.post('/', (req, res) => {
  'use strict'

  // TODO

  // Dummy return value
  return res.json({
    type: 'POST',
    message: 'Edit profile request',
    receivedData: req.body
  })
})

module.exports = router
