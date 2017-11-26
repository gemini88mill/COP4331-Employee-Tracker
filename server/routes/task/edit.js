'use strict'
var     router      = require('express').Router(),
        passport    = require('passport'),
        nodemailer  = require('nodemailer'),
        Employee    = require('../../models/user'),
        Task        = require('../../models/task'),
        middleware  = require('../middleware');

// display form for editing singular task; /task/edit/:id url
router.get("/:id", middleware.isAdministrator, function(req, res) {
    
    Task.findById(req.params.id, function(err, task) {
        if(err) {
            console.log("Unable to retrieve task with id: " + req.params.id);
            res.redirect("task/index");
        }
       
        else {
            // show all level 0 employees in task assignment form
            Employee.find({ privilege: 0 }, function(err, employees) {
                if(err) {
                    console.log("Error getting employees from database.");
                    return res.redirect("/task");
                }
                
                res.render("task/edit", {employees : employees, task : task});
            });
        }
    });
});


// update singular task with id and redirect to task page
router.put("/:id", middleware.isAdministrator, function(req, res) {
    
    // update post from the form
    Task.findByIdAndUpdate(req.params.id, req.body.task, function(err, task) {
        if(err) {
            console.log("Unable to update task with id: " + req.params.id);
            req.flash("error", "Unable to update task, please try again later.");
            res.redirect("task/index");
        }
        else {
            
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
                        console.log("Unable to add task to employee with id " + employee.id + ".");
                    }
                    
                    // if employee doesn't have task currently in task list, then update task list
                    else if (employee.tasks.indexOf(task.id) === -1) {
                        // add task to employee task list, then save employee
                        employee.tasks.push(task);
                        employee.save();
                        console.log("Added task to employee with id " + employee.id + ".");
                        
                        // Message object
                        var message = {
                            
                            // sender info
                            from: 'Big Brother Employee Tracker <bigbrothertracker@gmail.com>',
                            
                            // Comma separated list of recipients
                            // TODO: Make this so that it sends to all employees selected
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
                        
                        // email employee with task update
                        smtpTransport.sendMail(message, function(error){
                            if(error)
                                console.log('Error occured sending email: ' + error + ".");
                        });
                    }
                    
                });
                
            });
            
            console.log("Updated task with id: " + req.params.id + ".");
            res.redirect("/task/view/" + req.params.id);
        }
    });
});

module.exports = router;