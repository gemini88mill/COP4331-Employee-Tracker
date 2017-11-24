'use strict'
var     router      = require('express').Router(),
        passport    = require('passport'),
        User        = require('../models/user');

// login get route (show login form)
router.get("/", function (req, res) {
    res.render("login");
});


// login post route
router.post("/", passport.authenticate("local", {
    
        // unsuccessful login takes you back to login page
        // successful login takes you to dashboard and displays flash notification
        successRedirect: "/",
        failureRedirect: "/login"
    }), function(req, res) {
        console.log("User " + req.user.username + " logged in.");
        req.flash("info", "Welcome back.");
    }
    
);

module.exports = router;