'use strict'
var     router      = require('express').Router(),
        passport    = require('passport'),
        Employee    = require('../../models/user'),
        Task        = require('../../models/task'),
        middleware  = require('../middleware');

// see information on a singular task, view/:id url
router.get("/:id", middleware.isAdministrator, function(req, res) {
    
    Task.findById(req.params.id, function(err, task) {
        if(err) {
            console.log("Error retrieving task with id: " + req.params.id);
            req.flash("error", "Unable to retrieve task.");
            res.redirect("task/index");
        }
        else {
            
            // show all level 0 employees
            Employee.find({ privilege: 0, tasks: req.params.id }, function(err, employees) {
                if(err) {
                    console.log("Error getting employees from database.");
                    return res.redirect('task');
                }
                
                res.render("task/view", {task : task, employees : employees});
            });
            
        }
    });
});

module.exports = router;