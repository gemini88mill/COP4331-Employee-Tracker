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
            res.render("task/edit", {task: task});
        }
    });
});


// update singular task with id and redirect to task page
router.put("/:id", middleware.isAdministrator, function(req, res) {
    
    // update post from the form
    Task.findByIdAndUpdate(req.params.id, req.body.post, function(err, task) {
        if(err) {
            console.log("Unable to update task with id: " + req.params.id);
            req.flash("error", "Unable to update task, please try again later.");
            res.redirect("task/index");
        }
        else {
            console.log("Updated task with id: " + req.params.id);
            res.redirect("task/view" + req.params.id);
        }
    });
});

module.exports = router;