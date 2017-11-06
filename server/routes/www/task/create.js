'use strict'
const router   = require('express').Router(),
      passport = require('passport')

// Create task
router.post('/', (req, res) => {
  'use strict'

  // TODO

  // Dummy return value
  return res.json({
    type: 'POST',
    message: 'Create task request',
    receivedData: req.body
  })
})

module.exports = router
