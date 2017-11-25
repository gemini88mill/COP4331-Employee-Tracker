'use strict'
var     router      = require('express').Router(),
        passport    = require('passport'),
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
            console.log("Updated task with id: " + req.params.id + ".");
            res.redirect("/task/view/" + req.params.id);
        }
    });
});

module.exports = router;