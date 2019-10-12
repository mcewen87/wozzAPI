var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

module.exports = function() {
  passport.serializeUser(function(user, done) {
    console.log("serialize function");
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      console.log("deserialize function");
      done(err, user);
    });
  });

  passport.use(
    "login",
    new LocalStrategy({ usernameField: "email" }, function(
      email,
      password,
      done
    ) {
      console.log("inside Local Strategy callback");
      User.findOne({ email: email }, function(err, user) {
        if (err) {
          console.log(err);
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "No user has that username!" });
        }
        user.checkPassword(password, function(err, isMatch) {
          if (err) {
            console.log(err);
            return done(err);
          }
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Invalid password." });
          }
        });
      });
    })
  );
};
