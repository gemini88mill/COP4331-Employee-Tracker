'use strict'
const router   = require('express').Router(),
      passport = require('passport'),
      Employee = require('../../../models/employee.js'),
      middleware = require("../../middleware")

router.post('/', middleware.isAdministrator, (req, res) => {
  'use strict'
  let query
  console.log(req.body);
  if (req.body.username.length === 0)
    query = true
  else
    query = { username: { $in: req.body.username } }

  Employee.find(query, (err, user) => {
    if (err) return res.status(500).json(err)
    else if (user.length <= 0) return res.status(404).json(user)
    else return res.json(user)
  })
})

module.exports = router
