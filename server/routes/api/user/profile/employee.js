'use strict'
const router   = require('express').Router(),
      passport = require('passport')

// Log in
router.get('/', (req, res) => {
  'use strict'
  Employee.findOne( { username: req.body.username } , (err, user) => {
    if (err) return res.status(500).json(err)
    else if (!user) return res.status(404).json(user)
    else return res.json(user)
  })
})

module.exports = router
