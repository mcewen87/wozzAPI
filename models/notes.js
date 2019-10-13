let mongoose = require("mongoose");

let noteSchema = new mongoose.Schema({
  dateCreated: { type: Date, required: true },
  belongsTo: { type: String, required: true },
  content: { type: String, required: true, unique: false },
  category: { type: String, required: true, unique: false }
});

module.exports = noteSchema;
