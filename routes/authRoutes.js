const passport = require("passport");
const User = require("../models/user");
const moment = require("moment");
const cors = require("cors");
const csurf = require("csurf");

module.exports = app => {
  //Generate CSRF Token

  app.get("/getToken", (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken(), {
      secure: true,
      sameSite: "none"
    });
    res.end();
  });

  //Check Auth

  app.get("/checkAuth", (req, res, next) => {
    if (req.isAuthenticated()) {
      const id = req.user.id.toString();

      User.findOne({ _id: id }, function(err, user) {
        user.events.map((e, i) => {
          if (e.lastActiveWeek != moment().format("W")) {
            console.log(
              e.lastActiveWeek + " for the test " + moment().format("W")
            );

            e.countHistory.push(e.count);
            e.lastWeekCount = e.count;

            if (e.countHistory.length > 3) {
              const highest = Math.max(...e.countHistory);
              const lowest = Math.min(...e.countHistory);
              const average = Math.floor(
                e.countHistory.reduce((a, b) => a + b) / e.countHistory.length
              );
              e.averageCount = average;
              e.highestCount = highest;
              e.lowestCount = lowest;
            }
            e.count = 0;

            e.positiveExpHistory += e.positiveExp;
            e.negativeExpHistory += e.negativeExp;
            e.neutralExpHistory += e.neutralExp;
            e.lastPositiveExp = e.positiveExp;
            e.lastNegativeExp = e.negativeExp;
            e.lastNeutralExp = e.neutralExp;
            e.positiveExp = 0;
            e.negativeExp = 0;
            e.neutralExp = 0;
          }
          return e;
        });

        user.save();
        res.send({ user: user, authStatus: true, token: req.csrfToken() });
      });
    } else {
      console.log("not auth'd");
      res.send({ authStatus: false, token: req.csrfToken() });
    }
  });

  //Sign in
  app.post("/signIn", passport.authenticate("login"), (req, res, next) => {
    res.send({ user: req.user, authStatus: true });
  });

  //Sign up
  app.post(
    "/signUp",

    (req, res, next) => {
      const email = req.body.email;
      const password = req.body.password;

      User.findOne({ email: email }, function(err, user) {
        if (err) {
          console.log(err);
          return next(err);
        }
        if (user) {
          return res.send({ message: "User Already Exists" });
        }
        const newUser = new User({
          email: email,
          password: password,
          categories: [
            { title: "Lifestyle" },
            { title: "Diet" },
            { title: "Health" },
            { title: "Social" }
          ]
        });
        newUser.save(next);
      });
    },
    passport.authenticate("login"),
    (req, res, next) => {
      res.send({ user: req.user, authStatus: true });
    }
  );

  //Signout
  app.get("/signOut", function(req, res) {
    console.log("signOut hit");
    req.logout();
    req.session = null;
    res.end();
  });
};

//Where The good stuff ends

// User.findOne({ _id: id }, function(err, user) {
//   user.events.map((e, i) => {
//     if (condition) {
//       e.count = 0;
//       e.positiveExpHistory += e.positiveExp;
//       e.negativeExpHistory += e.negativeExp;
//       e.neutralExpHistory += e.neutralExp;
//     }
//     return e;
//   });
//   user.save();
//   res.send({ user: user });
// });
