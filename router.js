const passport = require("passport");
const User = require("./models/user");

module.exports = function(app) {
  //SINGIN
  app.post(
    "/signIn",
    function(req, res, next) {
      console.log("hit sign In");
      next();
    },
    passport.authenticate("login", {
      failureFlash: true
    })
  );
  //SINGUP
  app.post(
    "/signUp",
    function(req, res, next) {
      console.log("hit sign up");
      const email = req.body.email;
      const password = req.body.password;

      User.findOne({ email: email }, function(err, user) {
        if (err) {
          console.log(err);
          return next(err);
        }
        if (user) {
          return res.send("test");
        }
        const newUser = new User({
          email: email,
          password: password
        });
        newUser.save(next);
      });
    },
    passport.authenticate("login", {
      failureFlash: true
    })
  );

  //SINGOUT
  app.get("/signOut", function(req, res) {
    req.logout();
    req.session = null;
    res.end();
  });

  //CHECK
  app.get("/check", function(req, res) {
    if (req.isAuthenticated()) {
      res.send({ auth: true });
    }
    if (!req.isAuthenticated()) {
      res.send({ auth: true });
    }
  });
};
