const passport = require("passport");
const User = require("../models/user");

module.exports = app => {
  //Generate CSRF Token

  app.get("/getToken", (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    res.end();
  });

  //Check Auth

  app.get("/checkAuth", (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log("This is a test: " + req.user);
      res.send({ authStatus: true });
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
