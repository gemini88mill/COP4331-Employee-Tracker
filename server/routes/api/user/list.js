'use strict'
const router   = require('express').Router(),
      passport = require('passport'),
      Employee = require('../../../models/employee.js')

router.post('/', (req, res) => {
  'use strict'
  Employee.find( { username: { $in: req.body } } , (err, user) => {
    if (err) return res.status(500).json(err)
    else if (user.length <= 0) return res.status(404).json(user)
    else return res.json(user)
  })
})

module.exports = router
