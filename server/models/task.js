// using mongoose for DB
var mongoose                = require("mongoose");

var taskSchema = new mongoose.Schema({
    
    description:    {
                        type:       String,
                        required:   true
                    },

    due:            Date,

    done:           {
                        type:       Boolean,
                        default:    false
                    }
    
});


module.exports = mongoose.model("Task", taskSchema);