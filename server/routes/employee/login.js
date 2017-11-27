'use strict'
var     router      = require('express').Router(),
        passport    = require('passport'),
        User        = require('../../models/user');

// login post route
router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err)
    if (!user) res.status(404)
    req.logIn(user, function(err) {
      if (err) return next(err)
      return res.status(200).json(user)
    });
  })(req, res, next)
})

module.exports = router
