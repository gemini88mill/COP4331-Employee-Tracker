'use strict'
var     router      = require('express').Router(),
        passport    = require('passport'),
        Employee    = require('../../models/user'),
        Task        = require('../../models/task'),
        middleware  = require('../middleware');

// DELETE TASK, /task/delete/:id url
router.delete("/:id", middleware.isAdministrator, function(req, res) {
   // delete singular task
   Task.findByIdAndRemove(req.params.id, function(err) {
       if(err) {
           console.log("Unable to remove task with id: " + req.params.id);
           req.flash("error", "Unable to delete task, please try again later.");
           res.redirect("/task");
       }
       else {
           console.log("Task deleted.");
           req.flash("success", "Task successfully deleted.");
           res.redirect("/task");
       }
   });
   
   // TODO: See if task is automatically removed from lists of tasks assigned to employee. If not, update.
});

module.exports = router;