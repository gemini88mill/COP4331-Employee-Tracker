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
router.get('/partials/:name', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'partials', req.params.name + '.html'))
})

// Fallback - Route back to index
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = router
