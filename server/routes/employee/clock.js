'use strict'
const router   = require('express').Router(),
      passport = require('passport'),
      User = require('../../models/user.js')

// Clock in/out
router.put('/', (req, res) => {
  'use strict'
  console.log(req.body.location);
  User.findOneAndUpdate( { username: req.body.username }, { clockStatus: req.body.clockStatus, location: req.body.location }, {upsert: true}, (err, user) => {
    if (err) {
      res.status(500).json({ message: 'Clock status NOT changed.', error: err })
    } else {
      res.status(200).json({ message: 'Clock status changed to ' + req.body.clockStatus, data: req.body })
    }
  })
})

module.exports = router
