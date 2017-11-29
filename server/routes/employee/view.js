'use strict'
var     router      = require('express').Router(),
        passport    = require('passport'),
        Employee    = require('../../models/user'),
        Task        = require('../../models/task'),
        middleware  = require('../middleware');


// see information for singular employee; /employee/:id url
router.get("/:id", middleware.isAdministrator, function(req, res) {
    
    // find employee by id, then populate list of tasks with actual tasks documents instead of references for view purposes
    Employee.findById(req.params.id).populate("tasks").exec(function(err, employee){
        if(err) {
            console.log("Error retrieving employee with id: " + req.params.id);
            res.redirect("employee/index");
        }
        else {
            // if the user is a support user viewing an admin or employee, or is an admin user
            // viewing an employee, render the page; otherwise, log an error and redirect
            if((req.user.privilege === 1 && employee.privilege === 0) || (req.user.privilege === 2 && employee.privilege < 2))
                res.render("employee/view", {employee: employee});
            
            else {
                console.log("User " + req.user.username + " attempted to access employee page at incorrect privilege level.");
                res.redirect('back');
            }
        }
    });
});

module.exports = router;