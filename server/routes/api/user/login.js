'use strict'
const router   = require('express').Router(),
      passport = require('passport')

// Log in
router.post('/', (req, res) => {
  'use strict'

  // TODO

  // Dummy return value
  return res.json({
    type: 'POST',
    message: 'Log in request',
    receivedData: req.body
  })
})

module.exports = router
