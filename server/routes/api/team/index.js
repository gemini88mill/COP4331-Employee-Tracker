'use strict'
const router   = require('express').Router(),
      passport = require('passport')

router.use('/',       require('./list.js'))
router.use('/assign', require('./assign.js'))
router.use('/create', require('./create.js'))
router.use('/edit',   require('./edit.js'))

module.exports = router
