var middlewareObj   = {};

middlewareObj.isAuthenticated = function(req, res, next) {
    
    if(req.isAuthenticated()) {
        return next();
    }
    
    req.flash("error", "You must be logged in to do that.");
    res.redirect("/");
};

middlewareObj.isAdministrator = function(req, res, next) {
    
    console.log("isAdministrator middleware entered.\n");
    
    if(req.isAuthenticated() && req.user.privilege > 0) {
        console.log("isAuthenticated: " + req.isAuthenticated() + ", user privilege: " + req.user.privilege + ".\n");
        return next();
    }
    req.flash("error", "You must be an administrator to do that.");
    res.redirect("/register");
};

module.exports = middlewareObj;