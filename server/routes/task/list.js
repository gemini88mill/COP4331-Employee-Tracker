'use strict'
var     router      = require('express').Router(),
        passport    = require('passport'),
        Employee    = require('../../models/user'),
        Task        = require('../../models/task'),
        middleware  = require('../middleware');

// show a list of all tasks; /tasks url
router.get("/", middleware.isAdministrator, function(req, res) {
    
    // show all tasks
    Task.find({}, function(err, tasks) {
        if(err) {
            console.log("Error getting tasks from database.");
            req.flash("error", "Unable to retrieve tasks from database.");
            return res.redirect("/");
        }
        
        res.render("task/index", {tasks : tasks});
    });
});

module.exports = router;