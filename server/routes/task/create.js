'use strict'
var     router      = require('express').Router(),
        passport    = require('passport'),
        nodemailer  = require('nodemailer'),
        Employee    = require('../../models/user'),
        Task        = require('../../models/task'),
        middleware  = require('../middleware');


// new task form, /task/create url
router.get("/", middleware.isAdministrator, function(req, res) {
    
     // show all level 0 employees in task assignment form
    Employee.find({ privilege: 0 }, function(err, employees) {
        if(err) {
            console.log("Error getting employees from database.");
            return res.redirect("/task");
        }
        
        res.render("task/create", {employees : employees});
    });
    
});


// submit newly created task to database
router.post("/", middleware.isAdministrator, function(req, res) {
   
   // get data from form and make new task
   Task.create(req.body.task, function(err, task) {
      if(err) {
          console.log("Unable to create new task: " + err);
          req.flash("error", "Unable to create new task.");
          return res.redirect("task/index");
      }
      
      else {
          console.log("New task created.");
          
          console.log(req.body.assignees);
          // TODO: When task is assigned, send email to assignees notifying them.
          // TODO: When task is assigned, add to designated employees' task list.
          
          req.flash("success", "New task created.");
          
          res.redirect('view/' + task._id);
      }
   });
    
});

module.exports = router;