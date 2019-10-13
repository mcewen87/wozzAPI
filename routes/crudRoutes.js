const passport = require("passport");
const User = require("../models/user");

module.exports = app => {
  //Add Event
  app.post("/addEvent", (req, res, next) => {
    const event = { title: req.body.event, category: req.body.category };
    const id = req.user.id.toString();
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
        res.json({ event: document.events[document.events.length - 1] });
      }
    );
  });

  //Reset Event

  app.post("/resetEvent", (req, res, next) => {
    const id = req.user.id.toString();
    const eventId = req.body.eventId.toString();
    User.findOneAndUpdate(
      { _id: id, "events._id": eventId },
      {
        $inc: { "events.$.count": 1 },
        $set: { "events.$.lastOccurrence": Date.now() }
      },
      { new: true },
      (error, document) => {
        if (error) {
          console.log(error);
          return res.json({ success: false, message: error.message });
        }
        res.json({ events: document.events });
      }
    );
  });

  //Delete Event
  app.post("/deleteEvent", (req, res, next) => {
    const id = req.user.id.toString();
    const eventId = req.body.eventId.toString();
    console.log(eventId);
    User.findOneAndUpdate(
      { _id: id },

      {
        $pull: { events: { _id: eventId } }
      },
      { new: true },
      (error, document) => {
        if (error) {
          console.log(error);
          return res.json({ success: false, message: error.message });
        }
        res.json({ events: document.events });
      }
    );
  });
};
