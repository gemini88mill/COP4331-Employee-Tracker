'use strict'
const router   = require('express').Router(),
      passport = require('passport'),
      Employee = require('../../../models/employee.js')

// Registration - PLACEHOLDER for passport
router.post('/', (req, res) => {
  'use strict'
  Employee.create(req.body, (err, user) => {
    if (err) {
      res.status(500).json({ message: 'Registration was NOT successful' })
    } else res.status(201).json({ message: 'Registration was successful' })
  })
})

module.exports = router
