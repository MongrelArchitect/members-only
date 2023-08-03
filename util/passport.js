const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/user');

module.exports = function setupPassport(passport) {
  passport.use(
    new LocalStrategy(
      { passReqToCallback: true, usernameField: 'email' },
      async (req, email, password, done) => {
        const user = await User.findOne({ email });
        try {
          if (!user) {
            req.flash('email', req.body.email);
            req.flash('password', req.body.password);
            return done(null, false, {
              message: 'Email or password is incorrect',
            });
          }
          const correctPassword = await bcrypt.compare(password, user.password);
          if (!correctPassword) {
            req.flash('email', req.body.email);
            req.flash('password', req.body.password);
            return done(null, false, {
              message: 'Email or password is incorrect',
            });
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
};
