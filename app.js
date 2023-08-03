const path = require('path');
const createError = require('http-errors');
const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const logger = require('morgan');
const mongoose = require('mongoose');
const setupPassport = require('./util/passport');
require('dotenv').config();

const indexRouter = require('./routes/index');
const signupRouter = require('./routes/signUp');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const joinRouter = require('./routes/join');
const adminRouter = require('./routes/admin');

// set up mongoose
mongoose.set('strictQuery', true);
const mongoDB = process.env.ATLAS;
async function connectMongoDB() {
  await mongoose.connect(mongoDB);
}
connectMongoDB().catch((err) => console.error(err));

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

setupPassport(passport);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // about 1 day
      maxAge: 87654321,
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// routes
app.use('/', indexRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/join', joinRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
