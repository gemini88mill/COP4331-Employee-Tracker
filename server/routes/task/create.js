'use strict'
var     router      = require('express').Router(),
        passport    = require('passport'),
        Employee    = require('../../models/user'),
        Task        = require('../../models/task'),
        middleware  = require('../middleware');


// new task form, /task/create url
router.get("/", middleware.isAdministrator, function(req, res) {
    res.render("task/create");
});


// submit newly created task to database
router.put("/", middleware.isAdministrator, function(req, res) {
   
   // get data from form and make new task
   Task.create(req.body.post, function(err, task) {
      if(err) {
          console.log("Unable to create new task: " + err);
          req.flash("error", "Unable to create new task.");
          return res.redirect("task/index");
      }
      
      else {
          console.log("New task created.");
          
          // TODO: When task is assigned, send email to assignees notifying them.
          
          req.flash("success", "New task created.");
          
          res.redirect('task/view' + task._id);
      }
   });
    
});

module.exports = router;