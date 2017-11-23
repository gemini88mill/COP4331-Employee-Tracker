'use strict'
var     router      = require('express').Router(),
        passport    = require('passport'),
        Employee    = require('../../models/user'),
        middleware  = require('../middleware');


// see information for singular administrator (currently logged in)
router.get("/", middleware.isAdministrator, function(req, res) {
    
    // get current username from login information, search for user
    Employee.find({ username: req.user.username }, function(err, admin) {
        if(err) {
            // if( req.params.id != "bootstrap.min.js")
            console.log("Error retrieving admin with username: " + req.user.username);
            res.redirect("/");
        }
        
        else if (admin.privilege === 0) {
            console.log("Error retrieving admin with username: " + req.user.username + "; incorrect privilege level.");
            res.redirect("/");
        }
        
        else {
            res.render("admin/profile", {admin: admin});
        }
    });
});

module.exports = router;