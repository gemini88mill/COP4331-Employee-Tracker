'use strict'
const router   = require('express').Router(),
      passport = require('passport')

// List all tasks
router.get('/', (req, res) => {
  'use strict'

  // TODO

  // Dummy return value
  return res.json({
    type: 'GET',
    message: 'list all users request',
    receivedData: req.body
  })
})

module.exports = router
