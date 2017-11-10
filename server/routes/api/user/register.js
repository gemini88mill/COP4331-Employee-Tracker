'use strict'
const router   = require('express').Router(),
      passport = require('passport'),
      Employee = require('../../../models/employee.js')

// Registration - PLACEHOLDER for passport
router.post('/', (req, res) => {
  'use strict'
  let data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
    picture: req.body.picture,
    location: req.body.location
  }

  Employee.create(data, (err, employee) => {
    if (err) {
      res.status(500).json({ message: 'Registration was NOT successful' })
    } else res.status(200).json({ message: 'Registration was successful' })
  })
})

module.exports = router
