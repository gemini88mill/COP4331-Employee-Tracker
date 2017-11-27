'use strict'
var     router      = require('express').Router();

// these routes are for level-0 employees, so administrators can view
// their locations, see a full list, and routes for employees to upload their
// images, etc. routes for administrator profiles and profile changes, look under "admin"

// THESE ROUTES DO NOT REQUIRE AUTHENTICATION MIDDLEWARE
// employee clock-in and picture upload routes
router.use('/clock',    require('./clock.js'    )); // employee clock in
router.use('/upload',   require('./upload.js'   )); // upload employee picture ?
router.use('/login',    require('./login.js'    )); // upload employee picture ?
router.use('/register', require('./register.js' )); // register employee
router.use('/tasks',    require('./task.js'     )); // task editing and listing

// THESE ROUTES DO
// employee list/singular view routes, and email routes
router.use('/',         require('./list.js'     ));
router.use('/view',     require('./view.js'     ));
router.use('/email',    require('./email.js'    ));


// SUPPORT USER ONLY ROUTES; only support can delete and edit employees
router.use('/delete',   require('./delete.js'   ));
router.use('/edit',     require('./edit.js'     ));

module.exports = router;