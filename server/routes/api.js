'use strict'
const express = require('express'),
      router  = express.Router(),
      path    = require('path')


// Registration
router.post('/register', (req, res) => {
  'use strict'
  // TODO(timp): Connect to DB and insert new user

  // Dummy return value
  return res.json({
    type: 'POST',
    message: 'Registration request',
    receivedData: req.body
  })
})

// Fallback requests
router.get('*', (req, res) => {
  res.json({
    type: 'GET',
    message: 'Unknown GET request made.',
    receivedData: req.body
  })
})

router.post('*', (req, res) => {
  res.json({
    type: 'POST',
    message: 'Unknown POST request made.',
    receivedData: req.body
  })
})

router.put('*', (req, res) => {
  res.json({
    type: 'PUT',
    message: 'Unknown PUT request made.',
    receivedData: req.body
  })
})

router.delete('*', (req, res) => {
  res.json({
    type: 'DELETE',
    message: 'Unknown DELETE request made.',
    receivedData: req.body
  })
})

module.exports = router
