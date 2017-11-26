'use strict'
var     router      = require('express').Router(),
        passport    = require('passport'),
        nodemailer  = require('nodemailer'),
        Employee    = require('../../models/user'),
        Task        = require('../../models/task'),
        middleware  = require('../middleware');


// new task form, /task/create url
router.get("/", middleware.isAdministrator, function(req, res) {
    
     // show all level 0 employees in task assignment form
    Employee.find({ privilege: 0 }, function(err, employees) {
        if(err) {
            console.log("Error getting employees from database.");
            return res.redirect("/task");
        }
        
        res.render("task/create", {employees : employees});
    });
    
});


// submit newly created task to database
router.post("/", middleware.isAdministrator, function(req, res) {
   
   // get data from form and make new task
   Task.create(req.body.task, function(err, task) {
        if(err) {
            console.log("Unable to create new task: " + err + ".");
            req.flash("error", "Unable to create new task.");
            return res.redirect("task/index");
        }
      
        else {
            console.log("New task created.");
            
            // mailing transport
            var smtpTransport = nodemailer.createTransport({
                service: "gmail",
                host: "smtp.gmail.com",
                auth: {
                    user: "bigbrothertracker@gmail.com",
                    pass: "group11cop4331"
                }
            });
            
            req.body.asssignees.push(req.user._id); // add assigning admin to list
            
            // go through list of selected assignees, add task to list
            req.body.assignees.forEach(function(assignee) {
               
                Employee.findById(assignee, function(err, employee) {
                    if(err) {
                        console.log("Unable to add task to employee with id " + employee.id + ".");
                    }
                    else {
                        // add task to employee task list, then save employee
                        employee.tasks.push(task);
                        employee.save();
                        console.log("Added task to employee with id " + employee.id + ".");
                        
                        // Message object
                        var message = {
                            
                            // sender info
                            from: 'Big Brother Employee Tracker <bigbrothertracker@gmail.com>',
                            
                            // Comma separated list of recipients
                            to: '"' + employee.firstName + ' ' + employee.lastName + '" <' + employee.email + '>',
                            
                            // Subject of the message
                            subject: 'Big Brother: New Task Assigned', 
                            
                            // plaintext body
                            text: 'You have an update from Big Brother, ' + employee.firstName + '.' +
                                     'A new task was added to your to-do list by' + req.user.username + '.\n\n' +
                                     'TASK NAME: ' + task.name + '\n' +
                                     'DESCRIPTION: ' + task.description + '\n' +
                                     'DUE DATE: ' + task.due + '\n',
                            
                            // HTML body
                            html: '<h3>You have an update from Big Brother, ' + employee.firstName + '.</h3>' +
                                     '<p>A new task was added to your to-do list by ' + req.user.username + '.</p>' + 
                                     '<p><b>TASK NAME</b> ' + task.name + '</p>' +
                                     '<p><b>DESCRIPTION</b> ' + task.description + '</p>' +
                                     '<p><b>DUE DATE</b> ' + task.due + '</p>',
                        };
                        
                        // email level 0 employees with task update
                        if(employee.privilege === 0) {
                            smtpTransport.sendMail(message, function(error){
                                if(error)
                                    console.log('Error occured sending email: ' + error + ".");
                            });
                        }
                    }
                });
                
            });
            
            req.flash("success", "New task created and email notification sent to assigned employees.");
              
            res.redirect('view/' + task._id);
        }
    });
    
});

module.exports = router;