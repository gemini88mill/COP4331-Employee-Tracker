'use strict'
const router   = require('express').Router(),
      passport = require('passport'),
      Employee = require('../../../models/employee.js')

// Log in - PLACEHOLDER for passport
router.post('/', (req, res) => {
  'use strict'
  let data = {
    username: req.body.username,
    password: req.body.password
  }

  // Look up the user with their username and password
  // Both must match in order to find them
  Employee.findOne(data, (err, employee) => {
    // In case of server-side error
    if (err) {
      return res.status(500).json({ message: 'Login was NOT successful' })
    } else {
      // Check if the user actually exists
      if (employee == null) {
        return res.status(404).json({ message: 'User not found' })
      // Found user, successful login
      } else {
        return res.status(200).json({ message: 'Log in succesfull!' })
      }
    }
  })
})

module.exports = router
