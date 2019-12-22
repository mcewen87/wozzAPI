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
  useFindAndModify: false,
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
setUpPassport();

//INITIALIZE EXPRESS
const app = express();

//CORS

const whitelist = [
  "https://wozzapp.netlify.com/",
  "wozzapp.netlify.com/",
  "http://localhost:8000",
  "https://wozzapp.netlify.com",
  "https://wozzapp.netlify.com/signin"
];
const options = {
  origin: "https://wozzapp.netlify.com",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: [
    "Content-Type",
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Origin",
    "Accept-Language",
    "Content-Language",
    "Authorization",
    "csrf-token"
  ],
  exposedHeaders: [
    "Content-Type",
    "Access-Control-Allow-Headers",
    "Accept-Language",
    "Content-Language",
    "Access-Control-Allow-Credentials",
    "Access-Control-Allow-Origin",
    "Authorization",
    "csrf-token"
  ],

  maxAge: 360000000,
  preflightContinue: true,
  credentials: true
};

//SETUP APPLICATION MIDDLEWARE

app.use(helmet());
app.use(cookieParser());
app.use(
  csurf({
    cookie: {
      maxAge: 150000000,
      secure: true,
      sameSite: "none",
      domain: "https://stormy-basin-80765.herokuapp.com"
    }
  })
);
app.use(cors(options));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// We Will use Secure in Production
// when we have an HTTPS connection
app.use(
  session({
    //This is our Encryption Key
    cookie: {
      secure: true,
      domain: "https://stormy-basin-80765.herokuapp.com",
      sameSite: "none",
      httpOnly: true,
      maxAge: 150000000
    },
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

app.options("/getToken", cors(options));
app.options("/checkAuth", cors(options));
app.options("/signIn", cors(options));
app.options("/signUp", cors(options));

require("./routes/testRoutes")(app);
require("./routes/authRoutes")(app);
require("./routes/crudRoutes")(app);

app.use((error, req, res, next) => {
  console.log(error);
});

// => SETUP SERVER ON LOCAL PORT
app.listen(process.env.PORT || 3000, () => {
  console.log("I listen, therefor I am.");
  console.log(
    process.env.dataBaseConnection +
      " " +
      process.env.PORT +
      " " +
      process.env.sessionCode +
      " " +
      process.env.dataBaseName
  );
});

module.exports = app;
