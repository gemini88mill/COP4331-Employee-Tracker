'use strict'
const router   = require('express').Router(),
      passport = require('passport'),
      mongoose = require('mongoose')

// Registration
router.post('/', (req, res) => {
  'use strict'
  var url = 'mongodb://localhost/employeetracker'

  // mongoose.connect(url, {useMongoClient: true}, function(err, db) {
  //   if (err) return
  //
  //   var collection = db.collection('employee')
  //   collection.insert({firstName: 'John', lastName: 'Doe', username: 'jdoe', password: 'admin'}, function(err, result) {
  //     collection.find({name: 'John'}).toArray(function(err, docs) {
  //       console.log(docs[0])
  //       db.close()
  //     })
  //   })
  // })

  mongoose.connect(url, {
    useMongoClient: true
  })

  let db = mongoose.connection

  db.on('error', console.error.bind(console, 'MongoDB connection error:'))


  // TODO

  // Dummy return value
  return res.json({
    type: 'POST',
    message: 'Registration request',
    receivedData: req.body
  })
})

module.exports = router
