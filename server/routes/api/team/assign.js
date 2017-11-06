'use strict'
const router   = require('express').Router(),
      passport = require('passport')

// Assign team
router.post('/', (req, res) => {
  'use strict'

  // TODO

  // Dummy return value
  return res.json({
    type: 'POST',
    message: 'Assign a person to a team request',
    receivedData: req.body
  })
})

module.exports = router
