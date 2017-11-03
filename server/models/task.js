// using mongoose for DB
var mongoose                = require("mongoose");

var taskSchema = new mongoose.Schema({
    
    // TODO: Populate
});

module.exports = mongoose.model("Task", taskSchema);