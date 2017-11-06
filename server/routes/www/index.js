'use strict'
const router   = require('express').Router(),
      path     = require('path'),
      passport = require('passport')

// router.use('/user', require('./user'))
// router.use('/task', require('./task'))
// router.use('/team', require('./team'))
//

// Index page
router.get(/(views)/, (req, res) => {
  console.log(path.join(__dirname, '..', '..', 'views', 'index.html'));
  res.sendFile(path.join(__dirname, '..', '..', 'views', 'index.html'))
})

// Fallback - Route back to index
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'views', 'index.html'))
})


module.exports = router
