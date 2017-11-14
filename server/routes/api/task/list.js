'use strict'
const router   = require('express').Router(),
      passport = require('passport'),
      middleware = require("../../middleware")

// List all tasks
router.get('/', middleware.isAdministrator, (req, res) => {
  'use strict'

  // TODO

  // Dummy return value
  return res.json({
    type: 'GET',
    message: 'list all tasks request',
    receivedData: req.body
  })
})

module.exports = router
