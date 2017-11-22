'use strict'
const router   = require('express').Router(),
      path     = require('path'),
      passport = require('passport')



// API routes
router.use('/api', require('./api'))

// Index page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})


// Load partials
// Base views
router.get('/views/:name', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', req.params.name + '.html'))
})

// Load views - User-based
router.get('/views/user/:action', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'user', req.params.action + '.html'))
})

// Load views - Task-based
router.get('/views/task/:action', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'task', req.params.action + '.html'))
})

// Load views - Team-based
router.get('/views/team/:action', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'team', req.params.action + '.html'))
})

// Fallback - Route back to index
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = router
