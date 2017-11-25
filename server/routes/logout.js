'use strict'
var     router      = require('express').Router(),
        passport    = require('passport'),
        User        = require('../models/user');

// logging out
router.get("/", function(req, res) {
   req.logout();
   req.flash("info", "You have been logged out.");
   res.redirect("/");
});

module.exports = router;