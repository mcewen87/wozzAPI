let mongoose = require("mongoose");

let categorySchema = new mongoose.Schema({
  title: { type: String, required: true, unique: false }
});

module.exports = categorySchema;
