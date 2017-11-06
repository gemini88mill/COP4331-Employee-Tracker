'use strict'
const router   = require('express').Router(),
      passport = require('passport')

// Edit task
router.post('/', (req, res) => {
  'use strict'

  // TODO

  // Dummy return value
  return res.json({
    type: 'POST',
    message: 'Edit task request',
    receivedData: req.body
  })
})

module.exports = router
