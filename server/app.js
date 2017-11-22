// ------------------ //
// ---DEPENDENCIES--- //
// ------------------ //
var bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require("mongoose"),
    localStrategy   = require("passport-local"),
    passport        = require("passport"),
    flash           = require("connect-flash"),
    path            = require('path'),
    multer          = require('multer'),
    cors            = require('cors'),
    fs              = require('fs'),
    express         = require("express");

// app setup
var app = express();
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());
app.use(cors());

// ------------------ //
// -----MONGOOSE----- //
// ------------------ //
mongoose.connect("mongodb://localhost/employeetracker", { useMongoClient: true });
var User    = require("./models/user");


// ------------------ //
// -----PASSPORT----- //
// ------------------ //
app.use(require("express-session")({
   secret: "Employee Tracker COP4331",
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.info = req.flash("info");
    next();
});


// ------------------ //
// ------ROUTES------ //
// ------------------ //
app.use('/', require('./routes/index'));


app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
    console.log("Employee Tracker server started, listening on port " + app.get('port') + ".");
});
