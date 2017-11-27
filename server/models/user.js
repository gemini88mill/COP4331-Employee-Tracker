// using mongoose and passport for DB and password hash purposes
var mongoose                = require("mongoose"),
    passportLocalMongoose   = require("passport-local-mongoose");

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

function arrayLimit(val) { // location array cannot exceed size 5
    return val.length <= 5;
};

// used for base employee, admin, and support; things associated with employee are NOT required in the document
var userSchema = new mongoose.Schema( {

    firstName:  {
                    type:       String,
                    validate:   /^[A-Z]'?[- a-zA-Z]+$/, // name is A-Z, a-z, hyphens and apostrophes
                    required:   true,
                    trim:       true
                },

    lastName:   {
                    type:       String,
                    validate:   /^[A-Z]'?[- a-zA-Z]+$/,
                    required:   true,
                    trim:       true
                },

     // privilege level, employee = 0, admin = 1, support = 2
    privilege:  {
                    type:       Number,
                    default:    0
                },

    // username is a uniqued, required, all lowercase string, spaces are trimmed
    username:   {
                    type:       String,
                    required:   true,
                    trim:       true,
                    unique:     true,
                    lowercase:  true
                },

    email:      {
                    type:       String,
                    trim:       true,
                    lowercase:  true,
                    unique:     true,
                    required:   true,
                    validate:   [validateEmail, 'Please fill a valid email address'],
                    match:      [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
                },

    password:   String,

    // group: Number, // not sure if we're still doing group assignments for employees
    tasks:      [ // task list stored by task id
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Task"
                    }
                ],

    picture:    {
                    type:   String, // string for a hosted URL, at least for now
                    default: "https://d3g919u5f14ld1.cloudfront.net/assets/images/users/default-avatar.svg"
                },

    position:   String,

    location:   {
                    type: {
                        lat: Number,
                        lng: Number
                    }
                },

    timeLastUpdate:     Date, // time of last GPS update

    clockStatus: {

                    type: Boolean,
                    default: false
                },


});


// use mongoose for passport to store hashes instead of actual passwords
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
