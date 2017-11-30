'use strict'
var     router      = require('express').Router(),
        passport    = require('passport'),
        Employee    = require('../../models/user'),
        middleware  = require('../middleware');

// show a list of all employees; /employee url
router.get("/", middleware.isAuthenticated, function(req, res) {
    
    // this renders views for admin employees logged in who can view all level-0 employees
    if (req.user.privilege == 1) {
        // show all level 0 employees that are PUBLIC AND PRIVATE
        Employee.find({ privilege: 0 }, function(err, employees) {
            if(err) {
                console.log("Error getting employees from database.");
                return res.redirect("/");
            }
            
            res.render("employee/index", {employees : employees});
        });
    }
    
    // this renders views for level-0 employees logged in to view other employee locations
    else if (req.user.privilege == 0) {
        // show all level 0 employees that are PUBLIC ONLY
        Employee.find({ privilege: 0, isPublic: true }, function(err, employees) {
            if(err) {
                console.log("Error getting employees from database.");
                return res.redirect("/");
            }
            
            res.render("employee/index", {employees : employees});
        });
    }
    
    // this renders views for support accounts
    else {
        // show all level 0 and 1 employees
        Employee.find({ privilege: {$lt: 2} }, function(err, employees) {
            if(err) {
                console.log("Error getting employees from database.");
                return res.redirect("/");
            }
            
            res.render("employee/index", {employees : employees});
        });
    }
});

module.exports = router;