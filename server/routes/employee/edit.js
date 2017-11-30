'use strict'
var     router      = require('express').Router(),
        passport    = require('passport'),
        Employee    = require('../../models/user'),
        middleware  = require('../middleware');

// edit information for singular employee (currently logged in); /employee/edit/:id url
router.get("/:id", middleware.isSupport, function(req, res) {
    
    // show form to edit employee profile with information already in it
    Employee.findById(req.params.id, function(err, employee) {
        if(err) {
           console.log("Unable to retrieve user with username " + req.user.username);
           res.redirect("/");
        }
       
        else {
           res.render("employee/edit", {employee: employee});
        }
   });
    

});


// submit information from form for updates to employee profile
router.put("/:id", middleware.isSupport, function(req, res) {
    
    // find employee document with unique id, submit changes, redirect to employee view page
    Employee.findByIdAndUpdate(req.params.id, {firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, position: req.body.position, picture: req.body.picture }, function(err, employee) {
        if(err) {
            console.log("Unable to update employee with id " + req.params.id + ", error: " + err + ".");
            req.flash("error", "Unable to update employee, please try again later.");
            res.redirect("back");
        }
        else {
            console.log("Updated employee with id " + req.params.id + ".");
            res.redirect("/employee/view/" + req.params.id);
        }
    });
});


// allows an administrator to set an employee's profile to private so their location data
// is not shared with other employees at the same level
router.post("/:id/setPublic", middleware.isAdministrator, function(req, res) {
    
    // find employee document with unique id, change isPublic to be whatever it's not right now, redirect
    Employee.findById(req.params.id, function(err, employee) {
        
        if(err) {
            console.log("Unable to set employee with id " + req.params.id + " to private or public; " + err + ".");
            res.redirect('back');
        }
        
        else {
            employee.isPublic = !employee.isPublic;
            employee.save();
            console.log("User " + req.user.username + " set employee with id " + req.params.id + " to public " + employee.isPublic + ".");
            res.redirect("/employee/view/" + req.params.id);
        }
        
    });
    
});

module.exports = router;