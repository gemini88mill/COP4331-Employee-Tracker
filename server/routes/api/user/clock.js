'use strict'
const router   = require('express').Router(),
      passport = require('passport'),
      Employee = require('../../../models/employee.js')

// Clock in/out
router.put('/', (req, res) => {
  'use strict'
  Employee.findOneAndUpdate(req.body.username, { clockStatus: req.body.clockStatus }, (err, user) => {
    if (err) {
      res.status(500).json({ message: 'Clock status NOT changed.' })
    } else res.status(201).json({ message: 'Clock status changed to ' + req.body.clockStatus })
  })
})

module.exports = router
