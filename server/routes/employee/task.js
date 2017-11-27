'use strict'
var     router      = require('express').Router(),
        Employee    = require('../../models/user'),
        Task        = require('../../models/task')

// Get all tasks associated with the employee
router.post('/', (req, res) => {
  Employee.find({ username: req.body.username }, (err, user) => {
    if (err) return res.status(500)
    if (!user) return res.status(404)
    console.log(user[0].tasks)
    return res.status(200).json(user[0].tasks)
  })
})

// Get info about a task
router.get(':id', (req, res) => {
    Task.findById(req.params.id, (err, task) => {
        if(err) return res.status(404)

        else {
          // Success
          console.log(task);
          return res.status(200).json(task)
        }
    })
})

// Update/edit a task
router.put('/:id', (req, res) => {
    Task.findById(req.body, (err, task) => {
        if(err) {
          // Failure
        }

        else {
          // Success
          return res.status(200).json(task)
        }
    })
})

module.exports = router;
