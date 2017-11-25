'use strict'
var     router      = require('express').Router(),
        passport    = require('passport'),
        Employee    = require('../../models/user');

// registration post route (submit form and create account)
router.post("/", function(req, res) {
    
    // TODO: Properly parse JSON from mobile app to create new user
    //var newEmployee = new User ({username: req.body.username, privilege: 0, firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email});

    // create a new user, saving the hashed password instead of the password
    // Employee.register(newEmployee, req.body.password, function(err) {
        
    //     // if failure, display flash message and redirect; exit method
    //     if(err) {
    //         console.log("Error creating new user: " + err);
    //          res.json({
    //              type: 'POST',
    //              message: 'Error registering new employee.',
    //              receivedData: req.body
    //          });
    //     }
        
    //     // if success, create account, flash, log to console
    //     else {
            
    //         // TODO: Send email to newly registered users saying an account is attached
    //         // to the email they entered into the form
            
    //         passport.authenticate("local")(req, res, function() {
    //          console.log("New employee created: " + newEmployee.username + ", " + newEmployee.firstName + " " + newEmployee.lastName + ".");
    //          res.json({
    //              type: 'POST',
    //              message: 'New employee successfully registered.',
    //              receivedData: req.body
    //          });
    //         });
            
    //     }
        
    // });
});

module.exports = router;