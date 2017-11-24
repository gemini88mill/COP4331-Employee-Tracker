'use strict'
var     router      = require('express').Router(),
        passport    = require('passport'),
        User        = require('../models/user');


// registration get route (show form)
router.get("/", function(req, res) {
    res.render("register");
});


// registration post route (submit form and create account)
router.post("/", function(req, res) {
    
    var newAdmin = new User ({username: req.body.username, privilege: 1, firstName: req.body.firstName, lastName: req.body.lastName});
    
    // TODO: search for user with username or email that already exists
    
    // create a new user, saving the hashed password instead of the password
    User.register(newAdmin, req.body.password, function(err, user) {
        // if failure, display flash message and redirect; exit method
        if(err) {
            console.log("Error creating new user: " + err);
            req.flash("error", err.message);
            res.status(500).json({ message: 'Registration was not successful.' });
            return res.render("register");
        }
        
        // if success, create account, flash, log to console
        else {
            res.status(201).json({ message: 'Registration was successful' });
            
            // TODO: Send email to newly registered users saying an account is attached
            // to the email they entered into the form
            
            passport.authenticate("local")(req, res, function() {
                console.log("New admin user created: " + User.username + ", first name: " + User.firstName + ", last name: " + User.lastName + ".");
                req.flash("success", "Successfully registered. Welcome " + User.firstName + ".");
                res.redirect("/");
            });
        }
        
    });
});


module.exports = router;