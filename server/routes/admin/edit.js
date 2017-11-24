'use strict'
var     router      = require('express').Router(),
        passport    = require('passport'),
        Employee    = require('../../models/user'),
        middleware  = require('../middleware');

// edit information for singular administrator (currently logged in); /profile/edit url
router.get("/", middleware.isAdministrator, function(req, res) {
    
    // show form to edit admin profile with information already in it
    Employee.findOne({ username: req.user.username }, function(err, admin) {
        if(err) {
           console.log("Unable to retrieve admin with username " + req.user.username);
           res.redirect("/");
        }
        
        // cannot edit non-admin accounts
        else if (admin.privilege === 0) {
            console.log("Error retrieving admin with username: " + req.user.username + "; incorrect privilege level.");
            res.redirect("/");
        }
       
        else {
           res.render("admin/edit", {admin: admin});
        }
   });
    

});


// submit information from form for updates to admin profile
router.put("/", middleware.isAdministrator, function(req, res) {
    
    // find admin document with unique username, submit changes, redirect to profile page
    Employee.findOneAndUpdate( { username: req.user.username }, req.body.admin, function(err, admin) {
        if(err) {
            console.log("Unable to update admin with username: " + req.user.username);
            req.flash("error", "Unable to update profile, please try again later.");
            res.redirect("admin/profile");
        }
        else {
            console.log("Updated admin with username: " + req.user.username);
            res.redirect("admin/profile");
        }
    });
});


module.exports = router;