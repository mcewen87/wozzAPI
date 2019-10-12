let mongoose = require("mongoose");

let eventSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: false, lowercase: true }
});

module.exports = eventSchema;
