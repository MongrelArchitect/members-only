const path = require('path');
const createError = require('http-errors');
const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const logger = require('morgan');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user');
require('dotenv').config();

const indexRouter = require('./routes/index');
const signupRouter = require('./routes/signUp');
const loginRouter = require('./routes/login');

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

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      const user = await User.findOne({ email });
      try {
        if (!user) {
          return done(null, false, { message: 'no such user' });
        }
        const correctPassword = await bcrypt.compare(password, user.password);
        if (!correctPassword) {
          return done(null, false, { message: 'incorrect password' });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (e) {
    done(e);
  }
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use('/', indexRouter);
app.use('/sign-up', signupRouter);
app.use('/login', loginRouter);

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
