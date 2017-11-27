'use strict'
var     router      = require('express').Router(),
        Employee    = require('../../models/user'),
        Task        = require('../../models/task'),
        mongoose    = require('mongoose')

// Get all tasks associated with the employee
router.post('/', (req, res) => {
  Employee.findOne({ username: req.body.username }, 'tasks', (err, user) => {
    if (err) return res.status(500).json(err)
    if (!user) return res.status(404)
    let ids = user.tasks.map(mongoose.mongo.ObjectId)
    Task.find( { _id: { $in: ids } }, (err, task) => {
        if(err) return res.status(500)
        if(!task) return res.status(404)
        return res.status(200).json( { list: task })
    })
  })
})

// Update/edit a task
router.put('/:id', (req, res) => {
  console.log(req.params.id);
    Task.findOneAndUpdate( { _id: req.params.id }, { $set: { done: true } }, (err, task) => {
        if (err) return res.status(500).json(err)
        if (!task) return res.status(400).json(task)
        return res.status(200).json(task)
    })
})

module.exports = router;
