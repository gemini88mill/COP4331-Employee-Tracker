'use strict'
var     router      = require('express').Router(),
        passport    = require('passport'),
        Employee    = require('../../models/user'),
        middleware  = require('../middleware');


// see information for singular employee; /employee/:id url
router.get("/:id", middleware.isAdministrator, function(req, res) {
    
    Employee.findById(req.params.id, function(err, employee) {
        if(err) {
            // if( req.params.id != "bootstrap.min.js")
            console.log("Error retrieving employee with id: " + req.params.id);
            res.redirect("employee/index");
        }
        else {
            res.render("employee/view", {employee: employee});
        }
    });
});

module.exports = router;