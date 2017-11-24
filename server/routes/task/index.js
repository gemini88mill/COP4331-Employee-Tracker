'use strict'
var     router      = require('express').Router();

// these routes are for level-1 employees, aka administrators,
// to view and edit their profiles

// THESE ROUTES REQUIRE AUTHENTICATION MIDDLEWARE
// admin profile view and edit routes (cannot delete profiles)
router.use('/',         require('./list.js'     )); // view all tasks
router.use('/edit',     require('./edit.js'     )); // edit singular task
router.use('/create',   require('./create.js'   )); // create new task
router.use('/view',     require('./view.js'     )); // view singular task (also delete)

module.exports = router;