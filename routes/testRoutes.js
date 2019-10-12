module.exports = app => {
  app.post("/check", (req, res, next) => {
    console.log(req.body._csrf);
    if (req.isAuthenticated()) {
      console.log("This is a test: " + req.user);
    } else {
      console.log("not auth'd");
    }
    res.send({ token: "from server" });
  });
};
