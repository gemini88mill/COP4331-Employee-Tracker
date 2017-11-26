'use strict'
var     router      = require('express').Router(),
        passport    = require('passport'),
        nodemailer  = require('nodemailer'),
        Employee    = require('../../models/user');

// submit information from form for updates to level-0 employee profile; /employee/update/:id url
 // employees can update their first name, last name, position, email, task completion, and location data
router.put("/:id", function(req, res) {
    
    // TODO: get and parse JSON from mobile application properly
    
    // find employee document and perform necessary updates
    Employee.findById(req.params.id, function(err, admin) {
        if(err) {
            console.log("Unable to find employee with id " + req.params.id + ", error: " + err + ".");
            res.status(500).json({ message: 'Employee profile could not be updated.' });
        }
        else {
            
            // TODO: If a task is updated, then send an email to assigning admin
            // TODO: Take JSON info and update anything else that should be updated.
            // TODO: Update location information, do appropriate checks (no more than 5 most recent data points, time of last update, etc.)
            
        }
    });
});

module.exports = router;