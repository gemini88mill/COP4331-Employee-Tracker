'use strict'
const router   = require('express').Router(),
      passport = require('passport')

router.use('/',              require('./employee.js'))
router.use('/administrator', require('./administrator.js'))

module.exports = router
