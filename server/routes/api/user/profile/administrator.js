'use strict'
const router   = require('express').Router(),
      passport = require('passport'),
      middleware = require("../../../middleware")

// Log in
router.get('/', middleware.isAdministrator, (req, res) => {
  'use strict'

  // TODO

  // Dummy return value
  return res.json({
    type: 'GET',
    message: 'admin profile request',
    receivedData: req.body
  })
})

module.exports = router
