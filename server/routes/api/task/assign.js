'use strict'
const router   = require('express').Router(),
      passport = require('passport'),
      middleware = require("../../middleware")

// Assign task
router.post('/', middleware.isAdministrator, (req, res) => {
  'use strict'

  // TODO

  // Dummy return value
  return res.json({
    type: 'POST',
    message: 'Assign task request',
    receivedData: req.body
  })
})

module.exports = router
