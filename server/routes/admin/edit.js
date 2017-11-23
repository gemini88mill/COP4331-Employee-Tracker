'use strict'
var     router      = require('express').Router(),
        passport    = require('passport'),
        Employee    = require('../../models/user'),
        middleware  = require('../middleware');

// edit information for singular administrator (currently logged in)
router.post("/", middleware.isAdministrator, function(req, res) {
    
    // show form to edit post with information already in it
   
    Employee.find({ username: req.user.username }, function(err, admin) {
        if(err) {
           console.log("Unable to retrieve admin with username " + req.user.username);
           res.redirect("/");
        }
        
        // cannot edit admin accounts
        else if (admin.privilege === 0) {
            console.log("Error retrieving admin with username: " + req.user.username + "; incorrect privilege level.");
            res.redirect("/");
        }
       
        else {
           res.render("admin/edit", {admin: admin});
        }
   });
    
    
    // get current username from login information, search for user
    Employee.find({ username: req.params.user.username }, function(err, admin) {
        if(err) {
            // if( req.params.id != "bootstrap.min.js")
            console.log("Error retrieving admin with id: " + req.params.id);
            res.redirect("/");
        }
        
        else if (admin.privilege === 0) {
            console.log("Error retrieving admin with id: " + req.params.id + "; incorrect privilege level.");
            res.redirect("/");
        }
        
        else {
            res.render("admin/profile", {admin: admin});
        }
    });
});

module.exports = router;