// REQUIRE PACKAGES
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet");
require("dotenv").config();
const setUpPassport = require("./services/passport");

// REQUIRE MODEL FILES
const { User } = require("./models/user");

//CONNECT TO DATABASE
mongoose.connect(process.env.dataBaseConnection, {
  dbName: process.env.dataBaseName,
  useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
setUpPassport();

//INITIALIZE EXPRESS
const app = express();

//SETUP APPLICATION MIDDLEWARE
app.use(helmet());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(csurf({ cookie: true }));

// We Will use Secure in Production
// when we have an HTTPS connection
app.use(
  session({
    //This is our Encryption Key
    secret: process.env.sessionCode,
    //We set resave to false because our mongo store implements the "touch" function
    resave: false,
    //We Set saveUninitialized to false because we don't want to save unmodified
    //sessions to our mongo store
    saveUninitialized: false,
    unset: "destroy",
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      //We encrypt out store code
      code: process.env.storeCode
    })
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/testRoutes")(app);
require("./routes/authRoutes")(app);
require("./routes/crudRoutes")(app);

app.use((error, req, res, next) => {
  console.log(error);
});

// => SETUP SERVER ON LOCAL PORT
app.listen(3000, () => {
  console.log("I listen therefor I am.");
});

module.exports = app;
