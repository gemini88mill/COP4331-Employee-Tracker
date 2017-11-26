'use strict'
var     router      = require('express').Router(),
        passport    = require('passport'),
        nodemailer  = require('nodemailer'),
        middleware  = require('../middleware'),
        Employee    = require('../../models/user');


// email form get route (show form)
router.get("/", middleware.isAdministrator, function(req, res) {
    
    // show all level 0 employees
    Employee.find({ privilege: 0 }, function(err, employees) {
        if(err) {
            console.log("Error getting employees from database.");
            return res.redirect('back');
        }
        
        res.render("employee/email", {employees : employees});
    });
    
});

// send email from form to selected employees (our "chat" function)
router.post("/", middleware.isAdministrator, function(req, res) {
   
    // mailing transport
    var smtpTransport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
            user: "bigbrothertracker@gmail.com",
            pass: "group11cop4331"
        }
    });
            
            
    // go through list of selected assignees, add task to list
    req.body.assignees.forEach(function(assignee) {
               
        Employee.findById(assignee, function(err, employee) {
            if(err) {
                console.log("Unable to retrieve employee with id " + employee.id + ".");
            }
            else {
                        
                // Message object
                var message = {
                            
                    // sender info
                    from: 'Big Brother Employee Tracker <bigbrothertracker@gmail.com>',
                                
                    // Comma separated list of recipients
                    to: '"' + employee.firstName + ' ' + employee.lastName + '" <' + employee.email + '>',
                                
                    // Subject of the message
                    subject: 'Big Brother: New Message', 
                                
                    // plaintext body
                    text: 'You have a new message from ' + req.user.username + ' via Big Brother, ' + employee.firstName + '.' +
                        req.body.message,
                                
                    // HTML body
                    html: '<h3>You have a new message from ' + req.user.username + ' via Big Brother, ' + employee.firstName + '.</h3>' +
                        '<p>' + req.body.message + '</p>'
                };
                        
                smtpTransport.sendMail(message, function(error){
                    if(error)
                        console.log('Error occured sending email: ' + error + ".");
                });
            }
        });
                
    });
            
    req.flash("success", "Email notification sent to selected employees.");
              
    res.redirect('back');
    
});

module.exports = router;