'use strict'
var     router      = require('express').Router();

// these routes are for level-1 employees, aka administrators,
// to view and edit their profiles

// THESE ROUTES REQUIRE AUTHENTICATION MIDDLEWARE
// admin profile view and edit routes (cannot delete profiles)
router.use('/',         require('./profile.js'  ));
router.use('/edit',     require('./edit.js'     ));

module.exports = router;