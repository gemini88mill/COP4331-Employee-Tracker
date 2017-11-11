'use strict'
const router   = require('express').Router(),
      passport = require('passport'),
      Employee = require('../../../models/employee.js')

// List all users
router.get('/', (req, res) => {
  'use strict'
  Employee.find(function(err, employees) {
    if (err)
      res.send(err)
    else
      return res.json(employees)
  })
})

module.exports = router
