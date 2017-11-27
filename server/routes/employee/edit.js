'use strict'
var     router      = require('express').Router(),
        passport    = require('passport'),
        Employee    = require('../../models/user'),
        middleware  = require('../middleware');

// edit information for singular employee (currently logged in); /employee/edit/:id url
router.get("/:id", middleware.isSupport, function(req, res) {
    
    // show form to edit admin profile with information already in it
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


// submit information from form for updates to admin profile
router.put("/:id", middleware.isSupport, function(req, res) {
    
    // find admin document with unique username, submit changes, redirect to profile page
    Employee.findByIdAndUpdate(req.params.id, {firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, position: req.body.position}, function(err, employee) {
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

module.exports = router;