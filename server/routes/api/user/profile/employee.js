'use strict'
const router   = require('express').Router(),
      passport = require('passport')

// Log in
router.get('/', (req, res) => {
  'use strict'

  // TODO

  // Dummy return value
  return res.json({
    type: 'GET',
    message: 'employee profile request',
    receivedData: req.body
  })
})

module.exports = router
