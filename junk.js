// const passport = require("passport");
// const User = require("./models/user");
// const check = require("./routes/check");
// const signIn = require("./routes/signin");
// const signUp = require("./routes/signup");
// const signOut = require("./routes/signout");
// const errorTest = require("./routes/errorTest");

// module.exports = function(app) {
//   //SINGIN
//   app.post("/signIn", passport.authenticate("login"), function(
//     error,
//     req,
//     res,
//     next
//   ) {
//     console.log("Next one next one");
//   });
//   //SINGUP
//   app.post(
//     "/signUp",
//     function(req, res, next) {
//       console.log("hit sign up");
//       const email = req.body.email;
//       const password = req.body.password;

//       User.findOne({ email: email }, function(err, user) {
//         if (err) {
//           console.log(err);
//           return next(err);
//         }
//         if (user) {
//           return res.send("test");
//         }
//         const newUser = new User({
//           email: email,
//           password: password
//         });
//         newUser.save(next);
//       });
//     },
//     passport.authenticate("login", {
//       failureFlash: true
//     })
//   );

//   //SINGOUT
//   app.get("/signOut", function(req, res) {
//     console.log("Hit SingOut");
//     req.logout();
//     req.session = null;
//     res.end();
//   });

//   //CHECK
//   app.use("/check", check);
// };
