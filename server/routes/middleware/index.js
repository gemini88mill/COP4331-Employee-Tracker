var middlewareObj   = {};

middlewareObj.isAuthenticated = function(req, res, next) {
    
    if(req.isAuthenticated()) {
        return next();
    }
    
    req.flash("error", "You must be logged in to do that.");
    res.redirect("/login");
};

middlewareObj.isAdministrator = function(req, res, next) {
    
    if(req.isAuthenticated() && req.user.privilege > 0) {
        return next();
    }
    req.flash("error", "You must be an administrator to do that.");
    res.redirect("/register");
};

middlewareObj.isSupport = function(req, res, next) {
    
    if(req.isAuthenticated() && req.user.privilege === 2) {
        return next();
    }
    req.flash("error", "You must be a support team member to do that.");
    res.redirect('back'); 
};

module.exports = middlewareObj;