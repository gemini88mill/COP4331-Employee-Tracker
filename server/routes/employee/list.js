'use strict'
var     router      = require('express').Router(),
        passport    = require('passport'),
        Employee    = require('../../models/user'),
        middleware  = require('../middleware');

// show a list of all employees
router.get("/", middleware.isAdministrator, function(req, res) {
    
    // show all level 0 employees
    Employee.find({ privilege: 0 }, function(err, employees) {
        if(err) {
            console.log("Error getting employees from database.");
            return res.redirect("/");
        }
        
        res.render("employee/index", {employees : employees});
    });
});

module.exports = router;