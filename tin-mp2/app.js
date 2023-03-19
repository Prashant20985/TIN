var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var cors = require('cors');
const session = require('express-session');

var indexRouter = require("./routes/index");

const customerRouter = require("./routes/customerRoute");
const rentRouter = require("./routes/rentRoute");
const carRouter = require("./routes/carRoute");

const customerApiRouter = require('./routes/api/customerAPIRoute');
const carApiRouter = require('./routes/api/carAPIRoute');
const rentApiRouter = require('./routes/api/rentAPIRoute');
const apiAuthRouter = require('./routes/api/authAPIRoute')

const authUtils = require('./utils/authUtils')

const sequelizeInit = require('./config/sequelize/init');
sequelizeInit()
    .catch(err => {
        console.log(err);
    });

const i18n = require('i18n');

i18n.configure({
   locales: ['pl', 'en'], // languages available in the application. Create a separate dictionary for each of them 
   directory: path.join(__dirname, 'locales'), // path to the directory where the dictionaries are located
   objectNotation: true, // enables the use of nested keys in object notation
   cookie: 'car-service-lang', //the name of the cookie that our application will use to store information about the language currently selected by the user
});

app.use(session({
  secret: 'my_secret_password',
  resave: false,
  saveUninitialized: false,
}));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(cookieParser('secret'));

app.use((req, res, next) => {
  if(!res.locals.lang) {
      const currentLang = req.cookies['car-service-lang'];
      res.locals.lang = currentLang;
  }
  next();
});

app.use(i18n.init);
app.use(cookieParser('secret'));

app.use((req, res, next) => {
  const loggedUser = req.session.loggedUser;
  res.locals.loggedUser = loggedUser;
  if(!res.locals.loginError) {
    res.locals.loginError = undefined;
  }
  next();
})

app.use("/", indexRouter);
app.use("/customers", authUtils.permitAuthenticateUser, customerRouter);
app.use("/rent", authUtils.permitAuthenticateUser, rentRouter);
app.use("/cars", authUtils.permitAuthenticateUser, carRouter);

app.use('/api/customers', customerApiRouter);
app.use('/api/cars', carApiRouter);
app.use('/api/rents', rentApiRouter);
app.use('/api/auth', apiAuthRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
