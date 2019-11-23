const User = require("../models/user");
const crypto = require("crypto");
const rotation = require("../utilities/encoding");

// title: { type: String, required: true, unique: false },
// category: { type: String, required: true, unique: false },
// noteId: { type: String, required: true, unique: false },
// lastActiveWeek: { type: Number },
// lastOccurrence: { type: Date, required: true },
// longestDuration: { type: Number, required: false },
// longestDurationHistory: { type: Number, required: false },
// count: { type: Number, required: true, unique: false },
// positiveExp: { type: Number, required: false, unique: false },
// neutralExp: { type: Number, required: false, unique: false },
// negativeExp: { type: Number, required: false, unique: false },

module.exports = app => {
  //Add Event
  app.post("/addEvent", (req, res, next) => {
    let encodedEventTitle = rotation.encode(req.body.event);
    const event = {
      title: encodedEventTitle,
      category: req.body.category,
      noteId: req.body.noteId,
      lastActiveWeek: req.body.lastActiveWeek,
      lastOccurrence: Date.now(),
      longestDuration: 0,
      longestDurationHistory: 0,
      count: 1,
      positiveExp: req.body.positiveExp,
      neutralExp: req.body.neutralExp,
      negativeExp: req.body.negativeExp,
      positiveExpHistory: 0,
      negativeExpHistory: 0,
      neutralExpHistory: 0,
      countHistory: [],
      highestCount: 0,
      averageCount: 0,
      lowestCount: 0
    };

    const note = {
      dateCreated: Date.now(),
      parentEvent: req.body.noteId,
      content: req.body.note,
      category: req.body.category
    };
    const id = req.user.id.toString();
    if (note.content.length > 1) {
      User.findOneAndUpdate(
        { _id: id },
        {
          $push: { events: event, notes: note }
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
    } else {
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
    }
  });

  //Reset Event

  app.post("/resetEvent", (req, res, next) => {
    const id = req.user.id.toString();
    const eventId = req.body.eventId.toString();
    console.log(eventId + " Hello World");
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
  //Add Category

  app.post("/addCategory", (req, res, next) => {
    const category = { title: req.body.category };
    const id = req.user.id.toString();
    User.findOneAndUpdate(
      { _id: id },
      {
        $push: { categories: category }
      },
      { new: true },
      (error, document) => {
        if (error) {
          console.log(error);
          return res.json({ success: false, message: error.message });
        }
        res.json({ categories: document.categories });
      }
    );
  });

  app.post("/deleteCategory", (req, res, next) => {
    const categoryId = req.body.categoryId;
    const id = req.user.id.toString();
    User.findOneAndUpdate(
      { _id: id },
      {
        $pull: { categories: { _id: categoryId } }
      },
      { new: true },
      (error, document) => {
        if (error) {
          console.log(error);
          return res.json({ success: false, message: error.message });
        }
        res.json({ categories: document.categories });
      }
    );
  });
};
