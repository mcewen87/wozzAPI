let mongoose = require("mongoose");
const noteSchema = require("./notes");

let eventSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: false },
  category: { type: String, required: true, unique: false },
  lastActiveWeek: { type: Number },
  lastOccurrence: { type: Date, required: true },
  longestDuration: { type: Number, required: false },
  longestDurationHistory: { type: Number, required: false },
  count: { type: Number, required: true, unique: false },
  lastWeekCount: { type: Number, required: false, unique: false },
  currentNotes: [noteSchema],
  notesHistory: [noteSchema],
  positiveExp: { type: Number, required: false, unique: false },
  neutralExp: { type: Number, required: false, unique: false },
  negativeExp: { type: Number, required: false, unique: false },
  lastPositiveExp: { type: Number, required: false, unique: false },
  lastNeutralExp: { type: Number, required: false, unique: false },
  lastNegativeExp: { type: Number, required: false, unique: false },
  positiveExpHistory: { type: Number, required: false, unique: false },
  neutralExpHistory: { type: Number, required: false, unique: false },
  negativeExpHistory: { type: Number, required: false, unique: false },
  countHistory: [Number],
  highestCount: { type: Number, required: false, unique: false },
  averageCount: { type: Number, required: false, unique: false },
  lowestCount: { type: Number, required: false, unique: false }
});

//longest duration between resets
//highest lowest average
//Experience Average

module.exports = eventSchema;
