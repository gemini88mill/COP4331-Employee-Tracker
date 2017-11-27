'use strict'
var     router      = require('express').Router(),
        passport    = require('passport'),
        Employee    = require('../../models/user'),
        Task        = require('../../models/task'),
        middleware  = require('../middleware');

// DELETE TASK, /task/delete/:id url
router.delete("/:id", middleware.isSupport, function(req, res) {
   // delete singular task
    Employee.findByIdAndRemove(req.params.id, function(err) {
       if(err) {
           console.log("Unable to remove employee with id: " + req.params.id);
           req.flash("error", "Unable to delete employee, please try again later.");
           res.redirect("back");
       }
       else {
           console.log("Employee deleted.");
           req.flash("success", "Employee successfully deleted.");
           res.render("employee");
       }
   });
   
});

module.exports = router;