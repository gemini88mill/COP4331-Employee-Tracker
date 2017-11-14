'use strict'
const router     = require('express').Router(),
      passport   = require('passport'),
      middleware = require("../../middleware")

// Assign team
router.post('/', middleware.isAdministrator, (req, res) => {
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
