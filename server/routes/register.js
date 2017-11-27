'use strict'
var     router      = require('express').Router(),
        passport    = require('passport'),
        nodemailer  = require('nodemailer'),
        User        = require('../models/user');


// registration get route (show form)
router.get("/", function(req, res) {
    res.render("register");
});


// registration post route (submit form and create account)
router.post("/", function(req, res) {
    
    var priv = 1;
    
    // if database is empty, there are no other users; make a support super user as first account
    User.find({}, function(err, users) {
        
        if (err)
            console.log(err);
        
        if (users.length == 0)
            priv = 2;
            
        // else do nothing (keep privilege at 1)
    });
    
    
    var newAdmin = new User ({username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email});

    var smtpTransport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
            user: "bigbrothertracker@gmail.com",
            pass: "group11cop4331"
        }
    });

    // create a new user, saving the hashed password instead of the password
    User.register(newAdmin, req.body.password, function(err, user) {
        
        // if failure, display flash message and redirect; exit method
        if(err) {
            console.log("Error creating new user: " + err + ".");
            req.flash("error", err.message);
            return res.render("register");
        }
        
        // if success, create account, flash, log to console
        else {
            
            // to the email they entered into the form
            // Message object
            var message = {
            
                // sender info
                from: 'Big Brother Employee Tracker <bigbrothertracker@gmail.com>',
            
                // Comma separated list of recipients
                to: '"' + newAdmin.firstName + ' ' + newAdmin.lastName + '" <' + newAdmin.email + '>',
            
                // Subject of the message
                subject: 'Welcome to Big Brother', 
            
                // plaintext body
                text: 'Welcome to the Group 11 Big Brother Employee Tracker, ' + newAdmin.firstName + '.' +
                     'This email address was used in your account creation. If you believe this email was received in error, please email back at this address. Thank you.' + 
                     'Your username is ' + newAdmin.username + ' and your password is ' + req.body.password + '. You can log in using this information at any time.',
            
                // HTML body
                html:'<h2>Welcome to the Group 11 Big Brother Employee Tracker, ' + newAdmin.firstName + '.</h2>' +
                     '<p>This email address was used in your account creation. If you believe this email was received in error, please email back at this address. Thank you.</p>'+
                     '<br>' + 
                     '<p>Your username is <b>' + newAdmin.username + '</b> and your password is <b>' + req.body.password + '</b>. You can log in using this information at any time.</p>'
            };
            
            smtpTransport.sendMail(message, function(error){
                if(error)
                    console.log('Error occured sending email: ' + error + ".");
            });

            smtpTransport.close(); // close the connection pool
            
            passport.authenticate("local")(req, res, function() {
                user.privilege = priv;
                user.save();
                console.log("New admin user created: " + newAdmin.username + ", " + newAdmin.firstName + " " + newAdmin.lastName + ".");
                req.flash("success", "Successfully registered. Welcome " + newAdmin.firstName + ".");
                res.redirect("/");
            });
            
        }
        
    });
});


module.exports = router;