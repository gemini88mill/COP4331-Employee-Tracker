'use strict'
var     router      = require('express').Router();

// these routes are for level-0 employees, so administrators can view
// their locations, see a full list, and routes for employees to upload their
// images, etc. routes for administrator profiles and profile changes, look under "admin"

// THESE ROUTES DO NOT REQUIRE AUTHENTICATION MIDDLEWARE
// employee clock-in and picture upload routes
router.use('/clock',    require('./clock.js'    ));
router.use('/upload',   require('./upload.js'   ));

// THESE ROUTES DO
// employee list/singular view routes (cannot edit or delete employees)
router.use('/',         require('./list.js'     ));
router.use('/view',     require('./view.js'     ));

module.exports = router;