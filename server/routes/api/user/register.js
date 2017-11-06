'use strict'
const router   = require('express').Router(),
      passport = require('passport')

// Registration
router.post('/', (req, res) => {
  'use strict'

  // TODO

  // Dummy return value
  return res.json({
    type: 'POST',
    message: 'Registration request',
    receivedData: req.body
  })
})

module.exports = router
