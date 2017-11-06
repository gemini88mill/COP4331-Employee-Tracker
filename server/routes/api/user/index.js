'use strict'
const router   = require('express').Router(),
      passport = require('passport')

router.use('/register', require('./register.js'))
router.use('/login',    require('./login.js'))
router.use('/profile',  require('./profile'))
router.use('/clock',    require('./clock.js'))

router.use('/',    require('./list.js'))

module.exports = router
