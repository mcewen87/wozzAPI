const passport = require("passport");
const User = require("../models/user");
const moment = require("moment");
const cors = require("cors");

module.exports = app => {
  //Generate CSRF Token

  app.options("/getToken", cors());
  app.options("/signUp", cors());

  app.get("/getToken", (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken(), {
      sameSite: none,
      secure: true
    });
    res.end();
  });

  //Check Auth

  app.get("/checkAuth", (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log("This is a test: " + req.user);
      const id = req.user.id.toString();
      //new stuff

      User.findOne({ _id: id }, function(err, user) {
        user.events.map((e, i) => {
          if (e.lastActiveWeek != moment().format("W") + 1) {
            console.log(e.lastActiveWeek + " " + moment().format("W"));
            console.log(e.countHistory);

            e.countHistory.push(e.count);

            if (e.countHistory.length > 3) {
              const average = Math.floor(
                e.countHistory.reduce((a, b) => a + b) / e.countHistory.length
              );
              e.averageCount = average;
            }

            e.count = 0;
            e.positiveExpHistory = e.positiveExp;
            e.negativeExpHistory = e.negativeExp;
            e.neutralExpHistory = e.neutralExp;
            e.positiveExp = 0;
            e.negativeExp = 0;
            e.neutralExp = 0;
          }
          return e;
        });

        user.save();
      });

      //new stuff

      // highestCount: 0,
      // averageCount: 0,
      // lowestCount: 0

      res.send({ user: req.user, authStatus: true });
    } else {
      console.log("not auth'd");
      res.send({ authStatus: false });
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
