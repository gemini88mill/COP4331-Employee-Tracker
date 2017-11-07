'use strict'
const router   = require('express').Router(),
      passport = require('passport'),
      Employee = require('../../../models/employee.js')

// Registration
router.post('/', (req, res) => {
  'use strict'
  let data = {
    username: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  }

  let entry = new Employee(data)
  entry.username = 'testname'
  console.log(entry);
  entry.save(function(err) {
    if (err) console.log(err)
    else res.json({
      type: 'POST',
      message: 'Registration was successful',
      status: 200,
      data: req.body
    })
  })

})

module.exports = router
