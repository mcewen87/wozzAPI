const passport = require("passport");
const User = require("../models/user");

module.exports = app => {
  //Add Event
  app.post("/addEvent", (req, res, next) => {
    const event = { title: req.body.event };
    const id = req.user.id.toString();
    console.log(id.toString());
    console.log(req.user.id);
    console.log(event);
    User.findOneAndUpdate(
      { _id: id },
      {
        $push: { events: event }
      },
      { new: true },
      (error, document) => {
        if (error) {
          console.log(error);
          return res.json({ success: false, message: error.message });
        }
        res.json({ event: document });
      }
    );
  });
};
