const bcrypt = require("bcrypt-nodejs");
const mongoose = require("mongoose");
const categorySchema = require("./category");
const eventSchema = require("./event");

const SALT_FACTOR = 10;

let userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  categories: [categorySchema],
  events: [eventSchema]
});

let noop = function() {};

userSchema.pre("save", function(done) {
  let user = this;

  if (!user.isModified("password")) {
    return done();
  }

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) {
      return done(err);
    }
    bcrypt.hash(user.password, salt, noop, function(err, hashedPassword) {
      if (err) {
        return done(err);
      }
      user.password = hashedPassword;
      done();
    });
  });
});

userSchema.methods.checkPassword = function(guess, done) {
  bcrypt.compare(guess, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

let User = mongoose.model("User", userSchema);

module.exports = User;
