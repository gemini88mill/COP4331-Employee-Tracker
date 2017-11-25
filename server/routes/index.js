'use strict'
var     router      = require('express').Router();

// all routes used
router.use('/login',    require('./login.js'        ));
router.use('/register', require('./register.js'     ));
router.use('/logout',   require('./logout.js'       ));
router.use('/employee', require('./employee'        ));
router.use('/profile',  require('./admin'           ));
router.use('/help',     require('./help.js'         ));
// router.use('/team',     require('./team'            ));
router.use('/task',     require('./task'            ));

// landing/main page route
router.get("/", function(req, res) {
    res.render("landing");
});


// 404 routes
router.get("*", function(req, res) {
    res.render("404");
    // res.json({
    //     type: 'GET',
    //     message: 'Unknown GET request made.',
    //     receivedData: req.body
    // });
});


router.post("*", function(req, res) {
    res.render("404");
    // res.json({
    //     type: 'POST',
    //     message: 'Unknown POST request made.',
    //     receivedData: req.body
    // });
});

router.put("*", function(req, res) {
    res.render("404");
    // res.json({
    //     type: 'PUT',
    //     message: 'Unknown PUT request made.',
    //     receivedData: req.body
    // });
});

router.delete("*", function(req, res) {
    res.render("404");
    // res.json({
    //     type: 'DELETE',
    //     message: 'Unknown DELETE request made.',
    //     receivedData: req.body
    // });
});

module.exports = router;
