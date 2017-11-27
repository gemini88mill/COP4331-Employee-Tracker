'use strict'
var     router      = require('express').Router(),
        passport    = require('passport'),
        nodemailer  = require('nodemailer'),
        Employee    = require('../../models/user');

// registration post route (take JSON and create account); /employee/register url
router.post("/", function(req, res) {

    // TODO: Properly parse JSON from mobile app to create new user
    var newEmployee = new Employee ({username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email});

    // create a new user, saving the hashed password instead of the password
    Employee.register(newEmployee, req.body.password, function(err) {

        // if failure, display flash message and redirect; exit method
        if(err) {
            console.log("Error creating new user: " + err);
             return res.status(500).json({
                 type: 'POST',
                 message: 'Error registering new employee.',
                 receivedData: req.body
             });
        }

        // if success, create account, flash, log to console
        else {

            // Send email to newly registered users saying an account is attached
            // to the email they entered into the form
            var smtpTransport = nodemailer.createTransport({
                service: "gmail",
                host: "smtp.gmail.com",
                auth: {
                    user: "bigbrothertracker@gmail.com",
                    pass: "group11cop4331"
                }
            });
            
            // to the email they entered into the form
            // Message object
            var message = {
            
                // sender info
                from: 'Big Brother Employee Tracker <bigbrothertracker@gmail.com>',
            
                // Comma separated list of recipients
                to: '"' + newEmployee.firstName + ' ' + newEmployee.lastName + '" <' + newEmployee.email + '>',
            
                // Subject of the message
                subject: 'Welcome to Big Brother', 
            
                // plaintext body
                text: 'Welcome to the Group 11 Big Brother Employee Tracker, ' + newEmployee.firstName + '.' +
                     'This email address was used in your account creation. If you believe this email was received in error, please email back at this address. Thank you.' + 
                     'Your username is ' + newEmployee.username + ' and your password is ' + req.body.password + '. You can log in using this information at any time.',
            
                // HTML body
                html:'<h2>Welcome to the Group 11 Big Brother Employee Tracker, ' + newEmployee.firstName + '.</h2>' +
                     '<p>This email address was used in your account creation. If you believe this email was received in error, please email back at this address. Thank you.</p>'+
                     '<br>' + 
                     '<p>Your username is <b>' + newEmployee.username + '</b> and your password is <b>' + req.body.password + '</b>. You can log in using this information at any time.</p>'
            };
            
            smtpTransport.sendMail(message, function(error){
                if(error)
                    console.log('Error occured sending email: ' + error + ".");
            });

            smtpTransport.close(); // close the connection pool

            passport.authenticate("local")(req, res, function() {
                 console.log("New employee created: " + newEmployee.username + ", " + newEmployee.firstName + " " + newEmployee.lastName + ".");
                 res.json({
                     type: 'POST',
                     message: 'New employee successfully registered.',
                     receivedData: req.body
                 });
            });

        }

    });
});

module.exports = router;
