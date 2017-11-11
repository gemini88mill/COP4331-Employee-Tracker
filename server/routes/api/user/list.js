'use strict'
const router   = require('express').Router(),
      passport = require('passport'),
      Employee = require('../../../models/employee.js')

router.post('/', (req, res) => {
  'use strict'
  // Determine what kind of request
  // 1. All users
  // 2. One user
  // 3. Many users
  // console.log(req.body);
  // If there were no user information
  if (!req.body) {
    Employee.find((err, employees) => {
      if (err)
      res.send(err)
      else
      return res.json(employees)
    })
  // Otherwise, find users
  } else {
    Employee.find( { username: { $in: req.body.users } } , (err, employees) => {
      if (err)
      res.send(err)
      else
      return res.json(employees)
    })
  }
})

module.exports = router
