'use strict'
var     router      = require('express').Router();

// THESE PAGES DO NOT REQUIRE AUTHENTICATION MIDDLEWARE

// for testing purposes
router.use(function(req, res, next) {
    // do logging
    // console.log({
    //   type: req.method,
    //   headers: req.headers
    // });
    next();
});

router.use('/login',    require('./login.js'    ));
router.use('/register', require('./register.js' ));
router.use('/logout',   require('./logout.js'   ));

// landing/main page route
router.get("/", function(req, res) {
    res.render("landing");
});


// 404 routes
router.get("*", function(req, res) {
    res.json({
        type: 'GET',
        message: 'Unknown GET request made.',
        receivedData: req.body
    });
    res.render("404");
});


router.post("*", function(req, res) {
    res.json({
        type: 'POST',
        message: 'Unknown POST request made.',
        receivedData: req.body
    });
    res.render("404");
});

router.put("*", function(req, res) {
    res.json({
        type: 'PUT',
        message: 'Unknown PUT request made.',
        receivedData: req.body
    });
    res.render("404");
});

router.delete("*", function(req, res) {
    res.json({
        type: 'DELETE',
        message: 'Unknown DELETE request made.',
        receivedData: req.body
    });
    res.render("404");
});

module.exports = router;