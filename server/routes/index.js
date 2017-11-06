'use strict'
const express = require('express'),
      router  = express.Router(),
      path    = require('path')

// Index page
router.get('/', (req, res) => {
  res.sendFile(path.join(
    __dirname, '..', '..', 'public', 'views', 'index.html'))
})

// Load partials
router.get('/partials/:name', (req, res) => {
  res.sendFile(path.join(
    __dirname, '..', '..', 'public', 'views', 'partials', req.params.name + '.html'))
})

// Load scripts
// NOTE(timp): I'm not sure why this is needed, but it has something to do with
// the current routing in server's app.js. Without this extra case, it just
// passes back the index page instead of the actual js/app.js
router.get('/js/:name', (req, res) => {
  res.sendFile(path.join(
    __dirname, '..', '..', 'public', 'js', req.params.name))
})

// Fallback - Route back to index
router.get('*', (req, res) => {
  res.sendFile(path.join(
    __dirname, '..', '..', 'public', 'views', '404.html'))
})

module.exports = router
