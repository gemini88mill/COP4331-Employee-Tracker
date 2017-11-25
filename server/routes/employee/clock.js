'use strict'
const router   = require('express').Router(),
      passport = require('passport'),
      User = require('../../models/user.js')

// Clock in/out
router.put('/', (req, res) => {
  'use strict'
  console.log(req.body);
  let coordinates = [req.body.location.lat, req.body.location.lng]
  // NOTE(timp): How the GPS coordinates are inserted will change.
  //             I'm not sure how it's setup in the Employee schema, but this
  //             is functional.
console.log(coordinates);
  User.findOneAndUpdate( { username: req.body.username }, { clockStatus: req.body.clockStatus, $push: { 'locations': { 'coordinates': coordinates } } }, {upsert: true}, (err, user) => {
    if (err) {
      res.status(500).json({ message: 'Clock status NOT changed.', error: err })
    } else {
      res.status(200).json({ message: 'Clock status changed to ' + req.body.clockStatus, data: req.body })
    }
  })
})

module.exports = router
