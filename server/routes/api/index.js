'use strict'
const router   = require('express').Router(),
      path     = require('path'),
      passport = require('passport')

router.use('/user', require('./user'))
router.use('/task', require('./task'))
router.use('/team', require('./team'))

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
