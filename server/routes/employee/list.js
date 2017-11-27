'use strict'
var     router      = require('express').Router(),
        passport    = require('passport'),
        Employee    = require('../../models/user'),
        middleware  = require('../middleware');

// show a list of all employees; /employee url
router.get("/", middleware.isAdministrator, function(req, res) {
    
    if (req.user.privilege == 1) {
        // show all level 0 employees
        Employee.find({ privilege: 0 }, function(err, employees) {
            if(err) {
                console.log("Error getting employees from database.");
                return res.redirect("/");
            }
            
            res.render("employee/index", {employees : employees});
        });
    }
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