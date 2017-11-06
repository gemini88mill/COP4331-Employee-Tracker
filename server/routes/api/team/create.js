'use strict'
const router   = require('express').Router(),
      passport = require('passport')

// Create team
router.post('/', (req, res) => {
  'use strict'

  // TODO

  // Dummy return value
  return res.json({
    type: 'POST',
    message: 'Create team request',
    receivedData: req.body
  })
})

module.exports = router
