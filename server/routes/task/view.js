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
            console.log("Error retrieving post with id: " + req.params.id);
            req.flash("error", "Unable to retrieve task.");
            res.redirect("task/index");
        }
        else {
            res.render("task/show", {task: task});
        }
    });
});

module.exports = router;