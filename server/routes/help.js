'use strict'
var     router      = require('express').Router();

// help page route
router.get("/", function(req, res) {
    res.render("help");
});

module.exports = router;