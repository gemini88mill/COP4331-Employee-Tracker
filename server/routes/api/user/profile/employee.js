'use strict'
const router   = require('express').Router(),
      passport = require('passport'),
      middleware = require("../../../middleware"),
      Employee   = require("../../../../models/employee")

// Log in
router.get('/', middleware.isAdministrator, (req, res) => {
  'use strict'
  Employee.findOne( { username: req.body.username } , (err, user) => {
    if (err) return res.status(500).json(err)
    else if (!user) return res.status(404).json(user)
    else return res.json(user)
  })
})

module.exports = router
