'use strict'
var     router      = require('express').Router();

<<<<<<< HEAD

// API routes
router.use('/api', require('./api'))

// Index page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})


// Load partials
// Base views
router.get('/views/:name', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', req.params.name + '.html'))
})

// Load views - User-based
router.get('/views/user/:action', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'user', req.params.action + '.html'))
})

// Load views - Task-based
router.get('/views/task/:action', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'task', req.params.action + '.html'))
})

// Load views - Team-based
router.get('/views/team/:action', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'team', req.params.action + '.html'))
})

// Fallback - Route back to index
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = router
=======
// for testing purposes
router.use(function(req, res, next) {
    // do logging
    // console.log({
    //   type: req.method,
    //   headers: req.headers
    // });
    next();
});

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
>>>>>>> upstream/master
