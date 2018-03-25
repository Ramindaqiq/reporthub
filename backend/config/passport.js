var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users');

// serialize and deserialize
passport.serializeUser(function(user, done) {
  console.log(user + " serialize")
  return done(null, user._id);
});

passport.deserializeUser(function(_id, done) {
  console.log(user + " deserialize");
  User.findById({_id: id}, function(err, user) {
    return done(null, user);
  })
});


//Middleware
passport.use('local-login', new LocalStrategy({
  passReqToCallback: true
}, function(req,username, password, done) {
  User.findOne({ username: username}, function(err, user) {
    if (err) return done(err);
    console.log(user + "passportjs")
    if (!user) {
      return done(null, false);
    }
    // if (!user.comparePassword(password)) {
    if (user.password !== password) {
      return done(null, false);
    }
    return done(null, user);
  });
}));

// //custom function to validate
exports.isAuthenticated = function(req, res, next) {
  console.log("isAuthenticated"+ req.isAuthenticated())
  if (req.isAuthenticated()) {
    return next();
  }
  res.send();
}
