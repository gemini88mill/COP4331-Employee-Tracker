// using mongoose and passport for DB and password hash purposes
var mongoose                = require("mongoose"),
    passportLocalMongoose   = require("passport-local-mongoose");

// used for base employee, admin, and support; things associated with employee are NOT required in the document
var employeeSchema = new mongoose.Schema( {
    
    firstName: { type: String, validate: /[A-Za-z-']/, required: true }, // name is A-Z, a-z, hyphens and apostrophes
    lastName: { type: String, validate: /[A-Za-z-']/, required: true },
    privilege: { type: Number, default: 0 }, // privilege level, employee = 0, admin = 1, support = 2
    username: { type: String, required: true },
    password: { type: String, required: true },
    // group: Number, // not sure if we're still doing group assignments for employees
    tasks: [ // task list stored by task id
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        }
    ],
    picture: String, // string for a hosted URL, at least for now
    
    locations: {
        type: [{
            type: { type: String }, // TODO: check that this is correct geocoordinate storage
            coordinates: [Number]
        }],
        validate: [arrayLimit, '{PATH} exceeds the limit of 5']
    },
    timeLastUpdate: Date, // time of last GPS update
    indexOfLastTime: { type: Number, default: 0 }
});

function arrayLimit(val) { // location array cannot exceed size 5
    return val.length <= 5;
}

// use mongoose for passport to store hashes instead of actual passwords
employeeSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Employee", employeeSchema);